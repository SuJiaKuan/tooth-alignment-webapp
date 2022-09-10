import { useRef, useState, useEffect } from 'react';

import { useFrame } from "@react-three/fiber";
import { Box3, Matrix4, DoubleSide } from "three";

const Model3D = ({
  geometry,
  position,
  scale = 1,
  visible,
  onLoaded,
  ...otherProps
}) => {
  const mesh = useRef();
  const group = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
  }, [geometry])

  useFrame(() => {
    if (!loading || !geometry.boundingSphere || !mesh.current || !group.current) return;

    // this appears to set the correct property on geometry.boundingBox
    new Box3().setFromObject(mesh.current);

    const { min, max } = geometry.boundingBox || {
      min: {x: 0, y: 0, z: 0},
      max: {x: 0, y: 0, z: 0},
    };
    const dims = {
      width: max.x - min.x,
      length: max.y - min.y,
      height: max.z - min.z,
    };

    geometry.computeVertexNormals();
    geometry.applyMatrix4(new Matrix4().makeTranslation(
      -min.x - dims.width / 2,
      -min.y - dims.length / 2,
      -min.z - dims.height / 2,
    ));

    onLoaded({
        ...dims,
        boundingRadius: geometry.boundingSphere.radius,
      },
      mesh.current,
      group.current,
    )
    setLoading(false);
  });

  return (
    <group ref={group} {...otherProps}>
      <mesh
        ref={mesh}
        castShadow
        scale={[scale, scale, scale]}
      >
        <primitive object={geometry} attach="geometry"/>
        <meshStandardMaterial
          side={DoubleSide}
          color={"hotpink"}
          opacity={visible ? 1 : 0}
        />
      </mesh>
    </group>
  );
};

export default Model3D;
