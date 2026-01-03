"""
CPU Inference using Llama.cpp
-----------------------------
Runs the exported GGUF model on CPU.
Requires: pip install llama-cpp-python
"""
try:
    from llama_cpp import Llama
except ImportError:
    print("Error: llama-cpp-python is not installed. Run: pip install llama-cpp-python")
    exit(1)

from wrapper import PromptWrapper

def main():
    # Path to your exported GGUF file
    model_path = "exported_models/gluon_model/gluon_model-unsloth.Q4_K_M.gguf"
    
    print(f"Loading GGUF model from {model_path}...")
    try:
        # n_ctx=2048 matches training. n_threads defines cpu cores to use.
        llm = Llama(model_path=model_path, n_ctx=2048, n_threads=4, verbose=False)
    except Exception as e:
        print(f"Failed to load model: {e}")
        print("Make sure you ran scripts/export_model.py and the file exists.")
        return

    wrapper = PromptWrapper()
    
    # 1. Define Inputs
    print("\n--- Generating Response (CPU) ---")
    inputs = {
        "emotion_label": "Happy",
        "intensity": 0.85,
        "user_traits": ["Curious", "Friendly"],
        "context_dict": {"tone": "Warm", "gap": 0}
    }
    
    # 2. Wrap Prompt
    prompt = wrapper.construct_prompt(**inputs)
    print(f"Prompt:\n{prompt}")
    
    # 3. Generate
    # stop=["### Instruction:"] prevents it from hallucinating a new turn
    output = llm(
        prompt, 
        max_tokens=256, 
        stop=["### Instruction:", "### Input:"], 
        echo=False,
        temperature=0.7
    )
    
    generated_text = output['choices'][0]['text'].strip()
    print(f"\nResponse:\n{generated_text}")

if __name__ == "__main__":
    main()
