import requests
import json

# Test the coach endpoint directly
url = "http://127.0.0.1:3000/coach"
data = {
    "code": "function twoSum(nums, target) { for(let i = 0; i < nums.length; i++) { for(let j = i + 1; j < nums.length; j++) { if(nums[i] + nums[j] === target) return [i, j]; } } }",
    "analysis": {
        "complexity_hint": "O(n²)",
        "structures": ["nested_loop", "array"]
    }
}

try:
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
