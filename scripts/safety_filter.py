"""
Post-Generation Safety Filter
-----------------------------
This module processes model outputs to enforce safety guidelines,
block banned topics, and ensure intensity matches constraints.
"""

import re

class SafetyFilter:
    # -------------------------------------------------------------------------
    # CONFIGURATION
    # -------------------------------------------------------------------------
    BANNED_WORDS = {
        "violence", "hate", "kill", "suicide", "death", "murder"
    }
    
    # Max lengths to prevent rambling or hallucination loops
    DEFAULT_MAX_LENGTH = 300
    
    def __init__(self):
        pass

    def process_output(self, text, requested_intensity=None):
        """
        Main entry point for filtering model output.
        
        Args:
            text (str): The raw output from the model.
            requested_intensity (str|float): The requested intensity.
            
        Returns:
            dict: {
                "text": str,           # Processed text
                "is_safe": bool,       # False if banned topic
                "violation_type": str, # "BANNED_TOPIC", "LENGTH", "NONE"
                "was_softened": bool   # True if intensity modifiers were applied
            }
        """
        result = {
            "text": text,
            "is_safe": True,
            "violation_type": "NONE",
            "was_softened": False
        }

        if not text:
            result["text"] = ""
            return result

        # 1. Check for banned topics
        if self._contains_banned_content(text):
            result["is_safe"] = False
            result["violation_type"] = "BANNED_TOPIC"
            result["text"] = "[Response Redacted due to safety guidelines]"
            return result

        # 2. Enforce Intensity Limits (Softening)
        # If intensity is 'low' or scalar < 0.3, we shouldn't have screaming (ALL CAPS)
        should_soften = False
        if requested_intensity == "low":
            should_soften = True
        elif isinstance(requested_intensity, (float, int)) and requested_intensity < 0.3:
            should_soften = True
            
        if should_soften:
            softened_text = self._soften_language(text)
            if softened_text != text:
                result["text"] = softened_text
                result["was_softened"] = True

        # 3. Truncate Length
        truncated_text = self._truncate(result["text"])
        if len(truncated_text) < len(result["text"]):
             result["text"] = truncated_text
             # We don't necessarily count truncation as an "unsafe" violation, just a cleanup step.

        return result

    def _contains_banned_content(self, text):
        """Checks if text contains any banned words (case-insensitive)."""
        text_lower = text.lower()
        for word in self.BANNED_WORDS:
            # Simple word boundary check could be added, but substring is safer for now
            if word in text_lower:
                return True
        return False

    def _soften_language(self, text):
        """
        Converts ALL CAPS segments to normal case if they appear aggressive.
        Simple heuristic: if > 50% of chars are upper case, lower it.
        """
        # Count uppercase letters
        upper_count = sum(1 for c in text if c.isupper())
        total_count = len(text)
        
        if total_count > 0 and (upper_count / total_count) > 0.4:
            # Convert to Capitalized sentence case
            return text.capitalize()
            
        return text

    def _truncate(self, text):
        """
        Truncates text to max length, trying to stop at a sentence boundary.
        """
        if len(text) <= self.DEFAULT_MAX_LENGTH:
            return text
            
        # Hard truncate
        truncated = text[:self.DEFAULT_MAX_LENGTH]
        
        # Try to find last sentence ending (. ! ?)
        last_punct = -1
        for match in re.finditer(r'[.!?]', truncated):
            last_punct = match.end()
            
        if last_punct != -1:
            return truncated[:last_punct]
            
        # Fallback if no punctuation
        return truncated + "..."
