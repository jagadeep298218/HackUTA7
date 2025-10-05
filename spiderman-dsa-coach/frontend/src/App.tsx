import React, { useState } from 'react'
import ProblemPanel from './components/ProblemPanel'
import CodeEditor from './components/CodeEditor'
import DraggableSpiderMan from './components/DraggableSpiderMan'
import { analyzeCode, getSpiderManCoaching } from './services/api'

interface CodeAnalysis {
  complexity_hint: string
  structures: string[]
}

interface CoachResponse {
  message: string
}

function App() {
  const [code, setCode] = useState(`// Write your solution here
function twoSum(nums, target) {
    // Your code goes here
}`)
  
  const [coachMessage, setCoachMessage] = useState('🕸️ Welcome, hero! Ready to tackle some data structures and algorithms? Let\'s start with the Two Sum problem!')
  const [isLoading, setIsLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  const handleRunCode = async () => {
    if (!code.trim()) {
      setCoachMessage('🕸️ Hey there! You need to write some code first before I can help you!')
      return
    }

    setIsLoading(true)
    
    try {
      // First, analyze the code
      const analysis: CodeAnalysis = await analyzeCode(code, 'two-sum')
      
      // Then get Spider-Man's coaching
      const coaching: CoachResponse = await getSpiderManCoaching(code, analysis)
      
      setCoachMessage(coaching.message)
    } catch (error) {
      console.error('Error getting coaching:', error)
      setCoachMessage('🕸️ Oops! Looks like my web got tangled. Try again, hero!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative">
      {/* Left Panel - Problem Description */}
      <div className="w-1/2 bg-gray-800 border-r border-gray-700">
        <ProblemPanel />
      </div>
      
      {/* Right Panel - Code Editor */}
      <div className="w-1/2 flex flex-col">
        <CodeEditor 
          code={code} 
          onChange={setCode}
          onRun={handleRunCode}
          isLoading={isLoading}
        />
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
