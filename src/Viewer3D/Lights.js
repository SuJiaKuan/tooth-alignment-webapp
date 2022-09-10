const Lights = ({
  offsetX=0,
  offsetY=0,
  offsetZ=0,
  distance,
}) => {
  return (
    <>
      <ambientLight/>
      <spotLight
        castShadow
        position={[offsetX, offsetY, distance+offsetZ]}
      />
      {[
        [-distance + offsetX, offsetY, distance + offsetZ],
        [offsetX, -distance + offsetY, distance + offsetZ],
        [offsetX, distance + offsetY, offsetZ]
      ].map((position, index) => (
        <spotLight
          key={index}
          intensity={.4}
          position={position}
        />
      ))}
    </>
  );
};

export default Lights;
