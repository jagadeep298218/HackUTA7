import React, { useState } from 'react'

interface Question {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  description: string
  testCases: any[]
}

interface QuestionsPageProps {
  onQuestionSelect: (question: Question) => void
  onBack: () => void
}

const questions: Question[] = [
  // Easy Problems
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    testCases: []
  },
  {
    id: 'reverse-string',
    title: 'Reverse String',
    difficulty: 'Easy',
    description: 'Write a function that reverses a string. The input string is given as an array of characters.',
    testCases: []
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    testCases: []
  },
  {
    id: 'merge-sorted-arrays',
    title: 'Merge Sorted Array',
    difficulty: 'Easy',
    description: 'You are given two integer arrays nums1 and nums2, sorted in non-decreasing order. Merge nums2 into nums1.',
    testCases: []
  },
  {
    id: 'max-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Easy',
    description: 'Given an integer array nums, find the contiguous subarray which has the largest sum and return its sum.',
    testCases: []
  },
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.',
    testCases: []
  },
  {
    id: 'best-time-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. Find the maximum profit.',
    testCases: []
  },
  {
    id: 'single-number',
    title: 'Single Number',
    difficulty: 'Easy',
    description: 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.',
    testCases: []
  },
  {
    id: 'majority-element',
    title: 'Majority Element',
    difficulty: 'Easy',
    description: 'Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times.',
    testCases: []
  },
  {
    id: 'happy-number',
    title: 'Happy Number',
    difficulty: 'Easy',
    description: 'Write an algorithm to determine if a number n is happy. A happy number is defined as a number which eventually reaches 1.',
    testCases: []
  },
  // Medium Problems
  {
    id: 'add-two-numbers',
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    description: 'You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.',
    testCases: []
  },
  {
    id: 'longest-substring',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    testCases: []
  },
  {
    id: 'longest-palindromic',
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    description: 'Given a string s, return the longest palindromic substring in s.',
    testCases: []
  },
  {
    id: 'zigzag-conversion',
    title: 'Zigzag Conversion',
    difficulty: 'Medium',
    description: 'The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows.',
    testCases: []
  },
  {
    id: 'reverse-integer',
    title: 'Reverse Integer',
    difficulty: 'Medium',
    description: 'Given a signed 32-bit integer x, return x with its digits reversed.',
    testCases: []
  },
  {
    id: 'string-to-integer',
    title: 'String to Integer (atoi)',
    difficulty: 'Medium',
    description: 'Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.',
    testCases: []
  },
  {
    id: 'palindrome-number',
    title: 'Palindrome Number',
    difficulty: 'Medium',
    description: 'Given an integer x, return true if x is palindrome integer.',
    testCases: []
  },
  {
    id: 'regular-expression',
    title: 'Regular Expression Matching',
    difficulty: 'Medium',
    description: 'Given an input string s and a pattern p, implement regular expression matching.',
    testCases: []
  },
  {
    id: 'container-water',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    description: 'Given n non-negative integers representing the height of bars, find two lines that together with the x-axis forms a container.',
    testCases: []
  },
  {
    id: 'three-sum',
    title: '3Sum',
    difficulty: 'Medium',
    description: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
    testCases: []
  },
  // Hard Problems
  {
    id: 'median-two-arrays',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
    testCases: []
  },
  {
    id: 'longest-palindromic-subsequence',
    title: 'Longest Palindromic Subsequence',
    difficulty: 'Hard',
    description: 'Given a string s, find the longest palindromic subsequence\'s length in s.',
    testCases: []
  },
  {
    id: 'edit-distance',
    title: 'Edit Distance',
    difficulty: 'Hard',
    description: 'Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.',
    testCases: []
  },
  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    testCases: []
  },
  {
    id: 'first-missing-positive',
    title: 'First Missing Positive',
    difficulty: 'Hard',
    description: 'Given an unsorted integer array nums, return the smallest missing positive integer.',
    testCases: []
  },
  {
    id: 'wildcard-matching',
    title: 'Wildcard Matching',
    difficulty: 'Hard',
    description: 'Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for \'?\' and \'*\'',
    testCases: []
  },
  {
    id: 'jump-game-ii',
    title: 'Jump Game II',
    difficulty: 'Hard',
    description: 'Given an array of non-negative integers nums, you are initially positioned at the first index. Find the minimum number of jumps to reach the last index.',
    testCases: []
  },
  {
    id: 'permutation-sequence',
    title: 'Permutation Sequence',
    difficulty: 'Hard',
    description: 'The set [1, 2, 3, ..., n] contains a total of n! unique permutations. Return the kth permutation sequence.',
    testCases: []
  },
  {
    id: 'sudoku-solver',
    title: 'Sudoku Solver',
    difficulty: 'Hard',
    description: 'Write a program to solve a Sudoku puzzle by filling the empty cells. Empty cells are indicated by the character \'.\'.',
    testCases: []
  },
  {
    id: 'valid-number',
    title: 'Valid Number',
    difficulty: 'Hard',
    description: 'A valid number can be split up into these components: 1. A decimal number or an integer. 2. An optional \'e\' or \'E\', followed by an integer.',
    testCases: []
  },
  // Additional Easy Problems
  {
    id: 'roman-to-integer',
    title: 'Roman to Integer',
    difficulty: 'Easy',
    description: 'Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.',
    testCases: []
  },
  {
    id: 'longest-common-prefix',
    title: 'Longest Common Prefix',
    difficulty: 'Easy',
    description: 'Write a function to find the longest common prefix string amongst an array of strings.',
    testCases: []
  },
  {
    id: 'remove-duplicates',
    title: 'Remove Duplicates from Sorted Array',
    difficulty: 'Easy',
    description: 'Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place.',
    testCases: []
  },
  {
    id: 'remove-element',
    title: 'Remove Element',
    difficulty: 'Easy',
    description: 'Given an integer array nums and an integer val, remove all occurrences of val in-place.',
    testCases: []
  },
  {
    id: 'search-insert',
    title: 'Search Insert Position',
    difficulty: 'Easy',
    description: 'Given a sorted array of distinct integers and a target value, return the index if the target is found.',
    testCases: []
  },
  {
    id: 'length-last-word',
    title: 'Length of Last Word',
    difficulty: 'Easy',
    description: 'Given a string s consisting of words and spaces, return the length of the last word in the string.',
    testCases: []
  },
  {
    id: 'plus-one',
    title: 'Plus One',
    difficulty: 'Easy',
    description: 'You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer.',
    testCases: []
  },
  {
    id: 'add-binary',
    title: 'Add Binary',
    difficulty: 'Easy',
    description: 'Given two binary strings a and b, return their sum as a binary string.',
    testCases: []
  },
  {
    id: 'sqrt-x',
    title: 'Sqrt(x)',
    difficulty: 'Easy',
    description: 'Given a non-negative integer x, return the square root of x rounded down to the nearest integer.',
    testCases: []
  },
  {
    id: 'climbing-stairs-v2',
    title: 'Climbing Stairs (DP)',
    difficulty: 'Easy',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.',
    testCases: []
  },
  // Additional Medium Problems
  {
    id: 'letter-combinations',
    title: 'Letter Combinations of a Phone Number',
    difficulty: 'Medium',
    description: 'Given a string containing digits from 2-9 inclusive, return all possible letter combinations.',
    testCases: []
  },
  {
    id: 'remove-nth-node',
    title: 'Remove Nth Node From End of List',
    difficulty: 'Medium',
    description: 'Given the head of a linked list, remove the nth node from the end of the list and return its head.',
    testCases: []
  },
  {
    id: 'swap-nodes-pairs',
    title: 'Swap Nodes in Pairs',
    difficulty: 'Medium',
    description: 'Given a linked list, swap every two adjacent nodes and return its head.',
    testCases: []
  },
  {
    id: 'rotate-list',
    title: 'Rotate List',
    difficulty: 'Medium',
    description: 'Given the head of a linked list, rotate the list to the right by k places.',
    testCases: []
  },
  {
    id: 'unique-paths',
    title: 'Unique Paths',
    difficulty: 'Medium',
    description: 'There is a robot on an m x n grid. The robot is initially located at the top-left corner.',
    testCases: []
  },
  {
    id: 'unique-paths-ii',
    title: 'Unique Paths II',
    difficulty: 'Medium',
    description: 'You are given an m x n integer array grid. There is a robot initially located at the top-left corner.',
    testCases: []
  },
  {
    id: 'minimum-path-sum',
    title: 'Minimum Path Sum',
    difficulty: 'Medium',
    description: 'Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right.',
    testCases: []
  },
  {
    id: 'spiral-matrix',
    title: 'Spiral Matrix',
    difficulty: 'Medium',
    description: 'Given an m x n matrix, return all elements of the matrix in spiral order.',
    testCases: []
  },
  {
    id: 'jump-game',
    title: 'Jump Game',
    difficulty: 'Medium',
    description: 'You are given an integer array nums. You are initially positioned at the array\'s first index.',
    testCases: []
  },
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    description: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.',
    testCases: []
  }
]

const QuestionsPage: React.FC<QuestionsPageProps> = ({ onQuestionSelect, onBack }) => {
  const [filter, setFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredQuestions = questions.filter(q => {
    const matchesFilter = filter === 'All' || q.difficulty === filter
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20'
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20'
      case 'Hard': return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/90 backdrop-blur-sm border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors duration-200 spiderman-glitch"
          >
            Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold text-white spiderman-glitch">Coding Problems</h1>
          <div className="w-32"></div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 bg-gray-800/50">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-spiderman-red focus:outline-none spiderman-glitch"
          />
          <div className="flex space-x-2">
            {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setFilter(diff as any)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 spiderman-glitch ${
                  filter === diff
                    ? 'bg-spiderman-red text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="p-4 overflow-auto h-full pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuestions.map((question) => (
            <div
              key={question.id}
              onClick={() => onQuestionSelect(question)}
              className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg p-4 cursor-pointer hover:border-spiderman-red transition-all duration-200 spiderman-glitch group"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-white group-hover:text-spiderman-red transition-colors duration-200">
                  {question.title}
                </h3>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(question.difficulty)}`}>
                  {question.difficulty}
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {question.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuestionsPage
