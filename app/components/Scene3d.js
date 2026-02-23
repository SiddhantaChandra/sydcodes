"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const Scene3d = ({ distance, speed, yaxis, zoom }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) {
      return;
    }

    const mountEl = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      45,
      mountEl.clientWidth / mountEl.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 1.3, 3.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mountEl.clientWidth, mountEl.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    mountEl.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.7);
    fillLight.position.set(-2, 2, -3);
    scene.add(fillLight);

    const loader = new GLTFLoader();
    const clock = new THREE.Clock();
    let mixer;
    let model;
    let animationFrameId;
    const minX = -distance;
    const maxX = distance;
    const walkSpeed = speed;
    let walkDirection = 1;
    const rightFacingY = Math.PI / 2;
    const leftFacingY = -Math.PI / 2;

    loader.load(
      "/3d_asset/Animated_Me.glb",
      (gltf) => {
        model = gltf.scene;
        model.position.set(minX, yaxis, zoom);
        model.rotation.y = rightFacingY;
        model.scale.setScalar(1.15);
        scene.add(model);

        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          const walkClip =
            gltf.animations.find((clip) => clip.name === "Armature|Walk") ||
            gltf.animations.find((clip) =>
              clip.name.toLowerCase().includes("walk"),
            ) ||
            gltf.animations[0];
          const action = mixer.clipAction(walkClip);
          action.play();
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
      }
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);

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
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Scene3d;
