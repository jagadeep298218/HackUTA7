import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import ProblemPanel from './components/ProblemPanel'
import CodeEditor from './components/CodeEditor'
import DraggableSpiderMan from './components/DraggableSpiderMan'
import LanguageSelector from './components/LanguageSelector'
import TerminalOutput from './components/TerminalOutput'
import QuestionsPage from './components/QuestionsPage'
import {
  analyzeCode,
  getSpiderManCoaching,
  runCode,
  RunCodeResponse,
  textToSpeech,
} from './services/api'
import {
  defaultProblem,
  getProblemDefinition,
  getTemplateForProblem,
  type ProblemDefinition,
} from './data/problems'

interface CodeAnalysis {
  complexity_hint: string
  structures: string[]
}

interface CoachResponse {
  message: string
}

const audioCache: Record<string, string> = {}

async function createAudioForText(text: string): Promise<HTMLAudioElement> {
  if (audioCache[text]) {
    return new Audio(audioCache[text])
  }

  const audioBuffer = await textToSpeech(text)
  const blob = new Blob([audioBuffer], { type: 'audio/mpeg' })
  const url = URL.createObjectURL(blob)
  audioCache[text] = url
  return new Audio(url)
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

  const [currentView, setCurrentView] = useState<'dashboard' | 'questions'>('dashboard')
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [selectedProblem, setSelectedProblem] = useState<ProblemDefinition>(defaultProblem)
  const [code, setCode] = useState<string>(() => getTemplateForProblem(defaultProblem, 'javascript'))
  const [coachMessage, setCoachMessage] = useState(
    `Welcome, hero! Ready to tackle ${defaultProblem.title}? Let's swing through it together!`,
  )
  const [isLoading, setIsLoading] = useState(false)
  const [, setIsSpeaking] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState('')
  const [leftPanelWidth, setLeftPanelWidth] = useState(40)
  const [codeEditorHeight, setCodeEditorHeight] = useState(60)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const messageQueueRef = useRef<string[]>([])
  const currentMessageRef = useRef<string | null>(null)
  const isPlayingRef = useRef(false)

  const cleanupCurrentAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    currentMessageRef.current = null
    isPlayingRef.current = false
    setIsSpeaking(false)
  }, [])

  const playNextMessage = useCallback(async () => {
    if (!isAuthenticated || isPlayingRef.current) {
      return
    }

    const nextMessage = messageQueueRef.current.shift()
    if (!nextMessage) {
      return
    }

    try {
      const audio = await createAudioForText(nextMessage)
      if (!isAuthenticated) {
        audio.pause()
        return
      }

      const handleComplete = () => {
        audio.removeEventListener('ended', handleComplete)
        audio.removeEventListener('error', handleComplete)
        cleanupCurrentAudio()
        playNextMessage()
      }

      audioRef.current = audio
      currentMessageRef.current = nextMessage
      isPlayingRef.current = true
      setIsSpeaking(true)

      audio.addEventListener('ended', handleComplete)
      audio.addEventListener('error', handleComplete)

      try {
        await audio.play()
      } catch (error) {
        console.error('Unable to start audio playback:', error)
        handleComplete()
      }
    } catch (error) {
      console.error('Error with TTS autoplay:', error)
      cleanupCurrentAudio()
      playNextMessage()
    }
  }, [cleanupCurrentAudio, isAuthenticated])

  useEffect(() => {
    if (!isAuthenticated) {
      messageQueueRef.current = []
      cleanupCurrentAudio()
      return
    }

    const message = coachMessage.trim()
    if (!message) {
      return
    }

    const queue = messageQueueRef.current
    const lastQueued = queue.length > 0 ? queue[queue.length - 1] : null
    const currentlyPlaying = currentMessageRef.current

    if (message !== lastQueued && message !== currentlyPlaying) {
      queue.push(message)
      playNextMessage()
    }
  }, [coachMessage, isAuthenticated, playNextMessage, cleanupCurrentAudio])

  useEffect(() => {
    const encouragingMessages = [
      'Remember, every great algorithm started with a single line of code!',
      'Your debugging skills are getting stronger with each challenge!',
      'Think like a superhero - break down complex problems into smaller ones!',
      "Data structures are your web-shooters - master them and you'll swing through any problem!",
      'Every bug you fix makes you a better programmer!',
      "Don't give up! Even Spider-Man had to learn to swing!",
      'Your code is like a web - make it strong and efficient!',
      'Time complexity matters, hero! Make your algorithms fast!',
      'Recursion is like calling for backup - use it wisely!',
      'Hash maps are your best friends for fast lookups!',
    ]

    const interval = setInterval(() => {
      const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)]
      setCoachMessage(randomMessage)
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => () => {
    messageQueueRef.current = []
    cleanupCurrentAudio()
  }, [cleanupCurrentAudio])

  const handleRunCode = async () => {
    if (!code.trim()) {
      setCoachMessage('Hey there! You need to write some code first before I can help you!')
      return
    }

    if (!isAuthenticated) {
      setCoachMessage('🕸️ You need to sign in before I can review your code, hero!')
      setShowDialog(true)
      return
    }

    setIsLoading(true)
    setTerminalOutput('Running code...\n')

    try {
      const token = await getAccessTokenSilently()
      const problemId = selectedProblem.id
      const codeResult: RunCodeResponse = await runCode(code, selectedLanguage, problemId, token)

      let outputText = ''
      codeResult.results.forEach((result) => {
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

      const analysis: CodeAnalysis = await analyzeCode(code, problemId, token)
      const coaching: CoachResponse = await getSpiderManCoaching(code, analysis, token)
      setCoachMessage(coaching.message)
    } catch (error) {
      console.error('Error running code:', error)
      setCoachMessage('Oops! Looks like my web got tangled. Try again, hero!')
      setTerminalOutput('Error: Failed to execute code. Please check your syntax and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuestionSelect = (problem: ProblemDefinition) => {
    const definition = getProblemDefinition(problem.id)
    setSelectedProblem(definition)
    setCurrentView('dashboard')
    setCode(getTemplateForProblem(definition, selectedLanguage))
    setCoachMessage(`New challenge: ${definition.title}! How will you approach it, hero?`)
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    setCode(getTemplateForProblem(selectedProblem, language))
  }

  const handleResize = (event: React.MouseEvent) => {
    const startX = event.clientX
    const startWidth = leftPanelWidth

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + ((moveEvent.clientX - startX) / window.innerWidth) * 100
      setLeftPanelWidth(Math.max(20, Math.min(80, newWidth)))
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleVerticalResize = (event: React.MouseEvent) => {
    const startY = event.clientY
    const startHeight = codeEditorHeight

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newHeight = startHeight + ((moveEvent.clientY - startY) / window.innerHeight) * 100
      setCodeEditorHeight(Math.max(30, Math.min(90, newHeight)))
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
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
        <h1 className="text-4xl font-bold">Capy Parker needs you to log in</h1>
        <p className="max-w-xl text-lg">
          Sign in with Auth0 to unlock personalized DSA feedback, track your progress, and keep your heroic efforts secure.
        </p>
        <button
          onClick={() => loginWithRedirect()}
          className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded-lg font-semibold shadow-lg shadow-red-800/40 transition"
        >
          Log in with Auth0
        </button>
        {authError && <p className="text-sm text-red-300">{authError.message}</p>}
      </div>
    )
  }

  if (currentView === 'questions') {
    return <QuestionsPage onQuestionSelect={handleQuestionSelect} onBack={() => setCurrentView('dashboard')} />
  }

  return (
    <div className="h-screen w-screen flex flex-col hex-grid relative" style={{ height: '100vh', width: '100vw' }}>
      <header
        className="absolute top-0 left-0 right-0 z-30 flex-shrink-0"
        style={{ background: 'rgba(15, 23, 42, 0.95)', height: '64px' }}
      >
        <div className="flex items-center justify-between p-4 border-b h-full" style={{ borderColor: 'var(--spider-cyan)' }}>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img
                src="/name.png"
                alt="D-CODE"
                className="h-10 object-contain"
                style={{ maxWidth: '200px', height: 'auto', display: 'block' }}
                onError={(event) => {
                  console.error('Failed to load name.png:', event)
                  event.currentTarget.style.display = 'none'
                  event.currentTarget.parentElement!.innerHTML =
                    '<span class="text-xl font-bold text-white" style="font-family: Orbitron, sans-serif;">D-CODE</span>'
                }}
              />
            </div>
            <button onClick={() => setCurrentView('questions')} className="tech-button spiderman-glitch">
              Browse Problems
            </button>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />
            {user?.name && (
              <span className="text-sm text-white/80 hidden sm:block">Welcome, {user.name.split(' ')[0]}!</span>
            )}
            <button
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              className="text-sm font-semibold text-red-300 hover:text-red-200 transition"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full" style={{ marginTop: '64px', height: 'calc(100vh - 64px)' }}>
        <div
          className="relative border-r overflow-hidden h-full"
          style={{ width: `${leftPanelWidth}%`, background: 'var(--spider-dark)', borderColor: 'var(--spider-cyan)' }}
        >
          <ProblemPanel selectedQuestion={selectedProblem} />
        </div>

        <div
          className="w-1 cursor-col-resize transition-colors duration-200 h-full"
          style={{ background: 'var(--spider-grid)', borderLeft: '1px solid var(--spider-cyan)', borderRight: '1px solid var(--spider-cyan)' }}
          onMouseDown={handleResize}
        />

        <div className="flex flex-col h-full" style={{ width: `${100 - leftPanelWidth}%`, overflow: 'hidden' }}>
          <div className="flex-shrink-0" style={{ height: `${codeEditorHeight}%` }}>
            <CodeEditor code={code} onChange={setCode} onRun={handleRunCode} isLoading={isLoading} language={selectedLanguage} />
          </div>

          <div
            className="cursor-row-resize transition-colors duration-200 flex-shrink-0"
            style={{ height: '4px', background: 'var(--spider-grid)', borderTop: '1px solid var(--spider-cyan)', borderBottom: '1px solid var(--spider-cyan)' }}
            onMouseDown={handleVerticalResize}
          />

          <div className="flex-shrink-0" style={{ height: `${100 - codeEditorHeight}%` }}>
            <TerminalOutput output={terminalOutput} />
          </div>
        </div>
      </div>

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
