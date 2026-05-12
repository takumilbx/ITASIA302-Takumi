(function () {
  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after { cursor: none !important; }

    #__cursor-pixel {
      width: 2px;
      height: 2px;
      position: fixed;
      pointer-events: none;
      z-index: 2147483647;
      top: -100px;
      left: -100px;
      box-shadow:
        0px   0px 0 0 #0a0a14,
        0px   2px 0 0 #0a0a14,  2px   2px 0 0 #0a0a14,
        0px   4px 0 0 #0a0a14,  2px   4px 0 0 #4db8cc,  4px   4px 0 0 #0a0a14,
        0px   6px 0 0 #0a0a14,  2px   6px 0 0 #4db8cc,  4px   6px 0 0 #4db8cc,  6px   6px 0 0 #0a0a14,
        0px   8px 0 0 #0a0a14,  2px   8px 0 0 #4db8cc,  4px   8px 0 0 #4db8cc,  6px   8px 0 0 #4db8cc,  8px   8px 0 0 #0a0a14,
        0px  10px 0 0 #0a0a14,  2px  10px 0 0 #4db8cc,  4px  10px 0 0 #4db8cc,  6px  10px 0 0 #4db8cc,  8px  10px 0 0 #4db8cc,  10px 10px 0 0 #0a0a14,
        0px  12px 0 0 #0a0a14,  2px  12px 0 0 #4db8cc,  4px  12px 0 0 #4db8cc,  6px  12px 0 0 #4db8cc,  8px  12px 0 0 #4db8cc,  10px 12px 0 0 #4db8cc,  12px 12px 0 0 #0a0a14,
        0px  14px 0 0 #0a0a14,  2px  14px 0 0 #4db8cc,  4px  14px 0 0 #4db8cc,  6px  14px 0 0 #4db8cc,  8px  14px 0 0 #4db8cc,  10px 14px 0 0 #4db8cc,  12px 14px 0 0 #4db8cc,  14px 14px 0 0 #0a0a14,
        0px  16px 0 0 #0a0a14,  2px  16px 0 0 #4db8cc,  4px  16px 0 0 #4db8cc,  6px  16px 0 0 #4db8cc,  8px  16px 0 0 #0a0a14,  10px 16px 0 0 #0a0a14,
        0px  18px 0 0 #0a0a14,  2px  18px 0 0 #4db8cc,  4px  18px 0 0 #0a0a14,
        0px  20px 0 0 #0a0a14,  2px  20px 0 0 #0a0a14;
    }

    .__cursor-trail {
      position: fixed;
      border-radius: 50%;
      pointer-events: none;
      z-index: 2147483646;
      transform: translate(-50%, -50%);
    }

    .__cursor-char {
      position: fixed;
      font-size: 10px;
      font-family: "Geist Mono", ui-monospace, monospace;
      pointer-events: none;
      z-index: 2147483645;
      transform: translate(-50%, -50%);
      animation: __cursorFloat 0.7s ease-out forwards;
      text-shadow: 0 0 6px currentColor;
    }

    @keyframes __cursorFloat {
      0%   { opacity: 1;   transform: translate(-50%, -50%) scale(1.1); }
      60%  { opacity: 0.7; }
      100% { opacity: 0;   transform: translate(-50%, -120%) scale(0.7); }
    }
  `;
  document.head.appendChild(style);

  // Pixel cursor element
  const cursorEl = document.createElement('div');
  cursorEl.id = '__cursor-pixel';
  document.body.appendChild(cursorEl);

  // Trail dots
  const TRAIL_SIZE = 8;
  const trailDots = [];
  const history = [];
  const HISTORY_LEN = TRAIL_SIZE * 3;

  for (let i = 0; i < TRAIL_SIZE; i++) {
    const d = document.createElement('div');
    d.className = '__cursor-trail';
    const size = 2 + (1 - i / TRAIL_SIZE) * 2;
    d.style.cssText = `width:${size}px;height:${size}px;background:#4db8cc;opacity:0;`;
    document.body.appendChild(d);
    trailDots.push(d);
  }

  (function tickTrail() {
    for (let i = 0; i < TRAIL_SIZE; i++) {
      const idx = history.length - 1 - i * 3;
      if (idx < 0) { trailDots[i].style.opacity = '0'; continue; }
      const p = history[idx];
      trailDots[i].style.left    = p.x + 'px';
      trailDots[i].style.top     = p.y + 'px';
      trailDots[i].style.opacity = (1 - i / TRAIL_SIZE) * 0.35;
    }
    requestAnimationFrame(tickTrail);
  })();

  // Data stream chars
  const CHARS = '01アABCDEF∑∆Ψ▓░▒10FF00';
  let lastSpawn = 0;

  function spawnChar(x, y, offX) {
    const s = document.createElement('div');
    s.className = '__cursor-char';
    s.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
    s.style.left  = (x + offX) + 'px';
    s.style.top   = y + 'px';
    s.style.color = Math.random() > 0.6 ? '#7dd3e8' : '#4db8cc';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 750);
  }

  document.addEventListener('mousemove', function (e) {
    cursorEl.style.left = e.clientX + 'px';
    cursorEl.style.top  = e.clientY + 'px';

    history.push({ x: e.clientX, y: e.clientY });
    if (history.length > HISTORY_LEN) history.shift();

    const now = Date.now();
    if (now - lastSpawn > 65) {
      lastSpawn = now;
      spawnChar(e.clientX, e.clientY, (Math.random() - 0.5) * 20);
    }
  });

  document.addEventListener('click', function (e) {
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const dist  = 12 + Math.random() * 16;
      spawnChar(
        e.clientX + Math.cos(angle) * dist,
        e.clientY + Math.sin(angle) * dist,
        0
      );
    }
  });
})();
