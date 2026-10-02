// Piezas compartidas por todas las páginas.
import {
  WHATSAPP_VISIBLE, SITIO_URL, MARCA, SUBTITULO, PROFESIONAL, CIUDAD, PAIS,
  DIRECCION, ANIO, MENSAJE_WA_GENERAL, waUrl, WHATSAPP,
} from './config.mjs';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const SERVICIOS = [
  {
    ruta: 'servicios/evaluacion-neuropsicologica.html',
    nombre: 'Evaluación neuropsicológica',
    corto: 'Entender cómo funciona la mente',
  },
  {
    ruta: 'servicios/rehabilitacion-neuropsicologica.html',
    nombre: 'Rehabilitación neuropsicológica',
    corto: 'Fortalecer lo que más cuesta',
  },
  {
    ruta: 'servicios/estimulacion-magnetica-transcraneal.html',
    nombre: 'Estimulación Magnética Transcraneal',
    corto: 'EMT no invasiva, en 21 días',
  },
];

// ---------- Iconos ----------
export const ICONO = {
  whatsapp: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>`,
  chevron: `<svg class="chev" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  play: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M8 5.6v12.8c0 .8.9 1.3 1.6.9l10-6.4c.6-.4.6-1.4 0-1.8l-10-6.4C8.9 4.3 8 4.8 8 5.6Z"/></svg>`,
};

const FAVICON =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><circle cx='25' cy='27' r='19' fill='#93A9D3' fill-opacity='.85'/><circle cx='41' cy='21' r='13' fill='#F5D8C4'/><circle cx='39' cy='36' r='14' fill='#DCCBEA' fill-opacity='.95'/><path d='M28 30c7-5 13 1 10 8-3 6-9 9-10 22-3-9-7-16-6-22 1-5 3-7 6-8z' fill='#2E4A7D'/></svg>`
  );

// ---------- Olas ----------
// Dos periodos idénticos de 1440 unidades: al desplazar -50% el bucle no tiene costura.
const OLA_A =
  'M0 64 C240 28 480 28 720 64 C960 100 1200 100 1440 64 C1680 28 1920 28 2160 64 C2400 100 2640 100 2880 64 V120 H0 Z';
const OLA_B =
  'M0 44 C180 70 540 86 720 60 C900 34 1260 18 1440 44 C1620 70 1980 86 2160 60 C2340 34 2700 18 2880 44 V120 H0 Z';

export function ola({ clase = '', color = 'var(--claridad)' } = {}) {
  return `<div class="ola ${clase}" data-vivo aria-hidden="true" style="color:${color}">
  <svg class="ola-fondo" viewBox="0 0 2880 120" preserveAspectRatio="none" focusable="false"><path d="${OLA_B}"/></svg>
  <svg class="ola-frente" viewBox="0 0 2880 120" preserveAspectRatio="none" focusable="false"><path d="${OLA_A}"/></svg>
</div>`;
}

// ---------- Portadas del blog (SVG propio, en la paleta de la marca) ----------
function rng(seed) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}

export function portada(tema, sufijo = '') {
  const vb = 'viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"';
  const id = `g-${tema}${sufijo}`;
  if (tema === 'neurodivergencia') {
    const r = rng(11);
    const cols = ['#93A9D3', '#DCCBEA', '#F5D8C4', '#B9C7E4', '#E9DDF1'];
    let c = '';
    for (let i = 0; i < 26; i++) {
      const x = 90 + (i % 7) * 105 + r() * 40;
      const y = 80 + Math.floor(i / 7) * 115 + r() * 40;
      const rad = 18 + r() * 34;
      c += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${rad.toFixed(0)}" fill="${cols[i % cols.length]}" fill-opacity=".85"/>`;
    }
    c += `<circle cx="452" cy="268" r="46" fill="#2E4A7D"/>`;
    return `<svg ${vb} aria-hidden="true" focusable="false"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F1F4FA"/><stop offset="1" stop-color="#E4E1F2"/></linearGradient></defs><rect width="800" height="500" fill="url(#${id})"/><g style="mix-blend-mode:multiply">${c}</g></svg>`;
  }
  if (tema === 'autismo') {
    let rings = '';
    for (let i = 0; i < 9; i++) {
      rings += `<circle cx="540" cy="250" r="${40 + i * 38}" fill="none" stroke="#2E4A7D" stroke-opacity="${(0.55 - i * 0.05).toFixed(2)}" stroke-width="${i % 3 === 0 ? 2.5 : 1.2}"/>`;
    }
    return `<svg ${vb} aria-hidden="true" focusable="false"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F8E7DB"/><stop offset="1" stop-color="#F1F4FA"/></linearGradient></defs><rect width="800" height="500" fill="url(#${id})"/>${rings}<circle cx="540" cy="250" r="30" fill="#93A9D3"/><circle cx="210" cy="170" r="54" fill="#DCCBEA"/><circle cx="252" cy="214" r="34" fill="#F5D8C4" style="mix-blend-mode:multiply"/></svg>`;
  }
  if (tema === 'tdah') {
    const r = rng(29);
    let dots = '';
    for (let i = 0; i < 34; i++) {
      const x = 60 + r() * 330;
      const y = 50 + r() * 400;
      dots += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(6 + r() * 12).toFixed(0)}" fill="${i % 3 ? '#93A9D3' : '#F5D8C4'}" fill-opacity=".9"/>`;
    }
    for (let i = 0; i < 7; i++) {
      dots += `<circle cx="${470 + i * 46}" cy="250" r="14" fill="#2E4A7D" fill-opacity="${(0.4 + i * 0.09).toFixed(2)}"/>`;
    }
    return `<svg ${vb} aria-hidden="true" focusable="false"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E9E0F2"/><stop offset="1" stop-color="#F1F4FA"/></linearGradient></defs><rect width="800" height="500" fill="url(#${id})"/><path d="M400 250 C430 250 440 250 470 250" stroke="#2E4A7D" stroke-opacity=".3" stroke-width="2" fill="none"/>${dots}</svg>`;
  }
  if (tema === 'altas-capacidades') {
    const pts = [
      [110, 400, 14], [200, 352, 20], [300, 300, 28], [410, 240, 36], [530, 176, 46], [660, 112, 58],
    ];
    const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ');
    const circles = pts
      .map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="${p[2]}" fill="${i === pts.length - 1 ? '#F5D8C4' : i % 2 ? '#DCCBEA' : '#93A9D3'}"/>`)
      .join('');
    return `<svg ${vb} aria-hidden="true" focusable="false"><defs><linearGradient id="${id}" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#F1F4FA"/><stop offset="1" stop-color="#E1E8F5"/></linearGradient></defs><rect width="800" height="500" fill="url(#${id})"/><path d="${line}" stroke="#2E4A7D" stroke-width="2" stroke-dasharray="2 9" stroke-linecap="round" fill="none"/>${circles}<circle cx="660" cy="112" r="84" fill="none" stroke="#F5D8C4" stroke-width="2"/></svg>`;
  }
  // ansiedad-y-depresion: de olas agitadas a agua quieta
  let lines = '';
  for (let i = 0; i < 7; i++) {
    const y = 230 + i * 34;
    let d = `M0 ${y}`;
    for (let x = 0; x <= 800; x += 20) {
      const amp = (1 - x / 800) ** 1.6 * (22 - i * 1.5);
      d += ` L${x} ${(y + Math.sin(x / 26 + i) * amp).toFixed(1)}`;
    }
    lines += `<path d="${d}" fill="none" stroke="${i % 2 ? '#93A9D3' : '#DCCBEA'}" stroke-opacity="${(0.85 - i * 0.08).toFixed(2)}" stroke-width="2"/>`;
  }
  return `<svg ${vb} aria-hidden="true" focusable="false"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1B2C4F"/><stop offset="1" stop-color="#2E4A7D"/></linearGradient><radialGradient id="${id}-sol"><stop offset="0" stop-color="#F5D8C4" stop-opacity=".9"/><stop offset="1" stop-color="#F5D8C4" stop-opacity="0"/></radialGradient></defs><rect width="800" height="500" fill="url(#${id})"/><circle cx="610" cy="170" r="120" fill="url(#${id}-sol)"/><circle cx="610" cy="170" r="34" fill="#F5D8C4"/>${lines}</svg>`;
}

// ---------- Utilidades de rutas ----------
export function contexto(ruta) {
  const profundidad = ruta.split('/').length - 1;
  const raiz = profundidad ? '../'.repeat(profundidad) : '';
  return {
    raiz,
    r: (destino) => raiz + destino,
    wa: waUrl,
  };
}

// ---------- Datos estructurados ----------
export function negocioLD() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: `${MARCA}, ${SUBTITULO}`,
    alternateName: `${MARCA} ${PROFESIONAL}`,
    description:
      'Psicología y neuropsicología en Quito para niños, adolescentes y adultos: evaluación neuropsicológica, rehabilitación neuropsicológica y Estimulación Magnética Transcraneal (EMT).',
    telephone: `+${WHATSAPP}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: CIUDAD,
      addressCountry: 'EC',
      ...(DIRECCION ? { streetAddress: DIRECCION } : {}),
    },
    areaServed: [CIUDAD, PAIS],
    founder: { '@type': 'Person', name: PROFESIONAL, jobTitle: 'Psicóloga y neuropsicóloga clínica' },
    availableService: SERVICIOS.map((s) => ({ '@type': 'MedicalTherapy', name: s.nombre })),
    knowsLanguage: 'es',
  };
  if (SITIO_URL) {
    ld.url = SITIO_URL + '/';
    ld.image = SITIO_URL + '/assets/img/og-bienestar.jpg';
  }
  return ld;
}

// ---------- Cabecera, menú, pie ----------
function cabecera(p, c) {
  const actual = (sec) => (p.seccion === sec ? ' aria-current="page"' : '');
  const subActual = p.seccion === 'servicios' ? ' actual' : '';
  const sub = SERVICIOS.map(
    (s) =>
      `<li><a href="${c.r(s.ruta)}"${p.ruta === s.ruta ? ' aria-current="page"' : ''}>${s.nombre}<small>${s.corto}</small></a></li>`
  ).join('');
  return `<header class="cabecera${p.inicio || p.heroOscuro ? ' sobre-oscuro' : ''}">
  <div class="contenedor cabecera-int">
    <a class="marca" href="${c.r('index.html')}" aria-label="${MARCA}, ${SUBTITULO}. Ir al inicio">
      <img class="logo-oscuro" src="${c.r('assets/img/logo-oscuro.webp')}" alt="" width="640" height="190">
      <img class="logo-claro" src="${c.r('assets/img/logo-claro.webp')}" alt="" width="640" height="190">
    </a>
    <nav class="nav" aria-label="Principal">
      <ul class="nav-lista">
        <li class="tiene-submenu">
          <button class="nav-enlace${subActual}" type="button" aria-expanded="false" aria-controls="sub-servicios">Servicios ${ICONO.chevron}</button>
          <ul class="submenu" id="sub-servicios">${sub}</ul>
        </li>
        <li><a class="nav-enlace" href="${c.r('especialidades.html')}"${actual('especialidades')}>Especialidades</a></li>
        <li><a class="nav-enlace" href="${c.r('sobre-veronica.html')}"${actual('sobre')}>Sobre Verónica</a></li>
        <li><a class="nav-enlace" href="${c.r('blog/index.html')}"${actual('blog')}>Blog</a></li>
      </ul>
      <a class="boton boton--wa boton--cab" href="${c.wa(p.waMensaje)}" target="_blank" rel="noopener">${ICONO.whatsapp}<span>Agenda tu cita</span></a>
      <button class="menu-boton" type="button" aria-expanded="false" aria-controls="menu-movil" aria-label="Abrir menú"><span></span><span></span></button>
    </nav>
  </div>
</header>`;
}

function menuMovil(p, c) {
  const sub = SERVICIOS.map((s) => `<li><a href="${c.r(s.ruta)}">${s.nombre}</a></li>`).join('');
  return `<div class="menu-movil" id="menu-movil" data-cabecera="oscura" inert>
  <div class="menu-movil-int contenedor">
    <ul class="menu-lista">
      <li><a href="${c.r('index.html')}">Inicio</a></li>
      <li class="menu-grupo"><span>Servicios</span><ul>${sub}</ul></li>
      <li><a href="${c.r('especialidades.html')}">Especialidades</a></li>
      <li><a href="${c.r('sobre-veronica.html')}">Sobre Verónica</a></li>
      <li><a href="${c.r('blog/index.html')}">Blog</a></li>
    </ul>
    <a class="boton boton--wa" href="${c.wa(p.waMensaje)}" target="_blank" rel="noopener">${ICONO.whatsapp}<span>Escríbenos por WhatsApp</span></a>
    <p class="menu-dato">${CIUDAD}, ${PAIS}. Presencial y en línea.</p>
  </div>
</div>`;
}

function pie(p, c) {
  const serv = SERVICIOS.map((s) => `<li><a href="${c.r(s.ruta)}">${s.nombre}</a></li>`).join('');
  return `<footer class="pie" data-cabecera="oscura">
  ${ola({ clase: 'ola--pie', color: 'var(--abismo)' })}
  <div class="contenedor">
    <section class="pie-cta" aria-labelledby="pie-cta-titulo">
      <h2 id="pie-cta-titulo" class="emerge">${p.pieCta?.titulo || 'La mente también debe ser atendida.'}</h2>
      <p>${p.pieCta?.texto || `Escríbenos y coordinamos tu primera cita, en el consultorio en ${CIUDAD} o en línea.`}</p>
      <a class="boton boton--wa boton--grande" href="${c.wa(p.waMensaje)}" target="_blank" rel="noopener">${ICONO.whatsapp}<span>Escríbenos al ${WHATSAPP_VISIBLE}</span></a>
    </section>
    <div class="pie-grid">
      <div class="pie-marca">
        <img src="${c.r('assets/img/logo-claro.webp')}" alt="${MARCA}, ${SUBTITULO}. ${PROFESIONAL}" width="640" height="190" loading="lazy">
        <p>Psicología y neuropsicología para niños, adolescentes y adultos en ${CIUDAD}.</p>
      </div>
      <nav aria-label="Servicios">
        <h3>Servicios</h3>
        <ul>${serv}</ul>
      </nav>
      <nav aria-label="Bienestar">
        <h3>Bienestar</h3>
        <ul>
          <li><a href="${c.r('especialidades.html')}">Especialidades</a></li>
          <li><a href="${c.r('sobre-veronica.html')}">Sobre Verónica</a></li>
          <li><a href="${c.r('blog/index.html')}">Blog</a></li>
        </ul>
      </nav>
      <div>
        <h3>Contacto</h3>
        <ul>
          <li><a href="${c.wa(MENSAJE_WA_GENERAL)}" target="_blank" rel="noopener">WhatsApp ${WHATSAPP_VISIBLE}</a></li>
          <li>${DIRECCION ? esc(DIRECCION) + '<br>' : ''}${CIUDAD}, ${PAIS}</li>
          <li>Atención presencial y en línea</li>
        </ul>
      </div>
    </div>
    <div class="pie-legal">
      <p>© ${ANIO} ${MARCA}, ${SUBTITULO}. ${PROFESIONAL}.</p>
      <p>La información de este sitio es educativa y no reemplaza una consulta profesional. En una emergencia, llama al 911.</p>
    </div>
  </div>
</footer>`;
}

function waFlotante(p, c) {
  return `<a class="wa-flotante" href="${c.wa(p.waMensaje)}" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp"><span class="wa-etiqueta" aria-hidden="true">Escríbenos</span>${ICONO.whatsapp}</a>`;
}

// ---------- Documento completo ----------
export function documento(p) {
  const c = contexto(p.ruta);
  const urlPagina = SITIO_URL ? `${SITIO_URL}/${p.ruta === 'index.html' ? '' : p.ruta}` : '';
  const ld = [].concat(p.ld ? p.ld(c) : []).filter(Boolean);
  const og = SITIO_URL
    ? `<link rel="canonical" href="${urlPagina}">
<meta property="og:url" content="${urlPagina}">
<meta property="og:image" content="${SITIO_URL}/assets/img/og-bienestar.jpg">`
    : `<!-- DEPLOY STEP: al definir SITIO_URL en contenido/config.mjs se agregan canonical, og:url y og:image con URL absoluta. -->`;
  return `<!doctype html>
<html lang="es-EC">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.titulo)}</title>
<meta name="description" content="${esc(p.descripcion)}">
<meta name="theme-color" content="${p.inicio || p.heroOscuro ? '#1B2C4F' : '#F1F4FA'}">
<link rel="icon" href="${FAVICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&family=Parisienne&family=Playfair+Display:wght@400;500&family=Source+Sans+3:ital,wght@0,400;0,600;1,400&display=swap">
<link rel="stylesheet" href="${c.r('assets/css/estilos.css')}">
<meta property="og:type" content="${p.ogTipo || 'website'}">
<meta property="og:site_name" content="${MARCA}">
<meta property="og:locale" content="es_EC">
<meta property="og:title" content="${esc(p.titulo)}">
<meta property="og:description" content="${esc(p.descripcion)}">
${og}
<script>document.documentElement.classList.add('js')</script>
${ld.map((x) => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('\n')}
</head>
<body class="${p.claseBody || ''}">
<a class="salto" href="#principal">Saltar al contenido</a>
<div class="ambiente" aria-hidden="true"><span class="a1"></span><span class="a2"></span><span class="a3"></span></div>
${cabecera(p, c)}
${menuMovil(p, c)}
<main id="principal" tabindex="-1">
${p.cuerpo(c)}
</main>
${pie(p, c)}
${waFlotante(p, c)}
<script src="${c.r('assets/js/principal.js')}" defer></script>
${(p.scripts || []).map((s) => `<script src="${c.r(s)}" defer></script>`).join('\n')}
</body>
</html>
`;
}
