import React from 'react'

interface TerminalOutputProps {
  output: string
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ output }) => {
  const parseOutput = (text: string) => {
    if (!text) return []
    
    const lines = text.split('\n')
    return lines.map((line, index) => {
      if (line.includes('PASSED')) {
        return { type: 'pass', content: line, key: index }
      } else if (line.includes('FAILED')) {
        return { type: 'fail', content: line, key: index }
      } else if (line.includes('Test Case')) {
        return { type: 'test', content: line, key: index }
      } else if (line.includes('Error:')) {
        return { type: 'error', content: line, key: index }
      } else if (line.includes('Execution time:')) {
        return { type: 'info', content: line, key: index }
      } else if (line.includes('All test cases passed!') || line.includes('Great job')) {
        return { type: 'success', content: line, key: index }
      } else if (line.includes('Some test cases failed') || line.includes('Keep debugging')) {
        return { type: 'warning', content: line, key: index }
      }
      return { type: 'normal', content: line, key: index }
    })
  }

  const parsedLines = parseOutput(output)

  return (
    <div className="flex flex-col h-full" style={{ 
      background: 'var(--spider-darker)',
      borderTop: '1px solid var(--spider-cyan)',
      overflow: 'hidden'
    }}>
      <div className="px-4 py-2 border-b flex items-center" style={{ 
        background: 'var(--spider-dark)', 
        borderColor: 'var(--spider-cyan)' 
      }}>
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-sm ml-4 font-mono" style={{ color: 'var(--spider-cyan)', fontFamily: 'Orbitron, monospace' }}>
          Terminal Output
        </span>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        {parsedLines.length > 0 ? (
          <div className="space-y-1">
            {parsedLines.map((line) => (
              <div key={line.key} className="flex items-center">
                {line.type === 'pass' && <span className="web-splat"></span>}
                {line.type === 'fail' && <span className="web-splat" style={{ background: 'radial-gradient(circle, #dc2626 30%, transparent 70%)' }}></span>}
                {line.type === 'test' && <span className="web-splat" style={{ background: 'radial-gradient(circle, #f59e0b 30%, transparent 70%)' }}></span>}
                {line.type === 'error' && <span className="web-splat" style={{ background: 'radial-gradient(circle, #ef4444 30%, transparent 70%)' }}></span>}
                {line.type === 'success' && <span className="web-splat" style={{ background: 'radial-gradient(circle, #10b981 30%, transparent 70%)' }}></span>}
                {line.type === 'warning' && <span className="web-splat" style={{ background: 'radial-gradient(circle, #f59e0b 30%, transparent 70%)' }}></span>}
                <pre className={`font-mono text-sm whitespace-pre-wrap leading-relaxed ${
                  line.type === 'pass' ? 'text-green-400' :
                  line.type === 'fail' ? 'text-red-400' :
                  line.type === 'test' ? 'text-yellow-400' :
                  line.type === 'error' ? 'text-red-400' :
                  line.type === 'success' ? 'text-green-400' :
                  line.type === 'warning' ? 'text-yellow-400' :
                  line.type === 'info' ? 'text-blue-400' :
                  'text-gray-300'
                }`}>
                  {line.content}
                </pre>
              </div>
            ))}
          </div>
        ) : (
          <pre className="text-gray-400 font-mono text-sm whitespace-pre-wrap leading-relaxed">
            Ready to run your code...
          </pre>
        )}
      </div>
    </div>
  )
}

export default TerminalOutput
