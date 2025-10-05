import React from 'react'

interface LanguageSelectorProps {
  selectedLanguage: string
  onLanguageChange: (language: string) => void
}

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'typescript', label: 'TypeScript' }
]

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <div className="relative">
      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="px-4 py-2 rounded-lg border appearance-none cursor-pointer pr-8 font-medium transition-all duration-200"
        style={{
          background: 'var(--spider-dark)',
          color: 'white',
          borderColor: 'var(--spider-cyan)',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value} style={{ background: 'var(--spider-dark)' }}>
            {lang.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="w-4 h-4" style={{ color: 'var(--spider-cyan)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}

export default LanguageSelector
