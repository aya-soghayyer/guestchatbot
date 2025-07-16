import React from 'react'
import textMessage from '../../../assets/images/ArrowButton.svg'
import voiceMessage from '../../../assets/images/RecordingButton.svg'
import useSound from 'use-sound'
import micStop from '../../../assets/sounds/mixkit-select-click-1109.wav'

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
          {/* {isBotLoading ? ( */}
            {/* // <svg
            //   className="mx-auto h-5 w-5 animate-spin text-gray-300"
            //   xmlns="http://www.w3.org/2000/svg"
            //   fill="none"
            //   viewBox="0 0 24 24"
            // >
            //   <circle
            //     className="opacity-25"
            //     cx="12"
            //     cy="12"
            //     r="10"
            //     stroke="currentColor"
            //     strokeWidth="4"
            //   />
            //   <path
            //     className="opacity-75"
            //     fill="currentColor"
            //     d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            //   />
            // </svg>
          // ) : ( */}
            <img src={textMessage} alt="Send text message icon" />
          {/* )
        } */}
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
          <img
            src={voiceMessage}
            alt="Send voice message icon"
            className={listening ? '' : ''}
          />
        </button>
      )}
    </>
  )
}

export default SendButton
