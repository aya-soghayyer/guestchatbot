import React from 'react'
import Loader from '../Loaders/ChatLoader'
import { marked } from 'marked'
import aiRobot from '../../../assets/images/greenRobot.png'
import user from '../../../assets/images/greenUser6.png'

// Optional config for better Markdown rendering
marked.setOptions({
  breaks: true,
  gfm: true,
})

const ChatArea = ({ messages, messageEndRef, isLoading, className }) => {
  return (
    <div
      className={`w-full overflow-y-auto p-3 mobile:pt-20 extra-large:py-10 desktop:py-4 laptop:py-2 tablet:p-0 tablet:px-7 ${className} custom-scrollbar relative max-h-[500px] mobile:max-h-[490px] tablet:max-h-[530px]`}
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-4 flex items-end ${
            msg.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          {msg.sender !== 'user' && (
            <div className="mr-2 h-10 w-10 tablet:h-12 tablet:w-12">
              <img
                src={aiRobot}
                alt="Bot Avatar"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          )}

          <span
            className={`prose prose-invert max-w-[80%] break-words p-3 text-sm tablet:text-base ${
              msg.sender === 'user'
                ? 'rounded-[30px] rounded-br-none bg-mid-green text-white'
                : 'rounded-[30px] rounded-bl-none bg-dark-green text-white'
            }`}
            ref={index === messages.length - 1 ? messageEndRef : null}
          >
            {msg.sender === 'bot' ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: marked.parse(msg.text || ''),
                }}
              />
            ) : (
              msg.text
            )}
          </span>

          {msg.sender === 'user' && (
            <div className="ml-2 h-10 w-10 tablet:h-12 tablet:w-12">
              <img
                src={user}
                alt="User Avatar"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="mt-2 flex justify-start">
          <Loader />
        </div>
      )}
    </div>
  )
}

export default ChatArea
