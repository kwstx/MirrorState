"""
Test Script for Model Service
-----------------------------
Verifies /generate on port 8001.
Ensures /feedback does NOT exist.
"""
import requests
import time
import sys

BASE_URL = "http://localhost:8001"

def test_generate():
    print("\n[Testing POST /generate]")
    payload = {
        "emotion_label": "Happy",
        "intensity": 0.9,
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
        return True
    except Exception as e:
        print(f"FAIL: {e}")
        return False

def test_no_feedback():
    print("\n[Testing POST /feedback (Should Fail)]")
    # This endpoint should not exist on the pure model service
    try:
        response = requests.post(f"{BASE_URL}/feedback", json={})
        if response.status_code == 404:
            print("PASS: /feedback endpoint not found (Expected).")
            return True
        else:
            print(f"FAIL: Unexpected status code {response.status_code}")
            return False
    except Exception as e:
        print(f"FAIL: {e}")
        return False

def main():
    time.sleep(2) 
    print("Checking Model Service Health...")
    try:
        if test_generate() and test_no_feedback():
            print("\nAll Model Service checks passed.")
        else:
            print("\nSome checks failed.")
    except requests.exceptions.ConnectionError:
        print("CRITICAL: Could not connect to Model Service. Is it running?")

if __name__ == "__main__":
    main()
