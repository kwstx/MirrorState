"""
Stateless Generation API Service
--------------------------------
FastAPI service acting as the Gateway / Application Layer.
Responsibilities:
1. Session Management (Memory)
2. Gateway to Model Microservice (Port 8003)
3. Feedback Logging
"""

from fastapi import FastAPI, HTTPException
from typing import List, Optional, Dict, Any
import requests
import os

from session_manager import SessionManager
from feedback_logger import FeedbackLogger
from api_contract import GenerationRequest, FrontendResponse, FeedbackRequest

app = FastAPI(title="MirrorState Generation Service")

# --- Configuration ---
MODEL_SERVICE_URL = os.environ.get("MODEL_SERVICE_URL", "http://127.0.0.1:8003")

# --- Singletons ---
logger = FeedbackLogger(log_dir="mood_mirror_next/data")
session_manager = SessionManager()

# --- Endpoints ---

@app.post("/generate", response_model=FrontendResponse)
def generate_text(request: GenerationRequest):
    """
    Gateway endpoint.
    1. Retrieve Session History
    2. Forward Request + History to Model Service
    3. Update Session History
    4. Return Safe Frontend Response
    """
    try:
        # 1. Session Retrieval logic (Append history to 'user_input' or inject into request?)
        # The Contract has 'history' field.
        current_history = []
        if request.session_id:
            current_history = session_manager.get_history(request.session_id)
        
        # Inject history into the request to be sent to Model Service
        # We need to modify the request object or create a new dict
        payload = request.model_dump()
        payload['history'] = current_history
        
        # 2. Call Model Service
        try:
            response = requests.post(f"{MODEL_SERVICE_URL}/generate", json=payload, timeout=120) # Long timeout for inference
            response.raise_for_status()
            model_data = response.json()
        except requests.RequestException as e:
            print(f"Model Service Error: {e}")
            raise HTTPException(status_code=503, detail=f"Model Service Unavailable: {str(e)}")

        generated_text = model_data['text']

        # 3. Session Update
        if request.session_id and request.user_input:
            session_manager.add_turn(request.session_id, request.user_input, generated_text)

        # 4. Construct Response
        # Note: Model Service result is already "Safe" (it has its own safety filter)
        # We assume Model Service returns GenerationResponse(text=...)
        # We map it to FrontendResponse
        
        # Re-calculate mapped intensity for metadata (since api_service doesn't have wrapper anymore?)
        # We can implement a simple mapping here or ask Model Service to return it.
        # For now, simple mapping for frontend display consistency.
        level = "medium"
        if request.intensity < 0.3: level = "low"
        elif request.intensity > 0.8: level = "extreme"
        elif request.intensity > 0.7: level = "high"

        return FrontendResponse(
            text=generated_text,
            emotion_metadata={
                "label": request.emotion,
                "intensity": request.intensity,
                "mapped_level": level
            }
        )

    except HTTPException:
        raise
    except Exception as e:
        print(f"API Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/feedback")
def submit_feedback(request: FeedbackRequest):
    try:
        logger.log_feedback(request.inputs, request.output, request.rating)
        return {"status": "success", "message": "Feedback logged"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8005)
