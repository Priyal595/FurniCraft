import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ARViewer from '../components/ARViewer';

const ARPage = () => {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const product    = products.find((p) => p.id === id);

  if (!product || !product.model?.glb) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Model not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-6 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="self-start bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition"
      >
        ← Go Back
      </button>

      <h2 className="text-2xl font-bold text-center">
        {product.name} – AR View
      </h2>

      {/* Pass .glb and optional .usdz */}
      <ARViewer
        modelUrl={product.model.glb}
        usdzUrl={product.model.usdz}   // undefined is fine on Android
      />
    </div>
  );
};

export default ARPage;
