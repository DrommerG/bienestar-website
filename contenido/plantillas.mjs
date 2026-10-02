// Bloques reutilizables para las subpáginas.
import { ICONO, ola, portada, esc } from './partes.mjs';
import { porSlug, minutosLectura } from './articulos.mjs';
import { SITIO_URL } from './config.mjs';

export function paginaHero(c, { migas = [], titulo, entrada, accion = '', imagen = null, deco = '', clase = '' }) {
  const ruta = migas
    .map((m, i) =>
      i === migas.length - 1
        ? `<li aria-current="page">${m.nombre}</li>`
        : `<li><a href="${c.r(m.ruta)}">${m.nombre}</a></li>`
    )
    .join('');
  const media = imagen
    ? `<div class="pagina-hero-media revela" style="--i:1">
        <img src="${c.r(imagen.src)}"${imagen.srcset ? ` srcset="${imagen.srcset.map(([s, w]) => `${c.r(s)} ${w}w`).join(', ')}" sizes="(max-width: 860px) 92vw, 40vw"` : ''} alt="${esc(imagen.alt)}" width="${imagen.w}" height="${imagen.h}"${imagen.posicion ? ` style="object-position:${imagen.posicion}"` : ''}>
      </div>`
    : deco
      ? `<div class="pagina-hero-deco revela" style="--i:1" aria-hidden="true">${deco}</div>`
      : '';
  return `
<section class="pagina-hero ${clase}">
  <div class="contenedor pagina-hero-grid${imagen || deco ? '' : ' pagina-hero-grid--solo'}">
    <div class="pagina-hero-texto">
      <nav class="migas" aria-label="Estás aquí"><ol>${ruta}</ol></nav>
      <h1 class="emerge">${titulo}</h1>
      <p class="entrada revela">${entrada}</p>
      ${accion ? `<div class="acciones revela" style="--i:1">${accion}</div>` : ''}
    </div>
    ${media}
  </div>
</section>`;
}

export function botonWa(c, mensaje, texto, extra = '') {
  return `<a class="boton boton--wa ${extra}" href="${c.wa(mensaje)}" target="_blank" rel="noopener">${ICONO.whatsapp}<span>${texto}</span></a>`;
}

export function faq(c, items, titulo = 'Preguntas frecuentes') {
  const lista = items
    .map(
      (it) => `
      <details class="faq-item">
        <summary><span>${it.p}</span><i aria-hidden="true"></i></summary>
        <div class="faq-respuesta"><p>${it.r}</p></div>
      </details>`
    )
    .join('');
  return `
<section class="seccion faq" aria-labelledby="faq-titulo">
  <div class="contenedor faq-grid">
    <div class="faq-cabeza">
      <h2 id="faq-titulo" class="titulo emerge">${titulo}</h2>
      <p class="revela">¿Tienes otra duda? Escríbenos por WhatsApp y te respondemos.</p>
    </div>
    <div class="faq-lista revela">${lista}
    </div>
  </div>
</section>`;
}

export function faqLD(items) {
  const limpiar = (s) => s.replace(/<[^>]+>/g, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: limpiar(it.p),
      acceptedAnswer: { '@type': 'Answer', text: limpiar(it.r) },
    })),
  };
}

export function migasLD(migas) {
  if (!SITIO_URL) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: migas.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: m.nombre.replace(/<[^>]+>/g, ''),
      item: `${SITIO_URL}/${m.ruta === 'index.html' ? '' : m.ruta}`,
    })),
  };
}

export function tarjetaArticulo(c, a, i = 0) {
  return `<a class="tarjeta-articulo revela" style="--i:${i}" href="${c.r(`blog/${a.slug}.html`)}" data-categoria="${a.categoria}">
      <span class="portada">${portada(a.tema)}</span>
      <span class="meta">${a.categoria}, ${minutosLectura(a)} min de lectura</span>
      <h3>${a.titulo}</h3>
      <p>${a.resumen}</p>
    </a>`;
}

export function relacionados(c, slugs, titulo = 'Para leer con calma') {
  const tarjetas = slugs.map((s, i) => tarjetaArticulo(c, porSlug(s), i)).join('');
  return `
<section class="seccion relacionados" aria-labelledby="rel-titulo">
  <div class="contenedor">
    <h2 id="rel-titulo" class="titulo emerge">${titulo}</h2>
    <div class="tarjetas">${tarjetas}</div>
  </div>
</section>`;
}

export function pasosVerticales(items) {
  return `<ol class="pasos-v">${items
    .map(
      (p, i) => `
        <li class="revela" style="--i:${i}"><span class="paso-num" aria-hidden="true">${i + 1}</span><div><h3>${p.t}</h3><p>${p.d}</p></div></li>`
    )
    .join('')}
      </ol>`;
}

export { ola };
