import React, { useEffect } from "react"
import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";

const Camera = ({ ...otherProps }) => {
    const { camera } = useThree()

    useEffect(() => {
        camera.up.applyAxisAngle(new Vector3(1, 0, 0), Math.PI / 2)
    }, [camera])

    return (
        <PerspectiveCamera
            makeDefault
            near={1}
            far={1000}
            {...otherProps}
        />
    )
}

export default Camera
