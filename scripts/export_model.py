"""
Export Model to GGUF
--------------------
Converts the fine-tuned LoRA model into GGUF format for CPU inference.
usage: python scripts/export_model.py

NOTE: This script typically requires a GPU to load the original backing model
efficiently before conversion. Run this on the machine where you trained the model.
"""
from unsloth import FastLanguageModel
import torch
import os
from train_config import TRAIN_CONFIG

def export_gguf():
    print("--- Loading Model for Export ---")
    
    # Path to your saved LoRA adapter
    adapter_path = "lora_model" 
    
    if not os.path.exists(adapter_path):
        print(f"Error: Could not find adapter at {adapter_path}. Did you run training?")
        return

    # Load Model (Merges LoRA into base model automatically for export)
    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name = adapter_path, # Load the local adapter
        max_seq_length = TRAIN_CONFIG["max_seq_length"],
        dtype = None,
        load_in_4bit = True,
    )

    print("--- Exporting to GGUF (q4_k_m) ---")
    # q4_k_m is the recommended balance of speed and quality (approx 5-6GB RAM)
    model.save_pretrained_gguf("exported_models/gluon_model", tokenizer, quantization_method = "q4_k_m")
    
    print("--- Export Complete ---")
    print("File saved to: exported_models/gluon_model/gluon_model-unsloth.Q4_K_M.gguf")

if __name__ == "__main__":
    export_gguf()
