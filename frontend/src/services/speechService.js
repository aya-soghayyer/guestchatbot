// services/SpeechService.js
class SpeechService {
    constructor() {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SpeechRecognition) {
        throw new Error('Speech Recognition not supported in this browser.')
      }
  
      this.recognition = new SpeechRecognition()
      this.recognition.continuous = false
      this.recognition.interimResults = true
      this.recognition.maxAlternatives = 1
      this.recognition.lang = 'en-US' // Default language
  
      this.isListening = false
    }
  
    setLanguage(lang) {
      if (!['en-US', 'ar-SA'].includes(lang)) {
        console.warn(`Unsupported language: ${lang}. Falling back to en-US.`)
        this.recognition.lang = 'en-US'
        return
      }
      this.recognition.lang = lang
  
      // If recognition is active, restart to apply the new language
      if (this.isListening) {
        this.stop()
        this.start(this.onResultCallback, this.onErrorCallback)
      }
    }
  
    start(onResult, onError) {
      if (this.isListening) return // Prevent multiple starts
  
      this.onResultCallback = onResult // Store callback for reuse
      this.onErrorCallback = onError
  
      this.recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('')
        onResult(transcript)
      }
  
      this.recognition.onerror = (event) => {
        console.error('Speech Recognition Error:', event.error)
        if (onError) onError(event.error)
      }
  
      this.recognition.onend = () => {
        this.isListening = false
      }
  
      this.recognition.start()
      this.isListening = true
    }
  
    stop() {
      if (this.isListening) {
        this.recognition.stop()
        this.isListening = false
      }
    }
  }
  
  const speechService = new SpeechService()
  export default speechService
  