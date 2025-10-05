import React from 'react'

const ProblemPanel: React.FC = () => {
  return (
    <div className="h-full p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-spiderman-red mb-2">
          🕸️ Two Sum
        </h1>
        <div className="text-sm text-gray-400 mb-4">
          Difficulty: Easy | Category: Array, Hash Table
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-spiderman-blue mb-2">
            Problem Description
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Given an array of integers <code className="bg-gray-700 px-1 rounded">nums</code> and an 
            integer <code className="bg-gray-700 px-1 rounded">target</code>, return indices of the 
            two numbers such that they add up to <code className="bg-gray-700 px-1 rounded">target</code>.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-spiderman-blue mb-2">
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
          <h3 className="text-lg font-semibold text-spiderman-blue mb-2">
            Constraints
          </h3>
          <ul className="text-gray-300 space-y-1 text-sm">
            <li>• 2 ≤ nums.length ≤ 10⁴</li>
            <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
            <li>• -10⁹ ≤ target ≤ 10⁹</li>
            <li>• Only one valid answer exists.</li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-spiderman-red/20 to-spiderman-blue/20 rounded-lg border border-spiderman-red/30">
          <p className="text-sm text-gray-300">
            <strong>💡 Spider-Man's Tip:</strong> Think about what data structure could help you 
            remember what you've seen before. Sometimes the best solution isn't the first one 
            that comes to mind!
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProblemPanel
