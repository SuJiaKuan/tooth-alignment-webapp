import { useRef, useEffect } from 'react';
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DoubleSide } from "three";


const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 10;
      controls.maxDistance = 100;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};

const Viewer = ({urls}) => {
  const geom = useLoader(STLLoader, urls[0]);

  const ref = useRef();
  const {camera} = useThree();
  useEffect(() => {
    camera.lookAt(ref.current.position);
  });

  return (
    <>
      <CameraController />
      <mesh ref={ref} castShadow scale={[2, 2, 2]}>
        <primitive object={geom} attach="geometry"/>
        <meshStandardMaterial side={DoubleSide} color={"hotpink"} opacity={1}/>
      </mesh>
      <ambientLight color="#FFFFFF" intensity={1}/>
    </>
  );
};

export default Viewer;
