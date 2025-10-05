import React, { useState, useEffect } from 'react'
import ProblemPanel from './components/ProblemPanel'
import CodeEditor from './components/CodeEditor'
import DraggableSpiderMan from './components/DraggableSpiderMan'
import LanguageSelector from './components/LanguageSelector'
import TerminalOutput from './components/TerminalOutput'
import QuestionsPage from './components/QuestionsPage'
import { analyzeCode, getSpiderManCoaching, runCode, RunCodeResponse } from './services/api'

interface CodeAnalysis {
  complexity_hint: string
  structures: string[]
}

interface CoachResponse {
  message: string
}

interface Question {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  description: string
  testCases: any[]
}

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'questions'>('dashboard')
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [code, setCode] = useState(`// Write your solution here
function twoSum(nums, target) {
    // Your code goes here
}`)
  
  const [coachMessage, setCoachMessage] = useState('Welcome, hero! Ready to tackle some data structures and algorithms? Let\'s start with the Two Sum problem!')
  const [isLoading, setIsLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState('')
  const [leftPanelWidth, setLeftPanelWidth] = useState(40) // Percentage
  const [codeEditorHeight, setCodeEditorHeight] = useState(60) // Percentage

  // Encouraging messages every 10 seconds
  useEffect(() => {
    const encouragingMessages = [
      'Remember, every great algorithm started with a single line of code!',
      'Your debugging skills are getting stronger with each challenge!',
      'Think like a superhero - break down complex problems into smaller ones!',
      'Data structures are your web-shooters - master them and you\'ll swing through any problem!',
      'Every bug you fix makes you a better programmer!',
      'Don\'t give up! Even Spider-Man had to learn to swing!',
      'Your code is like a web - make it strong and efficient!',
      'Time complexity matters, hero! Make your algorithms fast!',
      'Recursion is like calling for backup - use it wisely!',
      'Hash maps are your best friends for fast lookups!'
    ]

    const interval = setInterval(() => {
      const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)]
      setCoachMessage(randomMessage)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleRunCode = async () => {
    if (!code.trim()) {
      setCoachMessage('Hey there! You need to write some code first before I can help you!')
      return
    }

    setIsLoading(true)
    setTerminalOutput('Running code...\n')
    
    try {
      // First, run the code with test cases
      const problemId = selectedQuestion?.id || 'two-sum'
      const codeResult: RunCodeResponse = await runCode(code, selectedLanguage, problemId)
      
      // Format the terminal output
      let outputText = ''
      codeResult.results.forEach((result, index) => {
        outputText += `Test Case ${result.test_case}: ${result.passed ? 'PASSED' : 'FAILED'}\n`
        outputText += `Input: ${result.input}\n`
        outputText += `Output: ${result.actual || 'No output'}\n`
        outputText += `Expected: ${result.expected}\n`
        if (result.error) {
          outputText += `Error: ${result.error}\n`
        }
        outputText += '\n'
      })
      
      if (codeResult.overall_passed) {
        outputText += 'All test cases passed! Great job, hero!\n'
      } else {
        outputText += 'Some test cases failed. Keep debugging, hero!\n'
      }
      
      outputText += `Execution time: ${codeResult.execution_time.toFixed(3)}s\n`
      
      setTerminalOutput(outputText)
      
      // Then get Spider-Man's coaching based on the results
      const analysis: CodeAnalysis = await analyzeCode(code, problemId)
      const coaching: CoachResponse = await getSpiderManCoaching(code, analysis)
      
      setCoachMessage(coaching.message)
      
    } catch (error) {
      console.error('Error running code:', error)
      setCoachMessage('Oops! Looks like my web got tangled. Try again, hero!')
      setTerminalOutput('Error: Failed to execute code. Please check your syntax and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuestionSelect = (question: Question) => {
    setSelectedQuestion(question)
    setCurrentView('dashboard')
    // Set default code based on language
    const defaultCode = getDefaultCode(selectedLanguage, question.id)
    setCode(defaultCode)
  }

  const getDefaultCode = (language: string, questionId: string) => {
    const templates = {
      javascript: `// ${selectedQuestion?.title || 'Two Sum'}
function ${questionId.replace('-', '')}(input) {
    // Your solution here
}`,
      python: `# ${selectedQuestion?.title || 'Two Sum'}
def ${questionId.replace('-', '_')}(input):
    # Your solution here
    pass`,
      java: `// ${selectedQuestion?.title || 'Two Sum'}
public class Solution {
    public int[] ${questionId.replace('-', '')}(int[] nums) {
        // Your solution here
        return new int[0];
    }
}`,
      cpp: `// ${selectedQuestion?.title || 'Two Sum'}
class Solution {
public:
    vector<int> ${questionId.replace('-', '')}(vector<int>& nums) {
        // Your solution here
        return {};
    }
};`
    }
    return templates[language as keyof typeof templates] || templates.javascript
  }

  const handleResize = (e: React.MouseEvent) => {
    const startX = e.clientX
    const startWidth = leftPanelWidth
    
    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + ((e.clientX - startX) / window.innerWidth) * 100
      setLeftPanelWidth(Math.max(20, Math.min(80, newWidth)))
    }
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleVerticalResize = (e: React.MouseEvent) => {
    const startY = e.clientY
    const startHeight = codeEditorHeight
    
    const handleMouseMove = (e: MouseEvent) => {
      const newHeight = startHeight + ((e.clientY - startY) / window.innerHeight) * 100
      setCodeEditorHeight(Math.max(30, Math.min(90, newHeight)))
    }
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  if (currentView === 'questions') {
    return <QuestionsPage onQuestionSelect={handleQuestionSelect} onBack={() => setCurrentView('dashboard')} />
  }

  return (
    <div className="h-screen w-screen flex flex-col hex-grid relative" style={{ height: '100vh', width: '100vw' }}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 flex-shrink-0" style={{ background: 'rgba(15, 23, 42, 0.95)', height: '64px' }}>
        <div className="flex items-center justify-between p-4 border-b h-full" style={{ borderColor: 'var(--spider-cyan)' }}>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/name.png" 
                alt="D-CODE" 
                className="h-10 object-contain"
                style={{ 
                  maxWidth: '200px',
                  height: 'auto',
                  display: 'block'
                }}
                onError={(e) => {
                  console.error('Failed to load name.png:', e);
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-xl font-bold text-white" style="font-family: Orbitron, sans-serif;">D-CODE</span>';
                }}
              />
            </div>
            <button
              onClick={() => setCurrentView('questions')}
              className="tech-button spiderman-glitch"
            >
              Browse Problems
            </button>
          </div>
          <LanguageSelector 
            selectedLanguage={selectedLanguage} 
            onLanguageChange={setSelectedLanguage}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 w-full" style={{ marginTop: '64px', height: 'calc(100vh - 64px)' }}>
        {/* Left Panel - Problem Description */}
        <div 
          className="relative border-r overflow-hidden h-full"
          style={{ 
            width: `${leftPanelWidth}%`,
            background: 'var(--spider-dark)',
            borderColor: 'var(--spider-cyan)'
          }}
        >
          <ProblemPanel selectedQuestion={selectedQuestion} />
        </div>
        
        {/* Resize Handle */}
        <div
          className="w-1 cursor-col-resize transition-colors duration-200 h-full"
          style={{ 
            background: 'var(--spider-grid)',
            borderLeft: '1px solid var(--spider-cyan)',
            borderRight: '1px solid var(--spider-cyan)'
          }}
          onMouseDown={handleResize}
        />
        
        {/* Right Panel - Code Editor */}
        <div className="flex flex-col h-full" style={{ 
          width: `${100 - leftPanelWidth}%`,
          overflow: 'hidden'
        }}>
          {/* Code Editor */}
          <div className="flex-shrink-0" style={{ height: `${codeEditorHeight}%` }}>
            <CodeEditor 
              code={code} 
              onChange={setCode}
              onRun={handleRunCode}
              isLoading={isLoading}
              language={selectedLanguage}
            />
          </div>
          
          {/* Horizontal Resize Handle */}
          <div
            className="cursor-row-resize transition-colors duration-200 flex-shrink-0"
            style={{ 
              height: '4px',
              background: 'var(--spider-grid)',
              borderTop: '1px solid var(--spider-cyan)',
              borderBottom: '1px solid var(--spider-cyan)'
            }}
            onMouseDown={handleVerticalResize}
          />
          
          {/* Terminal Output */}
          <div className="flex-shrink-0" style={{ height: `${100 - codeEditorHeight}%` }}>
            <TerminalOutput output={terminalOutput} />
          </div>
        </div>
      </div>
      
      {/* Draggable Spider-Man Mascot */}
      <DraggableSpiderMan 
        message={coachMessage}
        isLoading={isLoading}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        onRunCode={handleRunCode}
      />
    </div>
  )
}

export default App