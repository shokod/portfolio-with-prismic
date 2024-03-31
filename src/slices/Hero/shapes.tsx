'use client'
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { gsap } from 'gsap';

interface GeometryProps {
  position: [number, number, number];
  r: number;
  geometry: THREE.BufferGeometry;
  materials: THREE.Material[];
  soundEffects: HTMLAudioElement[];
}


export default function Shapes() {
    return (
        <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
            <Canvas
                className='z-0'
                shadows gl={{ antialias: false }}
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}>

                <Suspense fallback={null}>
                    <Geometries />
                    <ContactShadows
                        position={[0, -3.5, 0]}
                        opacity={0.65}
                        scale={40}
                        blur={2}
                        far={9}
                    />
                    <Environment preset='sunset' />
                </Suspense>

            </Canvas>
        </div>
    );
}

function Geometries() {

    const soundEffects = [
        new Audio("/confirmation_001.ogg"),
        
      ];
    const geometries = [
        {
          position: [0, 0, 0],
          r: 0.3,
          geometry: new THREE.IcosahedronGeometry(3), // Gem
        },
        {
          position: [1, -0.75, 4],
          r: 0.4,
          geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16), // Pill
        },
        {
          position: [-1.4, 2, -4],
          r: 0.6,
          geometry: new THREE.DodecahedronGeometry(1.5), // Soccer ball
        },
        {
          position: [-0.8, -0.75, 5],
          r: 0.5,
          geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32), // Donut
        },
        {
          position: [1.6, 1.6, -4],
          r: 0.7,
          geometry: new THREE.OctahedronGeometry(1.5), // Diamond
        },
    ];

    const materials = [
        new THREE.MeshNormalMaterial(),
        new THREE.MeshStandardMaterial({ color: 0x273c75 , roughness: 0.5, metalness: 0.5}),
        new THREE.MeshStandardMaterial({ color: 0x00a8ff, roughness: 0.5, metalness: 0.1 }),
        new THREE.MeshStandardMaterial({ color: 0xe1b12c, roughness: 0.5, metalness: 0.1 }),
        new THREE.MeshStandardMaterial({ color: 0x44bd32, roughness: 0.5, metalness: 0.1 }),
        new THREE.MeshStandardMaterial({ color: 0x192a56, roughness: 0.5, metalness: 0.1 }),
        new THREE.MeshStandardMaterial({ 
            roughness: 0,
            metalness: 0.5,
            map: new THREE.TextureLoader().load('/texture.png') 
        }),
    ]

    return geometries.map(({ position, r, geometry }) => (
        <Geometry
            key={JSON.stringify(position)}
            position={position.map((p) => p * 2) as [number, number, number]}
            r={r}
            geometry={geometry}
            materials={materials}
            soundEffects={soundEffects} />
    )
    );
}

function Geometry({ position, r, geometry, materials, soundEffects }: GeometryProps) {
    const meshRef = useRef<THREE.Group<THREE.Object3DEventMap>>(null);
    const [visible, setVisible] = useState(false);

    const startingMaterial = getRandomMaterial();

    function getRandomMaterial() {
        return gsap.utils.random(materials);
    }

    function handleClick(e: { object: THREE.Object3D }) {
        const mesh = e.object as THREE.Mesh;

        gsap.utils.random(soundEffects).play();

        gsap.to(mesh.rotation, {
            x: `+=${gsap.utils.random(0, 2)}`,
            y: `+=${gsap.utils.random(0, 2)}`,
            z: `+=${gsap.utils.random(0, 2)}`,
            duration: 1,
            ease: 'elastic.out(1,0.3)',
            yoyo: true,
        });

        mesh.material = getRandomMaterial();

    }

    const handlePointerOver = () => {
        document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = () => {
        document.body.style.cursor = 'default';
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
          setVisible(true);
          if (meshRef.current) {
            gsap.from(meshRef.current.scale, {
              x: 0,
              y: 0,
              z: 0,
              duration: gsap.utils.random(0.8, 1.2),
              ease: "elastic.out(1,0.3)",
              delay: gsap.utils.random(0, 0.5),
            });
          }
        });
        return () => ctx.revert();
      }, []);


    return (
        <group position={position} ref={meshRef} >
            <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
                <mesh
                    geometry={geometry}
                    material={startingMaterial as THREE.Material | THREE.Material[]}
                    visible={visible}
                    onClick={handleClick}
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                />

            </Float>

        </group>
    )
}


