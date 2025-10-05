import axios from 'axios'

const PYTHON_API_URL = 'http://localhost:8000'
const TTS_API_URL = 'http://localhost:3000'

// Create separate axios instances for each API
const pythonApi = axios.create({
  baseURL: PYTHON_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const ttsApi = axios.create({
  baseURL: TTS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CodeAnalysis {
  complexity_hint: string
  structures: string[]
}

export interface CoachResponse {
  message: string
}

export const analyzeCode = async (code: string, problemId: string): Promise<CodeAnalysis> => {
  try {
    const response = await pythonApi.post('/analyze', {
      code,
      problem_id: problemId,
    })
    return response.data
  } catch (error) {
    console.error('Error analyzing code:', error)
    throw error
  }
}

export const getSpiderManCoaching = async (code: string, analysis: CodeAnalysis): Promise<CoachResponse> => {
  try {
    const response = await pythonApi.post('/coach', {
      code,
      analysis,
    })
    return response.data
  } catch (error) {
    console.error('Error getting coaching:', error)
    throw error
  }
}

export const textToSpeech = async (text: string): Promise<ArrayBuffer> => {
  try {
    const response = await ttsApi.post('/api/tts', { text }, { 
      responseType: 'arraybuffer'
    })
    return response.data
  } catch (error) {
    console.error('Error with text-to-speech:', error)
    throw error
  }
}
