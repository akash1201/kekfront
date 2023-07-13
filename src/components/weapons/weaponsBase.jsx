
import React, { Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Stage, PresentationControls } from '@react-three/drei'
import  Loader  from '../loadingidicator/loader'
function Model(props) {
  console.log(props)
    const { scene, nodes, materials } = useGLTF('https://ac-dev-s3.s3.us-west-1.amazonaws.com'+props.glbFile)//'./glb/scar.glb')
    return <primitive object={scene} {...props} />
  }
  
function WeaponsBase(props) {
    //https://codesandbox.io/s/staging-models-forked-up6l6v?file=/src/App.js:489-494 
    const myMesh = React.useRef();

    useFrame(({ clock }) => {
      const a = clock.getElapsedTime();
      myMesh.current.rotation.y = a;
    });

    return (
        <mesh ref={myMesh}>
          <Suspense fallback={<Loader />}>
            <PresentationControls speed={4.0} zoom={1.5} >
              <Stage intensity={2}>
                <Model glbFile={props.glbFile} scale={2.0} />
              </Stage>
            </PresentationControls>
          </Suspense>
        </mesh>
    )
  }

export default WeaponsBase;