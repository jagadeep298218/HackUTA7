import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Gemini client
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Spider-Man coaching system prompt
SPIDERMAN_SYSTEM_PROMPT = """You are Spider-Man (Peter Parker), acting as a witty and encouraging coding mentor for data structures and algorithms.

Your personality:
- Friendly, enthusiastic, and supportive
- Uses Spider-Man themed metaphors and references
- Asks Socratic questions to guide learning
- Never gives away the complete solution
- Focuses on helping students think through problems

Communication style:
- Start messages with 🕸️ emoji
- Use casual, friendly language
- Include Spider-Man references (webs, villains, superpowers, etc.)
- Keep responses concise (2-3 sentences max)
- Always end with a thought-provoking question

Your role:
- Analyze the student's code and provide constructive feedback
- Point out potential improvements without giving solutions
- Ask questions that guide them toward better approaches
- Encourage them when they're on the right track
- Help them understand time/space complexity implications

Example responses:
🕸️ "That nested loop looks stickier than my web! What happens if you had 10,000 villains instead of 10?"

🕸️ "Good job using a hashmap! But remember, with great power comes great responsibility - are you sure you need all that extra space?"

🕸️ "O(n²)? That's slower than the Green Goblin's escape plan! Can you think of a way to catch those villains faster?"

Always be encouraging and help them learn through guided discovery, not direct answers."""

def test_gemini():
    try:
        # Prepare the context for Spider-Man
        structures_text = "nested_loop, array"
        complexity = "O(n²)"
        code = "function twoSum(nums, target) { for(let i = 0; i < nums.length; i++) { for(let j = i + 1; j < nums.length; j++) { if(nums[i] + nums[j] === target) return [i, j]; } } }"
        
        user_message = f"""The student wrote this code for a DSA problem:

```javascript
{code}
```

I detected these data structures/algorithms: {structures_text}
Estimated complexity: {complexity}

Please provide Spider-Man's coaching feedback. Ask a Socratic question to help them improve their approach."""

        # Initialize Gemini model
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        # Create the prompt for Gemini
        full_prompt = f"{SPIDERMAN_SYSTEM_PROMPT}\n\n{user_message}"
        
        print("Sending request to Gemini...")
        response = model.generate_content(
            full_prompt,
            generation_config=genai.types.GenerationConfig(
                max_output_tokens=150,
                temperature=0.8,
            )
        )
        
        print("Response received!")
        print("Response type:", type(response))
        print("Response attributes:", [attr for attr in dir(response) if not attr.startswith('_')])
        
        # Handle Gemini response format - try different access methods
        coaching_message = ""
        
        try:
            # Try the parts accessor first (recommended by error message)
            if hasattr(response, 'parts') and response.parts:
                print("Using .parts accessor")
                coaching_message = ''.join([part.text for part in response.parts if hasattr(part, 'text')]).strip()
                print("Parts text:", coaching_message[:100])
            # Try candidates if parts doesn't work
            elif hasattr(response, 'candidates') and response.candidates:
                print("Using .candidates accessor")
                candidate = response.candidates[0]
                if hasattr(candidate, 'content') and hasattr(candidate.content, 'parts'):
                    coaching_message = ''.join([part.text for part in candidate.content.parts if hasattr(part, 'text')]).strip()
                    print("Candidates text:", coaching_message[:100])
            # Try text as last resort (but this might fail)
            elif hasattr(response, 'text'):
                print("Using .text accessor")
                coaching_message = response.text.strip()
                print("Text:", coaching_message[:100])
        except Exception as text_error:
            print(f"Error accessing response text: {text_error}")
            coaching_message = "🕸️ Great work, hero! Keep coding and you'll master this!"
        
        # Fallback if we still don't have a message
        if not coaching_message:
            coaching_message = "🕸️ Great work, hero! Keep coding and you'll master this!"
        
        print(f"\nFinal message: {coaching_message}")
        return coaching_message
        
    except Exception as e:
        print(f"Gemini API Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return "🕸️ Great work, hero! Keep coding and you'll master this!"

if __name__ == "__main__":
    test_gemini()
