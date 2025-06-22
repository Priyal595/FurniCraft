import { useState } from "react";
import axios from "axios";
import { products } from "../data/products";

export default function StyleUpload() {
  const [file, setFile]       = useState(null);
  const [preview, setPreview] = useState(null);
  const [matches, setMatches] = useState([]);

  const getRecs = async () => {
    if (!file) return;
    const form = new FormData();
    form.append("image", file);
    const { data } = await axios.post("http://localhost:5000/recommend", form);
    // Map filenames back to product objects
    const recs = data.results
      .map((r) =>
        products.find((p) => p.image.toLowerCase().includes(r.filename.toLowerCase()))
      )
      .filter(Boolean);
    setMatches(recs);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Style-Based Suggestions</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setPreview(URL.createObjectURL(e.target.files[0]));
        }}
        className="file:mr-4 file:px-4 file:py-2 file:border-0
                   file:text-sm file:bg-primary file:text-white rounded"
      />

      {preview && (
        <>
          <img src={preview} alt="room" className="w-full mt-4 rounded shadow" />
          <button
            onClick={getRecs}
            className="mt-4 bg-primary text-white px-4 py-2 rounded shadow"
          >
            Get Recommendations
          </button>
        </>
      )}

      {matches.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mt-8">Matches Your Room</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map((p) => (
              <div key={p.id} className="border rounded-lg overflow-hidden shadow">
                <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-medium">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">₹{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
