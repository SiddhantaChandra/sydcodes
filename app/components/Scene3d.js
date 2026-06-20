"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  AmbientLight,
  AnimationMixer,
  Box3,
  Clock,
  DirectionalLight,
  LoopOnce,
  LoopRepeat,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const Scene3d = ({ distance, speed, yaxis, zoom }) => {
  const mountRef = useRef(null);
  const clickHintRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) {
      return;
    }

    const mountEl = mountRef.current;
    const clickHintEl = clickHintRef.current;
    const heroSectionEl = mountEl.closest("section");

    const scene = new Scene();
    scene.background = null;

    const camera = new PerspectiveCamera(
      45,
      mountEl.clientWidth / mountEl.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 1.3, 3.2);

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mountEl.clientWidth, mountEl.clientHeight);
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    mountEl.appendChild(renderer.domElement);

    const ambientLight = new AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const fillLight = new DirectionalLight(0xffffff, 0.7);
    fillLight.position.set(-2, 2, -3);
    scene.add(fillLight);

    const loader = new GLTFLoader();
    const clock = new Clock();
    let mixer;
    let model;
    let animationFrameId;
    let activeAction;
    let walkAction;
    let jumpAction;
    let groundedAction;
    let isJumping = false;
    let hintHeightOffset = 0;
    let hintSideOffset = -2.35;
    const minX = -distance;
    const maxX = distance;
    const walkSpeed = speed;
    let walkDirection = 1;
    const rightFacingY = Math.PI / 2;
    const leftFacingY = -Math.PI / 2;
    const projectedPosition = new Vector3();
    const worldPosition = new Vector3();

    const findClip = (animations, exactName, fallbackName) =>
      animations.find((clip) => clip.name === exactName) ||
      animations.find((clip) =>
        clip.name.toLowerCase().includes(fallbackName.toLowerCase()),
      );

    const isSceneVisible = () => {
      if (!mountEl?.isConnected) {
        return false;
      }

      const style = window.getComputedStyle(mountEl);
      const rect = mountEl.getBoundingClientRect();

      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        rect.width > 0 &&
        rect.height > 0
      );
    };

    const fadeToAction = (nextAction, fadeDuration = 0.18) => {
      if (!nextAction || activeAction === nextAction) {
        return;
      }

      const previousAction = activeAction;
      activeAction = nextAction;

      nextAction.reset();
      nextAction.enabled = true;
      nextAction.fadeIn(fadeDuration);
      nextAction.play();

      if (previousAction) {
        previousAction.fadeOut(fadeDuration);
      }
    };

    const startWalkLoop = () => {
      if (!walkAction) {
        return;
      }

      walkAction.setLoop(LoopRepeat);
      walkAction.clampWhenFinished = false;
      fadeToAction(walkAction);
    };

    const triggerJump = () => {
      if (
        isJumping ||
        !mixer ||
        !jumpAction ||
        !groundedAction ||
        !isSceneVisible()
      ) {
        return false;
      }

      isJumping = true;

      jumpAction.setLoop(LoopOnce, 1);
      jumpAction.clampWhenFinished = true;
      groundedAction.setLoop(LoopOnce, 1);
      groundedAction.clampWhenFinished = true;

      fadeToAction(jumpAction, 0.12);
      return true;
    };

    const handleHeroPointerDown = (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      triggerJump();
    };

    const handleKeyDown = (event) => {
      const isSpace =
        event.code === "Space" ||
        event.key === " " ||
        event.key === "Spacebar";

      if (!isSpace) {
        return;
      }

      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);

      if (isTyping) {
        return;
      }

      if (triggerJump()) {
        event.preventDefault();
      }
    };

    const handleAnimationFinished = (event) => {
      if (event.action === jumpAction && groundedAction) {
        fadeToAction(groundedAction, 0.08);
        return;
      }

      if (event.action === groundedAction) {
        isJumping = false;
        startWalkLoop();
      }
    };

    loader.load(
      "/3d_asset/Animated_Me.glb",
      (gltf) => {
        model = gltf.scene;
        model.position.set(minX, yaxis, zoom);
        model.rotation.y = rightFacingY;
        model.scale.setScalar(1.15);
        scene.add(model);

        const modelBounds = new Box3().setFromObject(model);
        const modelSize = new Vector3();
        modelBounds.getSize(modelSize);
        if (modelSize.y > 0) {
          hintHeightOffset = modelSize.y * 0.84;
          hintSideOffset = -Math.max(modelSize.x * 1.2, 0.95);
        }

        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new AnimationMixer(model);
          const walkClip = findClip(gltf.animations, "Armature|Walk", "walk");
          const jumpClip = findClip(gltf.animations, "Armature|Jump", "jump");
          const groundedClip = findClip(
            gltf.animations,
            "Armature|Grounded",
            "grounded",
          );

          walkAction = walkClip ? mixer.clipAction(walkClip) : undefined;
          jumpAction = jumpClip ? mixer.clipAction(jumpClip) : undefined;
          groundedAction = groundedClip
            ? mixer.clipAction(groundedClip)
            : undefined;

          if (jumpAction) {
            jumpAction.enabled = true;
          }

          if (groundedAction) {
            groundedAction.enabled = true;
          }

          mixer.addEventListener("finished", handleAnimationFinished);

          if (walkAction) {
            startWalkLoop();
          } else if (gltf.animations[0]) {
            activeAction = mixer.clipAction(gltf.animations[0]);
            activeAction.play();
          }
        }
      },
      undefined,
      (error) => {
        console.error("Failed to load GLB model:", error);
      },
    );

    const onResize = () => {
      if (!mountEl) return;
      const { clientWidth, clientHeight } = mountEl;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    const animate = () => {
      const delta = clock.getDelta();
      if (mixer) {
        mixer.update(delta);
      }
      if (model) {
        model.position.x += walkDirection * walkSpeed * delta;
        if (model.position.x > maxX) {
          model.position.x = maxX;
          walkDirection = -1;
          model.rotation.y = leftFacingY;
        }
        if (model.position.x < minX) {
          model.position.x = minX;
          walkDirection = 1;
          model.rotation.y = rightFacingY;
        }

        if (clickHintEl) {
          model.getWorldPosition(worldPosition);
          projectedPosition
            .copy(worldPosition)
            .add(new Vector3(hintSideOffset, hintHeightOffset, 0))
            .project(camera);

          const isBehindCamera = projectedPosition.z < -1 || projectedPosition.z > 1;
          const hintLeadDelay = 2;
          const hintCycle = Math.max(clock.elapsedTime - hintLeadDelay, 0) % 12;
          const shouldShowHint =
            isSceneVisible() &&
            !isBehindCamera &&
            clock.elapsedTime >= hintLeadDelay &&
            hintCycle < 1.4;

          if (shouldShowHint) {
            const screenX = (projectedPosition.x * 0.5 + 0.5) * mountEl.clientWidth;
            const screenY =
              (-projectedPosition.y * 0.5 + 0.5) * mountEl.clientHeight;

            clickHintEl.style.opacity = "1";
            clickHintEl.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(0, -50%)`;
          } else {
            clickHintEl.style.opacity = "0";
          }
        }
      }
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    heroSectionEl?.addEventListener("pointerdown", handleHeroPointerDown);
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("resize", onResize);

    return () => {
      heroSectionEl?.removeEventListener("pointerdown", handleHeroPointerDown);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);

      if (mixer) {
        mixer.removeEventListener("finished", handleAnimationFinished);
        mixer.stopAllAction();
      }

      if (model) {
        model.traverse((child) => {
          if (child.isMesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((material) => material.dispose());
            } else {
              child.material?.dispose();
            }
          }
        });
      }

      renderer.dispose();
      if (renderer.domElement.parentNode === mountEl) {
        mountEl.removeChild(renderer.domElement);
      }
    };
  }, [distance, speed, yaxis, zoom]);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100vh", position: "relative" }}
    >
      <Image
        ref={clickHintRef}
        src="/scene/click-me-opt.webp"
        alt="Click me"
        width={72}
        height={36}
        sizes="(max-width: 640px) 44px, (max-width: 1024px) 56px, 72px"
        loading="lazy"
        fetchPriority="low"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "clamp(44px, 5vw, 72px)",
          height: "auto",
          pointerEvents: "none",
          opacity: 0,
          zIndex: 30,
          transition: "opacity 240ms ease",
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
};

export default Scene3d;
