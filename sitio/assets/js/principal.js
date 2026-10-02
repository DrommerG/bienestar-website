/* Bienestar · comportamiento compartido por todas las páginas */
(() => {
  'use strict';
  const d = document;
  const mqReducido = matchMedia('(prefers-reduced-motion: reduce)');
  const reducido = () => mqReducido.matches;

  /* ---------- Pausa global con la pestaña oculta ---------- */
  d.addEventListener('visibilitychange', () => d.body.classList.toggle('pausado', d.hidden));

  /* ---------- Elementos vivos: solo se animan en pantalla ---------- */
  const ioVivo = new IntersectionObserver(
    (es) => es.forEach((e) => e.target.classList.toggle('activo', e.isIntersecting)),
    { rootMargin: '120px 0px' }
  );
  d.querySelectorAll('[data-vivo]').forEach((el) => ioVivo.observe(el));

  /* ---------- Cabecera: clara u oscura según lo que tiene debajo ---------- */
  const cab = d.querySelector('.cabecera');
  // Zonas oscuras: secciones completas y la mitad profunda de las olas azul abismo.
  const zonas = [
    ...[...d.querySelectorAll('main [data-cabecera="oscura"], .pie[data-cabecera="oscura"]')].map((el) => ({ el, parte: 'toda' })),
    ...[...d.querySelectorAll('.ola--sube, .ola--pie')].map((el) => ({ el, parte: 'abajo' })),
    ...[...d.querySelectorAll('.ola--baja')].map((el) => ({ el, parte: 'arriba' })),
  ];
  let cabOscura = null;
  let cabPendiente = false;
  function revisarCabecera() {
    cabPendiente = false;
    const y = 38;
    let os = false;
    for (const { el, parte } of zonas) {
      const r = el.getBoundingClientRect();
      const mitad = r.top + r.height / 2;
      if (
        (parte === 'toda' && r.top <= y && r.bottom >= y) ||
        (parte === 'abajo' && mitad <= y && r.bottom >= y) ||
        (parte === 'arriba' && r.top <= y && mitad >= y)
      ) { os = true; break; }
    }
    if (os !== cabOscura) {
      cabOscura = os;
      cab.classList.toggle('sobre-oscuro', os);
    }
  }
  addEventListener('scroll', () => {
    if (!cabPendiente) { cabPendiente = true; requestAnimationFrame(revisarCabecera); }
  }, { passive: true });
  addEventListener('resize', revisarCabecera);
  revisarCabecera();

  /* ---------- Menú móvil ---------- */
  const btnMenu = d.querySelector('.menu-boton');
  const menu = d.getElementById('menu-movil');
  function abrirMenu(abrir) {
    btnMenu.setAttribute('aria-expanded', String(abrir));
    btnMenu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
    menu.classList.toggle('abierto', abrir);
    menu.inert = !abrir;
    d.body.classList.toggle('sin-scroll', abrir);
    d.body.classList.toggle('menu-abierto', abrir);
    if (abrir) menu.querySelector('a')?.focus({ preventScroll: true });
  }
  if (btnMenu && menu) {
    btnMenu.addEventListener('click', () => abrirMenu(btnMenu.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) abrirMenu(false); });
    d.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('abierto')) { abrirMenu(false); btnMenu.focus(); }
    });
    matchMedia('(min-width: 1081px)').addEventListener('change', (e) => { if (e.matches) abrirMenu(false); });
  }

  /* ---------- Submenú de servicios ---------- */
  d.querySelectorAll('.tiene-submenu').forEach((li) => {
    const b = li.querySelector('button');
    const cerrar = () => { b.setAttribute('aria-expanded', 'false'); li.classList.remove('abierto'); };
    b.addEventListener('click', () => {
      const ab = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', String(ab));
      li.classList.toggle('abierto', ab);
    });
    li.addEventListener('focusout', (e) => { if (!li.contains(e.relatedTarget)) cerrar(); });
    li.addEventListener('keydown', (e) => { if (e.key === 'Escape') { cerrar(); b.focus(); } });
    li.addEventListener('mouseleave', cerrar);
  });

  /* ---------- Entradas: titulares que emergen y bloques que aparecen ---------- */
  d.querySelectorAll('.emerge').forEach((h) => {
    if (h.querySelector('.emerge-in')) return;
    const s = d.createElement('span');
    s.className = 'emerge-in';
    while (h.firstChild) s.appendChild(h.firstChild);
    h.appendChild(s);
  });
  const ioEntrada = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      const t = e.target;
      t.classList.add('in');
      ioEntrada.unobserve(t);
      const i = parseFloat(t.style.getPropertyValue('--i')) || 0;
      setTimeout(() => t.classList.add('listo'), 1300 + i * 110);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  // Lo que ya está a la vista al cargar entra enseguida, sin esperar al observador.
  const entradas = [...d.querySelectorAll('.revela, .emerge')];
  const alto = innerHeight;
  const visiblesAlCargar = entradas.filter((el) => el.getBoundingClientRect().top < alto * 0.92 && !el.closest('.hero'));
  setTimeout(() => {
    visiblesAlCargar.forEach((el) => {
      el.classList.add('in');
      const i = parseFloat(el.style.getPropertyValue('--i')) || 0;
      setTimeout(() => el.classList.add('listo'), 1300 + i * 110);
    });
  }, 60);
  entradas.filter((el) => !visiblesAlCargar.includes(el)).forEach((el) => ioEntrada.observe(el));

  /* ---------- Palabras manuscritas alrededor de Verónica ---------- */
  const zonaPalabras = d.querySelector('[data-palabras] .palabras');
  if (zonaPalabras) {
    const palabras = [...zonaPalabras.querySelectorAll('.palabra')];
    palabras.forEach((p) => {
      const texto = p.textContent;
      p.textContent = '';
      [...texto].forEach((ch, n) => {
        const s = d.createElement('span');
        s.className = 'c';
        s.style.setProperty('--n', n);
        s.textContent = ch;
        p.appendChild(s);
      });
      const onda = d.createElement('span');
      onda.className = 'onda';
      p.appendChild(onda);
      p.dataset.len = texto.length;
    });
    let idx = 0;
    let reloj = null;
    let corriendo = false;
    const esperar = (ms, fn) => { reloj = setTimeout(fn, ms); };
    function ciclo() {
      if (!corriendo) return;
      const p = palabras[idx];
      p.classList.remove('disuelve');
      void p.offsetWidth;
      p.classList.add('escribe');
      esperar(900 + p.dataset.len * 75 + 2300, () => {
        p.classList.remove('escribe');
        p.classList.add('disuelve');
        esperar(1500, () => {
          p.classList.remove('disuelve');
          idx = (idx + 1) % palabras.length;
          esperar(250, ciclo);
        });
      });
    }
    const arrancar = () => {
      if (corriendo || reducido() || d.hidden) return;
      zonaPalabras.classList.remove('estaticas');
      corriendo = true;
      ciclo();
    };
    const parar = () => { corriendo = false; clearTimeout(reloj); };
    let palabrasVisibles = false;
    new IntersectionObserver((es) => {
      palabrasVisibles = es[0].isIntersecting;
      palabrasVisibles ? arrancar() : parar();
    }, { threshold: 0.25 }).observe(zonaPalabras.parentElement);
    d.addEventListener('visibilitychange', () => (d.hidden ? parar() : palabrasVisibles && arrancar()));
    window.__palabras = {
      fijar() { parar(); palabras.forEach((p) => p.classList.remove('escribe', 'disuelve')); zonaPalabras.classList.add('estaticas'); },
      soltar() { if (palabrasVisibles) arrancar(); },
    };
    if (reducido()) window.__palabras.fijar();
  }

  /* ---------- Especialidades en burbujas (pestañas accesibles) ---------- */
  const lista = d.querySelector('.burbujas[role="tablist"]');
  if (lista) {
    const tabs = [...lista.querySelectorAll('[role="tab"]')];
    const elegir = (tab, foco) => {
      tabs.forEach((t) => {
        const sel = t === tab;
        t.setAttribute('aria-selected', String(sel));
        t.tabIndex = sel ? 0 : -1;
        d.getElementById(t.getAttribute('aria-controls')).hidden = !sel;
      });
      if (foco) tab.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => elegir(t));
      t.addEventListener('keydown', (e) => {
        const mov = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (mov) { e.preventDefault(); elegir(tabs[(i + mov + tabs.length) % tabs.length], true); }
        if (e.key === 'Home') { e.preventDefault(); elegir(tabs[0], true); }
        if (e.key === 'End') { e.preventDefault(); elegir(tabs[tabs.length - 1], true); }
      });
    });
  }

  /* ---------- Mapa del cerebro: la zona activa sigue al texto que se lee ---------- */
  const mapa = d.querySelector('[data-mapa]');
  if (mapa) {
    const svg = mapa.querySelector('.cerebro');
    const etiqueta = mapa.querySelector('.mapa-etiqueta');
    const pasos = [...mapa.querySelectorAll('.mapa-paso')];
    let activa = null;
    let pendiente = false;
    let visible = false;
    function activar(paso) {
      if (!paso || paso.dataset.zona === activa) return;
      activa = paso.dataset.zona;
      svg.setAttribute('data-activa', activa);
      pasos.forEach((p) => p.classList.toggle('activo', p === paso));
      etiqueta.textContent = paso.querySelector('h3').textContent;
      etiqueta.style.setProperty('--x', paso.dataset.x + '%');
      etiqueta.style.setProperty('--y', paso.dataset.y + '%');
      etiqueta.classList.remove('visible');
      void etiqueta.offsetWidth;
      etiqueta.classList.add('visible');
    }
    // El paso activo es el último cuyo título ya pasó la línea de lectura.
    function revisar() {
      pendiente = false;
      const linea = innerHeight * (innerWidth <= 860 ? 0.72 : 0.55);
      let elegido = pasos[0];
      for (const p of pasos) if (p.getBoundingClientRect().top < linea) elegido = p;
      activar(elegido);
    }
    new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible) revisar(); }).observe(mapa);
    addEventListener('scroll', () => {
      if (visible && !pendiente) { pendiente = true; requestAnimationFrame(revisar); }
    }, { passive: true });
    addEventListener('resize', revisar);
    // Tocar una zona del dibujo lleva a su explicación.
    svg.addEventListener('click', (e) => {
      const zona = e.target.closest('[data-zona]')?.dataset.zona;
      const paso = pasos.find((p) => p.dataset.zona === zona);
      if (paso) paso.scrollIntoView({ behavior: reducido() ? 'auto' : 'smooth', block: 'center' });
    });
    svg.addEventListener('pointerover', (e) => {
      const zona = e.target.closest('[data-zona]')?.dataset.zona;
      if (zona && pasos.some((p) => p.dataset.zona === zona)) svg.setAttribute('data-sobre', zona);
    });
    svg.addEventListener('pointerleave', () => svg.removeAttribute('data-sobre'));
    activar(pasos[0]);
  }

  /* ---------- Línea de los pasos: se dibuja con el scroll ---------- */
  const marcoLinea = d.querySelector('[data-linea]');
  if (marcoLinea) {
    const camino = marcoLinea.querySelector('.pasos-linea path');
    let ultimoValor = -1;
    let pendiente = false;
    let visible = false;
    const dibujar = () => {
      pendiente = false;
      if (reducido()) { camino.style.setProperty('--dibujo', 0); return; }
      const r = marcoLinea.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (innerHeight * 0.55)));
      const v = Math.round((1 - p) * 1000) / 1000;
      if (v !== ultimoValor) { ultimoValor = v; camino.style.setProperty('--dibujo', v); }
    };
    new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible) dibujar(); }).observe(marcoLinea);
    addEventListener('scroll', () => {
      if (visible && !pendiente) { pendiente = true; requestAnimationFrame(dibujar); }
    }, { passive: true });
    dibujar();
  }

  /* ---------- Videos: se cargan solo cuando la persona los pide ---------- */
  d.querySelectorAll('.video-tarjeta[data-video]').forEach((card) => {
    const btn = card.querySelector('.video-play');
    btn?.addEventListener('click', () => {
      const marco = card.querySelector('.video-marco');
      const img = marco.querySelector('img');
      const v = d.createElement('video');
      v.src = card.dataset.video;
      v.poster = img.currentSrc || img.src;
      v.controls = true;
      v.playsInline = true;
      v.preload = 'auto';
      v.setAttribute('aria-label', btn.getAttribute('aria-label').replace(/^Reproducir el video: /, ''));
      img.replaceWith(v);
      btn.remove();
      v.play().catch(() => {});
      v.focus({ preventScroll: true });
      d.querySelectorAll('video').forEach((otro) => { if (otro !== v && !otro.classList.contains('hero-video')) otro.pause(); });
    });
  });

  /* ---------- Filtros del blog ---------- */
  const filtros = [...d.querySelectorAll('.filtro')];
  if (filtros.length) {
    const tarjetas = [...d.querySelectorAll('[data-tarjetas] .tarjeta-articulo')];
    filtros.forEach((f) => f.addEventListener('click', () => {
      filtros.forEach((x) => x.setAttribute('aria-pressed', String(x === f)));
      const k = f.dataset.filtro;
      tarjetas.forEach((t) => { t.hidden = !(k === 'todos' || t.dataset.categoria === k); });
    }));
  }

  /* ---------- Movimiento reducido en vivo, en ambas direcciones ---------- */
  mqReducido.addEventListener('change', (e) => {
    if (e.matches) {
      window.__palabras?.fijar();
      marcoLinea?.querySelector('.pasos-linea path').style.setProperty('--dibujo', 0);
    } else {
      window.__palabras?.soltar();
      d.querySelectorAll('.palabras.estaticas').forEach((z) => z.classList.remove('estaticas'));
      dispatchEvent(new Event('scroll'));
    }
  });
})();
