// src/components/ARViewer.js
import '@google/model-viewer';

const ARViewer = ({ modelUrl, usdzUrl }) => {
  return (
    <model-viewer
      src={modelUrl}
      ios-src={usdzUrl}                    /* optional USDZ for iOS */
      environment-image="neutral"         /* nice default lighting */
      ar                                  /* turn on AR support      */
      ar-modes="scene-viewer webxr quick-look"
      ar-scale="auto"
      auto-rotate
      camera-controls
      shadow-intensity="1"
      style={{ width: '100%', maxWidth: '600px', height: '500px' }}
    >
      {/* 🔘 Custom button shown only when AR is available */}
      <button
        slot="ar-button"
        className="mt-4 bg-primary text-white font-medium px-5 py-2 rounded-lg shadow hover:bg-primary/90 transition"
      >
        📷 View&nbsp;in&nbsp;your&nbsp;space
      </button>

      {/* Fallback text when AR isn’t supported (desktop w/o WebXR) */}
      <div slot="ar-failure" className="text-center text-muted-foreground mt-4">
        AR not supported on this device.
      </div>
    </model-viewer>
  );
};

export default ARViewer;
