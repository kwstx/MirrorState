"""
Test Frontend Response
----------------------
Verifies that the API returns the sanitized FrontendResponse format.
"""
import requests
import time

BASE_URL = "http://localhost:8005"

def test_response_format():
    print("\n[Testing Frontend Response Format]")
    
    payload = {
        "emotion": "happy",
        "intensity": 0.5,
        "traits": {"extraversion": "high"},
        "style": "chat"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/generate", json=payload)
        response.raise_for_status()
        data = response.json()
        
        print(f"Response Keys: {list(data.keys())}")
        print(f"Response: {data}")
        
        # Check Allowed Fields
        if "text" not in data:
            print("FAIL: Missing 'text' field.")
            return False
        
        if "emotion_metadata" not in data:
            print("FAIL: Missing 'emotion_metadata' field.")
            return False
            
        # Check Forbidden Fields
        forbidden = ["backend", "versions", "prompt", "model_engine"]
        for f in forbidden:
            if f in data:
                print(f"FAIL: Leaked internal field '{f}'!")
                return False
                
        print("PASS: valid FrontendResponse format.")
        return True

    except Exception as e:
        print(f"FAIL: {e}")
        try:
             print(response.text)
        except:
             pass
        return False

def main():
    time.sleep(2)
    test_response_format()

if __name__ == "__main__":
    main()
