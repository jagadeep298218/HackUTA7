import React from 'react'

interface Question {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  description: string
  testCases: any[]
}

interface ProblemPanelProps {
  selectedQuestion?: Question | null
}

const ProblemPanel: React.FC<ProblemPanelProps> = ({ selectedQuestion }) => {
  const question = selectedQuestion || {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    testCases: []
  }
  return (
    <div className="h-full p-6 text-white overflow-y-auto flex flex-col">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {question.title}
          </h1>
          <span className="difficulty-badge">
            {question.difficulty}
          </span>
        </div>
        <div className="text-sm text-gray-400 mb-4">
          Category: Array, Hash Table
        </div>
        <hr className="angular-divider" />
      </div>

      <div className="space-y-4 flex-1">
        <div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--spider-cyan)', fontFamily: 'Orbitron, sans-serif' }}>
            Problem Description
          </h3>
          <p className="text-gray-300 leading-relaxed">
            {question.description}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--spider-cyan)', fontFamily: 'Orbitron, sans-serif' }}>
            Example
          </h3>
          <div className="bg-gray-700 p-3 rounded-lg">
            <p className="text-gray-300 mb-2"><strong>Input:</strong> nums = [2,7,11,15], target = 9</p>
            <p className="text-gray-300 mb-2"><strong>Output:</strong> [0,1]</p>
            <p className="text-gray-300 text-sm">
              <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--spider-cyan)', fontFamily: 'Orbitron, sans-serif' }}>
            Constraints
          </h3>
          <ul className="text-gray-300 space-y-1 text-sm">
            <li>• 2 ≤ nums.length ≤ 10⁴</li>
            <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
            <li>• -10⁹ ≤ target ≤ 10⁹</li>
            <li>• Only one valid answer exists.</li>
          </ul>
        </div>

        <div className="mt-6 holographic-box p-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Spider-Man's Tip
              </h4>
              <p className="text-sm text-gray-300">
                Think about what data structure could help you remember what you've seen before. 
                Sometimes the best solution isn't the first one that comes to mind!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProblemPanel
