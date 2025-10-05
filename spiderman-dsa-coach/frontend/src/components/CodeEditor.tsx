import React from 'react'
import Editor from '@monaco-editor/react'

interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
  onRun: () => void
  isLoading: boolean
  language: string
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, onRun, isLoading, language }) => {
  return (
    <div className="flex flex-col h-full" style={{ 
      background: 'var(--spider-dark)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b" style={{ 
        background: 'var(--spider-dark)', 
        borderColor: 'var(--spider-cyan)' 
      }}>
        <h2 className="text-lg font-semibold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Code Editor
        </h2>
        <button
          onClick={onRun}
          disabled={isLoading}
          className={`tech-button ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Analyzing...' : 'Run Code'}
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 p-2">
        <div className="h-full electric-glow rounded-lg overflow-hidden" style={{
          border: '1px solid var(--spider-cyan)',
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)'
        }}>
          <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => onChange(value || '')}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            lineNumbers: 'on',
            renderWhitespace: 'boundary',
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true,
            },
          }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t" style={{ 
        background: 'var(--spider-dark)', 
        borderColor: 'var(--spider-cyan)' 
      }}>
        <div className="p-3 flex items-center justify-between text-sm" style={{ color: 'var(--spider-cyan)' }}>
          <div className="flex items-center space-x-4">
            <span className="capitalize font-medium">{language}</span>
            <span></span>
            <span></span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full electric-glow"></div>
            <span>Ready</span>
          </div>
        </div>
        <div className="status-ticker">
          <div className="ticker-text">
            Daily Bugle Breaking News: Waiting for Hero's Code... • Web-Slinging Through Algorithms... • With Great Power Comes Great Responsibility... • Debugging Like a Superhero...
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeEditor
