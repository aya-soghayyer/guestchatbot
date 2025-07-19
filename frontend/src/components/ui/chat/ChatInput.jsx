// import textMessage from "../../../../assets/images/ArrowButton.svg";
// import voiceMessage from "../../../../assets/images/RecordingButton.svg";
// import useSound from "use-sound"
// import micStart from "../../../../assets/sounds/mixkit-video-game-mystery-alert-234.wav"
// import micStop from "../../../../assets/sounds/mixkit-select-click-1109.wav"

import SelectLanguageSpeak from '../chat/SelectLanguageSpeak'
import SendButton from '../chat/SendButton'

const ChatInput = ({
  inputValue,
  setInputValue,
  language,
  setLanguage,
  listening,
  handleToggle,
  handleSubmit,
  setIsActiveChat,
  isActiveChat,
  className = '',
  isBotLoading,
  classNameButton,
}) => {
  // const [play] = useSound(micStart)
  // const [pause] = useSound(micStop)

  return (
    <div className="relative grid w-full">
      <SelectLanguageSpeak language={language} setLanguage={setLanguage} />
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center justify-center"
      >
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`flex-auto rounded-2xl p-3 border-[1px] border-dark-green pl-4 pr-14 placeholder:text-mid-green text-sm md:text-lg ${isBotLoading ? 'cursor-not-allowed bg-gray-700' : 'bg-gray-800'} ${className}`}
          type="text"
          placeholder="Ask MiLo"
          disabled={isBotLoading}
        />
        <SendButton
          listening={listening}
          handleToggle={handleToggle}
          setIsActiveChat={setIsActiveChat}
          isActiveChat={isActiveChat}
          inputValue={inputValue}
          isBotLoading={isBotLoading}
          classNameButton={classNameButton}
        />
      </form>
    </div>
  )
}

export default ChatInput
