import { Canvas } from "@react-three/fiber";
import { Can } from "./can";
import { Environment, Float, PerspectiveCamera } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useRef } from "react";
import { PerspectiveCamera as PCamera} from "three";

// Component to set up background and lights
const World: React.FC = () => {
    return (
        <>
            {/* Add our background color */}
            <color
                attach="background"
                args={['#020202']}
            />

            {/* <Effects /> */}
            <Environment files={"/textures/kloppenheim_02_puresky_1k.hdr"} />
            <hemisphereLight intensity={1} />
            <EffectComposer enableNormalPass={false}>
                <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={0.2} />
            </EffectComposer>
        </>
    )
}

// Main canvas
export const Showcase: React.FC = () => {
    const cameraRef = useRef<PCamera | null>(null);

    // Effect hook to handle window resize (to fix aspect ratio)
    useEffect(() => {
        const handleResize = () => {
            if (cameraRef.current) {
                const width = window.innerWidth;
                const height = window.innerHeight;
                cameraRef.current.aspect = width / height;
                cameraRef.current.updateProjectionMatrix();
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Canvas>
            <PerspectiveCamera
                makeDefault
                ref={cameraRef}
                position={[0, 2, 0]}
                fov={55}
                near={0.01}
                far={1000}
            />
            {/* Make the can float around */}
            <Float
                speed={1.5}                // Speed of the up/down animation
                floatIntensity={1}         // How high it floats
                rotationIntensity={0}      // Disable rotation
                floatingRange={[0, 0.5]}   // Optional: limits the vertical range
            >
                <Can />
            </Float>
            <World />
        </Canvas>
    );
}