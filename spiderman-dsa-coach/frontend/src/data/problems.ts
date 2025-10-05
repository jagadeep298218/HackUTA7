export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export interface TestCaseDefinition {
  input: string
  expected: string
  description: string
}

export interface ProblemDefinition {
  id: string
  title: string
  difficulty: Difficulty
  categories: string[]
  description: string
  example: {
    input: string
    output: string
    explanation: string
  }
  constraints: string[]
  tip: string
  functionTemplates: Record<string, string>
  testCases: TestCaseDefinition[]
  available: boolean
}

const placeholderTemplate = (functionName: string, params: string) => `function ${functionName}(${params}) {
  // TODO: implement solution
}
`

const easyProblems: ProblemDefinition[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    categories: ['Array', 'Hash Table'],
    description:
      'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. Each input will have exactly one solution, and you may not use the same element twice.',
    example: {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
    },
    constraints: [
      '2 ≤ nums.length ≤ 10⁴',
      '-10⁹ ≤ nums[i] ≤ 10⁹',
      '-10⁹ ≤ target ≤ 10⁹',
      'Exactly one solution exists.'
    ],
    tip: 'Hash maps are a superhero move for tracking complements in constant time. Can you map values to their indices as you swing through the array?',
    functionTemplates: {
      javascript: `function twoSum(nums, target) {
  // TODO: implement the two sum solution
  return []
}
`
    },
    testCases: [
      { input: '[2,7,11,15], 9', expected: '[0,1]', description: 'basic pair' },
      { input: '[3,2,4], 6', expected: '[1,2]', description: 'pair later in array' }
    ],
    available: true
  },
  {
    id: 'reverse-string',
    title: 'Reverse String',
    difficulty: 'Easy',
    categories: ['Array', 'Two Pointers'],
    description: 'Write a function that reverses a string and returns the reversed string.',
    example: {
      input: 's = "hello"',
      output: '"olleh"',
      explanation: 'Reverse the character order to produce "olleh".'
    },
    constraints: ['1 ≤ s.length ≤ 10⁵', 's consists of printable ASCII characters.'],
    tip: "Two-pointer techniques let you flip characters in place without extra space. Can you swap characters from both ends toward the center?",
    functionTemplates: {
      javascript: `function reverseString(s) {
  // TODO: reverse the input string and return it
  return s
}
`
    },
    testCases: [
      { input: '"hello"', expected: '"olleh"', description: 'basic word' },
      { input: '"world"', expected: '"dlrow"', description: 'another word' }
    ],
    available: true
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    categories: ['Stack', 'String'],
    description: 'Given a string s containing the characters (){}[], return true if the string is valid (all brackets closed in the correct order).',
    example: {
      input: 's = "()[]{}"',
      output: 'true',
      explanation: 'All brackets close in the correct order.'
    },
    constraints: ['1 ≤ s.length ≤ 10⁴', 's consists only of parentheses characters (){}[]'],
    tip: 'Stacks shine when you need to match opening and closing pairs. What happens if you push openings and pop when you meet their partners?',
    functionTemplates: {
      javascript: `function validParentheses(s) {
  // TODO: return true if the parentheses are balanced, otherwise false
  return true
}
`
    },
    testCases: [
      { input: '"()[]{}"', expected: 'true', description: 'balanced brackets' },
      { input: '"(]"', expected: 'false', description: 'mismatched pair' }
    ],
    available: true
  },
  {
    id: 'merge-sorted-arrays',
    title: 'Merge Sorted Array',
    difficulty: 'Easy',
    categories: ['Array', 'Two Pointers'],
    description: 'Given two sorted integer arrays nums1 and nums2, return a new sorted array containing all the elements of both arrays.',
    example: {
      input: 'nums1 = [1,2,3], nums2 = [2,5,6]',
      output: '[1,2,2,3,5,6]',
      explanation: 'Merge both sorted arrays to create a single sorted result.'
    },
    constraints: ['0 ≤ nums1.length, nums2.length ≤ 10⁵', 'Arrays are sorted in non-decreasing order.'],
    tip: 'When two webs meet, weave them together with two pointers. Advance whichever pointer has the smaller value.',
    functionTemplates: {
      javascript: `function mergeSortedArrays(nums1, nums2) {
  // TODO: merge both sorted arrays and return the result
  return []
}
`
    },
    testCases: [
      { input: '[1,2,3], [2,5,6]', expected: '[1,2,2,3,5,6]', description: 'merge typical arrays' },
      { input: '[], [1]', expected: '[1]', description: 'empty first array' }
    ],
    available: true
  },
  {
    id: 'max-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Easy',
    categories: ['Array', 'Dynamic Programming'],
    description: 'Given an integer array nums, find the contiguous subarray with the largest sum and return the sum.',
    example: {
      input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
      output: '6',
      explanation: 'The subarray [4,-1,2,1] has the largest sum 6.'
    },
    constraints: ['1 ≤ nums.length ≤ 10⁵', '-10⁴ ≤ nums[i] ≤ 10⁴'],
    tip: 'Kadane’s algorithm lets you accumulate runs of positive energy. Can you track the best sum while swinging through the array?',
    functionTemplates: {
      javascript: `function maxSubarray(nums) {
  // TODO: compute the maximum subarray sum
  return 0
}
`
    },
    testCases: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', expected: '6', description: 'classic example' },
      { input: '[1]', expected: '1', description: 'single element' }
    ],
    available: true
  },
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    categories: ['Dynamic Programming'],
    description: 'It takes n steps to reach the top of a staircase. Each time you can climb either 1 or 2 steps. Return the number of distinct ways to reach the top.',
    example: {
      input: 'n = 3',
      output: '3',
      explanation: 'You can climb 1+1+1, 1+2, or 2+1 steps.'
    },
    constraints: ['1 ≤ n ≤ 45'],
    tip: 'This is just Fibonacci wearing a mask! Can you build the solution bottom up using the previous two results?',
    functionTemplates: {
      javascript: `function climbingStairs(n) {
  // TODO: return the number of distinct ways to reach the top
  return 0
}
`
    },
    testCases: [
      { input: '3', expected: '3', description: 'three steps' },
      { input: '5', expected: '8', description: 'five steps' }
    ],
    available: true
  },
  {
    id: 'best-time-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    categories: ['Array', 'Greedy'],
    description: 'Given an array prices where prices[i] is the price of a stock on day i, return the maximum profit you can achieve from a single buy and sell. If no profit is possible, return 0.',
    example: {
      input: 'prices = [7,1,5,3,6,4]',
      output: '5',
      explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 5.'
    },
    constraints: ['1 ≤ prices.length ≤ 10⁵', '0 ≤ prices[i] ≤ 10⁴'],
    tip: 'Track the lowest price so far and your best profit like a hero watching for the right moment to strike.',
    functionTemplates: {
      javascript: `function bestTimeStock(prices) {
  // TODO: compute the maximum profit achievable from one transaction
  return 0
}
`
    },
    testCases: [
      { input: '[7,1,5,3,6,4]', expected: '5', description: 'profit case' },
      { input: '[7,6,4,3,1]', expected: '0', description: 'no profit available' }
    ],
    available: true
  },
  {
    id: 'single-number',
    title: 'Single Number',
    difficulty: 'Easy',
    categories: ['Array', 'Bit Manipulation'],
    description: 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one and return it.',
    example: {
      input: 'nums = [4,1,2,1,2]',
      output: '4',
      explanation: '4 appears once while the others appear twice.'
    },
    constraints: ['1 ≤ nums.length ≤ 3 * 10⁴', '-3 * 10⁴ ≤ nums[i] ≤ 3 * 10⁴'],
    tip: 'XOR is like flipping switches: pairs cancel out. Can you use it to isolate the lonely value?',
    functionTemplates: {
      javascript: `function singleNumber(nums) {
  // TODO: return the element that appears only once
  return 0
}
`
    },
    testCases: [
      { input: '[4,1,2,1,2]', expected: '4', description: 'standard case' },
      { input: '[2,2,1]', expected: '1', description: 'single at end' }
    ],
    available: true
  },
  {
    id: 'majority-element',
    title: 'Majority Element',
    difficulty: 'Easy',
    categories: ['Array', 'Divide and Conquer'],
    description: 'Given an array nums of size n, return the majority element (appearing more than ⌊n / 2⌋ times).',
    example: {
      input: 'nums = [3,2,3]',
      output: '3',
      explanation: '3 appears twice in a length-3 array.'
    },
    constraints: ['1 ≤ nums.length ≤ 5 * 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹', 'The majority element always exists.'],
    tip: 'Think of the Boyer-Moore voting algorithm as winning elections with a sidekick. Can you track a candidate and its count?',
    functionTemplates: {
      javascript: `function majorityElement(nums) {
  // TODO: return the element that appears more than n / 2 times
  return 0
}
`
    },
    testCases: [
      { input: '[3,2,3]', expected: '3', description: 'small array' },
      { input: '[2,2,1,1,1,2,2]', expected: '2', description: 'mixed values' }
    ],
    available: true
  },
  {
    id: 'happy-number',
    title: 'Happy Number',
    difficulty: 'Easy',
    categories: ['Hash Table', 'Two Pointers'],
    description: 'Write an algorithm to determine if a number n is a happy number. Replace the number by the sum of the squares of its digits repeatedly until it equals 1, or it loops endlessly.',
    example: {
      input: 'n = 19',
      output: 'true',
      explanation: '1² + 9² = 82 → 8² + 2² = 68 → 6² + 8² = 100 → 1² + 0² + 0² = 1.'
    },
    constraints: ['1 ≤ n ≤ 2³¹ - 1'],
    tip: 'Detect cycles like a superhero chasing a villain through the city. Can you use a set or Floyd’s algorithm to spot loops?',
    functionTemplates: {
      javascript: `function happyNumber(n) {
  // TODO: return true if the number is happy
  return false
}
`
    },
    testCases: [
      { input: '19', expected: 'true', description: 'happy number' },
      { input: '2', expected: 'false', description: 'loops endlessly' }
    ],
    available: true
  }
]

const mediumProblems: ProblemDefinition[] = [
  {
    id: 'add-two-numbers',
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    categories: ['Linked List'],
    description: 'Add two numbers represented by linked lists.',
    example: {
      input: 'l1 = [2,4,3], l2 = [5,6,4]',
      output: '[7,0,8]',
      explanation: '342 + 465 = 807.'
    },
    constraints: [],
    tip: 'Coming soon.',
    functionTemplates: {
      javascript: placeholderTemplate('addTwoNumbers', 'l1, l2')
    },
    testCases: [],
    available: false
  },
  {
    id: 'longest-substring',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    categories: ['Sliding Window', 'String'],
    description: 'Find the length of the longest substring without repeating characters.',
    example: {
      input: 's = "abcabcbb"',
      output: '3',
      explanation: 'The answer is "abc", with the length of 3.'
    },
    constraints: [],
    tip: 'Coming soon.',
    functionTemplates: {
      javascript: placeholderTemplate('lengthOfLongestSubstring', 's')
    },
    testCases: [],
    available: false
  },
  {
    id: 'three-sum',
    title: '3Sum',
    difficulty: 'Medium',
    categories: ['Array', 'Two Pointers'],
    description: 'Return all triplets that sum to zero.',
    example: {
      input: 'nums = [-1,0,1,2,-1,-4]',
      output: '[[-1,-1,2],[-1,0,1]]',
      explanation: 'Unique triplets add to zero.'
    },
    constraints: [],
    tip: 'Coming soon.',
    functionTemplates: {
      javascript: placeholderTemplate('threeSum', 'nums')
    },
    testCases: [],
    available: false
  }
]

const hardProblems: ProblemDefinition[] = [
  {
    id: 'median-two-arrays',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    categories: ['Array', 'Binary Search'],
    description: 'Find the median of two sorted arrays.',
    example: {
      input: 'nums1 = [1,3], nums2 = [2]',
      output: '2.0',
      explanation: 'The merged array is [1,2,3], median is 2.'
    },
    constraints: [],
    tip: 'Coming soon.',
    functionTemplates: {
      javascript: placeholderTemplate('findMedianSortedArrays', 'nums1, nums2')
    },
    testCases: [],
    available: false
  }
]

const allProblems = [...easyProblems, ...mediumProblems, ...hardProblems]

export const problemDefinitions: Record<string, ProblemDefinition> = allProblems.reduce((acc, problem) => {
  acc[problem.id] = problem
  return acc
}, {} as Record<string, ProblemDefinition>)

export const problemsByDifficulty: Record<Difficulty, ProblemDefinition[]> = {
  Easy: easyProblems,
  Medium: mediumProblems,
  Hard: hardProblems
}

export const defaultProblemId = 'two-sum'
export const defaultProblem = problemDefinitions[defaultProblemId]

export function getProblemDefinition(id: string | undefined | null): ProblemDefinition {
  if (!id) {
    return defaultProblem
  }
  return problemDefinitions[id] ?? defaultProblem
}

export function getTemplateForProblem(problem: ProblemDefinition, language: string): string {
  return problem.functionTemplates[language] ?? placeholderTemplate(problem.id.replace(/[-\s]/g, ''), '// parameters')
}

export function isProblemAvailable(problemId: string): boolean {
  return getProblemDefinition(problemId).available
}
