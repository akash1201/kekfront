import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls, useAnimations } from '@react-three/drei';
import Loader from '../loadingidicator/loader';

function Model(props) {
  const { scene } = useGLTF('https://ac-dev-s3.s3.us-west-1.amazonaws.com' + props.glbFile);
  return <primitive object={scene} {...props} />;
}

function CharacterBase(props) {
  const myMesh = useRef();
  return (
    <mesh ref={myMesh}>
      <Suspense fallback={<Loader />}>
        <PresentationControls speed={4.0} zoom={1.5}>
          <Stage intensity={2}>
            <Model glbFile={props.glbFile} scale={2.0} />
          </Stage>
        </PresentationControls>
      </Suspense>
    </mesh>
  );
}

export default CharacterBase;
