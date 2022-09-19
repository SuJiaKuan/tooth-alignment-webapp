import { useState, useEffect, createRef } from 'react';

import { useFrame } from "@react-three/fiber";
import { Box3, Matrix4, DoubleSide } from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";

const Model3D = ({
  geometries,
  urls,
  colors,
  position,
  scale = 1,
  visible,
  onLoaded,
  ...otherProps
}) => {
  const [loading, setLoading] = useState(false);
  const [meshes, setMeshes] = useState([]);

  useEffect(() => {
    setMeshes((meshes) =>
      Array(geometries.length)
        .fill()
        .map((_, i) => meshes[i] || createRef()),
    )
    setLoading(true)
  }, [urls])

  useFrame(() => {
    if (
      !loading ||
      geometries.some((geometry) => !geometry.boundingSphere) ||
      meshes.some((mesh) => !mesh.current)
    ) {
      return;
    }

    // XXX (Jia-Kuan, Su):
    // Tricky way to prevent attributes inconsistent problem for geomtries merging.
    // https://discourse.threejs.org/t/using-mergebuffergeometries-with-geometries-that-have-different-attributes/19166
    const geometries_ = geometries.map((geometry, index) => {
      const geometry_ = geometry.clone();

      delete geometry_.attributes.color;

      return geometry_;
    });
    const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries_, true);

    mergedGeometry.computeBoundingBox();
    mergedGeometry.computeBoundingSphere();

    const { min, max } = mergedGeometry.boundingBox;
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
              color={colors[index]}
              opacity={visible ? 1 : 0}
            />
          </mesh>
        ))
      }
    </group>
  );
};

export default Model3D;
