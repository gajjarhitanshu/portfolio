import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Hero3D() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    // ── Renderer ──────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.set(0, 0, isMobile ? 6.5 : 5)
    camera.lookAt(0, 0, 0)

    // ── Icosphere wireframe ───────────────────────────────────────
    const RADIUS = isMobile ? 1.1 : 1.4
    const icoGeo = new THREE.IcosahedronGeometry(RADIUS, isMobile ? 2 : 3)
    const wireGeo = new THREE.WireframeGeometry(icoGeo)
    const wireMat = new THREE.LineBasicMaterial({ color: 0xff6b3d, transparent: true, opacity: 0.55 })
    const icosphere = new THREE.LineSegments(wireGeo, wireMat)
    scene.add(icosphere)

    // Ghost trail layers (shown on hover / fast rotation)
    const GHOST_LAGS = [0.10, 0.22]
    const ghosts = GHOST_LAGS.map((lag, idx) => {
      const m = new THREE.LineBasicMaterial({ color: 0xff6b3d, transparent: true, opacity: 0 })
      const g = new THREE.LineSegments(wireGeo, m)
      scene.add(g)
      return { mesh: g, mat: m, lag, baseOpacity: 0.18 - idx * 0.07 }
    })

    // ── Glow spheres (additive) ───────────────────────────────────
    const glowLayers = [
      { r: RADIUS * 1.28, opacity: 0.045 },
      { r: RADIUS * 1.12, opacity: 0.04  },
    ].map(({ r, opacity }) => {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xff6b3d, transparent: true, opacity,
        side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
      })
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 24), mat)
      scene.add(mesh)
      return { mesh, mat, baseOpacity: opacity }
    })

    // ── Particles ─────────────────────────────────────────────────
    const PARTICLE_COUNT = isMobile ? 300 : 450
    const pos   = new Float32Array(PARTICLE_COUNT * 3)
    const base  = new Float32Array(PARTICLE_COUNT * 3)
    const phase = new Float32Array(PARTICLE_COUNT)
    const oRad  = new Float32Array(PARTICLE_COUNT)
    const oSpd  = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = 2 * Math.PI * Math.random()
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = RADIUS * (1.18 + Math.random() * 0.9)
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      base[i*3]=x; base[i*3+1]=y; base[i*3+2]=z
      pos[i*3]=x;  pos[i*3+1]=y;  pos[i*3+2]=z
      phase[i] = Math.random() * Math.PI * 2
      oRad[i]  = 0.07 + Math.random() * 0.13
      oSpd[i]  = 0.25 + Math.random() * 0.55
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const particleMat = new THREE.PointsMaterial({
      color: 0xff6b3d, size: 0.03, transparent: true, opacity: 0.7,
      depthWrite: false, sizeAttenuation: true, blending: THREE.AdditiveBlending,
    })
    scene.add(new THREE.Points(particleGeo, particleMat))

    // ── Pointer ───────────────────────────────────────────────────
    const ptr = { x: 0, y: 0, hovered: false }
    const onMove = (e) => {
      const r = container.getBoundingClientRect()
      const cx = r.left + r.width  / 2
      const cy = r.top  + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      ptr.hovered = Math.sqrt(dx*dx + dy*dy) < Math.min(r.width, r.height) * 0.42
      ptr.x = (e.clientX / window.innerWidth)  * 2 - 1
      ptr.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    const onLeave = () => { ptr.hovered = false }
    window.addEventListener('pointermove', onMove)
    container.addEventListener('pointerleave', onLeave)

    // ── Resize ────────────────────────────────────────────────────
    function resize() {
      const w = container.clientWidth, h = container.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Animate ───────────────────────────────────────────────────
    const clock = new THREE.Clock()
    let animId
    let rotY = 0
    let rotSpd = reducedMotion ? 0 : 0.003
    let burst = 0

    function animate() {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Rotation speed ramp
      const targetSpd = !reducedMotion && ptr.hovered ? 0.016 : (reducedMotion ? 0 : 0.003)
      rotSpd += (targetSpd - rotSpd) * 0.04
      rotY   += rotSpd
      const rotX = reducedMotion ? 0 : Math.sin(t * 0.4) * 0.1

      // Burst 0→1 on hover
      burst += ((ptr.hovered ? 1 : 0) - burst) * 0.05

      // Main icosphere
      icosphere.rotation.y = rotY
      icosphere.rotation.x = rotX

      // Ghost trails (lag behind main rotation)
      ghosts.forEach(({ mesh, mat, lag, baseOpacity }) => {
        mesh.rotation.y = rotY - rotSpd * lag * 60
        mesh.rotation.x = rotX
        const targetOp = burst * baseOpacity
        mat.opacity += (targetOp - mat.opacity) * 0.08
      })

      // Glow pulse + hover brightness
      const pulse = 1 + Math.sin(t * 1.3) * 0.07
      glowLayers.forEach(({ mesh, mat, baseOpacity }, idx) => {
        mesh.scale.setScalar(idx === 0 ? pulse : 1)
        mat.opacity = (baseOpacity + burst * 0.06) * (idx === 0 ? pulse : 1)
      })

      // Particle update
      const pa = particleGeo.attributes.position.array
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const bx = base[i*3], by = base[i*3+1], bz = base[i*3+2]
        const ph = phase[i], dr = oRad[i], sp = oSpd[i]
        const ox = dr * Math.sin(t * sp + ph)
        const oy = dr * Math.cos(t * sp * 0.7 + ph)
        const oz = dr * Math.sin(t * sp * 0.5 + ph + 1.3)
        // Radial burst push
        const len = Math.sqrt(bx*bx + by*by + bz*bz) || 1
        const burstD = burst * (0.55 + Math.sin(t * 2.2 + i * 0.4) * 0.15)
        pa[i*3]   = bx + ox + (bx/len) * burstD
        pa[i*3+1] = by + oy + (by/len) * burstD
        pa[i*3+2] = bz + oz + (bz/len) * burstD
      }
      particleGeo.attributes.position.needsUpdate = true
      particleMat.size    = 0.03  + burst * 0.016
      particleMat.opacity = 0.68  + burst * 0.22

      // Camera parallax
      if (!reducedMotion) {
        camera.position.x += (ptr.x * 0.25 - camera.position.x) * 0.03
        camera.position.y += (ptr.y * 0.12 - camera.position.y) * 0.03
        camera.lookAt(0, 0, 0)
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
      container.removeEventListener('pointerleave', onLeave)
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
}
