import { paginaHero, botonWa, migasLD, tarjetaArticulo, relacionados } from '../plantillas.mjs';
import { portada } from '../partes.mjs';
import { ARTICULOS, porSlug, fechaLarga, minutosLectura } from '../articulos.mjs';
import { SITIO_URL, MARCA, SUBTITULO } from '../config.mjs';

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// Añade id a cada h2 y devuelve el índice.
function conIndice(html) {
  const indice = [];
  const cuerpo = html.replace(/<h2>(.*?)<\/h2>/g, (_, t) => {
    const id = slugify(t);
    indice.push({ id, t: t.replace(/<[^>]+>/g, '') });
    return `<h2 id="${id}">${t}</h2>`;
  });
  return { cuerpo, indice };
}

const blogMigas = [
  { nombre: 'Inicio', ruta: 'index.html' },
  { nombre: 'Blog', ruta: 'blog/index.html' },
];
const blogWa = 'Hola, leí el blog de Bienestar y quiero hacer una consulta.';

const indiceBlog = {
  ruta: 'blog/index.html',
  seccion: 'blog',
  titulo: 'Blog de psicología y neuropsicología | Bienestar Quito',
  descripcion:
    'Artículos claros sobre neurodivergencia, autismo, TDAH, altas capacidades, ansiedad y depresión, escritos para familias y adultos.',
  waMensaje: blogWa,
  ld: () => [migasLD(blogMigas)],
  cuerpo: (c) => {
    const cats = [...new Set(ARTICULOS.map((a) => a.categoria))];
    return [
      paginaHero(c, {
        migas: blogMigas,
        titulo: 'Entender también es cuidarse',
        entrada:
          'Información clara y basada en evidencia sobre neurodesarrollo y salud emocional, para familias, docentes y adultos que buscan respuestas.',
        clase: 'pagina-hero--blog',
        deco: `<div class="deco-portadas">${ARTICULOS.slice(0, 3)
          .map((a, i) => `<span class="portada" style="--n:${i}">${portada(a.tema, "-deco")}</span>`)
          .join('')}</div>`,
      }),
      `
<section class="seccion blog-lista" aria-label="Artículos">
  <div class="contenedor">
    <div class="filtros" role="group" aria-label="Filtrar por tema">
      <button type="button" class="filtro" aria-pressed="true" data-filtro="todos">Todos</button>
      ${cats.map((k) => `<button type="button" class="filtro" aria-pressed="false" data-filtro="${k}">${k}</button>`).join('')}
    </div>
    <div class="tarjetas tarjetas--blog" data-tarjetas>${ARTICULOS.map((a, i) => tarjetaArticulo(c, a, i % 3)).join('')}</div>
    <p class="aviso">Los artículos son informativos y no reemplazan una evaluación profesional.</p>
  </div>
</section>`,
    ].join('\n');
  },
  pieCta: {
    titulo: '¿Te reconociste en algún artículo?',
    texto: 'Escríbenos y conversamos sobre lo que estás viviendo. El primer paso puede ser una pregunta.',
  },
};

function paginaArticulo(a) {
  const ruta = `blog/${a.slug}.html`;
  const migas = [...blogMigas, { nombre: a.titulo, ruta }];
  const wa = `Hola, leí el artículo "${a.titulo}" y quiero hacer una consulta.`;
  const { cuerpo, indice } = conIndice(a.cuerpo);
  return {
    ruta,
    seccion: 'blog',
    ogTipo: 'article',
    titulo: `${a.titulo} | Blog Bienestar`,
    descripcion: a.resumen,
    waMensaje: wa,
    ld: () => [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: a.titulo,
        description: a.resumen,
        datePublished: a.fecha,
        dateModified: a.fecha,
        inLanguage: 'es',
        author: { '@type': 'Organization', name: `${MARCA}, ${SUBTITULO}` },
        publisher: { '@type': 'Organization', name: `${MARCA}, ${SUBTITULO}` },
        ...(SITIO_URL ? { mainEntityOfPage: `${SITIO_URL}/${ruta}`, image: `${SITIO_URL}/assets/img/og-bienestar.jpg` } : {}),
      },
      migasLD(migas),
    ],
    cuerpo: (c) => `
<article class="articulo">
  <header class="articulo-cabecera">
    <div class="contenedor">
      <nav class="migas" aria-label="Estás aquí"><ol>${migas
        .slice(0, -1)
        .map((m) => `<li><a href="${c.r(m.ruta)}">${m.nombre}</a></li>`)
        .join('')}<li aria-current="page">${a.categoria}</li></ol></nav>
      <h1 class="emerge">${a.titulo}</h1>
      <p class="entrada revela">${a.resumen}</p>
      <p class="articulo-meta revela" style="--i:1"><span>${MARCA}</span><span><time datetime="${a.fecha}">${fechaLarga(a.fecha)}</time></span><span>${minutosLectura(a)} min de lectura</span></p>
    </div>
    <div class="contenedor">
      <div class="portada portada--grande revela" style="--i:2">${portada(a.tema)}</div>
    </div>
  </header>
  <div class="contenedor articulo-cuerpo">
    <div class="prosa prosa--articulo">
      ${cuerpo}
      <aside class="nota" aria-label="Cómo te acompañamos en Bienestar">
        <h2 class="nota-titulo">Cómo te acompañamos en Bienestar</h2>
        <p>${a.bienestar}</p>
        ${botonWa(c, wa, 'Escríbenos por WhatsApp')}
      </aside>
      <section class="fuentes" aria-labelledby="fuentes-titulo">
        <h2 id="fuentes-titulo">Fuentes</h2>
        <ol>${a.fuentes.map((f) => `<li>${f}</li>`).join('')}</ol>
      </section>
      <p class="aviso">Este artículo es informativo y no reemplaza una evaluación profesional. Si te preocupa algo de lo que leíste, consulta con un especialista.</p>
    </div>
    <aside class="articulo-lateral" aria-label="En este artículo">
      <div class="lateral-caja">
        <p class="lateral-titulo">En este artículo</p>
        <ol class="lateral-indice">${indice.map((h) => `<li><a href="#${h.id}">${h.t}</a></li>`).join('')}</ol>
      </div>
      <div class="lateral-caja lateral-caja--cta">
        <p>¿Quieres hablar de esto con una especialista?</p>
        ${botonWa(c, wa, 'Escríbenos')}
      </div>
    </aside>
  </div>
</article>
${relacionados(c, a.relacionados, 'Sigue leyendo')}`,
  };
}

export default [indiceBlog, ...ARTICULOS.map(paginaArticulo)];
