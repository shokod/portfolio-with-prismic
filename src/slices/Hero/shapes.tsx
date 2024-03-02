'use client'

import  * as THREE from 'three';
import {Canvas } from '@react-three/fiber';
import {Suspense, useEffect, useRef, useState} from 'react';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { gsap } from 'gsap';
import { div } from 'three/examples/jsm/nodes/Nodes.js';

export default function Shapes() {
    return (
        <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
            <Canvas className='z-0' 
            shadows gl={{antialias:false}} 
            dpr={[1, 1.5]} 
            camera={{position: [0, 0, 25],  fov:30, near:1, far:40}}>
                
                <Suspense fallback={null}>
                    <Geometries />
                    <ContactShadows
                    position={[0, -3.5, 0]}
                    opacity={0.5}
                    scale={40}
                    width={20}
                    height={20}
                    blur={2}
                    far={10}
                    />
                    <Environment preset='studio' />
                </Suspense>

            </Canvas>
        </div>
    )
}

function Geometries(){
    const geometries = [
        {
            position: [0, 0, 0],
            r: 0.3,
            geometry: new THREE.IcosahedronGeometry(3),
        },
    ];

    const materials = [
        new THREE.MeshNormalMaterial(),
    ]

    return geometries.map (({position, r, geometry}) => (
        <Geometry 
        key={JSON.stringify(position)} 
        position={position.map((p) => p * 2)}
        r={r}
        geometry={geometry} 
        materials={materials} />
    )
    );
}

function Geometry({ position, r, geometry, materials }) {
    const meshRef  = useRef();
    const [visible, setVisible] = useState(true);
    
    const startingMaterial = getRandomMaterial();

    function getRandomMaterial() {
        return gsap.utils.random(materials);
    }

    function handleClick(e) {
        const mesh = e.object;

        gsap.to(mesh.rotation,{
            x: `+=${gsap.utils.random(0,2)}`,
            y: `+=${gsap.utils.random(0,2)}`,
            z: `+=${gsap.utils.random(0,2)}`,
            duration: 1,
            ease: 'elastic.out(1,0.3)',
            yoyo: true,
        });

        mesh.material = getRandomMaterial();

        }

        const handlePointerOver = () => {
            document.body.style.cursor = 'pointer';
        }

        const handlePointerOut = () => {
            document.body.style.cursor = 'default';
        }

        return (
            <group position={position} ref={meshRef} >
                <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
                    <mesh 
                    geometry={geometry}
                    material={startingMaterial}
                    visible={visible}
                    onClick={handleClick}
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                    />

                </Float>

            </group>
        )
    }


