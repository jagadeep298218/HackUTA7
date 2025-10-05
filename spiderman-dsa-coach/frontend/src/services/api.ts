import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const withAuthHeader = (token?: string) =>
  token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : undefined

export interface CodeAnalysis {
  complexity_hint: string
  structures: string[]
}

export interface CoachResponse {
  message: string
}

export const analyzeCode = async (
  code: string,
  problemId: string,
  token?: string,
): Promise<CodeAnalysis> => {
  try {
    const response = await api.post(
      '/analyze',
      {
        code,
        problem_id: problemId,
      },
      withAuthHeader(token),
    )
    return response.data
  } catch (error) {
    console.error('Error analyzing code:', error)
    throw error
  }
}

export const getSpiderManCoaching = async (
  code: string,
  analysis: CodeAnalysis,
  token?: string,
): Promise<CoachResponse> => {
  try {
    const response = await api.post(
      '/coach',
      {
        code,
        analysis,
      },
      withAuthHeader(token),
    )
    return response.data
  } catch (error) {
    console.error('Error getting coaching:', error)
    throw error
  }
}
