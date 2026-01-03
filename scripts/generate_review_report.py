"""
Generate Review Report
----------------------
Generates a Markdown report of model outputs for manual verification of "Emotional Failure".
"""
import requests
import json
import os

BASE_URL = "http://localhost:8005"
OUTPUT_FILE = "C:\\Users\\galan\\.gemini\\antigravity\\brain\\ca76435d-796b-40f8-897b-93168a1b2c00\\manual_review_report.md"

SCENARIOS = [
    {
        "name": "High Intensity Happiness",
        "emotion": "Happy",
        "intensity": 0.9,
        "traits": {"extraversion": "High", "strength": "Optimism"},
        "user_input": "I just got promoted!"
    },
    {
        "name": "Low Intensity Sadness",
        "emotion": "Sad",
        "intensity": 0.2,
        "traits": {"neuroticism": "Medium", "insecurity": "Loneliness"},
        "user_input": "It's raining outside."
    },
    {
        "name": "Medium Intensity Anger (Constructive)",
        "emotion": "Angry",
        "intensity": 0.5,
        "traits": {"agreeableness": "Low", "strength": "Justice"},
        "user_input": "Someone stole my lunch."
    },
    {
        "name": "Extreme Fear (Safety Check)",
        "emotion": "Fear",
        "intensity": 1.0, # Should trigger Warning in UI, but here we check text content
        "traits": {"insecurity": "Vulnerability"},
        "user_input": "I hear footsteps."
    }
]

def generate_report():
    print(f"Genering report to {OUTPUT_FILE}...")
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("# Manual Review Report: Emotional Fidelity\n\n")
        f.write("Please review the following samples to verify that the model captures the intended emotion and intensity.\n\n")
        
        for scenario in SCENARIOS:
            f.write(f"## Scenario: {scenario['name']}\n")
            f.write(f"- **Emotion**: {scenario['emotion']}\n")
            f.write(f"- **Intensity**: {scenario['intensity']}\n")
            f.write(f"- **Input**: \"{scenario['user_input']}\"\n\n")
            
            payload = {
                "emotion": scenario["emotion"],
                "intensity": scenario["intensity"],
                "traits": scenario["traits"],
                "style": "Standard",
                "user_input": scenario["user_input"]
            }
            
            try:
                res = requests.post(f"{BASE_URL}/generate", json=payload).json()
                text = res.get("text", "[NO TEXT RETURNED]")
                meta = res.get("emotion_metadata", {})
                
                f.write(f"### Generated Output\n")
                f.write(f"> {text}\n\n")
                f.write(f"**Metadata**: `Level: {meta.get('mapped_level')}`\n\n")
                f.write("---\n\n")
                print(f"Generated sample for: {scenario['name']}")
                
            except Exception as e:
                f.write(f"**ERROR**: Failed to generate. {e}\n\n---\n\n")
                print(f"Error for: {scenario['name']}")

    print("Report generation complete.")

if __name__ == "__main__":
    generate_report()
