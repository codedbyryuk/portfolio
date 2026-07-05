// ThreeScene.jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
  const frameRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const scene = new THREE.Scene();
    const group = new THREE.Group();
    scene.add(group);

    const inkColor = 0x15161b;
    const redColor = 0xe14226;

    // Shell
    const shellGeo = new THREE.IcosahedronGeometry(2, 1);
    const shellMat = new THREE.MeshBasicMaterial({ color: inkColor, wireframe: true, transparent: true, opacity: 0.55 });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    group.add(shell);

    // Nodes
    const nodesMat = new THREE.PointsMaterial({ color: inkColor, size: 0.05, sizeAttenuation: true });
    const nodes = new THREE.Points(shellGeo, nodesMat);
    group.add(nodes);

    // Accent Nodes
    const posAttr = shellGeo.attributes.position;
    const accentGroup = new THREE.Group();
    const accentIdx = [];
    const stepCount = Math.max(1, Math.floor(posAttr.count / 7));
    for (let i = 0; i < posAttr.count; i += stepCount) { accentIdx.push(i); }
    accentIdx.slice(0, 6).forEach((idx) => {
      const v = new THREE.Vector3().fromBufferAttribute(posAttr, idx);
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 8, 8),
        new THREE.MeshBasicMaterial({ color: redColor })
      );
      sphere.position.copy(v);
      accentGroup.add(sphere);
    });
    group.add(accentGroup);

    // Inner Core
    const innerGeo = new THREE.OctahedronGeometry(0.85, 0);
    const innerMat = new THREE.MeshBasicMaterial({ color: inkColor, wireframe: true, transparent: true, opacity: 0.8 });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    group.add(inner);

    function resize() {
      const size = frame.clientWidth;
      if (!size) return;
      renderer.setSize(size, size, false);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize);

    let dragging = false, lastX = 0, lastY = 0, velX = 0, velY = 0;

    function pointerDown(e) {
      dragging = true;
      frame.classList.add("dragging");
      const p = e.touches ? e.touches[0] : e;
      lastX = p.clientX; lastY = p.clientY;
    }
    function pointerMove(e) {
      if (!dragging) return;
      const p = e.touches ? e.touches[0] : e;
      const dx = p.clientX - lastX;
      const dy = p.clientY - lastY;
      velX = dx * 0.006;
      velY = dy * 0.006;
      group.rotation.y += velX;
      group.rotation.x = Math.max(-0.7, Math.min(0.7, group.rotation.x + velY));
      lastX = p.clientX; lastY = p.clientY;
      e.preventDefault();
    }
    function pointerUp() {
      dragging = false;
      frame.classList.remove("dragging");
    }

    canvas.addEventListener("pointerdown", pointerDown);
    window.addEventListener("pointermove", pointerMove, { passive: false });
    window.addEventListener("pointerup", pointerUp);
    canvas.addEventListener("touchstart", pointerDown, { passive: true });
    window.addEventListener("touchmove", pointerMove, { passive: false });
    window.addEventListener("touchend", pointerUp);

    let inViewport = true;
    let pageVisible = !document.hidden;
    let isVisible = true;
    function syncVisible() { isVisible = inViewport && pageVisible; }

    let visObserver;
    if ("IntersectionObserver" in window) {
      visObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => { inViewport = entry.isIntersecting; });
        syncVisible();
      }, { threshold: 0 });
      visObserver.observe(frame);
    }

    const handleVisibilityChange = () => {
      pageVisible = !document.hidden;
      syncVisible();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const autoSpeed = reduceMotion ? 0 : 0.0016;
    let animationId;

    function animate() {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) return;

      if (!dragging) {
        group.rotation.y += autoSpeed + velX;
        group.rotation.x += velY;
        velX *= 0.94;
        velY *= 0.94;
        group.rotation.x = Math.max(-0.7, Math.min(0.7, group.rotation.x));
      }
      inner.rotation.y -= autoSpeed * 1.6;
      inner.rotation.x += autoSpeed;

      renderer.render(scene, camera);
    }
    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerup", pointerUp);
      window.removeEventListener("touchmove", pointerMove);
      window.removeEventListener("touchend", pointerUp);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (visObserver) visObserver.disconnect();
      cancelAnimationFrame(animationId);
      
      // Dispose Three.js geometry/materials
      shellGeo.dispose();
      shellMat.dispose();
      nodesMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="figure-block reveal">
      <div className="figure-frame" ref={frameRef}>
        <canvas ref={canvasRef}></canvas>
      </div>
      <p className="figure-caption">Fig. 01 — Node graph, live render. Drag to rotate.</p>
    </div>
  );
}