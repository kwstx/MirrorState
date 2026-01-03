"""
Session Manager
---------------
Handles ephemeral, in-memory conversation history.
No persistence. Data is lost on restart.
"""
from typing import Dict, List, Optional
import time

class SessionManager:
    def __init__(self, max_history_turns: int = 10, expiry_seconds: int = 3600):
        self.sessions: Dict[str, Dict] = {}
        self.max_history_turns = max_history_turns
        self.expiry_seconds = expiry_seconds

    def get_history(self, session_id: str) -> List[str]:
        """Retrieves formatted history for a session."""
        if not session_id:
            return []
        
        session = self.sessions.get(session_id)
        if not session:
            return []
        
        # Check expiry
        if time.time() - session["last_active"] > self.expiry_seconds:
            del self.sessions[session_id]
            return []
            
        session["last_active"] = time.time()
        return session["history"]

    def add_turn(self, session_id: str, user_input: str, model_output: str):
        """Adds a turn to the session history."""
        if not session_id:
            return
            
        if session_id not in self.sessions:
            self.sessions[session_id] = {
                "history": [],
                "last_active": time.time()
            }
            
        session = self.sessions[session_id]
        session["last_active"] = time.time()
        
        # Format: "User: <input>\nModel: <output>"
        # Or keeping them separate? Wrapper usually wants a list or string.
        # Let's store as a formatted string block per turn for simplicity in simple wrapper integration
        # or list of dicts. List of formatted strings is easiest for Llama-3 concatenation.
        
        turn_text = f"User: {user_input}\nAssistant: {model_output}"
        session["history"].append(turn_text)
        
        # Prune
        if len(session["history"]) > self.max_history_turns:
            session["history"] = session["history"][-self.max_history_turns:]
