import React from 'react'
import { defaultProblem, getProblemDefinition, type ProblemDefinition } from '../data/problems'

interface ProblemPanelProps {
  selectedQuestion?: ProblemDefinition | null
}

const ProblemPanel: React.FC<ProblemPanelProps> = ({ selectedQuestion }) => {
  const problem = selectedQuestion ? getProblemDefinition(selectedQuestion.id) : defaultProblem

  return (
    <div className="h-full p-6 text-white overflow-y-auto flex flex-col">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1
              className="text-3xl font-bold text-white"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              {problem.title}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {problem.categories.join(' • ')}
            </p>
          </div>
          <span className={`difficulty-badge`}>{problem.difficulty}</span>
        </div>
        <hr className="angular-divider" />
      </div>

      <div className="space-y-5 flex-1">
        <section>
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: 'var(--spider-cyan)', fontFamily: 'Orbitron, sans-serif' }}
          >
            Problem Description
          </h3>
          <p className="text-gray-300 leading-relaxed">{problem.description}</p>
        </section>

        <section>
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: 'var(--spider-cyan)', fontFamily: 'Orbitron, sans-serif' }}
          >
            Example
          </h3>
          <div className="bg-gray-700/60 p-4 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-2">
              <strong>Input:</strong> {problem.example.input}
            </p>
            <p className="text-gray-300 mb-2">
              <strong>Output:</strong> {problem.example.output}
            </p>
            <p className="text-gray-300 text-sm">
              <strong>Explanation:</strong> {problem.example.explanation}
            </p>
          </div>
        </section>

        <section>
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: 'var(--spider-cyan)', fontFamily: 'Orbitron, sans-serif' }}
          >
            Constraints
          </h3>
          <ul className="text-gray-300 space-y-1 text-sm">
            {problem.constraints.map((line) => (
              <li key={line}>• {line}</li>
            ))}
          </ul>
        </section>

        <section className="mt-6 holographic-box p-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <div>
              <h4
                className="text-sm font-semibold text-white mb-1"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                Spider-Man's Tip
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed">{problem.tip}</p>
            </div>
          </div>
        </section>

        <section>
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: 'var(--spider-cyan)', fontFamily: 'Orbitron, sans-serif' }}
          >
            Sample Test Cases
          </h3>
          <div className="space-y-3">
            {problem.testCases.map((testCase, index) => (
              <div
                key={`${problem.id}-test-${index}`}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"
              >
                <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                  Example {index + 1} · {testCase.description}
                </p>
                <p className="text-gray-300 text-sm">
                  <span className="font-semibold">Input:</span> {testCase.input}
                </p>
                <p className="text-gray-300 text-sm">
                  <span className="font-semibold">Expected:</span> {testCase.expected}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProblemPanel
