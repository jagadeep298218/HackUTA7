import React from 'react'
import Editor from '@monaco-editor/react'

interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
  onRun: () => void
  isLoading: boolean
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, onRun, isLoading }) => {
  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">🕸️ Code Editor</h2>
        <button
          onClick={onRun}
          disabled={isLoading}
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
            isLoading
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-spiderman-red hover:bg-red-600 text-white hover:shadow-lg hover:shadow-red-500/25'
          }`}
        >
          {isLoading ? '🕸️ Analyzing...' : '🚀 Run Code'}
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="javascript"
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

      {/* Footer */}
      <div className="p-3 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <span>JavaScript</span>
            <span>•</span>
            <span>Monaco Editor</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Ready</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeEditor
