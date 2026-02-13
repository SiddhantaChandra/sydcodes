'use client';

import { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useAnimations } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';


function AnimatedCharacter({ path, scale = 0.8, speed = 2, walkRange = 14, y = -4.8, jumpTrigger, onJumpEnd }) {
  const group = useRef();
  const gltf = useLoader(GLTFLoader, path);
  const { actions } = useAnimations(gltf.animations, group);
  const walkActionRef = useRef(null);
  const jumpActionRef = useRef(null);
  const finishedHandlerRef = useRef(null);
  const [direction, setDirection] = useState(1);
  const [targetRotation, setTargetRotation] = useState(Math.PI / 2);
  const initialized = useRef(false);
  const jumping = useRef(false);
  const lastJumpTrigger = useRef(0);
  const jumpStartTime = useRef(null);
  const arcDoneRef = useRef(false);
  const pendingResumeRef = useRef(false);
  const baseY = useRef(y);
  const jumpDuration = 0.5;
  const jumpHeight = 1.2;

  useEffect(() => {
    baseY.current = y;
    if (group.current && !jumping.current) {
      group.current.position.y = y;
    }
  }, [y]);

  useEffect(() => {
    if (!actions) return undefined;
    const walk = actions['Armature|Walk'];
    const jump = actions['Armature|Jump'];
    walkActionRef.current = walk || null;
    jumpActionRef.current = jump || null;

    if (walk) {
      walk.enabled = true;
      walk.reset().fadeIn(0.15).play();
      walk.setEffectiveWeight(1);
    }

    if (jump) {
      jump.enabled = true;
      jump.clampWhenFinished = true;
      jump.setLoop(THREE.LoopOnce, 1);
      jump.setEffectiveWeight(0);
    }

    return () => {
      if (walk) walk.stop();
      if (jump) jump.stop();
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
      const walkAction = walkActionRef.current;
      const jumpAction = jumpActionRef.current;
      if (!jumpAction) return undefined;

      const mixer = jumpAction._mixer;
      if (mixer && finishedHandlerRef.current) {
        mixer.removeEventListener('finished', finishedHandlerRef.current);
      }

      jumping.current = true;
      lastJumpTrigger.current = jumpTrigger;
      jumpStartTime.current = null;
      arcDoneRef.current = false;
      pendingResumeRef.current = false;

      if (walkAction) {
        walkAction.enabled = true;
        walkAction.setEffectiveWeight(1);
        walkAction.play();
      }

      jumpAction.enabled = true;
      jumpAction.reset();
      jumpAction.setEffectiveWeight(1);
      if (walkAction) {
        jumpAction.crossFadeFrom(walkAction, 0.12, false);
      }
      jumpAction.play();

      const resumeWalk = () => {
        if (walkAction) {
          walkAction.enabled = true;
          walkAction.setEffectiveWeight(1);
          walkAction.reset().fadeIn(0.2).play();
        }
        jumpAction.setEffectiveWeight(0);
        jumping.current = false;
        if (group.current) group.current.position.y = baseY.current;
        if (onJumpEnd) onJumpEnd();
      };

      const onMixerFinished = (e) => {
        if (e.action === jumpAction) {
          if (arcDoneRef.current) {
            resumeWalk();
          } else {
            pendingResumeRef.current = true;
          }
        }
      };

      if (mixer) {
        finishedHandlerRef.current = onMixerFinished;
        mixer.addEventListener('finished', onMixerFinished);
      }

      const clipDuration = jumpAction.getClip()?.duration ?? jumpDuration;
      const duration = Math.max(clipDuration, jumpDuration);
      const timeout = setTimeout(() => {
        resumeWalk();
      }, duration * 1000 + 120);

      return () => {
        clearTimeout(timeout);
        if (mixer && onMixerFinished) mixer.removeEventListener('finished', onMixerFinished);
      };
    }
  }, [jumpTrigger, actions, onJumpEnd]);

  useFrame(() => {
    if (group.current && !initialized.current) {
      group.current.position.x = -walkRange;
      group.current.position.y = baseY.current;
      initialized.current = true;
    }
  });

  useFrame((state, delta) => {
    if (group.current && initialized.current) {
      if (jumping.current) {
        const now = state.clock.getElapsedTime();
        if (jumpStartTime.current === null) jumpStartTime.current = now;
        const t = Math.min(1, (now - jumpStartTime.current) / jumpDuration);
        const eased = t * t * (3 - 2 * t);
        const offset = Math.sin(Math.PI * eased) * jumpHeight;
        group.current.position.y = baseY.current + offset;
        if (t >= 1) {
          group.current.position.y = baseY.current;
          arcDoneRef.current = true;
          if (pendingResumeRef.current) {
            pendingResumeRef.current = false;
            const walkAction = walkActionRef.current;
            const jumpAction = jumpActionRef.current;
            if (walkAction) {
              walkAction.enabled = true;
              walkAction.setEffectiveWeight(1);
              walkAction.reset().fadeIn(0.2).play();
            }
            if (jumpAction) jumpAction.setEffectiveWeight(0);
            jumping.current = false;
            if (onJumpEnd) onJumpEnd();
          }
        }
      } else {
        group.current.position.y = baseY.current;
      }

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
    <group ref={group} position={[0, y, 0]} rotation={[0, Math.PI / 2, 0]} scale={scale}>
      <primitive object={gltf.scene} />
    </group>
  );
}

export default function Scene3D({
  path = '/assets-3d/Animated_Me.glb',
  scale = 0.8,
  speed = 2,
  walkRange = 14,
  y = -4.8,
  className = 'absolute inset-0 pointer-events-none z-20'
}) {
  const isDark = true;
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
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        onPointerDown={handleCanvasPointerDown}
      >
        {/* Static lighting (dark mode styling) */}
        {isDark ? (
          <>
            <hemisphereLight intensity={0.38} groundColor="#1a1c26" skyColor="#2a3040" />
            <ambientLight intensity={0.18} />
            <directionalLight
              position={[0, 8, 8]}
              intensity={1.6}
            />
            <pointLight position={[0, 2, 2]} intensity={0.55} color="#c7e2ff" />
          </>
        ) : null}
        <Suspense fallback={null}>
          <AnimatedCharacter path={path} scale={scale} speed={speed} walkRange={walkRange} y={y} jumpTrigger={jumpTrigger} />
        </Suspense>
      </Canvas>
    </div>
  );
} 