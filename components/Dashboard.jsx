'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const mountRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!mountRef.current) return; // Ensure mountRef is defined

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);
    scene.fog = new THREE.FogExp2(0x0a0a1a, 0.002);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(ambientLight, directionalLight);

    // 3D Objects
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshPhongMaterial({
      color: 0x4a6cf7,
      shininess: 100,
      transparent: true,
      opacity: 0.8,
      wireframe: false
    });

    const shapes = [];
    const shapeCount = 10;

    for (let i = 0; i < shapeCount; i++) {
      const shape = new THREE.Mesh(geometry, material.clone());
      shape.position.x = (Math.random() - 0.5) * 30;
      shape.position.y = (Math.random() - 0.5) * 30;
      shape.position.z = (Math.random() - 0.5) * 30;
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const scale = 1 + Math.random() * 2;
      shape.scale.set(scale, scale, scale);
      scene.add(shape);
      shapes.push({
        mesh: shape,
        speed: 0.01 + Math.random() * 0.02
      });
    }

    // Particles
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      sizes[i] = 0.1 + Math.random() * 0.5;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x4a6cf7,
      size: 0.1,
      transparent: true,
      opacity: 0.8
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      shapes.forEach(({ mesh, speed }) => {
        mesh.rotation.x += speed * 0.1;
        mesh.rotation.y += speed * 0.2;
      });

      particleSystem.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement); // Ensure mountRef is still available
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 3D Background */}
      <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Welcome to Lead Generation
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
            Transform your outreach strategy with our powerful automation tools
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8"
        >
          <button
            onClick={() => router.push('/dashboard')}
            className="relative px-8 py-4 text-xl font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group overflow-hidden"
          >
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </motion.div>

        {/* Stats Cards */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-8">
          {[{ value: "10K+", label: "Leads Generated" }, { value: "95%", label: "Delivery Rate" }, { value: "3x", label: "Conversion Boost" }]
            .map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
                className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/10 shadow-lg"
              >
                <div className="text-3xl font-bold text-blue-400">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
