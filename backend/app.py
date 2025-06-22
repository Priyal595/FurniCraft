import io
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
from model_utils import _image_to_vec, load_vectors

ids, vecs = load_vectors()                       # load on startup

app = FastAPI(title="Style-Match API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # tighten when deployed
    allow_methods=["POST"],
    allow_headers=["*"],
)

@app.post("/recommend")
async def recommend(image: UploadFile = File(...), top_k: int = 5):
    """Return top-k similar products given a room photo."""
    room_img = Image.open(io.BytesIO(await image.read())).convert("RGB")
    q = _image_to_vec(room_img)                   # 512-D query vector

    # cosine similarity (dot product because vectors are unit length)
    sims = vecs @ q
    top = sims.argsort()[-top_k:][::-1]

    results = [{"filename": ids[i], "score": float(sims[i])} for i in top]
    return {"results": results}
