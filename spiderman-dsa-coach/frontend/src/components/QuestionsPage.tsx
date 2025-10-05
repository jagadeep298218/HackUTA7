import React, { useMemo, useState } from 'react'
import {
  problemsByDifficulty,
  type Difficulty,
  type ProblemDefinition,
} from '../data/problems'

interface QuestionsPageProps {
  onQuestionSelect: (question: ProblemDefinition) => void
  onBack: () => void
}

type Filter = 'All' | Difficulty

const difficultyOrder: Difficulty[] = ['Easy', 'Medium', 'Hard']

const allProblems: ProblemDefinition[] = difficultyOrder.flatMap(
  (difficulty) => problemsByDifficulty[difficulty] ?? [],
)

const difficultyBadgeColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'text-green-300 bg-green-500/15'
    case 'Medium':
      return 'text-yellow-300 bg-yellow-500/15'
    case 'Hard':
      return 'text-red-300 bg-red-500/15'
    default:
      return 'text-gray-300 bg-gray-500/15'
  }
}

const QuestionsPage: React.FC<QuestionsPageProps> = ({ onQuestionSelect, onBack }) => {
  const [filter, setFilter] = useState<Filter>('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProblems = useMemo(() => {
    return allProblems.filter((problem) => {
      const matchesFilter = filter === 'All' || problem.difficulty === filter
      const query = searchTerm.trim().toLowerCase()
      const matchesSearch =
        query.length === 0 ||
        problem.title.toLowerCase().includes(query) ||
        problem.description.toLowerCase().includes(query)
      return matchesFilter && matchesSearch
    })
  }, [filter, searchTerm])

  const difficultyCounts = useMemo(() => {
    const counts: Record<Filter, number> = {
      All: allProblems.length,
      Easy: problemsByDifficulty.Easy?.length ?? 0,
      Medium: problemsByDifficulty.Medium?.length ?? 0,
      Hard: problemsByDifficulty.Hard?.length ?? 0,
    }
    return counts
  }, [])

  const handleSelect = (problem: ProblemDefinition) => {
    if (!problem.available) {
      return
    }
    onQuestionSelect(problem)
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-lg font-semibold bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200 spiderman-glitch"
          >
            Back to Dashboard
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-white spiderman-glitch">
            Coding Problems Library
          </h1>
          <div className="w-36" />
        </div>
      </header>

      {/* Filters */}
      <div className="p-4 bg-gray-900/60 backdrop-blur-sm border-b border-gray-800">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search for a problem..."
            className="w-full lg:max-w-sm px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-spiderman-red focus:outline-none transition-colors duration-200 spiderman-glitch"
          />
          <div className="flex flex-wrap items-center gap-2">
            {(['All', ...difficultyOrder] as Filter[]).map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 spiderman-glitch ${
                  filter === item
                    ? 'bg-spiderman-red text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {item}
                <span className="ml-2 text-xs bg-black/30 px-2 py-0.5 rounded-full text-gray-200">
                  {difficultyCounts[item] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Problem grid */}
      <div className="h-full overflow-auto p-6">
        {filteredProblems.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-300 text-lg">
              No problems found. Try adjusting your filters or search query.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredProblems.map((problem) => (
              <article
                key={problem.id}
                className={`relative rounded-2xl border border-gray-800 bg-gray-900/70 backdrop-blur-sm p-5 shadow-lg transition-all duration-200 spiderman-glitch ${
                  problem.available ? 'hover:border-spiderman-red hover:-translate-y-1 cursor-pointer' : 'opacity-70 cursor-not-allowed'
                }`}
                onClick={() => handleSelect(problem)}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2 className="text-xl font-bold text-white leading-snug">
                    {problem.title}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${difficultyBadgeColor(problem.difficulty)}`}
                  >
                    {problem.difficulty}
                  </span>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {problem.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex flex-wrap gap-2">
                    {problem.categories.slice(0, 3).map((category) => (
                      <span
                        key={category}
                        className="px-2 py-1 bg-gray-800 rounded-full border border-gray-700"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  {!problem.available && (
                    <span className="px-2 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                      Coming soon
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionsPage
