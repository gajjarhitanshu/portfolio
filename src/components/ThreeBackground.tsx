"use client";
import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 110;
const SPREAD_X = 9;
const SPREAD_Y = 5;
const SPREAD_Z = 3.5;
const CONNECT_DIST = 2.4;
const MAX_LINES = PARTICLE_COUNT * 8;

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    let cleanup: (() => void) | null = null;

    import("three").then((THREE) => {
      const container = mountRef.current!;
      const W = container.clientWidth;
      const H = container.clientHeight;

      /* ── renderer ── */
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      /* ── scene / camera ── */
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
      camera.position.set(0, 0, 7);

      /* ── particles ── */
      const pos = new Float32Array(PARTICLE_COUNT * 3);
      const vel = new Float32Array(PARTICLE_COUNT * 3);
      const sizes = new Float32Array(PARTICLE_COUNT);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * SPREAD_X * 2;
        pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y * 2;
        pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_Z * 2;
        vel[i * 3]     = (Math.random() - 0.5) * 0.003;
        vel[i * 3 + 1] = (Math.random() - 0.5) * 0.0025;
        vel[i * 3 + 2] = (Math.random() - 0.5) * 0.0015;
        /* a few "hub" nodes are larger */
        sizes[i] = i < 8 ? 0.07 : Math.random() * 0.025 + 0.018;
      }

      const ptGeo = new THREE.BufferGeometry();
      ptGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      ptGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      /* custom shader material so each particle respects its own size */
      const ptMat = new THREE.ShaderMaterial({
        uniforms: { color: { value: new THREE.Color(0x5eead4) } },
        vertexShader: `
          attribute float size;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (320.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.1, d) * 0.75;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
      });

      const points = new THREE.Points(ptGeo, ptMat);
      scene.add(points);

      /* ── line segments ── */
      const lineBuf = new Float32Array(MAX_LINES * 2 * 3);
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(lineBuf, 3));

      const lineMat = new THREE.LineBasicMaterial({
        color: 0x5eead4,
        transparent: true,
        opacity: 0.12,
      });
      const lineSegs = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(lineSegs);

      /* ── mouse parallax ── */
      let mx = 0, my = 0;
      const onMouse = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth  - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouse);

      /* ── resize ── */
      const onResize = () => {
        const nW = container.clientWidth;
        const nH = container.clientHeight;
        camera.aspect = nW / nH;
        camera.updateProjectionMatrix();
        renderer.setSize(nW, nH);
      };
      window.addEventListener("resize", onResize);

      /* ── animation loop ── */
      let rafId: number;
      let t = 0;

      const animate = () => {
        rafId = requestAnimationFrame(animate);
        t += 0.0008;

        /* drift particles */
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          pos[i * 3]     += vel[i * 3];
          pos[i * 3 + 1] += vel[i * 3 + 1] + Math.sin(t + i * 0.8) * 0.0003;
          pos[i * 3 + 2] += vel[i * 3 + 2];

          /* wrap-around */
          if (pos[i * 3]     >  SPREAD_X)  pos[i * 3]     = -SPREAD_X;
          if (pos[i * 3]     < -SPREAD_X)  pos[i * 3]     =  SPREAD_X;
          if (pos[i * 3 + 1] >  SPREAD_Y)  pos[i * 3 + 1] = -SPREAD_Y;
          if (pos[i * 3 + 1] < -SPREAD_Y)  pos[i * 3 + 1] =  SPREAD_Y;
          if (pos[i * 3 + 2] >  SPREAD_Z)  pos[i * 3 + 2] = -SPREAD_Z;
          if (pos[i * 3 + 2] < -SPREAD_Z)  pos[i * 3 + 2] =  SPREAD_Z;
        }
        ptGeo.attributes.position.needsUpdate = true;

        /* build connections */
        let li = 0;
        for (let i = 0; i < PARTICLE_COUNT && li < MAX_LINES - 1; i++) {
          for (let j = i + 1; j < PARTICLE_COUNT && li < MAX_LINES - 1; j++) {
            const dx = pos[i * 3] - pos[j * 3];
            const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
            const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
            if (dx * dx + dy * dy + dz * dz < CONNECT_DIST * CONNECT_DIST) {
              lineBuf[li * 6]     = pos[i * 3];
              lineBuf[li * 6 + 1] = pos[i * 3 + 1];
              lineBuf[li * 6 + 2] = pos[i * 3 + 2];
              lineBuf[li * 6 + 3] = pos[j * 3];
              lineBuf[li * 6 + 4] = pos[j * 3 + 1];
              lineBuf[li * 6 + 5] = pos[j * 3 + 2];
              li++;
            }
          }
        }
        lineGeo.attributes.position.needsUpdate = true;
        lineGeo.setDrawRange(0, li * 2);

        /* subtle camera parallax */
        camera.position.x += (mx * 0.5  - camera.position.x) * 0.015;
        camera.position.y += (-my * 0.25 - camera.position.y) * 0.015;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };

      animate();

      cleanup = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", onResize);
        ptGeo.dispose();
        ptMat.dispose();
        lineGeo.dispose();
        lineMat.dispose();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    });

    return () => { cleanup?.(); };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}
