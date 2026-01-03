"""
Generation API Contract
-----------------------
Strict interface definition for the Model Service.
Frontend never talks to the model directly.
"""
from pydantic import BaseModel, Field
from typing import Dict, Any, Optional, List

class GenerationRequest(BaseModel):
    """
    Standard request format for generating emotion-conditioned text.
    """
    emotion: str = Field(..., description="Target emotion (e.g., 'angry', 'happy')")
    intensity: float = Field(..., ge=0.0, le=1.0, description="Scalar intensity (0.0 - 1.0)")
    traits: Dict[str, Any] = Field(..., description="User profile traits dictionary")
    style: str = Field("Standard", description="Output style (e.g., 'roast', 'formal', 'concise')")
    
    # Session / Context Fields
    session_id: Optional[str] = Field(None, description="Client session ID for memory")
    user_input: Optional[str] = Field(None, description="The user's latest message")
    history: Optional[List[str]] = Field(None, description="Conversation history (injected by service or client)")

class GenerationResponse(BaseModel):
    """
    Standard response format.
    """
    text: str = Field(..., description="The generated text response")
    
    # Metadata is kept internal or for debug/wrappers, usually stripped for frontend if strict
    # The user request "Example response" only showed 'text', so we keep pure text as primary.


class FrontendResponse(BaseModel):
    """
    Public-facing response format.
    Stripped of internal details.
    """
    text: str = Field(..., description="The generated text")
    emotion_metadata: Optional[Dict[str, Any]] = Field(None, description="Optional emotion context (label, intensity)")

class FeedbackRequest(BaseModel):
    """
    Standard feedback submission.
    """
    inputs: Dict[str, Any]
    output: str
    rating: str
