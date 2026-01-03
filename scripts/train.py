"""
MirrorState Fine-Tuning Script using Unsloth
--------------------------------------------
This script is designed to be run in a GPU environment (Google Colab, Lambda Labs).
It loads the generated 'training_dataset.jsonl' and fine-tunes Llama-3.

Prerequisites:
  pip install "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"
  pip install --no-deps "xformers<0.0.26" trl peft accelerate bitsandbytes
"""

import json
from unsloth import FastLanguageModel
import torch
from trl import SFTTrainer
from transformers import TrainingArguments
from datasets import Dataset

# Import config (Ensure this file is in python path)
from train_config import TRAIN_CONFIG
import version_config

def load_data(file_path):
    """Loads JSONL data, filters it, and formats it for Llama-3 Instruction format."""
    data = []
    
    # Load filters
    target_emotions = set(TRAIN_CONFIG.get("filter_emotions", []))
    target_styles = set(TRAIN_CONFIG.get("filter_styles", []))
    
    with open(file_path, 'r') as f:
        for line in f:
            example = json.loads(line)
            ctx = example['input']['context']
            
            # Filtering Logic
            emotion = ctx['emotion_contract']['target_emotion'].lower()
            style = ctx['emotion_contract']['style_constraint'].lower()
            
            if target_emotions and emotion not in target_emotions:
                continue
            if target_styles and style not in target_styles:
                continue

            # Format: System + User -> Assistant
            # Llama-3 format construction...
            user_prompt = f"""
EMOTION LABEL: {ctx['emotion_contract']['target_emotion']}
INTENSITY LEVEL: {ctx['situation']['intensity']}
USER TRAIT SUMMARY: {', '.join(ctx['user_profile']['traits'])}
CONTEXT: Tone: {ctx['emotion_contract']['tone']}, Gap: {ctx['situation']['gap']}
"""
            data.append({
                "instruction": example['input']['system_instruction'],
                "input": user_prompt.strip(),
                "output": example['output']['text']
            })
            
    print(f"Loaded {len(data)} examples after filtering.")
    return Dataset.from_list(data)

def main():
    print(f"--- Starting Training Session ---")
    print(f"Prompt Version: {version_config.PROMPT_FORMAT_VERSION}")
    print(f"Schema Version: {version_config.PROFILE_SCHEMA_VERSION}")
    
    print("Loading Model...")
    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name = TRAIN_CONFIG["model_name"],
        max_seq_length = TRAIN_CONFIG["max_seq_length"],
        dtype = TRAIN_CONFIG["dtype"],
        load_in_4bit = TRAIN_CONFIG["load_in_4bit"],
    )

    print("Adding LoRA Adapters...")
    model = FastLanguageModel.get_peft_model(
        model,
        r = TRAIN_CONFIG["lora"]["r"],
        target_modules = TRAIN_CONFIG["lora"]["target_modules"],
        lora_alpha = TRAIN_CONFIG["lora"]["lora_alpha"],
        lora_dropout = TRAIN_CONFIG["lora"]["lora_dropout"],
        bias = TRAIN_CONFIG["lora"]["bias"],
        use_gradient_checkpointing = TRAIN_CONFIG["lora"]["use_gradient_checkpointing"],
        random_state = TRAIN_CONFIG["lora"]["random_state"],
    )

    print("Loading Dataset...")
    dataset = load_data("data/training_dataset.jsonl")

    # Define Formatting Function for SFT
    alpaca_prompt = """Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.

### Instruction:
{}

### Input:
{}

### Response:
{}"""

    def formatting_prompts_func(examples):
        instructions = examples["instruction"]
        inputs       = examples["input"]
        outputs      = examples["output"]
        texts = []
        for instruction, input, output in zip(instructions, inputs, outputs):
            text = alpaca_prompt.format(instruction, input, output) + tokenizer.eos_token
            texts.append(text)
        return { "text" : texts, }

    dataset = dataset.map(formatting_prompts_func, batched = True)

    print("Starting Training...")
    trainer = SFTTrainer(
        model = model,
        tokenizer = tokenizer,
        train_dataset = dataset,
        dataset_text_field = "text",
        max_seq_length = TRAIN_CONFIG["max_seq_length"],
        dataset_num_proc = 2,
        packing = False,
        args = TrainingArguments(**TRAIN_CONFIG["training_args"]),
    )

    trainer.train()

    print("Training Complete. Saving Model...")
    model.save_pretrained("lora_model")
    tokenizer.save_pretrained("lora_model")

if __name__ == "__main__":
    main()
