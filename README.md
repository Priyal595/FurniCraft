# 🪑 FurniCraft – Smart Furniture Recommender with AR View & Voice Assistant

**FurniCraft** is an AI-powered furniture recommendation system that goes beyond traditional shopping experiences. It integrates cutting-edge features like **Voice Assistant**, **Augmented Reality (AR) View**, and **Room-Based Suggestions** to help users discover the perfect furniture for their space — intuitively and interactively.

> 🔧 **Note**: The rest of the platform (image-based recommendations, UI, etc.) is a functional prototype to support these main features.

---

## ✨ Key Features

### 🗣️ 1. Voice Assistant
Search for furniture using natural language!

You can say things like:
- `"Show me chairs."`
- `"Go to Cart"`

The system interprets your voice commands and performs relevant actions inside the app.

---

### 🪄 2. AR View (Augmented Reality)
Visualize how a furniture item would look in your real space using AR.

- Place 3D models in your room via camera
- Rotate, scale, and adjust items to fit your interior
- Works on AR-supported browsers and mobile devices

---

### 🏠 3. Room-Based Suggestions
Upload an image of your room and receive intelligent furniture suggestions that **match your room’s color scheme and style**.

- Uses **OpenAI CLIP** to extract visual features from your room
- Suggests products that visually align with your space

---

## 🧰 Tech Stack

| Component       | Technology                |
|-----------------|---------------------------|
| Frontend        | React.js                  |
| Backend         | FastAPI (Python)          |
| Voice Assistant | Web Speech API / JS       |
| AR View         | `<model-viewer>` / WebXR  |
| Room Matching   | OpenAI CLIP + Similarity  |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👩‍💻 Author & Credits

**Made by**: Priyal Singh  
**Mentored by**: Raghav Sharma  
GitHub: [Priyal Singh](https://github.com/Priyal595/)
