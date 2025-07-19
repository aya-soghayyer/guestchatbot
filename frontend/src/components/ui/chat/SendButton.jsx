import React from 'react'
import textMessage from '../../../assets/images/ArrowButton.svg'
import voiceMessage from '../../../assets/images/RecordingButton.svg'
import useSound from 'use-sound'
import micStop from '../../../assets/sounds/mixkit-select-click-1109.wav'
import ArrowButton from '../../icons/ArrowButton'
import RecodingButton from '../../icons/RecodingButton'

function SendButton({
  listening,
  handleToggle,
  setIsActiveChat,
  isActiveChat,
  inputValue,
  isBotLoading,
  classNameButton,
}) {
  const [pause] = useSound(micStop)

  return (
    <>
      {inputValue.trim() ? (
        <button
          type="submit"
          className={`absolute ${classNameButton} right-4 top-[50px] w-6 md:w-8`}
          disabled={isBotLoading}
        >
          <ArrowButton />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            pause()
            handleToggle()
          }}
          className={`absolute ${classNameButton} right-4 top-[50px] w-6 md:w-8 ${
            isBotLoading ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={isBotLoading}
        >
          {/* <img
            src={voiceMessage}
            alt="Send voice message icon"
            // className={`${listening ? '' : ''} `}
          /> */}

          <RecodingButton />
        </button>
      )}
    </>
  )
}

export default SendButton
