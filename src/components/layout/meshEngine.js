function initMeshEngine(canvasEl, mode, palette) {
  if (!canvasEl || !palette.length) return () => {}

  const ctx = canvasEl.getContext('2d')
  let width = window.innerWidth
  let height = window.innerHeight
  let dpr = window.devicePixelRatio || 1
  const pointCount = Math.max(4, Math.min(6, palette.length * 2))
  const meshPoints = []

  for (let i = 0; i < pointCount; i += 1) {
    meshPoints.push({
      color: palette[i % palette.length],
      baseX: 0.09 + 0.82 * Math.random(),
      baseY: 0.08 + 0.82 * Math.random(),
      ampX: 0.06 + 0.1 * Math.random(),
      ampY: 0.06 + 0.1 * Math.random(),
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      freqX: 0.14 + Math.random() * 0.07,
      freqY: 0.11 + Math.random() * 0.06,
      radius: 0.21 + 0.13 * Math.random(),
      rFreq: 0.13 + Math.random() * 0.06,
      rPhase: Math.random() * Math.PI * 2,
      drift: 0.01 + Math.random() * 0.02,
      driftFreq: 0.045 + Math.random() * 0.02,
      driftPhase: Math.random() * Math.PI * 2,
    })
  }

  const aHex = mode === 'dark' ? 'b4' : 'cc'
  const a = mode === 'dark' ? 0.34 : 0.43

  function resize() {
    width = window.innerWidth
    height = window.innerHeight
    dpr = window.devicePixelRatio || 1
    const c = ctx.canvas
    c.width = Math.round(width * dpr)
    c.height = Math.round(height * dpr)
    c.style.width = `${width}px`
    c.style.height = `${height}px`
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }

  let running = true
  let resizeTimeout = null
  const baseNow = performance.now()

  function draw(now) {
    if (!running) return
    const t = (now - baseNow) * 0.0007
    ctx.clearRect(0, 0, width * dpr, height * dpr)
    ctx.save()
    ctx.scale(dpr, dpr)
    for (let i = 0; i < meshPoints.length; i += 1) {
      const p = meshPoints[i]
      const dx =
        p.ampX * Math.sin(t * p.freqX + p.phaseX) +
        p.drift * Math.sin(t * p.driftFreq + p.driftPhase + i)
      const dy =
        p.ampY * Math.cos(t * p.freqY + p.phaseY) +
        p.drift * Math.cos(t * p.driftFreq + p.driftPhase + i * 1.13)
      const x = p.baseX + dx
      const y = p.baseY + dy
      const r =
        p.radius +
        0.045 *
          Math.sin(t * p.rFreq + p.rPhase + Math.cos(t * 0.13 + i)) *
          p.radius
      const cx = width * x
      const cy = height * y
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, width * r)
      grad.addColorStop(0, `${p.color}${aHex}`)
      grad.addColorStop(1, `${p.color}00`)
      ctx.globalAlpha = a
      ctx.beginPath()
      ctx.arc(cx, cy, width * r, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fillStyle = grad
      ctx.fill()
    }
    ctx.restore()
    requestAnimationFrame(draw)
  }

  function debouncedResize() {
    if (resizeTimeout) clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(resize, 60)
  }

  resize()
  running = true
  requestAnimationFrame(draw)
  window.addEventListener('resize', debouncedResize, { passive: true })

  return function cleanup() {
    running = false
    window.removeEventListener('resize', debouncedResize)
    if (resizeTimeout) clearTimeout(resizeTimeout)
  }
}

export default initMeshEngine
