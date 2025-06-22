import os, json
import numpy as np
from PIL import Image
import torch, clip
from config import PRODUCT_DIR, DATA_DIR

device = "cuda" if torch.cuda.is_available() else "cpu"
clip_model, preprocess = clip.load("ViT-B/32", device=device)

# backend/model_utils.py  – only this function needs changing
def _image_to_vec(pil_image):
    """
    Return a 512-D unit vector for a PIL Image (room photo or product shot).
    """
    tensor = preprocess(pil_image).unsqueeze(0).to(device)   # (1,3,224,224)
    with torch.no_grad():
        vec = clip_model.encode_image(tensor).cpu().numpy()[0]   # (512,)
    vec /= np.linalg.norm(vec)          # L2-normalise
    return vec.astype("float32")        # 1-D float32 vector


def build_index() -> None:
    os.makedirs(DATA_DIR, exist_ok=True)
    vecs, ids = [], []
    for fname in os.listdir(PRODUCT_DIR):
        if fname.lower().endswith((".png", ".jpg", ".jpeg")):
            vecs.append(_image_to_vec(os.path.join(PRODUCT_DIR, fname)))
            ids.append(fname)                      # keep filename as ID
    np.save(os.path.join(DATA_DIR, "product_vecs.npy"), np.vstack(vecs))
    np.save(os.path.join(DATA_DIR, "product_ids.npy"),  np.array(ids))
    print(f"✅ Indexed {len(ids)} images from {PRODUCT_DIR}")

def load_vectors():
    vecs = np.load(os.path.join(DATA_DIR, "product_vecs.npy"))
    ids  = np.load(os.path.join(DATA_DIR, "product_ids.npy"))
    return ids, vecs.astype("float32")
