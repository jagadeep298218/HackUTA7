import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Test the exact same logic as in the API
structures_text = "nested_loop, array"
complexity = "O(n²)"
code = "function twoSum(nums, target) { for(let i = 0; i < nums.length; i++) { for(let j = i + 1; j < nums.length; j++) { if(nums[i] + nums[j] === target) return [i, j]; } } }"

user_message = f"""A student wrote this code: {code[:200]}

Detected: {structures_text}
Complexity: {complexity}

Give Spider-Man coaching in 2 sentences. Start with 🕸️"""

simple_prompt = f"""You are Spider-Man giving coding advice. Be friendly and use superhero references. {user_message}"""

try:
    model = genai.GenerativeModel('gemini-2.5-flash')
    response = model.generate_content(
        simple_prompt,
        generation_config=genai.types.GenerationConfig(
            max_output_tokens=150,
            temperature=0.8,
        )
    )
    
    print("Response received!")
    
    # Handle response
    coaching_message = ""
    
    if hasattr(response, 'candidates') and response.candidates:
        candidate = response.candidates[0]
        if hasattr(candidate, 'content') and hasattr(candidate.content, 'parts'):
            coaching_message = ''.join([part.text for part in candidate.content.parts if hasattr(part, 'text')]).strip()
    
    if not coaching_message:
        coaching_message = "🕸️ Great work, hero! Keep coding and you'll master this!"
    
    print(f"Final message: {coaching_message}")
    
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
