import { Suspense } from 'react';

import { Canvas } from "@react-three/fiber";
import { PCFSoftShadowMap } from "three";

import SceneSetup from "./SceneSetup";

const Viewer3D = ({ urls }) => {
  return (
    <div>
      <Suspense fallback={null}>
        <Canvas
          shadows
          gl={{preserveDrawingBuffer: true, shadowMapType: PCFSoftShadowMap, antialias: true}}
          style={{width: "100%", height: "100%"}}
        >
          <SceneSetup urls={urls} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Viewer3D;
