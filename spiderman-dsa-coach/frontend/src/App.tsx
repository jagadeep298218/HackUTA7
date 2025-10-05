import React, { useState } from 'react'
import ProblemPanel from './components/ProblemPanel'
import CodeEditor from './components/CodeEditor'
import DraggableSpiderMan from './components/DraggableSpiderMan'
import { analyzeCode, getSpiderManCoaching, textToSpeech } from './services/api'

interface CodeAnalysis {
  complexity_hint: string
  structures: string[]
}

interface CoachResponse {
  message: string
}

// Cache for audio URLs
const audioCache: { [key: string]: string } = {};

async function speak(text: string, setIsSpeaking: (speaking: boolean) => void) {
  try {
    setIsSpeaking(true);
    
    // Check cache first
    if (audioCache[text]) {
      console.log('Using cached audio');
      const audio = new Audio(audioCache[text]);
      audio.onended = () => setIsSpeaking(false);
      await audio.play();
      return;
    }

    console.log('Starting TTS request with text:', text);
    const audioBuffer = await textToSpeech(text);
    console.log('Received audio buffer of size:', audioBuffer.byteLength);
    const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    
    // Cache the audio URL
    audioCache[text] = url;
    
    const audio = new Audio(url);
    audio.onerror = (e) => {
      console.error('Audio error:', e);
      setIsSpeaking(false);
    };
    audio.onplay = () => console.log('Audio started playing');
    audio.onended = () => {
      console.log('Audio finished playing');
      setIsSpeaking(false);
    };
    await audio.play();
  } catch (error) {
    console.error('Error with TTS:', error);
    setIsSpeaking(false);
  }
}


function App() {
  const [code, setCode] = useState(`// Write your solution here
function twoSum(nums, target) {
    // Your code goes here
}`)
  
  const [coachMessage, setCoachMessage] = useState('🕸️ Welcome, hero! Ready to tackle some data structures and algorithms? Let\'s start with the Two Sum problem!')
  const [isLoading, setIsLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
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
      <button
        onClick={() => speak(coachMessage, setIsSpeaking)}
        disabled={isSpeaking}
        className={`absolute right-8 bottom-8 ${isSpeaking ? 'bg-gray-500' : 'bg-blue-600 hover:bg-red-600'} text-white font-bold py-2 px-4 rounded flex items-center gap-2`}
      >
        {isSpeaking ? (
          <>
            <span className="animate-pulse">🔊</span> Speaking...
          </>
        ) : (
          <>🎙️ Hear Spidey Speak</>
        )}
      </button>

    </div>
  )
}

export default App
