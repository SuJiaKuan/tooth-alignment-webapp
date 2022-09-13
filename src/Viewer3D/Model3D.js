import { useState, useEffect, createRef } from 'react';

import { useFrame } from "@react-three/fiber";
import { Box3, Matrix4, DoubleSide } from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";

const Model3D = ({
  geometries,
  urls,
  position,
  scale = 1,
  visible,
  onLoaded,
  ...otherProps
}) => {
  const [loading, setLoading] = useState(false);
  const [meshes, setMeshes] = useState([]);

  useEffect(() => {
    setLoading(true)
    setMeshes(urls.map(() => createRef()))
  }, [urls])

  useFrame(() => {
    if (
      !loading ||
      geometries.every((geometry) => !geometry.boundingSphere) ||
      meshes.every((mesh) => !mesh.current)
    ) {
      return;
    }

    const minXArr = [];
    const minYArr = [];
    const minZArr = [];
    const maxXArr = [];
    const maxYArr = [];
    const maxZArr = [];

    meshes.forEach((mesh, index) => {
      // Set correct property on geometry.boundingBox
      new Box3().setFromObject(mesh.current);

      const { min, max } = geometries[index].boundingBox;

      minXArr.push(min.x);
      minYArr.push(min.y);
      minZArr.push(min.z);
      maxXArr.push(max.x);
      maxYArr.push(max.y);
      maxZArr.push(max.z);
    });

    const min = {
      x: Math.min(...minXArr),
      y: Math.min(...minYArr),
      z: Math.min(...minZArr),
    };
    const max = {
      x: Math.max(...maxXArr),
      y: Math.max(...maxYArr),
      z: Math.max(...maxZArr),
    };
    const dims = {
      width: max.x - min.x,
      length: max.y - min.y,
      height: max.z - min.z,
    };

    for (const geometry of geometries) {
      geometry.computeVertexNormals();
      geometry.applyMatrix4(new Matrix4().makeTranslation(
        -min.x - dims.width / 2,
        -min.y - dims.length / 2,
        -min.z - dims.height / 2,
      ));
    }

    const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, true);

    mergedGeometry.computeBoundingSphere();

    onLoaded({
      ...dims,
      // TODO (Jia-Kuan, Su): Re-Calculate the bounding sphere radius.
      boundingRadius: mergedGeometry.boundingSphere.radius,
    });
    setLoading(false);
  });

  return (
    <group {...otherProps}>
      {
        urls.map((url, index) => (
          <mesh
            key={url}
            ref={meshes[index]}
            castShadow
            scale={[scale, scale, scale]}
          >
            <primitive object={geometries[index]} attach="geometry"/>
            <meshStandardMaterial
              side={DoubleSide}
              color={"hotpink"}
              opacity={visible ? 1 : 0}
            />
          </mesh>
        ))
      }
    </group>
  );
};

export default Model3D;
