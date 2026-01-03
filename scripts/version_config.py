"""
Version Configuration for MirrorState
-------------------------------------
Centralized version tracking for all system components.
Ensures compatibility and prevents silent drift.
"""

# Version of the dataset schema (e.g. structure of emotion_contract, user_profile)
EMOTION_CONTRACT_VERSION = "1.0.0"
PROFILE_SCHEMA_VERSION = "1.0.0"

# Version of the prompt template (wrapper.py logic)
PROMPT_FORMAT_VERSION = "2.0.0" # Updated for Explicit Emotion Conditioning

# Version of the model adapter being used (Manual for now, could be dynamic)
MODEL_ADAPTER_VERSION = "v1-20250102"
