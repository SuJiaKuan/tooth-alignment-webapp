import { useState, useEffect } from 'react';

import { useLoader, useThree, useFrame } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "@react-three/drei";
import { Box3 } from "three";

import Camera from "./Camera";
import Model3D from "./Model3D";
import Floor from "./Floor";
import Lights from "./Lights";

const CAMERA_OFFSET = 200
const POSITION_FACTOR = 140
const LIGHT_DISTANCE = 350
const FLOOR_DISTANCE = .4

const SceneSetup = ({
  urls,
  modelProps: {
    scale = 1,
    positionX = 0,
    positionY = 0,
    rotationX = 0,
    rotationY = 0,
    rotationZ = 0,
  } = {},
  floorProps: {
    gridWidth = 0,
    gridLength = 0,
  } = {},
}) => {
  const { camera } = useThree();

  const [mesh, setMesh] = useState();
  const [group, setGroup] = useState();
  const [meshDims, setMeshDims] = useState({
    width: 0,
    height: 0,
    length: 0,
    boundingRadius: 0,
  });
  const [cameraTarget, setCameraTarget] = useState([0, 0, 0]);
  const [sceneReady, setSceneReady] = useState(false);

  const geometry = useLoader(STLLoader, urls[0]);

  useEffect(() => {
    setSceneReady(false);
  }, [urls])

  function onLoaded(dims, mesh, group) {
    setMesh(mesh);
    setGroup(group);

    const { width, length, height, boundingRadius } = dims;
    setMeshDims(dims);

    const f = boundingRadius / POSITION_FACTOR;
    camera.position.set(-CAMERA_OFFSET * f, -CAMERA_OFFSET * f, Math.max(height, 100));

    const target = [positionX | width / 2, positionY | length / 2, height / 2];
    camera.lookAt(...target);

    setCameraTarget(target);

    // let the three.js render loop place things
    setTimeout(() => setSceneReady(true), 100);
  }

  useFrame(({ scene }) => {
    if (!sceneReady || !geometry.boundingSphere || !mesh.current || !group.current) return;

    const bbox = new Box3().setFromObject(mesh);
    const height = bbox.max.z - bbox.min.z;

    group.position.z = height / 2;
  })

  const cameraPosition = [
    -.5 * CAMERA_OFFSET * meshDims.boundingRadius / POSITION_FACTOR,
    -CAMERA_OFFSET * meshDims.boundingRadius / POSITION_FACTOR,
    Math.max(meshDims.height, 100),
  ];

  const modelPosition = [
    positionX || (meshDims.width * scale) / 2,
    positionY || (meshDims.length * scale) / 2,
    0,
  ];

  return (
    <>
      <Camera position={cameraPosition}/>
      <Model3D
        geometry={geometry}
        position={modelPosition}
        rotation={[rotationX, rotationY, rotationZ]}
        scale={scale}
        visible={sceneReady}
        onLoaded={onLoaded}
      />
      <Floor
        width={gridWidth || gridLength}
        length={gridLength || gridWidth}
        visible={sceneReady}
        noShadow={false}
        offset={FLOOR_DISTANCE}
      />
      <Lights
        distance={LIGHT_DISTANCE}
        offsetX={modelPosition[0]}
        offsetY={modelPosition[1]}
      />
      {
        sceneReady &&
        <OrbitControls target={cameraTarget}/>
      }
    </>
  );
};

export default SceneSetup;
