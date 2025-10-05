import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

print("API Key loaded:", bool(os.getenv("GEMINI_API_KEY")))
print("API Key starts with:", os.getenv("GEMINI_API_KEY", "")[:10] + "...")

try:
    # Initialize Gemini client
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    
    # Test with the exact same code from main.py
    structures_text = "nested_loop, array"
    complexity = "O(n²)"
    code = "function twoSum(nums, target) { for(let i = 0; i < nums.length; i++) { for(let j = i + 1; j < nums.length; j++) { if(nums[i] + nums[j] === target) return [i, j]; } } }"
    
    user_message = f"""A student wrote this code: {code[:200]}

Detected: {structures_text}
Complexity: {complexity}

Give Spider-Man coaching in 2 sentences. Start with 🕸️"""

    simple_prompt = f"""You are Spider-Man giving coding advice. Be friendly and use superhero references. {user_message}"""
    
    print("About to call Gemini API...")
    print(f"Prompt: {simple_prompt[:100]}...")
    
    # Initialize Gemini model
    model = genai.GenerativeModel('gemini-2.5-flash')
    
    response = model.generate_content(
        simple_prompt,
        generation_config=genai.types.GenerationConfig(
            max_output_tokens=150,
            temperature=0.8,
        )
    )
    
    print("Response received!")
    
    # Handle Gemini response format - try different access methods
    coaching_message = ""
    
    try:
        # Try candidates first (this is working)
        if hasattr(response, 'candidates') and response.candidates:
            candidate = response.candidates[0]
            if hasattr(candidate, 'content') and hasattr(candidate.content, 'parts'):
                coaching_message = ''.join([part.text for part in candidate.content.parts if hasattr(part, 'text')]).strip()
                print("Successfully extracted text from candidates")
        # Try the parts accessor as backup
        elif hasattr(response, 'parts') and response.parts:
            coaching_message = ''.join([part.text for part in response.parts if hasattr(part, 'text')]).strip()
            print("Successfully extracted text from parts")
        # Try text as last resort
        elif hasattr(response, 'text'):
            coaching_message = response.text.strip()
            print("Successfully extracted text from text attribute")
    except Exception as text_error:
        print(f"Error accessing response text: {text_error}")
        coaching_message = "🕸️ Great work, hero! Keep coding and you'll master this!"
    
    # Fallback if we still don't have a message
    if not coaching_message:
        coaching_message = "🕸️ Great work, hero! Keep coding and you'll master this!"
        print("Using fallback message")
    
    print(f"Final message: {coaching_message}")
    
except Exception as e:
    print(f"Gemini API Error: {str(e)}")
    import traceback
    traceback.print_exc()
