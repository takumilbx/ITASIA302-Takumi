(function () {
  // Decorative background rain — skip entirely for reduced-motion users.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const src   = document.currentScript;
  const hex   = (src && src.dataset.color) || '#4db8cc';
  const r     = parseInt(hex.slice(1,3),16);
  const g     = parseInt(hex.slice(3,5),16);
  const b     = parseInt(hex.slice(5,7),16);

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;opacity:1;';
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx   = canvas.getContext('2d');
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ∑∆';
  const fs    = 13;
  let drops   = [];
  let speeds  = [];
  let colPositions = [];

  function randCol() {
    return Math.floor(Math.random() * Math.floor(canvas.width / fs));
  }

  function randSpeed() {
    return 0.2 + Math.random() * 0.7;
  }

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const activeCols = Math.max(8, Math.floor((canvas.width / fs) * 0.35));
    colPositions = Array.from({ length: activeCols }, randCol);
    drops  = colPositions.map(() => Math.random() * -(canvas.height / fs));
    speeds = colPositions.map(randSpeed);
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.fillStyle = 'rgba(5,6,14,0.07)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fs + "px 'Geist Mono','Courier New',monospace";
    for (let i = 0; i < drops.length; i++) {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      const bright = Math.random() > 0.82;
      ctx.fillStyle = bright
        ? `rgba(${r},${g},${b},0.55)`
        : `rgba(${r},${g},${b},0.22)`;
      ctx.fillText(ch, colPositions[i] * fs, drops[i] * fs);
      if (drops[i] * fs > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
        colPositions[i] = randCol();
        speeds[i] = randSpeed();
      }
      drops[i] += speeds[i];
    }
  }

  setInterval(draw, 42);
})();
