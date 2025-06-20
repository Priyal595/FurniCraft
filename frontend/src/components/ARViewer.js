// src/components/ARViewer.js
import '@google/model-viewer';

const ARViewer = ({ modelUrl }) => {
  return (
    <div className="w-full h-[500px]">
      <model-viewer
        src={modelUrl}
        alt="3D Model"
        auto-rotate
        camera-controls
        ar
        ar-modes="webxr scene-viewer quick-look"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default ARViewer;
