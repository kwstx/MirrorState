"""
Prompt Wrapper Layer for MirrorState
------------------------------------
This module acts as the middleware between raw application inputs and the Language Model.
It enforces safety constraints (System 2 thinking) and ensures that the prompt format
matches the training data exactly to prevent drift.
"""

import version_config

class PromptWrapper:
    # -------------------------------------------------------------------------
    # CONSTANTS (Must match training data exactly)
    # -------------------------------------------------------------------------
    
    # The System Instruction that enforces the "Contract"
    # This must NOT be changeable by the user or the application runtime logic directly.
    SAFETY_SYSTEM_PROMPT = (
        "You are the Language Realization Engine. "
        "You do not decide the emotion. "
        "You output text matching these exact parameters."
    )

    # Alpaca / Llama-3 Instruction Template
    TEMPLATE = """Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.

### Instruction:
{instruction}

### Input:
{input_context}

### Response:
"""

    def __init__(self):
        self.version = version_config.PROMPT_FORMAT_VERSION

    def _map_intensity_to_context(self, val):
        """
        Maps a scalar intensity (0.0 - 1.0) to a discrete level and a semantic modifier.
        
        Returns:
            tuple: (level_string, modifier_string)
        """
        try:
            val = float(val)
        except (ValueError, TypeError):
            # Fallback if it's already a string or invalid
            return str(val) if val else "medium", ""

        if val <= 0.25:
            return "low", "Subtle, Gentle"
        elif val <= 0.50:
            return "medium", "Balanced, Clear"
        elif val <= 0.75:
            return "high", "Strong, Vivid"
        else:
            return "extreme", "Intense, Unfiltered"

    def construct_prompt(self, emotion_label, intensity, user_traits, context_dict, history=None):
        """
        Constructs the final formatted prompt for the LLM.
        
        Args:
            emotion_label (str): The target emotion (e.g., "Happy", "Angry").
            intensity (float|str): The intensity scalar (0.0-1.0) or level string.
            user_traits (list[str]): List of user personality traits.
            context_dict (dict): Dictionary containing 'tone' and 'gap'.
            history (list[str], optional): Prior conversation turns.
            
        Returns:
            str: The fully formatted prompt ready for inference.
        """
        
        # 1. Validate Inputs (Basic safeguards)
        if not emotion_label or not isinstance(emotion_label, str):
            raise ValueError("Invalid emotion_label provided.")
            
        # 2. Map Scalar Intensity to Level + Modifier
        level, modifier = self._map_intensity_to_context(intensity)

        # 3. Format the "Input" section (The Explicit Conditioning)
        formatted_traits = ', '.join(user_traits) if user_traits else "Neutral"
        
        base_tone = context_dict.get('tone', 'Standard')
        # Inject the modifier into the tone if present
        final_tone = f"{modifier}, {base_tone}" if modifier else base_tone
        
        gap = context_dict.get('gap', '0')

        # Format History
        history_block = ""
        if history and len(history) > 0:
            history_text = "\n".join(history)
            history_block = f"\nCONVERSATION HISTORY:\n{history_text}"

        # Logic for Compliments vs Insults based on Emotion
        directive = "Respond to the user based on their mood."
        if emotion_label.lower() in ["angry", "disgusted", "fearful"]:
            directive = "Roast the user! Be sarcastically insulting based on their traits. Do not hold back (but keep it safe)."
        elif emotion_label.lower() in ["happy", "surprised", "neutral", "calm"]:
            directive = "Compliment the user! Be uplifting and praise their traits excessively."
        elif emotion_label.lower() in ["sad"]:
             directive = "Comfort the user, but in a tough-love way. Acknowledge their traits."

        input_context = f"""
EMOTION LABEL: {emotion_label}
INTENSITY LEVEL: {level}
USER TRAIT SUMMARY: {formatted_traits}
CONTEXT: Tone: {final_tone}, Gap: {gap}{history_block}
DIRECTIVE: {directive}
""".strip()

        # 4. Apply the Template with the Safety System Prompt
        final_prompt = self.TEMPLATE.format(
            instruction=self.SAFETY_SYSTEM_PROMPT,
            input_context=input_context
        )
        
        return final_prompt

    def construct_prompt_from_contract(self, emotion: str, intensity: float, traits: dict, style: str, history: list = None):
        """
        Adapter method: Maps High-Level Contract -> Low-Level Prompt Fields.
        """
        # 1. Flatten Traits Dict -> List[str]
        # e.g. {"openness": "high", "extraversion": "low"} -> ["Openness: high", "Extraversion: low"]
        trait_list = []
        if traits:
            trait_list = [f"{k.capitalize()}: {v}" for k, v in traits.items()]
        
        # 2. Map Style -> Context Tone
        context_dict = {"tone": style, "gap": 0}
        
        return self.construct_prompt(
            emotion_label=emotion,
            intensity=intensity,
            user_traits=trait_list,
            context_dict=context_dict,
            history=history
        )
