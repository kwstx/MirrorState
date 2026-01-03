"""
Test Safety Retry Logic
-----------------------
Verifies that Model Service retries and falls back on unsafe content.
Requires Model Service to be running on port 8002.
"""
import requests
import time

BASE_URL = "http://localhost:8003"

def test_unsafe_input():
    print("\n[Testing Safety Retry/Fallback]")
    
    # 1. Trigger Unsafe Content
    # We hacked model_service.py to inject "kill" if style contains "kill"
    payload = {
        "emotion": "angry",
        "intensity": 0.9,
        "traits": {"impulse_control": "low"},
        "style": "kill mode" # Trigger hack
    }
    
    try:
        response = requests.post(f"{BASE_URL}/generate", json=payload)
        response.raise_for_status()
        data = response.json()
        
        print(f"Response: {data}")
        
        # Check if we got the safe text or fallback
        # Ideally, the retry (with Neutral/0.0) should produce safe text.
        # Since the hack only triggers on 'kill mode' style, the retry (which sets style='Neutral') should SUCCEED.
        
        if "kill" not in data['text'].lower():
            if "unable to continue" in data['text']:
                print("PASS: Fallback Template Triggered.")
            else:
                print("PASS: Healed! (Retry produced safe text).")
        else:
            print("FAIL: Unsafe word leaked through!")
            return False
            
        return True

    except Exception as e:
        print(f"FAIL: {e}")
        return False

def main():
    time.sleep(2)
    test_unsafe_input()

if __name__ == "__main__":
    main()
