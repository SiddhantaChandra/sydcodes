'use client';

import { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useAnimations } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

function AnimatedCharacter({ path, scale = 0.8, speed = 2, walkRange = 14, jumpTrigger, onJumpEnd }) {
  const group = useRef();
  const gltf = useLoader(GLTFLoader, path);
  const { actions } = useAnimations(gltf.animations, group);
  const [direction, setDirection] = useState(1);
  const [targetRotation, setTargetRotation] = useState(Math.PI / 2);
  const initialized = useRef(false);
  const jumping = useRef(false);
  const lastJumpTrigger = useRef(0);

  useEffect(() => {
    if (actions) {
      console.log('Available animation actions:', Object.keys(actions));
    }
  }, [actions]);

  useEffect(() => {
    if (actions && !jumping.current) {
      actions['Armature|Walk']?.reset().fadeIn(0.2).play();
    }
    return () => {
      if (actions && !jumping.current) actions['Armature|Walk']?.fadeOut(0.2).stop();
    };
  }, [actions]);

  useEffect(() => {
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

      const resumeWalk = () => {
        jumpAction?.fadeOut(0.1);
        actions['Armature|Walk']?.reset().fadeIn(0.2).play();
        jumping.current = false;
        if (onJumpEnd) onJumpEnd();
      };

      const mixer = actions['Armature|Jump']?._mixer;
      const onMixerFinished = (e) => {
        if (e.action === jumpAction) {
          resumeWalk();
        }
      };
      mixer && mixer.addEventListener('finished', onMixerFinished);

      const duration = jumpAction.getClip().duration * 1000;
      const timeout = setTimeout(() => {
        resumeWalk();
      }, duration + 100);

      return () => {
        clearTimeout(timeout);
        mixer && mixer.removeEventListener('finished', onMixerFinished);
      };
    }
  }, [jumpTrigger, actions, onJumpEnd]);

  useFrame(() => {
    if (group.current && !initialized.current) {
      group.current.position.x = -walkRange;
      initialized.current = true;
    }
  });

  useFrame((state, delta) => {
    if (group.current && initialized.current) {
      group.current.position.x += 0.01 * speed * direction;
      group.current.rotation.y += (targetRotation - group.current.rotation.y) * 0.15;
      if (direction === 1 && group.current.position.x > walkRange) {
        setDirection(-1);
        setTargetRotation(-Math.PI / 2);
      }
      if (direction === -1 && group.current.position.x < -walkRange) {
        setDirection(1);
        setTargetRotation(Math.PI / 2);
      }
    }
  });

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

function RoadBlock({ position = [10, -4.8, 0] }) {
  const gltf = useLoader(GLTFLoader, '/assets-3d/RoadBlock.glb');
  const scene = gltf.scene.clone(true);
  return (
    <group position={position} scale={5}>
      <primitive object={scene} />
    </group>
  );
}

export default function Scene3DSmall() {
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
  const handleCanvasPointerDown = () => {
    if (!window.__characterJumping) {
      setJumpTrigger(j => j + 1);
      window.__characterJumping = true;
      setTimeout(() => { window.__characterJumping = false; }, 1000);
    }
  };
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: '#000' }}
        dpr={[1, 2]}
        onPointerDown={handleCanvasPointerDown}
      >
        <Suspense fallback={null}>
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