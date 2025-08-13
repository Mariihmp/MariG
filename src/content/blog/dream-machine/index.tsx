import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const DreamMachine = () => {
    const [sceneType, setSceneType] = useState("");
    const mountRef = useRef<HTMLDivElement>(null);

    const handleSceneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSceneType(e.target.value);
    };

    useEffect(() => {
        if (!mountRef.current) return;

        // Remove previous renderer if exists
        while (mountRef.current.firstChild) {
            mountRef.current.removeChild(mountRef.current.firstChild);
        }

        const width = mountRef.current.clientWidth || window.innerWidth;
        const height = 400;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        let animationFrameId: number | null = null;

        // Helper to clear scene objects and dispose geometries/materials
        function clearScene() {
            scene.traverse((object: THREE.Object3D) => {
                // Only dispose if geometry/material exist and have dispose method
                if ("geometry" in object && (object as any).geometry && typeof (object as any).geometry.dispose === "function") {
                    (object as any).geometry.dispose();
                }
                if ("material" in object && (object as any).material) {
                    if (Array.isArray((object as any).material)) {
                        (object as any).material.forEach((mat: any) => {
                            if (mat && typeof mat.dispose === "function") mat.dispose();
                        });
                    } else if (typeof (object as any).material.dispose === "function") {
                        (object as any).material.dispose();
                    }
                }
            });
            while (scene.children.length > 0) {
                scene.remove(scene.children[0]);
            }
        }

        function renderScene() {
            clearScene();

            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }

            switch (sceneType) {
                case "zen": {
                    const zenAmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
                    scene.add(zenAmbientLight);

                    const zenPointLight = new THREE.PointLight(0xffd700, 1, 100);
                    zenPointLight.position.set(10, 10, 10);
                    scene.add(zenPointLight);

                    const zenGeometry = new THREE.BoxGeometry(2, 2, 2);
                    const zenMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
                    const zenCube = new THREE.Mesh(zenGeometry, zenMaterial);
                    scene.add(zenCube);

                    const zenPlaneGeometry = new THREE.PlaneGeometry(20, 20);
                    const zenPlaneMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513, side: THREE.DoubleSide });
                    const zenPlane = new THREE.Mesh(zenPlaneGeometry, zenPlaneMaterial);
                    zenPlane.rotation.x = Math.PI / 2;
                    scene.add(zenPlane);

                    camera.position.set(5, 5, 5);
                    controls.update();

                    const zenAnimate = () => {
                        animationFrameId = requestAnimationFrame(zenAnimate);
                        zenCube.rotation.y += 0.01;
                        controls.update();
                        renderer.render(scene, camera);
                    };
                    zenAnimate();
                    break;
                }
                case "chaos": {
                    const chaosAmbientLight = new THREE.AmbientLight(0xffffff, 0.2);
                    scene.add(chaosAmbientLight);

                    const chaosSpotLight = new THREE.SpotLight(0xff0000, 1, 100);
                    chaosSpotLight.position.set(10, 20, 10);
                    scene.add(chaosSpotLight);

                    const chaosParticlesGeometry = new THREE.BufferGeometry();
                    const chaosParticlesCount = 1000;
                    const chaosPositions = new Float32Array(chaosParticlesCount * 3);

                    for (let i = 0; i < chaosParticlesCount * 3; i++) {
                        chaosPositions[i] = (Math.random() - 0.5) * 10;
                    }

                    chaosParticlesGeometry.setAttribute("position", new THREE.BufferAttribute(chaosPositions, 3));
                    const chaosParticlesMaterial = new THREE.PointsMaterial({ color: 0xff4500, size: 0.1 });
                    const chaosParticles = new THREE.Points(chaosParticlesGeometry, chaosParticlesMaterial);
                    scene.add(chaosParticles);

                    camera.position.set(0, 0, 10);
                    controls.update();

                    const chaosAnimate = () => {
                        animationFrameId = requestAnimationFrame(chaosAnimate);
                        chaosParticles.rotation.x += 0.001;
                        chaosParticles.rotation.y += 0.002;
                        controls.update();
                        renderer.render(scene, camera);
                    };
                    chaosAnimate();
                    break;
                }
                case "cyber": {
                    const cyberAmbientLight = new THREE.AmbientLight(0xffffff, 0.3);
                    scene.add(cyberAmbientLight);

                    const cyberDirectionalLight = new THREE.DirectionalLight(0x00ffff, 1);
                    cyberDirectionalLight.position.set(10, 10, 5);
                    scene.add(cyberDirectionalLight);

                    const cyberBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
                    const cyberBoxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff });
                    const cyberBoxes: THREE.Mesh[] = [];

                    for (let i = 0; i < 50; i++) {
                        const cyberBox = new THREE.Mesh(cyberBoxGeometry, cyberBoxMaterial);
                        cyberBox.position.set(
                            (Math.random() - 0.5) * 10,
                            (Math.random() - 0.5) * 10,
                            (Math.random() - 0.5) * 10
                        );
                        cyberBoxes.push(cyberBox);
                        scene.add(cyberBox);
                    }

                    camera.position.set(10, 10, 10);
                    controls.update();

                    const cyberAnimate = () => {
                        animationFrameId = requestAnimationFrame(cyberAnimate);
                        cyberBoxes.forEach((box) => {
                            box.rotation.x += 0.01;
                            box.rotation.y += 0.01;
                        });
                        controls.update();
                        renderer.render(scene, camera);
                    };
                    cyberAnimate();
                    break;
                }
                case "myth": {
                    const mythAmbientLight = new THREE.AmbientLight(0xffffff, 0.4);
                    scene.add(mythAmbientLight);

                    const mythPointLight = new THREE.PointLight(0xffd700, 1, 100);
                    mythPointLight.position.set(10, 10, 10);
                    scene.add(mythPointLight);

                    const mythTorusGeometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16);
                    const mythTorusMaterial = new THREE.MeshPhongMaterial({ color: 0x8a2be2 });
                    const mythTorus = new THREE.Mesh(mythTorusGeometry, mythTorusMaterial);
                    scene.add(mythTorus);

                    camera.position.set(5, 5, 5);
                    controls.update();

                    const mythAnimate = () => {
                        animationFrameId = requestAnimationFrame(mythAnimate);
                        mythTorus.rotation.x += 0.01;
                        mythTorus.rotation.y += 0.01;
                        controls.update();
                        renderer.render(scene, camera);
                    };
                    mythAnimate();
                    break;
                }
                default: {
                    camera.position.set(0, 0, 5);
                    controls.update();
                    renderer.render(scene, camera);
                    break;
                }
            }
        }

        renderScene();

        function handleResize() {
            const width = mountRef.current?.clientWidth || window.innerWidth;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }
        window.addEventListener("resize", handleResize);

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
            if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            clearScene();
        };
    }, [sceneType]);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold mb-6">Dream Machine</h1>
            <p className="text-lg text-gray-300 mb-8">Choose a dream scene from the dropdown!</p>
            <div className="w-full max-w-md mb-12">
                <select value={sceneType} onChange={handleSceneChange} className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-blue-500 transition">
                    <option value="">Select a Dream Scene</option>
                    <option value="zen">Peaceful Zen Garden</option>
                    <option value="chaos">Chaotic Storm</option>
                    <option value="cyber">Cyber City</option>
                    <option value="myth">Mythical Dragon</option>
                </select>
            </div>
            <div ref={mountRef} className="w-full max-w-4xl h-[400px] mt-12" />
        </div>
    );
};

export default DreamMachine;