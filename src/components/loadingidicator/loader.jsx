import React from 'react'
import { Html, useProgress } from '@react-three/drei'
import './load.css'
function Loader() {
  const { progress } = useProgress()
  const roundedProgress = Math.round(progress);

  return (
    <Html center>
      <div className="spinner"></div>
      <div>{roundedProgress}% loaded</div>
    </Html>
  );
}
export default Loader;