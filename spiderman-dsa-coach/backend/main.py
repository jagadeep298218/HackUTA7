from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import re
import ast
from typing import List, Dict, Any
from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv()

app = FastAPI(title="Spider-Man DSA Coach API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Allow both Vite and Node ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Pydantic models
class AnalyzeRequest(BaseModel):
    code: str
    problem_id: str

class AnalyzeResponse(BaseModel):
    complexity_hint: str
    structures: List[str]

class CoachRequest(BaseModel):
    code: str
    analysis: Dict[str, Any]

class CoachResponse(BaseModel):
    message: str

# Code analysis functions
def detect_data_structures(code: str) -> List[str]:
    """Detect data structures and algorithms used in the code"""
    structures = []
    
    # Convert to lowercase for case-insensitive matching
    code_lower = code.lower()
    
    # Data structures
    if re.search(r'\barray\b|\b\[\]|\bpush\b|\bpop\b|\bshift\b|\bunshift\b', code_lower):
        structures.append("array")
    
    if re.search(r'\bmap\b|\bobject\b|\bdict\b|\bhash\b|\b{}\b', code_lower):
        structures.append("hashmap")
    
    if re.search(r'\bstack\b|\bpush\b.*\bpop\b', code_lower):
        structures.append("stack")
    
    if re.search(r'\bqueue\b|\benqueue\b|\bdequeue\b', code_lower):
        structures.append("queue")
    
    if re.search(r'\btree\b|\bnode\b.*\bleft\b.*\bright\b', code_lower):
        structures.append("tree")
    
    if re.search(r'\bgraph\b|\badjacency\b', code_lower):
        structures.append("graph")
    
    # Algorithms
    if re.search(r'\brecursion\b|\brecursive\b', code_lower):
        structures.append("recursion")
    
    # Loops
    if re.search(r'\bfor\s*\(.*\)|\bwhile\s*\(.*\)', code_lower):
        structures.append("loop")
    
    # Nested loops
    nested_loop_pattern = r'for\s*\([^)]*\)\s*{[^}]*for\s*\([^)]*\)'
    if re.search(nested_loop_pattern, code_lower, re.DOTALL):
        structures.append("nested_loop")
    
    # Sorting
    if re.search(r'\bsort\b|\bquicksort\b|\bmergesort\b|\bheapsort\b', code_lower):
        structures.append("sorting")
    
    return structures

def estimate_complexity(code: str, structures: List[str]) -> str:
    """Estimate time complexity based on detected structures"""
    if "nested_loop" in structures:
        return "O(n²)"
    elif "loop" in structures and "hashmap" in structures:
        return "O(n)"
    elif "loop" in structures:
        return "O(n)"
    elif "recursion" in structures:
        return "O(n) to O(2ⁿ)"
    elif "sorting" in structures:
        return "O(n log n)"
    else:
        return "O(1)"

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

@app.get("/")
async def root():
    return {"message": "🕸️ Spider-Man DSA Coach API is running! With great power comes great responsibility!"}

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_code(request: AnalyzeRequest):
    """Analyze code to detect data structures and estimate complexity"""
    try:
        structures = detect_data_structures(request.code)
        complexity = estimate_complexity(request.code, structures)
        
        return AnalyzeResponse(
            complexity_hint=complexity,
            structures=structures
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing code: {str(e)}")

@app.post("/coach", response_model=CoachResponse)
async def get_spiderman_coaching(request: CoachRequest):
    """Get Spider-Man's coaching feedback based on code analysis"""
    try:
        # Prepare the context for Spider-Man
        structures_text = ", ".join(request.analysis.get("structures", [])) if request.analysis.get("structures") else "basic programming constructs"
        complexity = request.analysis.get("complexity_hint", "unknown")
        
        user_message = f"""A student wrote this code: {request.code[:200]}

Detected: {structures_text}
Complexity: {complexity}

Give Spider-Man coaching in 2 sentences. Start with 🕸️"""

        print("About to call Gemini API...")  # Debug logging
        
        # Create a simpler prompt for Gemini
        simple_prompt = f"""You are Spider-Man giving coding advice. Be friendly and use superhero references. {user_message}"""
        
        print(f"Prompt: {simple_prompt[:100]}...")  # Debug logging
        
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=simple_prompt
        )
        
        # Handle Gemini response format - use the new API
        coaching_message = ""
        
        try:
            # With the new google-genai SDK, we can directly access response.text
            coaching_message = response.text.strip()
            print(f"Extracted text length: {len(coaching_message)}")  # Debug
        except Exception as text_error:
            print(f"Error accessing response text: {text_error}")
            coaching_message = "🕸️ Great work, hero! Keep coding and you'll master this!"
        
        # Fallback if we still don't have a message
        if not coaching_message:
            coaching_message = "🕸️ Great work, hero! Keep coding and you'll master this!"
        
        return CoachResponse(message=coaching_message)
        
    except Exception as e:
        print(f"Gemini API Error: {str(e)}")  # Debug logging
        import traceback
        traceback.print_exc()
        
        # Fallback responses based on code analysis
        structures = request.analysis.get("structures", [])
        complexity = request.analysis.get("complexity_hint", "unknown")
        
        # Generate Spider-Man responses based on detected patterns
        if "nested_loop" in structures:
            fallback_message = "🕸️ That nested loop looks stickier than my web! What happens if you had 10,000 villains instead of 10? Can you think of a faster way to catch them?"
        elif "loop" in structures and "hashmap" in structures:
            fallback_message = "🕸️ Great use of a hashmap, hero! But remember, with great power comes great responsibility - are you sure you need all that extra space?"
        elif "loop" in structures:
            fallback_message = "🕸️ Nice loop work! But what if your array was as big as New York City? How would you make it more efficient?"
        elif "recursion" in structures:
            fallback_message = "🕸️ Recursion, huh? That's like calling yourself for backup! But what if you're dealing with a really deep problem? Any ideas to prevent stack overflow?"
        elif complexity == "O(n²)":
            fallback_message = "🕸️ O(n²)? That's slower than the Green Goblin's escape plan! Can you think of a way to catch those villains faster?"
        elif "array" in structures:
            fallback_message = "🕸️ Good start with arrays, hero! But what if you needed to find something quickly? What data structure would be better for that?"
        else:
            fallback_message = "🕸️ Keep coding, hero! Every great superhero started somewhere. What's your next move to solve this problem?"
        
        return CoachResponse(message=fallback_message)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
