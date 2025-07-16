// hooks/useGuestChat.js
import { useState, useEffect, useRef } from 'react'
import ChatService from '../services/guestChatService'
import SpeechService from '../services/speechService'
import MessageFactory from '../stores/MessageFactory'

export const useGuestChat = (
  chatService = ChatService,
  speechService = SpeechService
) => {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [listening, setListening] = useState(false)
  const [language, setLanguage] = useState('en-US')
  const [activeChat, setIsActiveChat] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messageEndRef = useRef(null)

  useEffect(() => {
    speechService.setLanguage(language)
  }, [language])

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleToggleSpeech = () => {
    if (listening) {
      speechService.stop()
      setListening(false)
    } else {
      speechService.start(
        (transcript) => {
          setInputValue(transcript)
        },
        (error) => {
          console.error('Speech recognition error:', error)
          setListening(false)
        }
      )
      setListening(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = MessageFactory.createUserMessage(inputValue)
    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)
    setIsActiveChat(true)

    let streamedText = ''
    try {
      await chatService.sendGuestMessage(inputValue, '', (chunk) => {
        streamedText += chunk
        const botMessage = MessageFactory.createBotMessage(streamedText)
        setMessages((prev) => {
          const updated = [...prev]
          if (updated[updated.length - 1]?.sender === 'bot') {
            updated[updated.length - 1] = botMessage
          } else {
            updated.push(botMessage)
          }
          return updated
        })
      })
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = MessageFactory.createBotMessage(
        'Sorry, something went wrong. Please try again.'
      )
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestion = (question) => {
    setInputValue(question)
    handleSubmit({ preventDefault: () => {} })
  }

  return {
    setIsActiveChat,
    handleToggleSpeech,
    setLanguage,
    language,
    messages,
    inputValue,
    listening,
    activeChat,
    isLoading,
    messageEndRef,
    handleSubmit,
    handleSuggestion,
    setInputValue,
  }
}
