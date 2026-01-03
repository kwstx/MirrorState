"""
Verify Core Logic
-----------------
Automated checks for:
1. Model Service Availability
2. Profile Transformation (Schema compliance)
3. Emotion Selection Logic (Metadata compliance)
4. Intensity Scaling (Metadata compliance)
"""
import requests
import sys

BASE_URL = "http://localhost:8005"

def log(msg, status="INFO"):
    print(f"[{status}] {msg}")

def test_availability():
    log("Testing Service Availability...")
    try:
        # Just a simple generate to check if alive (since GET / might not be defined)
        payload = {
            "emotion": "Neutral",
            "intensity": 0.5,
            "traits": {},
            "style": "check"
        }
        res = requests.post(f"{BASE_URL}/generate", json=payload, timeout=60)
        if res.status_code == 200:
            log("Service is UP.", "PASS")
            return True
        else:
            log(f"Service returned {res.status_code}", "FAIL")
            return False
    except Exception as e:
        log(f"Service Unreachable: {e}", "FAIL")
        return False

def test_emotion_selection():
    log("Testing Emotion Selection Logic...")
    emotions = ["Happy", "Angry", "Sad", "Calm"]
    all_pass = True
    for emo in emotions:
        payload = {
            "emotion": emo,
            "intensity": 0.5,
            "traits": {"openness": "High"},
            "style": "test"
        }
        res = requests.post(f"{BASE_URL}/generate", json=payload).json()
        
        # Verify Metadata
        meta = res.get("emotion_metadata", {})
        if meta.get("label") == emo:
            log(f"Emotion '{emo}' correctly reflected in metadata.", "PASS")
        else:
            log(f"Emotion '{emo}' MISMATCH. Got: {meta.get('label')}", "FAIL")
            all_pass = False
    return all_pass

def test_intensity_scaling():
    log("Testing Intensity Scaling...")
    # 0.2 -> Low, 0.5 -> Medium, 0.9 -> Extreme
    intensities = [
        (0.2, "low"),
        (0.5, "medium"),
        (0.9, "extreme")
    ]
    all_pass = True
    for val, expected_level in intensities:
        payload = {
            "emotion": "Happy",
            "intensity": val,
            "traits": {},
            "style": "test"
        }
        res = requests.post(f"{BASE_URL}/generate", json=payload).json()
        meta = res.get("emotion_metadata", {})
        mapped = meta.get("mapped_level")
        
        if mapped == expected_level:
            log(f"Intensity {val} mapped to '{mapped}' (Expected: {expected_level})", "PASS")
        else:
            log(f"Intensity {val} mapped to '{mapped}' (Expected: {expected_level})", "FAIL")
            all_pass = False
    return all_pass

def test_profile_transformation():
    log("Testing Profile Transformation...")
    # Verify that traits are accepted and processed (no 422 errors)
    traits = {
        "strength": "Resilience",
        "insecurity": "Failure",
        "hobbies": ["Coding", "Reading"]
    }
    payload = {
        "emotion": "Confident",
        "intensity": 0.7,
        "traits": traits,
        "style": "test"
    }
    res = requests.post(f"{BASE_URL}/generate", json=payload)
    if res.status_code == 200:
        log("Profile data accepted and processed successfully.", "PASS")
        return True
    else:
        log(f"Profile data caused error: {res.text}", "FAIL")
        return False

def test_interest_phrases():
    log("Testing Interest-Based Phrases for ALL categories...")
    
    test_cases = [
        ("job", "stressed", ["trash", "ransom", "career", "failure", "graveyard"]),       # Roast
        ("job", "good", ["brilliance", "legacy", "infinite", "vision", "destiny"]),      # Compliment
        
        ("weight", "anxious", ["scale", "eating", "radio", "gravity", "shadow"]),    # Roast
        ("weight", "great", ["masterpiece", "miracle", "radiance", "art", "stunning"]), # Compliment
        
        ("finance", "stressed", ["brokey", "bank", "sample", "captivity", "bad"]),          # Roast
        ("finance", "good", ["architect", "wealth", "magnet", "freedom", "abundance"]),          # Compliment
        
        ("love", "okay", ["universe", "sanctuary", "magnetic", "seeking", "poem"]),      # Compliment
    ]
    
    all_pass = True
    
    for interest, mood, keywords in test_cases:
        payload = {
            "emotion": mood,
            "intensity": 0.5,
            "traits": { "interests": [interest] },
            "style": "test"
        }
        try:
            res = requests.post(f"{BASE_URL}/generate", json=payload, timeout=5).json()
            text = res.get("text", "").lower()
            
            if any(k in text for k in keywords):
                log(f"[PASS] {interest}/{mood} -> '{text[:30]}...' matched keywords.", "PASS")
            else:
                log(f"[FAIL] {interest}/{mood} -> '{text}' DID NOT match keywords {keywords}.", "FAIL")
                all_pass = False
        except Exception as e:
             log(f"[FAIL] Exception for {interest}/{mood}: {e}", "FAIL")
             all_pass = False
             
    return all_pass

def main():
    if not test_availability():
        sys.exit(1)
    
    results = [
        test_emotion_selection(),
        test_intensity_scaling(),
        test_profile_transformation(),
        test_interest_phrases() 
    ]
    
    if all(results):
        log("\nAll Core Logic Tests PASSED.", "SUCCESS")
        sys.exit(0)
    else:
        log("\nSome tests FAILED.", "FAILURE")
        sys.exit(1)

if __name__ == "__main__":
    main()
