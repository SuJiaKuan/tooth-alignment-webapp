import { GroupProps } from "@react-three/fiber";

const BIG_NUM = 2**16

const Floor = ({
    visible,
    width = 0,
    length = 0,
    noShadow = false,
    offset = 0,
    ...otherProps
}) => {
  const position = [
    width / 2,
    length / 2,
    -offset,
  ];
  const planeArgs = [
    width || BIG_NUM,
    length || BIG_NUM,
    Math.floor(width / 20) || 1,
    Math.floor(length / 20) || 1,
  ];
  if (!visible) return null;

  return (
    <group {...otherProps} >
      {width && length && <mesh receiveShadow position={position}>
        <planeGeometry args={planeArgs}/>
        <meshStandardMaterial wireframe={true} color={"#777"}/>
      </mesh>}
      {!noShadow && <mesh receiveShadow position={position}>
        <planeGeometry args={planeArgs}/>
        <shadowMaterial opacity={.2}/>
      </mesh>}
    </group>
  );
}

export default Floor
