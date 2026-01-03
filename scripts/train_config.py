# Configuration for Unsloth Fine-Tuning

TRAIN_CONFIG = {
    # Base Model: Llama-3 8B Instruct (4-bit quantization for efficiency)
    "model_name": "unsloth/llama-3-8b-Instruct-bnb-4bit",
    
    # Max Sequence Length: Adequate for our structured prompts (~500-1000 tokens)
    "max_seq_length": 2048,
    
    # Data Type: Auto-detects hardware support (Float16/Bfloat16)
    "dtype": None,
    
    # 4-bit Quantization: True to reduce memory usage (works on T4/L4)
    "load_in_4bit": True,
    
    # LoRA Parameters (Low-Rank Adaptation)
    "lora": {
        "r": 16,               # Standard rank for instructions
        "target_modules": [    # Attention modules to adapt
            "q_proj", "k_proj", "v_proj", "o_proj",
            "gate_proj", "up_proj", "down_proj",
        ],
        "lora_alpha": 16,
        "lora_dropout": 0,     # 0 is optimized for Unsloth
        "bias": "none",
        "use_gradient_checkpointing": "unsloth", # Optimization
        "random_state": 3407,
    },
    
    # Training Arguments
    "training_args": {
        "per_device_train_batch_size": 2,
        "gradient_accumulation_steps": 4,
        "warmup_steps": 5,
        "max_steps": 60,       # Start small for testing, increase for full run (e.g. 1 epoch)
        "learning_rate": 2e-4,
        "fp16": not torch.cuda.is_bf16_supported(),
        "bf16": torch.cuda.is_bf16_supported(),
        "logging_steps": 1,
        "optim": "adamw_8bit",
        "weight_decay": 0.01,
        "lr_scheduler_type": "linear",
        "seed": 3407,
        "output_dir": "outputs",
    },

    # Dataset Filtering (For training separate adapters)
    # Example: ["angry", "motivated"] for a "Harsh" adapter
    # Leave empty [] to train on all data.
    "filter_emotions": [], 
    "filter_styles": [],
}
