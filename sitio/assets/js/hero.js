/* Bienestar · héroe guiado por el scroll. Dos modos, según el HTML:
   - Video (inicio): la mente que gira mientras se baja. Datos en data-video, data-poster, data-bytes, data-fijo.
   - Mar dibujado (Sobre Verónica): "la marea que se calma", un canvas que pasa de agitado a calmo y amanece.
   Además, si existe [data-tecleo], la frase se escribe y se borra sola. */
(() => {
  'use strict';
  const d = document;
  const hero = d.querySelector('.hero');
  if (!hero) return;

  const escena = hero.querySelector('.hero-escena');
  const canvas = hero.querySelector('.hero-mar');
  const video = hero.querySelector('.hero-video');
  const posterCapa = hero.querySelector('.hero-poster');
  const fijo = hero.querySelector('.hero-fijo');
  const anillo = hero.querySelector('.hero-anillo');
  const pista = hero.querySelector('.hero-pista');

  // Los archivos se codifican con un fotograma clave cada 8 cuadros para que el scroll no salte.
  const VIDEO = {
    LISTO: Boolean(hero.dataset.video && video),
    URL: hero.dataset.video,
    POSTER: hero.dataset.poster,
    BYTES: Number(hero.dataset.bytes) || 10000000,
  };

  // Idénticas, carácter por carácter, a la media query del héroe estático en estilos.css.
  const GATES = [
    '(max-width: 720px)',
    '(orientation: portrait) and (max-width: 1024px)',
    '(orientation: portrait) and (pointer: coarse)',
    '(orientation: landscape) and (pointer: coarse) and (max-height: 560px)',
    '(prefers-reduced-motion: reduce)',
  ];
  const MQLS = GATES.map((q) => matchMedia(q));
  const mqReducido = MQLS[4];

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const suave = (p, e0, e1) => { const t = clamp((p - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
  const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  function rng(seed) {
    let s = seed >>> 0;
    return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
  }

  /* =====================================================================
     Mar en canvas
     ===================================================================== */
  const C = {
    abismo: [27, 44, 79],
    confianza: [46, 74, 125],
    especializacion: [147, 169, 211],
    calma: [220, 203, 234],
    cercania: [245, 216, 196],
    claridad: [241, 244, 250],
  };
  const mezcla = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  const rgba = (c, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;

  function crearMar(cv) {
    const ctx = cv.getContext('2d', { alpha: false });
    let W = 0, H = 0, prog = 0, visible = true, tapado = false, raf = null, ultimo = 0, ultimoDibujo = 0;
    const capas = [
      { y: 0.02, amp: 3, len: 220, vel: 0.32, col: mezcla(C.especializacion, C.confianza, 0.15), a: 0.5 },
      { y: 0.09, amp: 6, len: 320, vel: 0.38, col: mezcla(C.especializacion, C.confianza, 0.38), a: 0.55 },
      { y: 0.2, amp: 11, len: 460, vel: 0.44, col: mezcla(C.especializacion, C.confianza, 0.62), a: 0.62 },
      { y: 0.36, amp: 18, len: 640, vel: 0.5, col: C.confianza, a: 0.72 },
      { y: 0.56, amp: 26, len: 860, vel: 0.56, col: mezcla(C.confianza, C.abismo, 0.5), a: 0.84 },
      { y: 0.78, amp: 34, len: 1100, vel: 0.62, col: C.abismo, a: 0.94 },
    ].map((c, i) => ({ ...c, f: i * 1.7 }));

    function medir() {
      const r = cv.getBoundingClientRect();
      const dpr = Math.min(1.5, devicePixelRatio || 1);
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dibujar(performance.now(), 0);
    }

    function dibujar(ahora, dt) {
      const calma = easeInOut(prog);
      const agit = 1 - 0.8 * calma;
      const t = ahora / 1000;
      const hz = H * (0.74 - 0.03 * calma);

      // Cielo: siempre profundo arriba (ahí vive el texto) y amanecer en el horizonte
      const cielo = ctx.createLinearGradient(0, 0, 0, hz);
      cielo.addColorStop(0, rgba(C.abismo));
      cielo.addColorStop(0.5, rgba(mezcla(C.abismo, C.confianza, 0.5 + 0.3 * calma)));
      cielo.addColorStop(0.82, rgba(mezcla(C.confianza, C.especializacion, 0.3 + 0.4 * calma)));
      cielo.addColorStop(1, rgba(mezcla(C.especializacion, C.cercania, 0.2 + 0.65 * calma)));
      ctx.fillStyle = cielo;
      ctx.fillRect(0, 0, W, hz + 2);

      // Sol que sube un poco a medida que el mar se calma
      const sx = W * 0.74;
      const sy = hz - H * (0.012 + 0.085 * calma);
      const halo = ctx.createRadialGradient(sx, sy, 0, sx, sy, Math.max(W, H) * 0.45);
      halo.addColorStop(0, rgba(C.cercania, 0.3 + 0.32 * calma));
      halo.addColorStop(0.32, rgba(C.calma, 0.1 + 0.12 * calma));
      halo.addColorStop(1, rgba(C.calma, 0));
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, W, hz + 2);
      ctx.fillStyle = rgba(C.cercania, 0.5 + 0.45 * calma);
      ctx.beginPath();
      ctx.arc(sx, sy, Math.min(W, H) * 0.045, 0, Math.PI * 2);
      ctx.fill();

      // Agua
      const agua = ctx.createLinearGradient(0, hz, 0, H);
      agua.addColorStop(0, rgba(mezcla(C.especializacion, C.cercania, 0.12 + 0.4 * calma)));
      agua.addColorStop(0.22, rgba(mezcla(C.confianza, C.especializacion, 0.45)));
      agua.addColorStop(1, rgba(C.abismo));
      ctx.fillStyle = agua;
      ctx.fillRect(0, hz, W, H - hz);

      // Reflejo del sol sobre el agua
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const filas = 28;
      for (let i = 0; i < filas; i++) {
        const q = i / filas;
        const yy = hz + (H - hz) * Math.pow(q, 1.35);
        const ancho = (W * 0.04 + W * 0.2 * q) * (0.75 + 0.35 * Math.sin(t * 1.2 + i * 1.7) * agit);
        const desv = Math.sin(t * 0.8 + i * 2.3) * W * 0.025 * agit;
        ctx.fillStyle = rgba(C.cercania, (0.18 + 0.26 * calma) * (1 - q));
        ctx.fillRect(sx - ancho / 2 + desv, yy, ancho, Math.max(1.5, (H - hz) / 80));
      }
      ctx.restore();

      // Capas de olas, de lejos a cerca
      const escalaAmp = H / 900;
      const escalaLen = Math.max(0.6, W / 1440);
      for (const cap of capas) {
        cap.f += (dt / 1000) * cap.vel * (0.45 + 0.75 * agit);
        const base = hz + cap.y * (H - hz);
        const amp = cap.amp * escalaAmp * agit + cap.amp * escalaAmp * 0.12;
        const L = cap.len * escalaLen;
        ctx.beginPath();
        ctx.moveTo(-20, H + 2);
        for (let x = -20; x <= W + 20; x += 14) {
          const y =
            base +
            amp *
              (Math.sin((x / L) * 6.2832 + cap.f) * 0.62 +
                Math.sin((x / (L * 0.53)) * 6.2832 - cap.f * 1.4 + cap.y * 9) * 0.28 +
                Math.sin((x / (L * 0.23)) * 6.2832 + cap.f * 2.2) * 0.12 * agit);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W + 20, H + 2);
        ctx.closePath();
        ctx.fillStyle = rgba(cap.col, cap.a);
        ctx.fill();
        ctx.strokeStyle = rgba(C.claridad, 0.04 + 0.06 * (1 - cap.y));
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    const debeAnimar = () => visible && !tapado && !d.hidden && !mqReducido.matches;
    function bucle(ahora) {
      raf = null;
      if (!debeAnimar()) return;
      if (ahora - ultimoDibujo >= 32) {
        const dt = Math.min(100, ahora - (ultimo || ahora));
        ultimo = ahora;
        ultimoDibujo = ahora;
        dibujar(ahora, dt);
      }
      raf = requestAnimationFrame(bucle);
    }
    function arrancar() {
      if (debeAnimar()) {
        if (raf === null) { ultimo = 0; raf = requestAnimationFrame(bucle); }
      } else if (!tapado) {
        dibujar(performance.now(), 0);
      }
    }

    new ResizeObserver(medir).observe(cv);
    d.addEventListener('visibilitychange', arrancar);
    mqReducido.addEventListener('change', arrancar);

    return {
      progreso(p) { prog = p; if (!debeAnimar() && !tapado) dibujar(performance.now(), 0); },
      visible(v) { visible = v; arrancar(); },
      tapar(v) { tapado = v; arrancar(); },
      arrancar,
    };
  }

  const mar = canvas ? crearMar(canvas) : { progreso() {}, visible() {}, tapar() {}, arrancar() {} };

  /* =====================================================================
     Frase que se escribe sola
     ===================================================================== */
  function crearTecleo(el) {
    if (!el) return { activo() {} };
    const palabras = JSON.parse(el.dataset.tecleo);
    const cursor = el.nextElementSibling;
    let i = 0;
    let actual = palabras[0];
    let reloj = null;
    let vivo = false;
    let primera = true;

    const poner = (s) => { el.textContent = s || '​'; };
    const escribiendo = (v) => cursor && cursor.classList.toggle('escribiendo', v);

    function escribir(n, fin) {
      if (!vivo) return;
      escribiendo(true);
      if (n > actual.length) { escribiendo(false); fin(); return; }
      poner(actual.slice(0, n));
      reloj = setTimeout(() => escribir(n + 1, fin), 70 + Math.random() * 70);
    }
    function borrar(n, fin) {
      if (!vivo) return;
      escribiendo(true);
      if (n < 0) { escribiendo(false); fin(); return; }
      poner(actual.slice(0, n));
      reloj = setTimeout(() => borrar(n - 1, fin), 36);
    }
    function esperarYCambiar() {
      if (!vivo) return;
      reloj = setTimeout(() => {
        borrar(actual.length - 1, () => {
          i = (i + 1) % palabras.length;
          actual = palabras[i];
          reloj = setTimeout(() => escribir(1, esperarYCambiar), 360);
        });
      }, 2600);
    }
    function iniciar() {
      if (vivo) return;
      vivo = true;
      if (primera) {
        primera = false;
        poner('');
        reloj = setTimeout(() => escribir(1, esperarYCambiar), 900);
      } else {
        esperarYCambiar();
      }
    }
    function detener() {
      if (!vivo) return;
      vivo = false;
      clearTimeout(reloj);
      escribiendo(false);
      poner(actual);
    }
    return {
      activo(v) {
        if (v && !mqReducido.matches && !d.hidden) iniciar();
        else detener();
        if (mqReducido.matches) { actual = palabras[0]; i = 0; poner(actual); }
      },
    };
  }

  const tecleo = crearTecleo(hero.querySelector('[data-tecleo]'));

  /* =====================================================================
     Bandas de texto: partir y coreografiar
     ===================================================================== */
  function partir(el, modo, seed) {
    const r = rng(seed);
    const texto = el.textContent.trim().replace(/\s+/g, ' ');
    el.textContent = '';
    const sr = d.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = texto;
    const vis = d.createElement('span');
    vis.setAttribute('aria-hidden', 'true');
    el.append(sr, vis);
    const palabras = texto.split(' ');
    const total = texto.replace(/ /g, '').length;
    let ci = 0;
    palabras.forEach((w, wi) => {
      const ws = d.createElement('span');
      ws.className = 'w';
      if (modo === 'w') {
        ws.style.setProperty('--th', ((wi / palabras.length) * 0.5 + r() * 0.04).toFixed(3));
        ws.textContent = w;
      } else {
        [...w].forEach((ch) => {
          const cs = d.createElement('span');
          cs.className = 'c';
          cs.textContent = ch;
          cs.style.setProperty('--th', ((ci / total) * 0.5 + r() * 0.08).toFixed(3));
          cs.style.setProperty('--jy', ((ci % 2 ? 1 : -1) * (14 + r() * 16)).toFixed(1) + 'px');
          cs.style.setProperty('--jr', ((r() - 0.5) * 14).toFixed(1) + 'deg');
          ws.appendChild(cs);
          ci++;
        });
      }
      vis.appendChild(ws);
      if (wi < palabras.length - 1) vis.appendChild(d.createTextNode(' '));
    });
  }
  hero.querySelectorAll('[data-partir]').forEach((el, i) => partir(el, el.dataset.partir, 7 + i * 13));

  const bandas = [...hero.querySelectorAll('.banda')].map((el, i, arr) => ({
    el,
    a: +el.dataset.a,
    b: +el.dataset.b,
    ramp: +(el.dataset.ramp || 0),
    primera: i === 0,
    ultima: i === arr.length - 1,
    op: -1,
    k: -1,
  }));

  function actualizarBandas(p) {
    for (const b of bandas) {
      const f = Math.min(0.02, (b.b - b.a) / 3);
      const entra = b.primera ? 1 : suave(p, b.a, b.a + f);
      const sale = b.ultima ? 1 : 1 - suave(p, b.b - f, b.b);
      const op = entra * sale;
      const rampa = b.ramp || Math.min(0.05, (b.b - b.a) * 0.35);
      let k = clamp((p - b.a) / rampa, 0, 1);
      if (b.primera) k = 1;
      if (Math.abs(op - b.op) > 0.004 || ((op === 0 || op === 1) && op !== b.op)) {
        b.op = op;
        b.el.style.opacity = op.toFixed(3);
        b.el.classList.toggle('activa', op > 0.5);
      }
      if (Math.abs(k - b.k) > 0.008 || ((k === 0 || k === 1) && k !== b.k)) {
        b.k = k;
        b.el.style.setProperty('--k', k.toFixed(3));
      }
    }
  }

  let pistaOculta = null;
  function actualizarPista(p) {
    const ocultar = p > 0.03;
    if (ocultar !== pistaOculta) { pistaOculta = ocultar; pista?.classList.toggle('oculta', ocultar); }
  }

  /* =====================================================================
     Video guiado por el scroll (Blob + seeks controlados)
     ===================================================================== */
  let videoListo = false;
  let seekOcupado = false;
  let tiempoPendiente = null;

  function pedirSeek(t) {
    if (!video || !video.duration) return;
    if (seekOcupado) { tiempoPendiente = t; return; }
    seekOcupado = true;
    video.currentTime = t;
  }
  if (video) {
    video.addEventListener('seeked', () => {
      seekOcupado = false;
      if (tiempoPendiente !== null) {
        const t = tiempoPendiente;
        tiempoPendiente = null;
        pedirSeek(t);
      }
    });
    video.addEventListener('error', () => {
      seekOcupado = false;
      tiempoPendiente = null;
      fallaVideo();
    });
  }

  function fallaVideo() {
    videoListo = false;
    escena.classList.remove('cargando', 'video-listo');
    escena.classList.add('video-fallo');
    mar.tapar(false);
  }

  let videoIniciado = false;
  function iniciarVideoUnaVez() {
    if (videoIniciado || !VIDEO.LISTO) return;
    videoIniciado = true;
    escena.classList.add('cargando');
    let empezado = false;
    const empezar = () => {
      if (empezado) return;
      empezado = true;
      cargarBlob().catch(fallaVideo);
    };
    const img = new Image();
    img.onload = () => {
      posterCapa.style.backgroundImage = `url('${VIDEO.POSTER}')`;
      posterCapa.classList.add('visible');
      empezar();
    };
    img.onerror = empezar;
    img.src = VIDEO.POSTER;
    setTimeout(empezar, 4000);
  }

  async function cargarBlob() {
    const ctrl = new AbortController();
    let vigia = setTimeout(() => ctrl.abort(), 20000);
    const res = await fetch(VIDEO.URL, { priority: 'low', signal: ctrl.signal });
    if (!res.ok || !res.body) throw new Error('video no disponible');
    const total = Number(res.headers.get('Content-Length')) || VIDEO.BYTES;
    const lector = res.body.getReader();
    const trozos = [];
    let recibido = 0;
    let ultimoAnillo = 0;
    for (;;) {
      const { done, value } = await lector.read();
      if (done) break;
      clearTimeout(vigia);
      vigia = setTimeout(() => ctrl.abort(), 20000);
      trozos.push(value);
      recibido += value.length;
      const frac = Math.min(1, recibido / total);
      const ahora = performance.now();
      if (ahora - ultimoAnillo > 100 || frac === 1) {
        ultimoAnillo = ahora;
        anillo.style.setProperty('--ld', Math.round(126 * (1 - frac)));
      }
    }
    clearTimeout(vigia);
    anillo.style.setProperty('--ld', 0);
    video.src = URL.createObjectURL(new Blob(trozos, { type: 'video/mp4' }));
    video.load();
    video.addEventListener('canplay', () => {
      videoListo = true;
      escena.classList.remove('cargando');
      escena.classList.add('video-listo');
      mar.tapar(true);
      pedirSeek(progresoHero() * video.duration);
    }, { once: true });
  }

  /* =====================================================================
     Bucle del scroll: suaviza, descansa al converger
     ===================================================================== */
  let objetivo = 0;
  let mostrado = 0;
  let raf = null;
  let ultimoTick = 0;
  let heroEnPantalla = true;
  let scrubActivo = false;

  function progresoHero() {
    const r = hero.getBoundingClientRect();
    const rango = r.height - innerHeight;
    return rango > 0 ? clamp(-r.top / rango, 0, 1) : 0;
  }

  function tick(ahora) {
    const dt = Math.min(100, ahora - (ultimoTick || ahora));
    ultimoTick = ahora;
    const k = 0.14;
    mostrado += (objetivo - mostrado) * (1 - Math.pow(1 - k, dt / 16.667));
    if (Math.abs(objetivo - mostrado) < 0.0005) {
      mostrado = objetivo;
      raf = null;
      ultimoTick = 0;
    } else {
      raf = requestAnimationFrame(tick);
    }
    if (videoListo) pedirSeek(mostrado * video.duration);
    actualizarBandas(mostrado);
    actualizarPista(mostrado);
    mar.progreso(mostrado);
    tecleo.activo(heroEnPantalla && mostrado < 0.25);
  }

  function alScroll() {
    if (!scrubActivo) return;
    objetivo = progresoHero();
    if (raf === null && heroEnPantalla) raf = requestAnimationFrame(tick);
  }

  function activarScrub() {
    if (scrubActivo) return;
    scrubActivo = true;
    iniciarVideoUnaVez();
    addEventListener('scroll', alScroll, { passive: true });
    addEventListener('resize', alScroll);
    bandas.forEach((b) => { b.op = -1; b.k = -1; });
    objetivo = mostrado = progresoHero();
    actualizarBandas(mostrado);
    actualizarPista(mostrado);
    mar.progreso(mostrado);
    tecleo.activo(heroEnPantalla && mostrado < 0.25);
    alScroll();
  }

  function desactivarScrub() {
    // Héroe fijo (teléfonos, tablets en vertical, movimiento reducido): imagen quieta en lugar del video.
    if (fijo && !fijo.getAttribute('src')) fijo.src = fijo.dataset.src;
    scrubActivo = false;
    removeEventListener('scroll', alScroll);
    removeEventListener('resize', alScroll);
    if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
    bandas.forEach((b) => {
      b.el.style.removeProperty('opacity');
      b.el.style.removeProperty('--k');
      b.el.classList.remove('activa');
      b.op = -1;
      b.k = -1;
    });
    mar.progreso(0.45);
    tecleo.activo(heroEnPantalla);
  }

  function aplicarModo() {
    if (MQLS.some((m) => m.matches)) desactivarScrub();
    else activarScrub();
  }

  new IntersectionObserver((es) => {
    heroEnPantalla = es[0].isIntersecting;
    mar.visible(heroEnPantalla);
    if (scrubActivo) {
      tecleo.activo(heroEnPantalla && mostrado < 0.25);
      if (heroEnPantalla) alScroll();
    } else {
      tecleo.activo(heroEnPantalla);
    }
  }).observe(hero);

  d.addEventListener('visibilitychange', () => {
    tecleo.activo(!d.hidden && heroEnPantalla && (!scrubActivo || mostrado < 0.25));
  });

  MQLS.forEach((m) => m.addEventListener('change', aplicarModo));
  aplicarModo();
  mar.arrancar();
})();
