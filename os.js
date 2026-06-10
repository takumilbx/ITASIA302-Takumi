/* ========================================================================
   ITASIA302_OS · shared site shell + status bar
   Usage (script tag at end of body, after rain.js/cursor.js):
     <script src="os.js" data-path="~/itasia302" data-accent="#4db8cc"></script>
   Options:
     data-path       status-bar path label (default: derived from URL)
     data-accent     section accent hex for status dot / shell highlights
     data-statusbar  "off" to disable the bottom bar (e.g. pages with
                     their own bottom UI)
   Open the shell with "/" or Cmd/Ctrl+K, any [data-os-open] element,
   or the injected ">_" topbar button.
   ======================================================================== */
(() => {
  "use strict";

  const script = document.currentScript;
  if (!script) return;
  const ROOT = script.src.replace(/os\.js(\?.*)?$/, "");
  const PATH = script.dataset.path || "~/itasia302";
  const ACCENT = script.dataset.accent || "#4db8cc";
  const NO_BAR = script.dataset.statusbar === "off";
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── site map ────────────────────────────────────────────────────── */
  const PAGES = [
    { id: "home",              url: "home.html",                            desc: "directory index" },
    { id: "about",             url: "about/",                               desc: "who i am + thesis" },
    { id: "research-viz",      url: "about/research-viz.html",              desc: "research knowledge graph" },
    { id: "fieldwork",         url: "about/fieldwork/",                     desc: "3d classroom (ITASIA312)" },
    { id: "class-assignments", url: "class-assignments/",                   desc: "required coursework" },
    { id: "reading-response",  url: "reading-response/",                    desc: "weekly responses" },
    { id: "week-4",            url: "reading-response/week-4/",             desc: "reading response · week 4" },
    { id: "week-5",            url: "reading-response/week-5/",             desc: "reading response · week 5" },
    { id: "week-6",            url: "reading-response/week-6/",             desc: "reading response · week 6" },
    { id: "week-8",            url: "reading-response/week-8/",             desc: "reading response · week 8 (latest)" },
    { id: "personal-project",  url: "personal-project/",                    desc: "second brain · PKM build" },
    { id: "jp-edtech",         url: "personal-project/jp-edtech-trends/",   desc: "japan edtech trends" },
    { id: "ai-statement",      url: "ai-statement/",                        desc: "how these pages were made" },
    { id: "research-trends",   url: "research-trends/",                     desc: "5-year AI & society journal" },
  ];
  const ALIASES = {
    "~": "home", index: "home", thesis: "about", me: "about",
    viz: "research-viz", graph: "research-viz", classroom: "fieldwork",
    assignments: "class-assignments", coursework: "class-assignments",
    reading: "reading-response", rr: "reading-response", responses: "reading-response",
    week4: "week-4", week5: "week-5", week6: "week-6", week8: "week-8",
    latest: "week-8", project: "personal-project", pkm: "personal-project",
    brain: "personal-project", edtech: "jp-edtech", giga: "jp-edtech",
    ai: "ai-statement", statement: "ai-statement", disclosure: "ai-statement",
    trends: "research-trends", journal: "research-trends",
  };

  function findPage(q) {
    if (!q) return null;
    q = q.toLowerCase().replace(/\/+$/, "");
    const direct = PAGES.find(p => p.id === q) || PAGES.find(p => p.id === ALIASES[q]);
    if (direct) return direct;
    return PAGES.find(p => p.id.includes(q)) ||
           PAGES.find(p => p.desc.toLowerCase().includes(q)) || null;
  }

  /* ── styles ──────────────────────────────────────────────────────── */
  const css = `
  .os-bar{view-transition-name:os-bar;position:fixed;left:0;right:0;bottom:0;z-index:9000;display:flex;
    justify-content:space-between;align-items:center;height:26px;padding:0 14px;
    background:rgba(5,6,14,.92);border-top:1px solid var(--rule,#182030);
    font-family:var(--mono,"Geist Mono",monospace);font-size:9.5px;
    letter-spacing:.18em;text-transform:uppercase;color:var(--ink-faint,#6b7a99);
    backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}
  .os-bar .os-right{display:flex;align-items:center;gap:14px}
  .os-bar .os-dot{width:5px;height:5px;border-radius:50%;background:${ACCENT};
    box-shadow:0 0 6px ${ACCENT}}
  .os-bar .os-hint{cursor:pointer;color:var(--ink-faint,#6b7a99);background:none;
    border:none;font:inherit;letter-spacing:inherit;text-transform:inherit;padding:0}
  .os-bar .os-hint:hover,.os-bar .os-hint:focus-visible{color:${ACCENT};outline:none}
  body.has-os-bar{padding-bottom:30px}
  @media(max-width:719px){.os-bar{display:none}body.has-os-bar{padding-bottom:0}}
  .os-topbtn{font-family:var(--mono,"Geist Mono",monospace);font-size:10px;
    letter-spacing:.14em;color:var(--ink-faint,#6b7a99);background:transparent;
    border:1px solid var(--rule,#182030);border-radius:2px;padding:6px 10px;
    margin-left:16px;cursor:pointer;transition:color .18s ease,border-color .18s ease}
  .os-topbtn:hover,.os-topbtn:focus-visible{color:${ACCENT};border-color:${ACCENT};outline:none}
  .os-shell{position:fixed;inset:0;z-index:100000;display:none;
    align-items:flex-start;justify-content:center;padding:12vh 18px 0;
    background:rgba(5,6,14,.55);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)}
  .os-shell.open{display:flex}
  .os-win{width:min(580px,94vw);background:rgba(5,6,14,.94);
    border:1px solid var(--rule,#182030);position:relative;
    box-shadow:0 18px 60px rgba(0,0,0,.5)}
  .os-win::before{content:'';position:absolute;top:-1px;left:-1px;width:18px;height:18px;
    border-top:2px solid var(--sky,#5299c8);border-left:2px solid var(--sky,#5299c8)}
  .os-win::after{content:'';position:absolute;bottom:-1px;right:-1px;width:18px;height:18px;
    border-bottom:2px solid var(--lilac,#7272c0);border-right:2px solid var(--lilac,#7272c0)}
  .os-win.anim{animation:os-pop .18s cubic-bezier(.22,.61,.36,1)}
  @keyframes os-pop{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}
  .os-head{display:flex;justify-content:space-between;align-items:center;
    padding:10px 16px;border-bottom:1px solid var(--rule,#182030);
    font-family:var(--mono,"Geist Mono",monospace);font-size:9px;
    letter-spacing:.24em;text-transform:uppercase;color:var(--ink-faint,#6b7a99)}
  .os-close{background:none;border:none;color:var(--ink-faint,#6b7a99);
    font-family:inherit;font-size:10px;letter-spacing:.1em;cursor:pointer;padding:2px 6px}
  .os-close:hover,.os-close:focus-visible{color:${ACCENT};outline:none}
  .os-out{max-height:46vh;overflow-y:auto;padding:14px 16px 4px;
    font-family:var(--mono,"Geist Mono",monospace);font-size:11.5px;line-height:1.85;
    color:var(--ink-dim,#b8c4dc);white-space:pre-wrap;word-break:break-word}
  .os-out .ln-dim{color:var(--ink-faint,#6b7a99)}
  .os-out .ln-acc{color:${ACCENT}}
  .os-out .ln-ok{color:var(--teal,#45a884)}
  .os-out .ln-err{color:#d4737f}
  .os-out a{color:${ACCENT};text-decoration:none;border-bottom:1px dotted ${ACCENT}}
  .os-line{display:flex;align-items:center;gap:8px;padding:10px 16px 12px;
    font-family:var(--mono,"Geist Mono",monospace);font-size:12px}
  .os-ps1{color:var(--teal,#45a884);white-space:nowrap;user-select:none}
  .os-input{flex:1;background:transparent;border:none;outline:none;
    color:var(--ink,#e0e6f0);font:inherit;letter-spacing:.02em;caret-color:${ACCENT}}
  .os-matrix{position:fixed;inset:0;z-index:99990;pointer-events:none}
  @media(prefers-reduced-motion:reduce){.os-win.anim{animation:none}}`;
  const styleEl = document.createElement("style");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── status bar ──────────────────────────────────────────────────── */
  if (!NO_BAR) {
    const bar = document.createElement("div");
    bar.className = "os-bar";
    bar.innerHTML =
      `<span class="os-path">${PATH}</span>` +
      `<span class="os-right">` +
      `<button class="os-hint" data-os-open aria-label="Open site shell">&gt;_ shell [/]</button>` +
      `<span class="os-scroll">0%</span>` +
      `<span class="os-dot" aria-hidden="true"></span>` +
      `<span class="os-clock" aria-label="Time in Japan"></span></span>`;
    document.body.appendChild(bar);
    document.body.classList.add("has-os-bar");

    const clockEl = bar.querySelector(".os-clock");
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
    });
    const tickClock = () => { clockEl.textContent = fmt.format(new Date()) + " JST"; };
    tickClock();
    setInterval(tickClock, 1000);

    const scrollEl = bar.querySelector(".os-scroll");
    let rafPending = false;
    const updScroll = () => {
      rafPending = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
      scrollEl.textContent = Math.min(100, Math.max(0, pct)) + "%";
    };
    updScroll();
    window.addEventListener("scroll", () => {
      if (!rafPending) { rafPending = true; requestAnimationFrame(updScroll); }
    }, { passive: true });
  }

  /* ── topbar button ───────────────────────────────────────────────── */
  const topbar = document.querySelector(".topbar");
  if (topbar) {
    const btn = document.createElement("button");
    btn.className = "os-topbtn";
    btn.setAttribute("data-os-open", "");
    btn.setAttribute("aria-label", "Open site shell");
    btn.textContent = ">_";
    topbar.appendChild(btn);
  }

  /* ── shell ───────────────────────────────────────────────────────── */
  const shell = document.createElement("div");
  shell.className = "os-shell";
  shell.innerHTML =
    `<div class="os-win" role="dialog" aria-modal="true" aria-label="ITASIA302 shell">` +
    `<div class="os-head"><span>ITASIA302_OS · shell</span>` +
    `<button class="os-close" aria-label="Close shell">esc ✕</button></div>` +
    `<div class="os-out" aria-live="polite"></div>` +
    `<div class="os-line"><span class="os-ps1">${PATH} $</span>` +
    `<input class="os-input" type="text" autocomplete="off" autocapitalize="off" ` +
    `spellcheck="false" aria-label="Shell command input"></div></div>`;
  document.body.appendChild(shell);

  const win = shell.querySelector(".os-win");
  const out = shell.querySelector(".os-out");
  const input = shell.querySelector(".os-input");
  let lastFocus = null;
  const history = [];
  let histIdx = -1;
  const bootTime = Date.now();

  function print(text, cls) {
    const div = document.createElement("div");
    if (cls) div.className = cls;
    div.textContent = text;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
    return div;
  }
  function printHTML(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
  }

  function openShell() {
    if (shell.classList.contains("open")) return;
    lastFocus = document.activeElement;
    shell.classList.add("open");
    if (!REDUCED) { win.classList.remove("anim"); void win.offsetWidth; win.classList.add("anim"); }
    if (!out.childElementCount) {
      print("ITASIA302_OS shell · type `help` to begin.", "ln-dim");
    }
    input.focus();
  }
  function closeShell() {
    shell.classList.remove("open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ── commands ────────────────────────────────────────────────────── */
  const COMMANDS = {
    help() {
      print("ls              list site pages", "ln-dim");
      print("open <page>     navigate · tab = autocomplete", "ln-dim");
      print("cat <file>      read a file", "ln-dim");
      print("whoami          identity", "ln-dim");
      print("neofetch        system info", "ln-dim");
      print("pwd · date · clear · exit", "ln-dim");
    },
    ls() {
      PAGES.forEach(p => {
        const isDir = p.url.endsWith("/") || p.id === "home";
        printHTML(
          `<span class="ln-dim">${isDir ? "drw" : "-r-"}</span>  ` +
          `<a href="${ROOT}${p.url}">${p.id.padEnd(18, " ")}</a>` +
          `<span class="ln-dim"> ${p.desc}</span>`
        );
      });
      print("open <page> to navigate.", "ln-dim");
    },
    pwd() { print(PATH); },
    date() {
      print(new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Tokyo", dateStyle: "full", timeStyle: "medium",
      }).format(new Date()) + " (JST)");
    },
    whoami() {
      print("takumi · master's student, ITASIA program, UTokyo");
      print("researching TPACK development across Japan and Thailand", "ln-dim");
    },
    neofetch() {
      const up = Math.round((Date.now() - bootTime) / 1000);
      print("╔══════════════════╗", "ln-acc");
      print("║  ITASIA302_OS    ║   user: takumi@utokyo.itasia", "ln-acc");
      print("╚══════════════════╝   shell: os.js v1.0", "ln-acc");
      print(`                       uptime: ${up}s · pages: ${PAGES.length}`, "ln-dim");
      print("                       theme: scientific-sublime", "ln-dim");
    },
    clear() { out.innerHTML = ""; },
    exit() { closeShell(); },
    matrix() { matrixBurst(); print("wake up, takumi...", "ln-ok"); },
  };
  const FILES = {
    "thesis.md": "TPACK development across Japan and Thailand: how teachers grow technology-pedagogy knowledge, not just tool use.",
    "readme.md": "Takumi's project base for ITASIA302 (Introduction to Digital Technology and Society), UTokyo, Spring 2026. Coursework, a personal PKM project, and an AI statement.",
    "secrets.txt": null,
  };

  function run(raw) {
    const cmd = raw.trim();
    if (!cmd) return;
    print(PATH + " $ " + cmd, "ln-dim");
    history.push(cmd);
    histIdx = history.length;
    const [head, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ");
    const h = head.toLowerCase();

    if (h === "sudo") { print("takumi is not in the sudoers file. This incident will be reported.", "ln-err"); return; }
    if (h === "rm") { print("permission denied: nice try.", "ln-err"); return; }
    if (h === "echo") { print(arg); return; }
    if (h === "cat") {
      if (!arg) { print("cat: missing file. try: cat thesis.md", "ln-err"); return; }
      const key = arg.toLowerCase();
      if (key in FILES) {
        if (FILES[key] === null) print("cat: secrets.txt: permission denied (nice try)", "ln-err");
        else print(FILES[key]);
      } else print(`cat: ${arg}: no such file. try: thesis.md, readme.md`, "ln-err");
      return;
    }
    if (h === "open" || h === "cd" || h === "go") {
      if (!arg) { COMMANDS.ls(); return; }
      const page = findPage(arg);
      if (page) { print(`opening ${page.id} ...`, "ln-ok"); window.location.href = ROOT + page.url; }
      else print(`open: no page matches "${arg}". try ls.`, "ln-err");
      return;
    }
    if (COMMANDS[h]) { COMMANDS[h](); return; }

    // fallback: fuzzy page match
    const page = findPage(cmd);
    if (page) { print(`command not found: ${head} · did you mean: open ${page.id}`, "ln-err"); return; }
    print(`command not found: ${head} · try help`, "ln-err");
  }

  /* ── autocomplete ────────────────────────────────────────────────── */
  function autocomplete() {
    const val = input.value;
    const parts = val.split(/\s+/);
    if (parts.length <= 1) {
      const names = Object.keys(COMMANDS).concat(["open", "cat", "sudo"]);
      const m = names.filter(n => n.startsWith(parts[0].toLowerCase()));
      if (m.length === 1) input.value = m[0] + " ";
      else if (m.length > 1) print(m.join("   "), "ln-dim");
    } else {
      const frag = parts[parts.length - 1].toLowerCase();
      const ids = PAGES.map(p => p.id).concat(Object.keys(ALIASES));
      const m = [...new Set(ids.filter(n => n.startsWith(frag)))];
      if (m.length === 1) { parts[parts.length - 1] = m[0]; input.value = parts.join(" "); }
      else if (m.length > 1) print(m.slice(0, 8).join("   "), "ln-dim");
    }
  }

  /* ── matrix burst (konami / `matrix`) ────────────────────────────── */
  let matrixActive = false;
  function matrixBurst() {
    if (matrixActive || REDUCED) return;
    matrixActive = true;
    const canvas = document.createElement("canvas");
    canvas.className = "os-matrix";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const fs = 14;
    const chars = "01アイウエオカキクケコサシスセソタチツテト∑∆";
    const drops = Array(Math.floor(canvas.width / fs)).fill(0).map(() => Math.random() * -40);
    const timer = setInterval(() => {
      ctx.fillStyle = "rgba(5,6,14,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fs + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        ctx.fillStyle = Math.random() > 0.85 ? ACCENT : "rgba(77,184,204,0.35)";
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, drops[i] * fs);
        if (drops[i] * fs > canvas.height && Math.random() > 0.97) drops[i] = 0;
        drops[i] += 0.9;
      }
    }, 33);
    setTimeout(() => {
      clearInterval(timer);
      canvas.style.transition = "opacity .8s ease";
      canvas.style.opacity = "0";
      setTimeout(() => { canvas.remove(); matrixActive = false; }, 850);
    }, 9000);
  }

  /* ── events ──────────────────────────────────────────────────────── */
  shell.querySelector(".os-close").addEventListener("click", closeShell);
  shell.addEventListener("click", e => { if (e.target === shell) closeShell(); });
  win.addEventListener("click", () => input.focus());

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") { run(input.value); input.value = ""; }
    else if (e.key === "Tab") { e.preventDefault(); autocomplete(); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdx > 0) { histIdx--; input.value = history[histIdx]; }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx < history.length - 1) { histIdx++; input.value = history[histIdx]; }
      else { histIdx = history.length; input.value = ""; }
    }
  });

  const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let kIdx = 0;

  document.addEventListener("keydown", e => {
    const t = e.target;
    const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);

    // konami (tracked even while shell closed, not while typing)
    if (!typing) {
      kIdx = (e.key === KONAMI[kIdx]) ? kIdx + 1 : (e.key === KONAMI[0] ? 1 : 0);
      if (kIdx === KONAMI.length) { kIdx = 0; matrixBurst(); }
    }

    if (shell.classList.contains("open")) {
      if (e.key === "Escape") { e.preventDefault(); closeShell(); }
      else if (!typing) input.focus();
      return;
    }
    if (typing) return;
    if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) { e.preventDefault(); openShell(); }
    else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openShell(); }
  });

  document.addEventListener("click", e => {
    const opener = e.target.closest("[data-os-open]");
    if (opener) { e.preventDefault(); openShell(); }
  });
  document.addEventListener("keydown", e => {
    if ((e.key === "Enter" || e.key === " ") && e.target.closest &&
        e.target.closest("[data-os-open]") && e.target.tagName !== "BUTTON") {
      e.preventDefault(); openShell();
    }
  });
})();
