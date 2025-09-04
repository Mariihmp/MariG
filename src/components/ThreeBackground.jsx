import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x1a1a2e, 1); // dark background
    mountRef.current.appendChild(renderer.domElement);

    // Cool effect: animated floating spheres
    const spheres = [];
    const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00fff7, emissive: 0x222244 });
    for (let i = 0; i < 20; i++) {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial.clone());
      sphere.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4
      );
      scene.add(sphere);
      spheres.push(sphere);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00fff7, 1, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Animation
    let frameId;
    const animate = () => {
      spheres.forEach((sphere, i) => {
        sphere.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01;
        sphere.position.x += Math.cos(Date.now() * 0.001 + i) * 0.005;
      });
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }} />;
};

export default ThreeBackground;
