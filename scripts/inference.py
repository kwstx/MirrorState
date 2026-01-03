"""
Inference Script for MirrorState
Demonstrates the explicit emotion conditioning input format.
"""
import torch

from wrapper import PromptWrapper
from safety_filter import SafetyFilter
from feedback_logger import FeedbackLogger

def main():
    print("--- Simulating Inference Input with Wrapper, Filter & Feedback Loop ---")
    wrapper = PromptWrapper()
    safety_filter = SafetyFilter()
    logger = FeedbackLogger(log_dir="mood_mirror_next/data") # Adjust path for script run location
    
    # Example 1: High Intensity Happy
    inputs_1 = {
        "emotion_label": "Happy",
        "intensity": 0.85,
        "user_traits": ["Social", "Energetic"],
        "context_dict": {"tone": "Excited", "gap": 5}
    }
    prompt = wrapper.construct_prompt(**inputs_1)
    response = "You are doing amazing! Keep pushing forward!"
    safe_response = safety_filter.process_output(response, requested_intensity=inputs_1["intensity"])
    
    # Simulate User Feedback
    feedback = "Just right"
    logger.log_feedback(inputs_1, safe_response, feedback)
    
    print(f"\n[Test Case 1]\nFiltered: {safe_response}\nUser Feedback: {feedback}")
    
    # Example 2: Low Intensity Sad (Too Strong)
    inputs_2 = {
        "emotion_label": "Sad",
        "intensity": 0.2,
        "user_traits": ["Quiet"],
        "context_dict": {"tone": "Gentle", "gap": 20}
    }
    prompt = wrapper.construct_prompt(**inputs_2)
    response = "IT IS OKAY TO BE SAD."
    safe_response = safety_filter.process_output(response, requested_intensity=inputs_2["intensity"])
    
    # Simulate User Feedback: Even though it softened, maybe they felt it was still too direct
    feedback = "Too strong" 
    logger.log_feedback(inputs_2, safe_response, feedback)
    
    print(f"\n[Test Case 2]\nFiltered: {safe_response}\nUser Feedback: {feedback}")

if __name__ == "__main__":
    main()
