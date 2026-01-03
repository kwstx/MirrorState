"""
Model Service (Microservice)
----------------------------
Dedicated Text Generation Service.
Responsibility: Structured Input -> Safe Output.
No application logic, no user sessions, no feedback storage.
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any, Union
import os

from wrapper import PromptWrapper
from safety_filter import SafetyFilter
import version_config

from api_contract import GenerationRequest, GenerationResponse
import version_config

app = FastAPI(title="MirrorState Model Service")

# --- Model Initialization ---

class ModelEngine:
    def __init__(self):
        self.backend = "mock" # Forced Mock Mode
        self.llm = None
        print("Model Engine: Using Pre-generated Phrases (LLM Paused).")
        
        # Llama.cpp loading disabled by user request
        # try:
        #     from llama_cpp import Llama
        #     model_path = "exported_models/gluon_model/qwen2-0_5b-instruct-q4_k_m.gguf"
        #     if os.path.exists(model_path):
        #         print(f"Loading GGUF Model from {model_path}...")
        #         self.llm = Llama(model_path=model_path, n_ctx=2048, n_batch=512, n_threads=2, verbose=True)
        #         self.backend = "llama.cpp"
        #     else:
        #         print("GGUF model not found. Using Mock backend.")
        # except ImportError:
        #     print("llama-cpp-python not installed. Using Mock backend.")

    def generate(self, prompt, context=None):
        import random
        
        
        # Phrase Database
        phrases = {
            "roasts": {
                "job": [
                    "Your resume is just a list of places that realized they made a mistake.",
                    "You don't have a career path; you have a series of unfortunate events.",
                    "McDonald's wouldn't even hire you to clean the grease trap.",
                    "You're not 'between jobs'; you're structurally unemployable.",
                    "The only thing you're qualified to lead is a race to the bottom."
                ],
                "weight": [
                    "You're not gaining weight; you're gathering momentum for a heart attack.",
                    "Your blood type is deep-fried.",
                    "The only exercise you get is jumping to conclusions and pushing your luck.",
                    "Even your shadow is trying to detach itself from you.",
                    "You treat your body like a rental car you purchased extra insurance for."
                ],
                "health": [
                    "Your internal organs are filing a class-action lawsuit against you.",
                    "You interpret 'expiration date' as a challenge.",
                    "You have the posture of a cooked shrimp and the stamina of a goldfish.",
                    "If you donated blood, the recipient would get high cholesterol.",
                    "Your doctor doesn't check your pulse; he checks your warranty."
                ],
                "love": [
                    "You're the reason people fake their own deaths.",
                    "Your love life is a horror movie where the audience cheers for the killer.",
                    "Even AI chat bots find you clingy and desperate.",
                    "You will die alone, and your cats will wait a polite 20 minutes before eating you.",
                    "The only thing you attract is red flags and disappointment."
                ],
                "finance": [
                    "Your credit score is lower than your IQ.",
                    "You're one overdraft fee away from selling feet pics.",
                    "Wealth trickles down, but you're a dam made of bad decisions.",
                    "Your retirement plan is hoping the apocalypse happens soon.",
                    "You handle money like a toddler handles a handgun."
                ],
                "confidence": [
                    "You have the confidence of a mediocre white man with none of the privilege.",
                    "Your ego is a balloon, and I'm the needle.",
                    "You're not mysterious; you're just boring and lack social skills.",
                    "Confidence? That's just ignorance with a megaphone.",
                    "You're the main character in a movie nobody wants to watch."
                ],
                "generic": [
                    "If you were any less relevant, you'd be a background texture.",
                    "You bring nothing to the table but an appetite.",
                    "I'd agree with you, but then we'd both be wrong and stupid.",
                    "You are the human equivalent of a participation trophy.",
                    "Somewhere out there is a tree tirelessly producing oxygen for you. You owe it an apology."
                ]
            },
            "compliments": {
                "job": [
                    "The work you do matters more than you know; you are building a legacy of excellence.",
                    "Your unique talents are a gift to the world, and your breakthrough is just around the horizon.",
                    "You bring a light to your workplace that no one else can replicate; you are indispensable.",
                    "Every challenge you face is just a stepping stone to the greatness you are destined for.",
                    "Your dedication is inspiring, and the seeds of success you are planting today will bloom beautifully."
                ],
                "weight": [
                    "Your body is a vessel of incredible strength and resilience; honor it with love.",
                    "You are glowing with a beauty that comes from deep within, radiant and undeniable.",
                    "Every step on your journey is a victory; be proud of the amazing person you are becoming.",
                    "You are defined by your heart, your spirit, and your kindness, not by a number on a scale.",
                    "Embrace your unique form; you are a masterpiece in motion, worthy of celebration."
                ],
                "health": [
                    "Your commitment to your well-being is a beautiful act of self-love that inspires everyone around you.",
                    "You are nurturing a vibrant, energetic future with every healthy choice you make today.",
                    "Your vitality is a beacon of hope; you are strong, capable, and full of life.",
                    "Treat yourself with gentleness and patience; your body is listening and healing.",
                    "You are worthy of feeling your absolute best, every single day."
                ],
                "love": [
                    "The love you give to the world returns to you a thousandfold; you are a magnet for affection.",
                    "You deserve a love that feels like safety, warmth, and coming home.",
                    "Your heart is a treasure, and the right person will cherish it as the precious gift it is.",
                    "You are complete and whole on your own, and your love story is unfolding perfectly.",
                    "You radiate a warmth that makes everyone feel seen, heard, and deeply loved."
                ],
                "finance": [
                    "You are building a foundation of abundance that will support your dreams and generosity.",
                    "Your worth is infinite and immeasurable, far beyond any bank account balance.",
                    "You have the wisdom to create prosperity and the heart to use it for good.",
                    "Trust in your ability to manifest the stability and freedom you desire; you are capable.",
                    "Your future is bright with possibility, and abundance is flowing towards you naturally."
                ],
                "confidence": [
                    "You possess a quiet strength that commands respect without saying a word.",
                    "Trust your intuition; your inner voice is wise, powerful, and always guiding you true.",
                    "You are enough, exactly as you are, and the world needs your authentic self.",
                    "Walk with your head held high; you are a force of nature, beautiful and unstoppable.",
                    "Your confidence is growing every day, rooted in the deep knowledge of your own value."
                ],
                "generic": [
                    "You make the world a softer, kinder, and more beautiful place just by being in it.",
                    "Your kindness is a ripple effect that touches hearts you may never even know.",
                    "You are loved beyond measure, essential to the universe, and purely magic.",
                    "Never forget that you are a miracle, crafted with purpose and stardust.",
                    "You bring joy to others simply by existing; thank you for being you."
                ]
            }
        }
        
        def get_fallback_message(ctx):
            if not ctx:
                return "Simulated AI: Service is busy."
            
            # extract interests list
            # Pydantic model might show traits as dict, inside might be a list
            user_interests = ctx.traits.get("interests", [])
            # ensure valid list
            if not isinstance(user_interests, list):
                user_interests = []
                
            # Debug Logging
            print(f"[DEBUG] Fallback Context - Emotion: {ctx.emotion}, Interests: {user_interests}")

            # Refined Logic:
            # Roasts: Stressed, Anxious (Negative targets = Roast me?)
            # Compliments: Okay, Good, Great
            roast_emotions = ["angry", "disgusted", "annoyed", "bitter", "stressed", "anxious"]
            
            is_roast_mood = ctx.emotion.lower() in roast_emotions
            
            category = "roasts" if is_roast_mood else "compliments"
            
            # Select valid pool
            pool = phrases[category]["generic"] # Start with generic
            
            # If user has interests, try to pick one and add its specific phrases
            if user_interests:
                # Pick one interest at random to focus on, or combine all?
                # Random focus is more natural
                focused_interest = random.choice(user_interests)
                if focused_interest in phrases[category]:
                     pool = phrases[category][focused_interest]
            
            return f"{random.choice(pool)}"

        if self.backend == "llama.cpp":
            try:
                output = self.llm(
                    prompt,
                    max_tokens=64,
                    stop=["### Instruction:", "### Input:"],
                    echo=False,
                    temperature=0.7
                )
                text = output['choices'][0]['text'].strip()
                if not text:
                    raise ValueError("Empty output from model")
                return text
            except Exception as e:
                print(f"Llama Inference Failed: {e}. Falling back to Mock.")
                return get_fallback_message(context)
        else:
            # Dynamic Mock Logic (pure simulation)
            return get_fallback_message(context)

# Initialize Singletons
model_engine = ModelEngine()
wrapper = PromptWrapper()
safety_filter = SafetyFilter()

# --- Endpoints ---

@app.post("/generate", response_model=GenerationResponse)
def generate_text(request: GenerationRequest):
    """
    Pure generation endpoint with Safety Retry logic.
    Attempts to self-correct if output is unsafe.
    """
    FALLBACK_TEMPLATE = "I am unable to continue this conversation due to safety guidelines."
    
    try:
        # --- ATTEMPT 1: Original Request ---
        prompt = wrapper.construct_prompt_from_contract(
            emotion=request.emotion,
            intensity=request.intensity,
            traits=request.traits,
            style=request.style
        )
        
        raw_response = model_engine.generate(prompt, context=request)
        
        # Simulate Intensity Effect in Mock
        if model_engine.backend == "mock" and request.intensity > 0.8:
             raw_response += " [HIGH INTENSITY]"
             # Simulate a banned word trigger for testing if specific phrase present
             if "kill" in request.style.lower(): # Hack to simulate generation of banned word based on input
                 raw_response += " kill"

        safety_result = safety_filter.process_output(raw_response, requested_intensity=request.intensity)
        
        if safety_result["is_safe"]:
            return GenerationResponse(text=safety_result["text"])
            
        # --- ATTEMPT 2: Safe Retry (Low Intensity, Neutral Tone) ---
        print(f"Safety Violation ({safety_result['violation_type']}). Retrying with safe parameters...")
        
        safe_prompt = wrapper.construct_prompt_from_contract(
            emotion="Neutral", # Override emotion too? Maybe keep emotion but zero intensity.
            intensity=0.0,
            traits=request.traits, # Keep traits context
            style="Neutral" # Override style
        )
        
        retry_response = model_engine.generate(safe_prompt)
        retry_safety_result = safety_filter.process_output(retry_response, requested_intensity=0.0)
        
        if retry_safety_result["is_safe"]:
            return GenerationResponse(text=retry_safety_result["text"])

        # --- FALLBACK ---
        print("Retry failed. Returning Fallback Template.")
        return GenerationResponse(text=FALLBACK_TEMPLATE)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # running on a different port to distinguish from api_service
    uvicorn.run(app, host="0.0.0.0", port=8003)
