"use client";
import { useEffect, useRef } from "react";

export default function HeroMannequin() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;
    let cleanup: (() => void) | null = null;

    import("three").then((THREE) => {
      const scene = new THREE.Scene();
      scene.background = null;
      scene.fog = new THREE.Fog(0x0d0d10, 8, 24);

      const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
      camera.position.set(0, 1.5, 7.8);
      camera.lookAt(0, 1.4, 0);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);

      // Materials
      const matBody = new THREE.MeshStandardMaterial({ color: 0xe8dccb, roughness: 0.55, metalness: 0.0 });
      const matJoint = new THREE.MeshStandardMaterial({ color: 0xc7b9a3, roughness: 0.7, metalness: 0.0 });
      const matAccent = new THREE.MeshStandardMaterial({ color: 0xff6b3d, roughness: 0.45, metalness: 0.1, emissive: new THREE.Color(0x331005) });

      function makeLimb(radius: number, length: number, mat: THREE.MeshStandardMaterial) {
        const geo = new THREE.CapsuleGeometry(radius, length - radius * 2, 6, 16);
        const m = new THREE.Mesh(geo, mat);
        m.castShadow = true;
        m.receiveShadow = true;
        m.position.y = -length / 2;
        return m;
      }
      function jointBall(radius: number, mat: THREE.MeshStandardMaterial = matJoint) {
        const m = new THREE.Mesh(new THREE.SphereGeometry(radius, 18, 14), mat);
        m.castShadow = true;
        m.receiveShadow = true;
        return m;
      }

      const figure = new THREE.Group();
      figure.position.y = 0.05;
      scene.add(figure);

      const root = new THREE.Group();
      root.position.y = 1.5;
      figure.add(root);

      const pelvis = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.22, 0.32), matBody);
      pelvis.castShadow = true; pelvis.receiveShadow = true;
      pelvis.position.y = -0.11;
      root.add(pelvis);

      const spine = new THREE.Group();
      spine.position.set(0, 0.0, 0);
      root.add(spine);
      const spineMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.28, 14), matBody);
      spineMesh.castShadow = true;
      spineMesh.position.y = 0.16;
      spine.add(spineMesh);

      const chest = new THREE.Group();
      chest.position.set(0, 0.32, 0);
      spine.add(chest);
      const chestMesh = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.45, 0.36), matBody);
      chestMesh.castShadow = true; chestMesh.receiveShadow = true;
      chestMesh.position.y = 0.14;
      chest.add(chestMesh);

      const neck = new THREE.Group();
      neck.position.set(0, 0.36, 0);
      chest.add(neck);
      const neckMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.09, 0.14, 12), matJoint);
      neckMesh.castShadow = true;
      neckMesh.position.y = 0.07;
      neck.add(neckMesh);

      const head = new THREE.Group();
      head.position.set(0, 0.18, 0);
      neck.add(head);
      const skull = new THREE.Mesh(new THREE.SphereGeometry(0.20, 28, 22), matBody);
      skull.castShadow = true;
      skull.scale.set(1, 1.05, 0.95);
      skull.position.y = 0.06;
      head.add(skull);
      const hairGeo = new THREE.SphereGeometry(0.21, 28, 18, 0, Math.PI * 2, 0, Math.PI * 0.52);
      const hair = new THREE.Mesh(hairGeo, new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.5 }));
      hair.castShadow = true;
      hair.position.y = 0.07;
      head.add(hair);

      const badge = new THREE.Mesh(new THREE.CircleGeometry(0.025, 16), matAccent);
      badge.position.set(0.18, 0.16, 0.182);
      chest.add(badge);

      function buildArm(side: number) {
        const shoulder = new THREE.Group();
        shoulder.position.set(0.36 * side, 0.28, 0);
        chest.add(shoulder);
        shoulder.add(jointBall(0.085));
        const upperArmGroup = new THREE.Group();
        shoulder.add(upperArmGroup);
        upperArmGroup.rotation.z = side * 0.06;
        upperArmGroup.add(makeLimb(0.065, 0.46, matBody));
        const elbow = new THREE.Group();
        elbow.position.y = -0.46;
        upperArmGroup.add(elbow);
        elbow.add(jointBall(0.07));
        const forearmGroup = new THREE.Group();
        elbow.add(forearmGroup);
        forearmGroup.rotation.x = -0.15;
        forearmGroup.add(makeLimb(0.058, 0.42, matBody));
        const wrist = new THREE.Group();
        wrist.position.y = -0.42;
        forearmGroup.add(wrist);
        const hand = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.12, 0.05), matBody);
        hand.castShadow = true;
        hand.position.y = -0.06;
        wrist.add(hand);
        return { shoulder, upperArmGroup, elbow, forearmGroup, wrist };
      }
      const armL = buildArm(-1);
      const armR = buildArm(1);

      function buildLeg(side: number) {
        const hip = new THREE.Group();
        hip.position.set(0.14 * side, -0.22, 0);
        root.add(hip);
        hip.add(jointBall(0.085));
        const upperLegGroup = new THREE.Group();
        hip.add(upperLegGroup);
        upperLegGroup.add(makeLimb(0.082, 0.58, matBody));
        const knee = new THREE.Group();
        knee.position.y = -0.58;
        upperLegGroup.add(knee);
        knee.add(jointBall(0.075));
        const lowerLegGroup = new THREE.Group();
        knee.add(lowerLegGroup);
        lowerLegGroup.add(makeLimb(0.07, 0.56, matBody));
        const ankle = new THREE.Group();
        ankle.position.y = -0.56;
        lowerLegGroup.add(ankle);
        const foot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.07, 0.24), matJoint);
        foot.castShadow = true;
        foot.position.set(0, -0.035, 0.05);
        ankle.add(foot);
        return { hip, upperLegGroup, knee, lowerLegGroup, ankle };
      }
      buildLeg(-1);
      buildLeg(1);

      // Ground shadow
      const ground = new THREE.Mesh(new THREE.CircleGeometry(2.6, 64), new THREE.ShadowMaterial({ opacity: 0.35 }));
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = 0;
      ground.receiveShadow = true;
      scene.add(ground);

      // Accent puddle
      const c = document.createElement("canvas");
      c.width = c.height = 256;
      const ctx2d = c.getContext("2d")!;
      const g = ctx2d.createRadialGradient(128, 128, 10, 128, 128, 128);
      g.addColorStop(0, "rgba(255,107,61,0.5)");
      g.addColorStop(1, "rgba(255,107,61,0)");
      ctx2d.fillStyle = g;
      ctx2d.fillRect(0, 0, 256, 256);
      const puddle = new THREE.Mesh(
        new THREE.PlaneGeometry(2.8, 2.8),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false, opacity: 0.35 })
      );
      puddle.rotation.x = -Math.PI / 2;
      puddle.position.y = 0.001;
      scene.add(puddle);

      // Lighting
      scene.add(new THREE.AmbientLight(0x3a3a44, 0.35));
      const keyLight = new THREE.DirectionalLight(0xfff2e0, 1.55);
      keyLight.position.set(2.8, 4.5, 3.2);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 14;
      keyLight.shadow.camera.left = -3;
      keyLight.shadow.camera.right = 3;
      keyLight.shadow.camera.top = 4;
      keyLight.shadow.camera.bottom = -1;
      keyLight.shadow.bias = -0.0008;
      (keyLight.shadow as THREE.DirectionalLightShadow).radius = 5;
      scene.add(keyLight);
      const rimLight = new THREE.DirectionalLight(0xff6b3d, 1.6);
      rimLight.position.set(-3.5, 2.2, -2.6);
      scene.add(rimLight);
      const fillLight = new THREE.DirectionalLight(0x7a86ff, 0.45);
      fillLight.position.set(-2.0, 1.8, 3.0);
      scene.add(fillLight);

      // Particles
      const PARTICLE_COUNT = 220;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const speeds = new Float32Array(PARTICLE_COUNT);
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 8;
        positions[i * 3 + 1] = Math.random() * 4 + 0.1;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 0.5;
        speeds[i] = 0.0008 + Math.random() * 0.0014;
      }
      particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({ color: 0xf5f1e8, size: 0.018, transparent: true, opacity: 0.55, depthWrite: false, sizeAttenuation: true });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      // Pointer tracking
      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
      const onPointer = (e: PointerEvent) => {
        pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.ty = -((e.clientY / window.innerHeight) * 2 - 1);
      };
      window.addEventListener("pointermove", onPointer);

      // Resize
      const resize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener("resize", resize);

      // Scroll
      let scrollY = 0;
      const onScroll = () => { scrollY = window.scrollY; };
      window.addEventListener("scroll", onScroll, { passive: true });

      // Animation
      const clock = new THREE.Clock();

      const animate = () => {
        rafId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        pointer.x += (pointer.tx - pointer.x) * 0.06;
        pointer.y += (pointer.ty - pointer.y) * 0.06;

        const breath = Math.sin(t * 1.5) * 0.018;
        root.position.y = 1.5 + breath;
        chest.scale.y = 1 + Math.sin(t * 1.5) * 0.012;
        chest.scale.x = 1 + Math.sin(t * 1.5 + 0.6) * 0.006;

        root.rotation.y = Math.sin(t * 0.5) * 0.05 + pointer.x * 0.18;
        spine.rotation.z = Math.sin(t * 0.7) * 0.012;
        chest.rotation.y = pointer.x * 0.08;

        armL.upperArmGroup.rotation.x = Math.sin(t * 0.9) * 0.025 - 0.04;
        armR.upperArmGroup.rotation.x = Math.sin(t * 0.9 + Math.PI) * 0.025 - 0.04;
        armL.upperArmGroup.rotation.z = -0.06 + Math.sin(t * 0.6) * 0.015;
        armR.upperArmGroup.rotation.z = 0.06 + Math.sin(t * 0.6 + Math.PI) * 0.015;
        armL.forearmGroup.rotation.x = -0.18 + Math.sin(t * 1.0) * 0.02;
        armR.forearmGroup.rotation.x = -0.18 + Math.sin(t * 1.0 + Math.PI * 0.8) * 0.02;

        head.rotation.y = pointer.x * 0.45;
        head.rotation.x = -pointer.y * 0.25;
        neck.rotation.y = pointer.x * 0.18;

        const pos = particleGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          pos[i * 3 + 1] += speeds[i];
          pos[i * 3 + 0] += Math.sin((t + i) * 0.3) * 0.0006;
          if (pos[i * 3 + 1] > 4.2) {
            pos[i * 3 + 1] = 0.05;
            pos[i * 3 + 0] = (Math.random() - 0.5) * 8;
          }
        }
        particleGeo.attributes.position.needsUpdate = true;
        particles.rotation.y += 0.0006;

        const scrollT = Math.min(scrollY / 800, 1);
        camera.position.y = 1.5 + scrollT * 0.35;
        camera.position.z = 7.8 - scrollT * 0.5;
        camera.lookAt(0, 1.4 - scrollT * 0.1, 0);
        camera.position.x = pointer.x * 0.2;

        renderer.render(scene, camera);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("resize", resize);
        window.removeEventListener("scroll", onScroll);
        particleGeo.dispose();
        particleMat.dispose();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    });

    return () => { cleanup?.(); };
  }, []);

  return (
    <div
      ref={containerRef}
      id="hero-canvas"
      style={{ position: "absolute", inset: 0 }}
    />
  );
}
