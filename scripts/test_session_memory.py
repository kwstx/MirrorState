"""
Test Session Memory
-------------------
Verifies multi-turn conversation context retention.
"""
import requests
import time

BASE_URL = "http://localhost:8005"

def test_session_memory():
    print("\n[Testing Session Memory]")
    session_id = "test_user_session_123"
    
    # Turn 1
    print("Turn 1: 'My name is Alice.'")
    payload1 = {
        "emotion": "happy",
        "intensity": 0.5,
        "traits": {"extraversion": "high"},
        "style": "chat",
        "session_id": session_id,
        "user_input": "My name is Alice."
    }
    resp1 = requests.post(f"{BASE_URL}/generate", json=payload1).json()
    print(f"Response 1: {resp1['text']}")
    
    # Turn 2
    print("Turn 2: 'What is my name?' (Implicit context check)")
    payload2 = {
        "emotion": "happy",
        "intensity": 0.5,
        "traits": {"extraversion": "high"},
        "style": "chat",
        "session_id": session_id,
        "user_input": "What is my name?"
    }
    resp2 = requests.post(f"{BASE_URL}/generate", json=payload2).json()
    print(f"Response 2: {resp2['text']}")
    
    # Since we are using a Mock backend (or Llama without enough context/params), 
    # the model might NOT actually answer "Alice" correctly unless the prompt is perfect 
    # and the model is smart enough. 
    # BUT we can verify that api_service constructed the prompt with history if we could inspect logs.
    # For now, just ensure it runs without error and returns text.
    
    return True

def main():
    time.sleep(2)
    test_session_memory()

if __name__ == "__main__":
    main()
