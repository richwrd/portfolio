import { useRef, useEffect } from "react";
// import * as THREE from "three";

export function WavesBackground() {
  // const mountRef = useRef<HTMLDivElement>(null); // Garante o tipo correto

  // useEffect(() => {
  //   const currentRef = mountRef.current;

  //   if (!currentRef) return;

  //   const width = currentRef.clientWidth;
  //   const height = currentRef.clientHeight;

  //   const scene = new THREE.Scene();
  //   const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  //   const renderer = new THREE.WebGLRenderer({ antialias: true });

  //   renderer.setSize(width, height);
  //   currentRef.appendChild(renderer.domElement);

  //   const geometry = new THREE.BoxGeometry();
  //   const material = new THREE.MeshBasicMaterial({ color: 0x00ff99 });
  //   const cube = new THREE.Mesh(geometry, material);
  //   scene.add(cube);

  //   camera.position.z = 2;

  //   const animate = () => {
  //     requestAnimationFrame(animate);
  //     cube.rotation.x += 0.01;
  //     cube.rotation.y += 0.01;
  //     renderer.render(scene, camera);
  //   };
  //   animate();

  //   return () => {
  //     currentRef.removeChild(renderer.domElement);
  //     renderer.dispose();
  //   };
  // }, []);

  // return (
  //   <div
  //     ref={mountRef}
  //     style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
  //   />
  // );
}
