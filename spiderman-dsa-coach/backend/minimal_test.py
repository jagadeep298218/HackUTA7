import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

print("Testing minimal Gemini call...")

try:
    # Initialize Gemini client
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    model = genai.GenerativeModel('gemini-2.5-flash')
    
    # Very simple prompt
    response = model.generate_content("Say hello as Spider-Man")
    
    print("Response received!")
    
    # Simple text extraction
    if hasattr(response, 'candidates') and response.candidates:
        candidate = response.candidates[0]
        if hasattr(candidate, 'content') and hasattr(candidate.content, 'parts'):
            part = candidate.content.parts[0]
            if hasattr(part, 'text'):
                print(f"Text: {part.text}")
            else:
                print("Part has no text attribute")
        else:
            print("Candidate has no content parts")
    else:
        print("No candidates in response")
        
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
