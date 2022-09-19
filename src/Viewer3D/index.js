import { Suspense, useState, useEffect } from 'react';

import { Canvas } from "@react-three/fiber";
import { PCFSoftShadowMap } from "three";

import SceneSetup from "./SceneSetup";
import Loading from "../Loading";

const Viewer3D = ({
  urls,
  colors,
  style = {}
}) => {
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
    <div style={{
      position: "relative",
      ...style
    }}>
      <Suspense fallback={
        <Loading
          style={{
            margin: "auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      }>
        <Canvas
          key={urls.join()}
          shadows
          gl={{preserveDrawingBuffer: true, shadowMapType: PCFSoftShadowMap, antialias: true}}
          style={canvasStyle}
        >
          <SceneSetup
            urls={urls}
            colors={colors}
            sceneReady={sceneReady}
            setToReady={setToReady}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Viewer3D;
