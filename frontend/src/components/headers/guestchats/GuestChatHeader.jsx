import { useGuestChat } from '../../../hooks/useGuestChat'
import ChatService from '../../../services/guestChatService'
import SpeechService from '../../../services/speechService'
// import Loader from '../../loader/Loader'
import micStop from '../../../assets/sounds/mixkit-video-game-mystery-alert-234.wav'
import SelectLanguageSpeak from '../../ui/chat/SelectLanguageSpeak'
import ChatInput from '../../ui/chat/ChatInput'
import ChatArea from '../../ui/chat/ChatArea'

function HeaderGuestChat() {
  const {
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
  } = useGuestChat(ChatService, SpeechService)

  const suggestionQuestions = [
    'Tell me about Hebron University',
    'What is the acceptance rate for computer science major?',
    'What is the registration procedur at Hebron University?',
  ]

  return (
    <>
      <div className="relative z-0 grid font-Outfit text-dark-green md:z-10 2xl:py-12">
        {!activeChat ? (
          <div className="relative z-10 mx-auto grid h-[33rem] w-full min-w-full gap-1 px-5 md:min-w-full md:gap-3 md:px-44 2xl:mt-20 2xl:max-w-5xl 2xl:gap-8">
            <h2 className="flex items-end justify-center text-2xl font-bold md:text-3xl 2xl:text-3xl">
              What can I help with?
            </h2>
            <div className="h-1/2 space-y-3 md:space-y-4 2xl:space-y-6">
              <div className="relative mx-4">
                <ChatInput
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  language={language}
                  setLanguage={setLanguage}
                  listening={listening}
                  handleToggle={handleToggleSpeech}
                  handleSubmit={handleSubmit}
                  setIsActiveChat={setIsActiveChat}
                  className="rounded-2xl bg-white/15 py-4"
                />
              </div>
              <div className="hidden space-y-3 text-dark-green md:inline-grid md:w-full md:space-y-4 md:px-24 2xl:space-y-5 2xl:p-4">
                <p className="text-sm text-dark-green md:text-base 2xl:text-lg">
                  Suggested questions:
                </p>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-1 2xl:gap-4">
                  {suggestionQuestions.map((question, index) => (
                    <button
                      key={index}
                      value={question}
                      onClick={(e) => handleSuggestion(e.target.value)}
                      className={`rounded-full bg-white bg-opacity-10 p-2 text-sm transition-colors hover:bg-white/20 md:p-3 md:px-1 md:text-sm 2xl:p-4 2xl:text-lg ${index === 2 ? 'mt-1 flex justify-center justify-self-center md:col-span-2' : ''}`}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`mx-auto grid h-screen min-h-[350px] w-full max-w-full grid-rows-[1fr_auto] items-end rounded-2xl pt-2 md:h-[33rem] md:min-h-[33rem] md:max-w-[80%] md:pt-3 2xl:min-h-[600px] 2xl:max-w-5xl 2xl:pt-4`}
          >
            <ChatArea
              messages={messages}
              messageEndRef={messageEndRef}
              isLoading={isLoading}
            />
            <div className="space-y-2 p-2 md:p-3 2xl:space-y-4 2xl:p-4">
              <div className="relative mx-4">
                <ChatInput
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  language={language}
                  setLanguage={setLanguage}
                  listening={listening}
                  handleToggle={handleToggleSpeech}
                  handleSubmit={handleSubmit}
                  setIsActiveChat={setIsActiveChat}
                  className="bg-white bg-opacity-25 py-3"
                  isBotLoading={isLoading}
                  classNameButton="md:top-[46px]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default HeaderGuestChat
