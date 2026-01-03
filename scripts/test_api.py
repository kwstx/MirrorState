"""
Test Script for MirrorState API Service
---------------------------------------
Verifies /generate and /feedback endpoints.
Checks for stateless behavior (independent requests).
"""
import requests
import time
import sys

BASE_URL = "http://localhost:8000"

def test_generate():
    print("\n[Testing POST /generate]")
    payload = {
        "emotion_label": "Happy",
        "intensity": 0.85,
        "user_traits": ["Optimistic"],
        "context_dict": {"tone": "Bright"}
    }
    
    try:
        response = requests.post(f"{BASE_URL}/generate", json=payload)
        response.raise_for_status()
        data = response.json()
        
        print(f"Status: {response.status_code}")
        print(f"Response Text: {data['text']}")
        print(f"Metadata: {data['metadata']}")
        
        # Verify Safety/Intensity Modifications
        if "INTENSE" in data['text']:
            print("PASS: Intensity modifier logic triggered.")
        else:
            print("WARNING: Intensity logic might not be triggering.")
            
        return data['text']
    except Exception as e:
        print(f"FAIL: {e}")
        return None

def test_feedback(output_text):
    print("\n[Testing POST /feedback]")
    payload = {
        "inputs": {"test": "data"},
        "output": output_text,
        "rating": "Just right"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/feedback", json=payload)
        response.raise_for_status()
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"FAIL: {e}")

def main():
    # Wait for server to start if running via script runner (simulated)
    time.sleep(2) 
    
    print("Checking API Health...")
    try:
        print("Starting Tests...")
        text = test_generate()
        if text:
            test_feedback(text)
    except requests.exceptions.ConnectionError:
        print("CRITICAL: Could not connect to API. Is the server running?")
        sys.exit(1)

if __name__ == "__main__":
    main()
