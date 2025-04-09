// This is going to be the file for importing the ca
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh, Object3D } from "three";
import { useEffect, useRef } from "react";

// Expose function returning the react component for our can
export const Can: React.FC = () => {
    const {scene} = useGLTF("/model/monster.glb");  // Import using the GLTF loader from drei
    const can = useRef<Object3D>(null);

    // Initialize certain properties, casting shadows, recieving shadows, and env map intensity
    useEffect(() => {
        scene.children.forEach((child) => {
            child.receiveShadow = true;
            child.castShadow = true;
            if(child instanceof Mesh){
                child.material.envMapIntensity = 0;   
            }
            
        });
    }, [scene]);

    useFrame(() => {
        if(can.current){
            can.current.rotation.y += 0.01;
        }
    })

    return(
        <group position={[-0.25, 2, -4]} rotation={[0, 0, Math.PI/4]} scale={[0.15, 0.15, 0.15]}>
            <primitive ref={can} object={scene}/>
        </group>
    )
}

useGLTF.preload("/model/monster.glb");