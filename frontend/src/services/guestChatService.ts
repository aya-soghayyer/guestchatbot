// ✅ ChatService.js (streamed response and emit via callback)
import { domainName } from '../App'

class ChatService {
  async sendGuestMessage(message, chatId = '', onStreamUpdate = () => {}) {
    try {
      const response = await fetch(`${domainName}guest/addmessage`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, chat_id: chatId }),
      })

      if (!response.ok) throw new Error('Failed to send message')

      const reader = response.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const parts = buffer.split('\n\n')
        buffer = parts.pop() // keep last unfinished chunk

        for (const part of parts) {
          if (part.startsWith('data:')) {
            const jsonStr = part.replace('data: ', '')
            const parsed = JSON.parse(jsonStr)
            if (parsed.status === '[DONE]') {
              return { chat_id: parsed.chat_id }
            }
            onStreamUpdate(parsed.content)
          }
        }
      }
    } catch (error) {
      throw error
    }
  }
}

export default new ChatService()
