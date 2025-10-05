import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
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
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    isLoading: authLoading,
    user,
    error: authError,
    getAccessTokenSilently,
  } = useAuth0()
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

    if (!isAuthenticated) {
      setCoachMessage('🕸️ You need to sign in before I can review your code, hero!')
      setShowDialog(true)
      return
    }

    setIsLoading(true)

    try {
      const token = await getAccessTokenSilently()
      // First, analyze the code
      const analysis: CodeAnalysis = await analyzeCode(code, 'two-sum', token)
      
      // Then get Spider-Man's coaching
      const coaching: CoachResponse = await getSpiderManCoaching(code, analysis, token)
      
      setCoachMessage(coaching.message)
    } catch (error) {
      console.error('Error getting coaching:', error)
      setCoachMessage('🕸️ Oops! Looks like my web got tangled. Try again, hero!')
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg">🕸️ Swinging into action...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white gap-6 px-4 text-center">
        <h1 className="text-4xl font-bold">Spidey Coach needs you to log in</h1>
        <p className="max-w-xl text-lg">
          Sign in with Auth0 to unlock personalized DSA feedback, track your progress, and keep your heroic efforts secure.
        </p>
        <button
          onClick={() => loginWithRedirect()}
          className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded-lg font-semibold shadow-lg shadow-red-800/40 transition"
        >
          Log in with Auth0
        </button>
        {authError && (
          <p className="text-sm text-red-300">{authError.message}</p>
        )}
      </div>
    )
  }

  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative">
      <header className="absolute top-4 right-4 flex items-center gap-4 bg-black/30 backdrop-blur-md px-4 py-2 rounded-lg text-white">
        {user?.name && <span className="text-sm">Welcome, {user.name.split(' ')[0]}!</span>}
        <button
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          className="text-sm font-semibold text-red-300 hover:text-red-200 transition"
        >
          Log out
        </button>
      </header>

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
