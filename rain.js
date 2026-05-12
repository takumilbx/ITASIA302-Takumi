(function () {
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

  let colPositions = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const totalCols = Math.floor(canvas.width / fs);
    const activeCols = Math.max(4, Math.floor(totalCols * 0.18));
    // pick random column x-positions spread across width
    const step = Math.floor(totalCols / activeCols);
    colPositions = Array.from({ length: activeCols }, (_, i) => {
      const base = i * step;
      return base + Math.floor(Math.random() * Math.max(1, step));
    });
    drops = colPositions.map(() => Math.random() * -80);
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.fillStyle = 'rgba(5,6,14,0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fs + "px 'Geist Mono','Courier New',monospace";
    for (let i = 0; i < drops.length; i++) {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      const bright = Math.random() > 0.88;
      ctx.fillStyle = bright
        ? `rgba(${r},${g},${b},0.28)`
        : `rgba(${r},${g},${b},0.08)`;
      ctx.fillText(ch, colPositions[i] * fs, drops[i] * fs);
      if (drops[i] * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.42;
    }
  }

  setInterval(draw, 42);
})();
