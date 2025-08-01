// components/SelectLanguageSpeak.js
import React from 'react'

function SelectLanguageSpeak({ language, setLanguage }) {
  return (
    <div className="mb-1 flex items-center space-x-2">
      <label
        htmlFor="language"
        className="grid justify-start text-xs font-medium text-dark-green md:text-base"
      >
        Select Language To Speak:
      </label>
      <select
        id="language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="h-8 w-fit rounded-2xl bg-white/5 py-1 text-xs font-medium text-dark-green"
      >
        <option value="en-US" className="">
          EN
        </option>
        <option value="ar-SA" className="">
          AR
        </option>
      </select>
    </div>
  )
}

export default SelectLanguageSpeak
