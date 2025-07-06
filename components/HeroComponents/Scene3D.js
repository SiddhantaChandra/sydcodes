'use client';

import { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useAnimations } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

// Debug utility: Traverse house.glb and log all object names/types
function DebugHouseGLB() {
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load('/assets-3d/house.glb', (gltf) => {
      console.log('Traversing house.glb scene graph:');
      gltf.scene.traverse((obj) => {
        console.log(`Name: ${obj.name}, Type: ${obj.type}`);
      });
    }, undefined, (err) => {
      console.error('Failed to load house.glb:', err);
    });
  }, []);
  return null;
}


function AnimatedCharacter({ path, scale = 0.8, speed = 2, walkRange = 14, jumpTrigger, onJumpEnd }) {
  const group = useRef();
  const gltf = useLoader(GLTFLoader, path);
  const { actions } = useAnimations(gltf.animations, group);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [targetRotation, setTargetRotation] = useState(Math.PI / 2); // Facing left initially
  const initialized = useRef(false);
  const jumping = useRef(false);
  const lastJumpTrigger = useRef(0);

  // Log available animation names for debugging
  useEffect(() => {
    if (actions) {
      console.log('Available animation actions:', Object.keys(actions));
    }
  }, [actions]);

  // Play walk animation (default)
  useEffect(() => {
    if (actions && !jumping.current) {
      actions['Armature|Walk']?.reset().fadeIn(0.2).play();
    }
    return () => {
      if (actions && !jumping.current) actions['Armature|Walk']?.fadeOut(0.2).stop();
    };
  }, [actions]);

  // Handle jump trigger
  useEffect(() => {
    // Only trigger jump if not already jumping and jumpTrigger changed
    if (
      jumpTrigger &&
      actions &&
      actions['Armature|Jump'] &&
      !jumping.current &&
      jumpTrigger !== lastJumpTrigger.current
    ) {
      jumping.current = true;
      lastJumpTrigger.current = jumpTrigger;
      actions['Armature|Walk']?.fadeOut(0.1);
      const jumpAction = actions['Armature|Jump'];
      jumpAction?.reset().fadeIn(0.1).play();
      jumpAction.clampWhenFinished = true;
      jumpAction.setLoop(THREE.LoopOnce, 1);

      // Handler to resume walk
      const resumeWalk = () => {
        jumpAction?.fadeOut(0.1);
        actions['Armature|Walk']?.reset().fadeIn(0.2).play();
        jumping.current = false;
        if (onJumpEnd) onJumpEnd();
      };

      // Listen for animation finished event on the mixer
      const mixer = actions['Armature|Jump']?._mixer;
      const onMixerFinished = (e) => {
        if (e.action === jumpAction) {
          resumeWalk();
        }
      };
      mixer && mixer.addEventListener('finished', onMixerFinished);

      // Fallback: resume walk after animation duration
      const duration = jumpAction.getClip().duration * 1000;
      const timeout = setTimeout(() => {
        resumeWalk();
      }, duration + 100); // small buffer

      // Cleanup
      return () => {
        clearTimeout(timeout);
        mixer && mixer.removeEventListener('finished', onMixerFinished);
      };
    }
  }, [jumpTrigger, actions, onJumpEnd]);

  // Set initial position to extreme left only once
  useFrame(() => {
    if (group.current && !initialized.current) {
      group.current.position.x = -walkRange;
      initialized.current = true;
    }
  });

  // Animate walking, turning, and move during jump
  useFrame((state, delta) => {
    if (group.current && initialized.current) {
      // Move in current direction (always, even if jumping)
      group.current.position.x += 0.01 * speed * direction;
      // Smoothly rotate towards targetRotation
      group.current.rotation.y += (targetRotation - group.current.rotation.y) * 0.15;
      // If reached right edge, turn to walk left
      if (direction === 1 && group.current.position.x > walkRange) {
        setDirection(-1);
        setTargetRotation(-Math.PI / 2); // Face right
      }
      // If reached left edge, turn to walk right
      if (direction === -1 && group.current.position.x < -walkRange) {
        setDirection(1);
        setTargetRotation(Math.PI / 2); // Face left
      }
    }
  });

  // Place at bottom and rotate to face left
  return (
    <group ref={group} position={[0, -4.8, 0]} rotation={[0, Math.PI / 2, 0]} scale={1}>
      <primitive object={gltf.scene} />
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#0066FF" transparent opacity={0.3} />
    </mesh>
  );
}

// New RoadBlock component
function RoadBlock({ position = [10, -4.8, 0] }) {
  const gltf = useLoader(GLTFLoader, '/assets-3d/RoadBlock.glb');
  const scene = gltf.scene.clone(true);
  return (
    <group position={position} scale={5}>
      <primitive object={scene} />
    </group>
  );
}

function StreetLight({
  position = [10, -4.8, -1.3], // Lamp post base position
  rotation = [0, 0, 0], // Lamp post rotation
  withSpotlight = false, // Enable/disable spotlight and cone
  // Spotlight parameters
  spotColor = '#ffb347', // Color of the spotlight
  spotIntensity = 8, // Intensity of the spotlight
  spotAngle = 2, // Angle (radians) of the spotlight cone
  spotPenumbra = 0.9, // Penumbra (softness) of the spotlight
  spotDistance = 30, // How far the spotlight reaches
  spotDecay = 2, // How quickly the light dims
  // Cone (visual beam) parameters
  coneColor = '#ffb347', // Color of the visible cone
  coneOpacity = 0.4, // Opacity of the cone
  coneEmissive = '#ffb347', // Emissive color for glow
  coneEmissiveIntensity = 0.5, // Emissive intensity for glow
  coneRadius = 1.6, // Base radius of the cone
  coneLength = 10, // Height/length of the cone
  coneRotation = [-Math.PI / 3, 0, 0], // Rotation of the cone mesh
  conePosition = [0, -1, 0], // Position of the cone mesh (relative to lamp head)
}) {
  const gltf = useLoader(GLTFLoader, '/assets-3d/StreetLight-2.glb');
  const scene = gltf.scene.clone(true);
  const lampHeadOffset = [2, 5.5, -0.7]; // Offset from base to lamp head
  const lightRef = useRef();
  const targetRef = useRef();
  useEffect(() => {
    if (withSpotlight && lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current;
    }
  }, [withSpotlight]);
  return (
    <group position={position} scale={6} rotation={rotation}>
      <primitive object={scene} />
      {withSpotlight && (
        <>
          {/* --- Spotlight (real light source) --- */}
          <spotLight
            ref={lightRef}
            position={lampHeadOffset} // Position at lamp head
            color={spotColor} // Light color
            intensity={spotIntensity} // Light intensity
            angle={spotAngle} // Cone angle (radians)
            penumbra={spotPenumbra} // Softness
            distance={spotDistance} // Reach
            decay={spotDecay} // Dimming
          />
          {/* Target for the spotlight (where it points) */}
          <object3D ref={targetRef} position={[0, -4, 2]} />
          {/* --- Visible cone mesh (visual beam) --- */}
          <mesh position={conePosition} rotation={coneRotation}>
            <cylinderGeometry args={[0.02, coneRadius, coneLength, 32, 1, true]} />
            <meshStandardMaterial
              color={coneColor} // Cone color
              transparent
              opacity={coneOpacity} // Cone opacity
              emissive={coneEmissive} // Glow color
              emissiveIntensity={coneEmissiveIntensity} // Glow intensity
            />
          </mesh>
        </>
      )}
    </group>
  );
}

export default function Scene3D() {
  const { theme } = useTheme();
  // Use the same walkRange as AnimatedCharacter
  const walkRange = 14;
  // RoadBlock positions (repeat along x-axis)
  const blockCount = 7;
  const blockSpacing = 4;
  const blockY = -5.8;
  const blockZ = 0;
  const blockScale = 1.2;
  const roadBlockPositions = Array.from({ length: blockCount }, (_, i) => [
    -walkRange + i * blockSpacing,
    blockY,
    blockZ
  ]);
  const [jumpTrigger, setJumpTrigger] = useState(0);
  // Handler to trigger jump
  const handleCanvasPointerDown = () => {
    // Only trigger jump if not already jumping
    if (!window.__characterJumping) {
      setJumpTrigger(j => j + 1);
      window.__characterJumping = true;
      setTimeout(() => { window.__characterJumping = false; }, 1000); // reset after 1s (should match jump duration)
    }
  };
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Debug utility for house.glb traversal */}
      {/* <DebugHouseGLB /> */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        onPointerDown={handleCanvasPointerDown}
      >
        {/* Lighting setup: only change for dark mode */}
        {theme === 'dark' ? (
          <>
            <hemisphereLight intensity={0.25} groundColor="#181a22" skyColor="#1a1a2a" />
            <ambientLight intensity={0.08} />
            <directionalLight
              position={[0, 8, 8]}
              intensity={1.2}
            />
            <pointLight position={[0, 2, 2]} intensity={0.3} color="#aaccff" />
          </>
        ) : (
          <>
            <hemisphereLight intensity={2.5} groundColor="#222244" skyColor="#ffffff" />
            <ambientLight intensity={1.2} />
            <directionalLight position={[0, 2, 4]} intensity={2.5} />
            <pointLight position={[0, 1, 2]} intensity={1.5} color="#ffffff" />
          </>
        )}
        <Suspense fallback={null}>
          {/* StreetLights with spotlights in dark mode */}
          <StreetLight position={[10, -4.8, -1.3]} rotation={[0, Math.PI / 4, 0]} withSpotlight={theme === 'dark'} coneColor="#ffb347" coneOpacity={0.4} coneEmissive="#ffb347" coneEmissiveIntensity={0.1} coneRadius={1.6} coneLength={7} coneRotation={[0, 0, 0]} conePosition={[-0.215, -2.6, 0.0]} />
          <StreetLight position={[-6, -4.3, 2]} rotation={[0, Math.PI / 0.13, 0]} withSpotlight={theme === 'dark'} coneColor="#ffb347" coneOpacity={0.4} coneEmissive="#ffb347" coneEmissiveIntensity={0.1} coneRadius={1.6} coneLength={7} coneRotation={[0, 0, 0]} conePosition={[-0.19, -2.6, 0.0]} coneTopRadius={0.15} />
          <Suspense fallback={<LoadingFallback />}>
            <AnimatedCharacter path="/assets-3d/Animated_Me.glb" scale={0.8} speed={2} walkRange={walkRange} jumpTrigger={jumpTrigger} />
          </Suspense>
          <RoadBlock position={[15, -4.8, 0]} />
          <RoadBlock position={[11.7, -4.8, 0]} />
          <RoadBlock position={[8.4, -4.8, 0]} />
          <RoadBlock position={[5.1, -4.8, 0]} />
          <RoadBlock position={[1.8, -4.8, 0]} />
          <RoadBlock position={[-1.4, -4.8, 0]} />
          <RoadBlock position={[-4.5, -4.81, 0]} />
          <RoadBlock position={[-7.68, -4.82, 0]} />
          <RoadBlock position={[-10.8, -4.83, 0]} />
          <RoadBlock position={[-13.7, -4.84, 0]} />
          <RoadBlock position={[-15.7, -4.85, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
} 