import { Suspense, useState, useEffect } from 'react';

import { Canvas } from "@react-three/fiber";
import { PCFSoftShadowMap } from "three";

import SceneSetup from "./SceneSetup";

const Viewer3D = ({ urls, style = {} }) => {
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    setSceneReady(false);
  }, [urls])

  const setToReady = () => setSceneReady(true);

  const canvasStyle = {
    width: "100%",
    height: "100%",
    visibility: sceneReady ? "visible" : "hidden",
  };

  return (
    <div style={style}>
      <Suspense fallback={null}>
        <Canvas
          key={urls.join()}
          shadows
          gl={{preserveDrawingBuffer: true, shadowMapType: PCFSoftShadowMap, antialias: true}}
          style={canvasStyle}
        >
          <SceneSetup
            urls={urls}
            sceneReady={sceneReady}
            setToReady={setToReady}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Viewer3D;
