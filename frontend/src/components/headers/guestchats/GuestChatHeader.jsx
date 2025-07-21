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
      <div className="h-full grid font-Outfit mobile:mx-auto mobile:my-auto text-dark-green extra-large:h-[50%] extra-large:w-full">
        {!activeChat ? (
          <div className="mx-auto mobile:w-4/5 tablet:w-4/5 grid w-[60%] my-auto h-[50%] gap-1 laptop:h-[70%] bg-white bg-opacity-85  rounded-3xl tablet:gap-3 extra-large:mt-20 extra-large:max-w-5xl extra-large:gap-8 extra-large:w-full extra-large:h-full">
            <h2 className="flex items-end justify-center mobile:w-full text-2xl font-bold tablet:text-3xl extra-large:text-3xl">
              What can I help with?
            </h2>
            <div className="h-1/2 mobile:w-full tablet:w-full mx-auto tablet: tablet:space-y-4 extra-large:space-y-6">
              <div className="min-w-full mobile:w-full tablet:w-full">
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
              <div className="hidden w-full space-y-3 text-dark-green tablet:inline-grid tablet:w-full  tablet:space-y-2 extra-large:space-y-5 extra-large:p-4">
                <p className="text-sm tablet:px-12 tablet:text-base text-dark-green tablet: extra-large:text-xl">
                  Suggested questions:
                </p>
                <div
                  className="grid grid-cols-1 gap-2 tablet:grid-cols-2 tablet:gap-1 laptop:px-6  
                 tablet:px-12 extra-large:gap-4"
                >
                  {suggestionQuestions.map((question, index) => (
                    <button
                      key={index}
                      value={question}
                      onClick={(e) => handleSuggestion(e.target.value)}
                      className={`rounded-full bg-dark-green bg-opacity-10 p-2 laptop:p-3 tablet:p-1 text-sm tablet:text-sm transition-colors hover:bg-white/20 tablet: extra-large:p-4 extra-large:text-lg ${index === 2 ? 'mt-1 flex justify-center tablet:p-4 laptop:p-3 justify-self-center tablet:col-span-2' : ''}`}
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
            className={`mx-auto w-[80%] my-auto h-[70%]  mobile:h-full gap-1 bg-white bg-opacity-85 rounded-3xl grid min-h-[350px]  max-w-full grid-rows-[1fr_auto] items-end pt-2 teblet:h-[35rem] tablet:min-h-[33rem] tablet:max-w-[80%] tablet:pt-3 extra-large:min-h-[600px] extra-large:max-w-5xl extra-large:pt-4`}
          >
            <ChatArea
              messages={messages}
              messageEndRef={messageEndRef}
              isLoading={isLoading}
            />
            <div className="space-y-2 p-2 tablet:p-3 extra-large:space-y-4 extra-large:p-4">
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
                  classNameButton="tablet:top-[46px]"
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
