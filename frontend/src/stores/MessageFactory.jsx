// utils/MessageFactory.js
const MessageFactory = {
    createUserMessage(text) {
      return { text, sender: 'user', timestamp: new Date() }
    },
    createBotMessage(text) {
      return { text, sender: 'bot', timestamp: new Date() }
    },
  }
  
  export default MessageFactory
  