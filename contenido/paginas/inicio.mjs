import { ICONO, ola, portada, negocioLD, SERVICIOS } from '../partes.mjs';
import { heroScroll } from '../hero.mjs';
import { ARTICULOS, minutosLectura } from '../articulos.mjs';
import { MENSAJE_WA_GENERAL } from '../config.mjs';

const ESPECIALIDADES = [
  {
    id: 'neurodivergencias',
    nombre: 'Neurodivergencias',
    boton: 'Neuro&shy;divergencias',
    texto:
      'Formas distintas de pensar, aprender y sentir. Las entendemos y las acompañamos sin intentar cambiar quién eres.',
  },
  {
    id: 'autismo',
    nombre: 'Autismo',
    boton: 'Autismo',
    texto:
      'Evaluación y acompañamiento del espectro autista en niños, adolescentes y adultos, con apoyo cercano a la familia.',
  },
  {
    id: 'tdah',
    nombre: 'TDAH',
    boton: 'TDAH',
    texto:
      'Diagnóstico cuidadoso del trastorno por déficit de atención e hiperactividad, y estrategias para casa, escuela y trabajo.',
  },
  {
    id: 'altas-capacidades',
    nombre: 'Altas capacidades',
    boton: 'Altas capacidades',
    texto:
      'Identificamos a niños y adultos con un coeficiente intelectual de 130 o más, y cuidamos también su mundo emocional.',
  },
  {
    id: 'ansiedad-y-depresion',
    nombre: 'Ansiedad y depresión',
    boton: 'Ansiedad y depresión',
    texto:
      'Acompañamiento para recuperar la calma y el ánimo, con técnicas basadas en evidencia y, cuando corresponde, EMT.',
  },
];

const PANELES = [
  {
    img: 'evaluacion-infantil',
    w: 1000, h: 1500, chico: 'evaluacion-infantil-640',
    alt: 'Niña armando un rompecabezas durante una evaluación neuropsicológica',
    texto:
      'Medimos atención, memoria, lenguaje y funciones ejecutivas con pruebas validadas. Recibes un informe claro y recomendaciones concretas.',
  },
  {
    img: 'rehabilitacion-sesion',
    w: 900, h: 1600,
    alt: 'Sesión de rehabilitación neuropsicológica con un paciente adulto en el consultorio',
    texto:
      'Ejercicios y estrategias para fortalecer las funciones que más lo necesitan, en sesiones adaptadas a la edad y al ritmo de cada persona.',
  },
  {
    img: 'emt-sesion',
    w: 900, h: 1600,
    alt: 'Paciente sentado en un sillón durante una sesión de Estimulación Magnética Transcraneal',
    texto:
      'Una técnica no invasiva que estimula zonas específicas del cerebro, en un proceso de 21 días junto a rehabilitación neuropsicológica.',
  },
];

function hero(c) {
  // Video de 20 s en 700vh. El fundido del segundo 7 al 8.5 cae en la pausa entre la banda 2 y la 3.
  return heroScroll(c, {
    modo: 'video',
    video: {
      src: 'assets/video/hero-mente.mp4',
      poster: 'assets/img/hero-mente-poster.webp',
      fijo: 'assets/img/hero-mente-movil.webp',
      bytes: 9093067,
    },
    bandas: `
    <div class="banda banda-1" data-a="0" data-b="0.17">
      <h1 id="hero-titulo" class="hero-titulo">
        <span class="sr-only">La mente también debe ser atendida</span>
        <span class="hero-linea" aria-hidden="true">La mente también debe ser</span>
        <span class="hero-linea hero-linea--tecleo" aria-hidden="true"><span class="tecleo" data-tecleo='["atendida","escuchada","comprendida","cuidada"]'>atendida</span><span class="cursor"></span></span>
      </h1>
      <p class="hero-sub">Psicología y neuropsicología para niños, adolescentes y adultos en Quito. Presencial y en línea.</p>
      <div class="hero-acciones solo-estatico">
        <a class="boton boton--wa" href="${c.wa(MENSAJE_WA_GENERAL)}" target="_blank" rel="noopener">${ICONO.whatsapp}<span>Escríbenos por WhatsApp</span></a>
        <a class="boton boton--borde-claro" href="#servicios">Ver servicios</a>
      </div>
    </div>

    <div class="banda banda-2 banda--tejido" data-a="0.19" data-b="0.36">
      <p class="banda-titulo" data-partir="c">Cuando la mente se dispersa, todo cuesta más.</p>
      <p class="banda-sub">La atención que se escapa. La ansiedad que no se va. Un hijo que aprende distinto y no sabes cómo ayudarlo.</p>
    </div>

    <div class="banda banda-3 banda--niebla" data-a="0.45" data-b="0.66">
      <p class="banda-titulo"><span class="niebla-suave" aria-hidden="true">Entender cómo funciona tu mente es el primer paso hacia la calma.</span><span class="niebla-nitida">Entender cómo funciona tu mente es el primer paso hacia la calma.</span></p>
      <p class="banda-sub">Evaluamos con pruebas científicas y acompañamos con cercanía, a tu ritmo.</p>
    </div>

    <div class="banda banda-4 banda--subida" data-a="0.72" data-b="1">
      <p class="banda-titulo" data-partir="w">Aquí tu mente está en buenas manos.</p>
      <p class="banda-sub">Verónica Báez, psicóloga y neuropsicóloga clínica.</p>
      <div class="hero-acciones">
        <a class="boton boton--wa" href="${c.wa(MENSAJE_WA_GENERAL)}" target="_blank" rel="noopener">${ICONO.whatsapp}<span>Agenda por WhatsApp</span></a>
        <a class="boton boton--borde-claro" href="#servicios">Conoce los servicios</a>
      </div>
    </div>`,
  });
}

function presentacion(c) {
  return `
<section class="seccion presentacion" id="veronica" aria-labelledby="presentacion-titulo">
  <div class="contenedor presentacion-grid">
    <div class="retrato revela" data-palabras>
      <div class="retrato-marco">
        <img src="${c.r('assets/img/veronica-retrato.webp')}" srcset="${c.r('assets/img/veronica-retrato-640.webp')} 640w, ${c.r('assets/img/veronica-retrato.webp')} 1000w" sizes="(max-width: 720px) 80vw, 38vw" alt="Verónica Báez, psicóloga y neuropsicóloga clínica, con bata blanca" width="1000" height="1500" loading="lazy">
      </div>
      <div class="palabras" aria-hidden="true">
        <span class="palabra p1">Calma</span>
        <span class="palabra p2">Escucha</span>
        <span class="palabra p3">Ciencia</span>
        <span class="palabra p4">Cercanía</span>
        <span class="palabra p5">Esperanza</span>
      </div>
    </div>
    <div class="presentacion-texto">
      <h2 id="presentacion-titulo" class="titulo emerge">Hola, soy Verónica Báez</h2>
      <p class="entrada revela">Soy psicóloga y neuropsicóloga clínica. Ayudo a niños, adolescentes y adultos a entender cómo funciona su mente, y los acompaño con un plan claro hasta que el día a día se sienta más liviano.</p>
      <dl class="rasgos">
        <div class="rasgo revela" style="--i:1"><dt>Humana</dt><dd>Antes que un diagnóstico, eres una persona con una historia. Te escucho sin prisa y sin juicios.</dd></div>
        <div class="rasgo revela" style="--i:2"><dt>Cercana</dt><dd>Te explico cada paso con palabras simples, y hablamos directo por WhatsApp.</dd></div>
        <div class="rasgo revela" style="--i:3"><dt>Especializada</dt><dd>Trabajo con pruebas neuropsicológicas validadas y con técnicas como la Estimulación Magnética Transcraneal.</dd></div>
      </dl>
      <a class="enlace" href="${c.r('sobre-veronica.html')}">Conoce a Verónica</a>
    </div>
  </div>
</section>`;
}

function servicios(c) {
  const paneles = SERVICIOS.map((s, i) => {
    const p = PANELES[i];
    const srcset = p.chico
      ? ` srcset="${c.r(`assets/img/${p.chico}.webp`)} 640w, ${c.r(`assets/img/${p.img}.webp`)} ${p.w}w" sizes="(max-width: 720px) 92vw, 40vw"`
      : '';
    return `
      <a class="panel revela" style="--i:${i}" href="${c.r(s.ruta)}">
        <img src="${c.r(`assets/img/${p.img}.webp`)}"${srcset} alt="${p.alt}" width="${p.w}" height="${p.h}" loading="lazy">
        <div class="panel-contenido">
          <h3>${s.nombre}</h3>
          <p>${p.texto}</p>
          <span class="panel-mas">Ver servicio</span>
        </div>
      </a>`;
  }).join('');
  return `
<section class="seccion servicios" id="servicios" aria-labelledby="servicios-titulo">
  <div class="contenedor">
    <div class="encabezado">
      <h2 id="servicios-titulo" class="titulo emerge">Tres formas de cuidar tu mente</h2>
      <p class="entrada revela">Todo empieza por entender qué está pasando. A partir de ahí, armamos el camino contigo.</p>
    </div>
    <div class="paneles">${paneles}
    </div>
  </div>
</section>`;
}

function emt(c) {
  return `
${ola({ clase: 'ola--sube', color: 'var(--abismo)' })}
<section class="seccion seccion-emt oscuro" data-cabecera="oscura" aria-labelledby="emt-titulo">
  <div class="contenedor emt-grid">
    <div class="emt-texto">
      <h2 id="emt-titulo" class="titulo emerge">La EMT, explicada por Verónica</h2>
      <p class="entrada revela">La Estimulación Magnética Transcraneal usa pulsos magnéticos suaves para estimular zonas concretas del cerebro. No requiere cirugía ni anestesia, y la persona permanece despierta y cómoda durante la sesión.</p>
      <dl class="ficha">
        <div class="revela" style="--i:1"><dt>Duración</dt><dd>Un proceso de 21 días</dd></div>
        <div class="revela" style="--i:2"><dt>Para quién</dt><dd>Niños, adolescentes y adultos, después de una evaluación</dd></div>
        <div class="revela" style="--i:3"><dt>Se indica en</dt><dd>Ansiedad, depresión y algunas lesiones cerebrales</dd></div>
        <div class="revela" style="--i:4"><dt>Se acompaña de</dt><dd>Rehabilitación neuropsicológica</dd></div>
      </dl>
      <div class="acciones revela" style="--i:5">
        <a class="boton boton--wa" href="${c.wa('Hola, quiero información sobre la Estimulación Magnética Transcraneal (EMT).')}" target="_blank" rel="noopener">${ICONO.whatsapp}<span>Pregunta por la EMT</span></a>
        <a class="boton boton--borde-claro" href="${c.r('servicios/estimulacion-magnetica-transcraneal.html')}">Conoce la EMT</a>
      </div>
    </div>
    <div class="emt-media revela">
      <div class="pulsos" data-vivo aria-hidden="true"><span></span><span></span><span></span></div>
      ${videoTarjeta(c, {
        video: 'assets/video/emt-veronica.mp4',
        poster: 'assets/img/emt-veronica-poster.webp',
        etiqueta: 'Reproducir el video: Verónica Báez explica la EMT, 40 segundos, con sonido',
        texto: 'Ver video, 40 s',
        pie: 'Verónica Báez explica la Estimulación Magnética Transcraneal.',
      })}
    </div>
  </div>
</section>
${ola({ clase: 'ola--baja', color: 'var(--abismo)' })}`;
}

export function videoTarjeta(c, v) {
  return `<figure class="video-tarjeta" data-video="${c.r(v.video)}">
        <div class="video-marco">
          <img src="${c.r(v.poster)}" alt="" width="720" height="1280" loading="lazy">
          <button class="video-play" type="button" aria-label="${v.etiqueta}"><span class="video-play-icono">${ICONO.play}</span><span class="video-play-texto">${v.texto}</span></button>
        </div>
        <figcaption>${v.pie}</figcaption>
      </figure>`;
}

function acompanamos(c) {
  const tabs = ESPECIALIDADES.map(
    (e, i) =>
      `<button class="burbuja b${i + 1}" type="button" role="tab" id="tab-${e.id}" aria-controls="panel-${e.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"><span>${e.boton}</span></button>`
  ).join('');
  const panels = ESPECIALIDADES.map(
    (e, i) =>
      `<div class="burbuja-panel" role="tabpanel" id="panel-${e.id}" aria-labelledby="tab-${e.id}"${i ? ' hidden' : ''}>
          <h4>${e.nombre}</h4>
          <p>${e.texto}</p>
          <a class="enlace" href="${c.r(`especialidades.html#${e.id}`)}">Leer más sobre ${e.nombre.toLowerCase() === 'tdah' ? 'TDAH' : e.nombre.toLowerCase()}</a>
        </div>`
  ).join('');
  return `
<section class="seccion acompanamos" aria-labelledby="acompanamos-titulo">
  <div class="contenedor">
    <div class="encabezado encabezado--doble">
      <h2 id="acompanamos-titulo" class="titulo emerge">Acompañamos cada etapa de la vida</h2>
      <p class="entrada revela">Cada edad trae preguntas distintas. Adaptamos la evaluación y el acompañamiento a la persona que tenemos enfrente.</p>
    </div>
    <ul class="etapas">
      <li class="etapa revela" style="--i:0;--c:var(--cercania)"><h3>Niños</h3><p>Cuando el aprendizaje, la atención o la conducta preocupan en casa o en la escuela.</p></li>
      <li class="etapa revela" style="--i:1;--c:var(--calma)"><h3>Adolescentes</h3><p>Cuando la ansiedad, el ánimo o la concentración empiezan a pesar en los estudios y en casa.</p></li>
      <li class="etapa revela" style="--i:2;--c:var(--especializacion)"><h3>Adultos</h3><p>Cuando la mente se siente cansada o dispersa, o después de una lesión cerebral.</p></li>
    </ul>
    <div class="especialidades-bloque">
      <div class="especialidades-cabeza">
        <h3 class="subtitulo">Nuestras especialidades</h3>
        <p>Toca cada una para conocerla.</p>
      </div>
      <div class="burbujas revela" role="tablist" aria-label="Especialidades">${tabs}</div>
      <div class="burbuja-paneles">${panels}</div>
    </div>
  </div>
</section>`;
}

// Mapa del cerebro: figura fija que ilumina cada zona mientras el texto avanza con el scroll.
const ZONAS = [
  {
    id: 'frontal', nombre: 'Lóbulo frontal', lema: 'El director de orquesta', x: 30, y: 34,
    texto: 'Planifica, organiza, toma decisiones y frena los impulsos. Aquí viven las funciones ejecutivas y gran parte de la atención.',
    nota: ['Cuando cuesta', 'Desorganización, impulsividad y distracción. Es una zona clave en el TDAH.'],
    enlace: ['servicios/evaluacion-neuropsicologica.html', 'Cómo lo evaluamos'],
  },
  {
    id: 'prefrontal', nombre: 'Corteza prefrontal dorsolateral', lema: 'Donde actúa la EMT', x: 27, y: 25,
    texto: 'Una parte del lóbulo frontal que ayuda a regular el ánimo, la atención y la memoria de trabajo.',
    nota: ['Por qué importa', 'En la depresión es una de las zonas que más se estimula con la Estimulación Magnética Transcraneal.'],
    enlace: ['servicios/estimulacion-magnetica-transcraneal.html', 'Conoce la EMT'],
  },
  {
    id: 'temporal', nombre: 'Lóbulo temporal', lema: 'Memoria y lenguaje', x: 54, y: 62,
    texto: 'Comprende lo que escuchamos, guarda los recuerdos nuevos y ayuda a encontrar las palabras.',
    nota: ['Cuando cuesta', 'Olvidos frecuentes o dificultad para comprender y para expresarse.'],
    enlace: ['servicios/evaluacion-neuropsicologica.html', 'Cómo lo evaluamos'],
  },
  {
    id: 'parietal', nombre: 'Lóbulo parietal', lema: 'El mapa del cuerpo y del espacio', x: 63, y: 22,
    texto: 'Une lo que sentimos con el lugar donde estamos. También participa en el cálculo y en la lectura.',
    nota: ['Cuando cuesta', 'Dificultades con los números, la escritura o la orientación en el espacio.'],
    enlace: ['servicios/rehabilitacion-neuropsicologica.html', 'Cómo lo trabajamos'],
  },
  {
    id: 'limbico', nombre: 'Sistema límbico', lema: 'Las emociones', x: 56, y: 47,
    texto: 'En lo profundo del cerebro, la amígdala y el hipocampo nos ayudan a sentir, a recordar y a reaccionar ante lo que vivimos.',
    nota: ['Cuando cuesta', 'Participa en la ansiedad y en los cambios del estado de ánimo.'],
    enlace: ['especialidades.html#ansiedad-y-depresion', 'Ansiedad y depresión'],
  },
  {
    id: 'cerebelo', nombre: 'Cerebelo', lema: 'Coordinación y aprendizaje', x: 80, y: 72,
    texto: 'Coordina los movimientos y el equilibrio, y también participa en la atención y en el aprendizaje de habilidades nuevas.',
    nota: ['Cuando cuesta', 'Torpeza al moverse o dificultad para aprender rutinas nuevas.'],
    enlace: ['servicios/rehabilitacion-neuropsicologica.html', 'Cómo lo trabajamos'],
  },
];

const CEREBRO = `
<svg class="cerebro" viewBox="0 0 600 460" aria-hidden="true" focusable="false">
  <path class="zona" data-zona="frontal" style="--zc:var(--especializacion)" d="M100 252 C78 205 86 135 140 92 C182 58 240 42 292 40 C286 95 272 150 262 205 C240 222 215 238 196 258 C165 266 128 264 100 252 Z"/>
  <path class="zona" data-zona="parietal" style="--zc:var(--calma)" d="M292 40 C360 36 430 56 488 104 C470 150 440 182 400 200 C360 206 300 206 262 205 C272 150 286 95 292 40 Z"/>
  <path class="zona" data-zona="occipital" style="--zc:var(--especializacion)" d="M488 104 C525 140 540 195 524 240 C512 268 486 284 458 288 C446 250 428 222 400 200 C440 182 470 150 488 104 Z"/>
  <path class="zona" data-zona="temporal" style="--zc:var(--cercania)" d="M196 258 C215 238 240 222 262 205 C300 206 360 206 400 200 C428 222 446 250 458 288 C420 306 360 318 300 316 C250 314 212 300 196 280 C190 272 190 264 196 258 Z"/>
  <path class="zona" data-zona="cerebelo" style="--zc:var(--calma)" d="M440 296 C470 290 515 282 532 300 C545 322 528 352 495 358 C460 364 430 350 424 326 C420 312 426 300 440 296 Z"/>
  <path class="zona zona--tallo" d="M376 314 C390 318 404 321 416 326 C414 352 409 382 401 410 C397 422 386 424 382 413 C384 382 383 348 376 314 Z"/>
  <g class="surcos">
    <path d="M122 214 C140 172 162 142 204 120"/><path d="M152 242 C172 202 202 176 242 160"/><path d="M204 76 C222 98 240 120 250 162"/>
    <path d="M322 70 C342 110 352 150 342 190"/><path d="M384 70 C404 100 422 130 432 170"/>
    <path d="M472 150 C492 180 502 212 492 250"/>
    <path d="M240 272 C290 262 350 256 420 262"/><path d="M262 296 C312 290 362 288 430 286"/>
    <path d="M440 320 C470 310 500 312 525 322"/><path d="M446 338 C476 330 506 332 522 342"/>
  </g>
  <g class="zona-limbico" data-zona="limbico">
    <ellipse cx="335" cy="236" rx="74" ry="30" transform="rotate(-8 335 236)"/>
    <circle cx="282" cy="254" r="12"/>
  </g>
  <g class="marca-emt" data-zona="prefrontal">
    <circle class="marca-onda" cx="165" cy="126" r="16"/><circle class="marca-onda marca-onda--2" cx="165" cy="126" r="16"/>
    <circle class="marca-punto" cx="165" cy="126" r="7"/>
  </g>
</svg>`;

function mapa(c) {
  const pasosHtml = ZONAS.map(
    (z) => `
        <li class="mapa-paso" data-zona="${z.id}" data-x="${z.x}" data-y="${z.y}">
          <p class="mapa-lema">${z.lema}</p>
          <h3>${z.nombre}</h3>
          <p>${z.texto}</p>
          <p class="mapa-nota-paso"><strong>${z.nota[0]}:</strong> ${z.nota[1]}</p>
          <a class="enlace" href="${c.r(z.enlace[0])}">${z.enlace[1]}</a>
        </li>`
  ).join('');
  return `
<section class="seccion mapa" aria-labelledby="mapa-titulo">
  <div class="contenedor">
    <div class="encabezado encabezado--doble">
      <h2 id="mapa-titulo" class="titulo emerge">Un recorrido por tu mente</h2>
      <p class="entrada revela">La neuropsicología estudia cómo el cerebro hace posible lo que piensas, sientes y haces. Baja con calma: cada zona se ilumina con lo que hace.</p>
    </div>
    <div class="mapa-grid" data-mapa>
      <figure class="mapa-figura">
        <div class="mapa-lienzo">
          ${CEREBRO}
          <p class="mapa-etiqueta" aria-hidden="true"></p>
        </div>
        <figcaption>Mapa simplificado. En la realidad, cada función surge de redes que conectan muchas zonas a la vez.</figcaption>
      </figure>
      <ol class="mapa-pasos">${pasosHtml}
      </ol>
      <p class="mapa-nota-movil">Mapa simplificado. En la realidad, cada función surge de redes que conectan muchas zonas a la vez.</p>
    </div>
  </div>
</section>`;
}

function pasos(c) {
  return `
<section class="seccion pasos-seccion" aria-labelledby="pasos-titulo">
  <div class="contenedor">
    <div class="encabezado">
      <h2 id="pasos-titulo" class="titulo emerge">Agendar es simple</h2>
      <p class="entrada revela">Todo se coordina por WhatsApp, sin formularios ni esperas largas.</p>
    </div>
    <div class="pasos-marco" data-linea>
      <svg class="pasos-linea" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true"><path d="M200 30 C320 2 480 2 600 30 S880 58 1000 30" pathLength="1"/></svg>
      <ol class="pasos">
        <li class="paso revela" style="--i:0"><span class="paso-num" aria-hidden="true">1</span><h3>Escríbenos</h3><p>Cuéntanos en pocas palabras qué te preocupa o qué necesitas.</p></li>
        <li class="paso revela" style="--i:1"><span class="paso-num" aria-hidden="true">2</span><h3>Te orientamos</h3><p>Te decimos qué servicio encaja contigo y coordinamos el día y la hora.</p></li>
        <li class="paso revela" style="--i:2"><span class="paso-num" aria-hidden="true">3</span><h3>Tu primera cita</h3><p>En el consultorio en Quito o en línea, desde donde estés.</p></li>
      </ol>
    </div>
    <ul class="modalidades revela">
      <li><strong>Presencial</strong><span>En nuestro consultorio en Quito</span></li>
      <li><strong>En línea</strong><span>Por videollamada, desde donde estés</span></li>
    </ul>
    <div class="pasos-cta revela">
      <a class="boton boton--wa boton--grande" href="${c.wa(MENSAJE_WA_GENERAL)}" target="_blank" rel="noopener">${ICONO.whatsapp}<span>Empieza por aquí</span></a>
    </div>
  </div>
</section>`;
}

function blog(c) {
  const [destacado, ...resto] = ARTICULOS;
  const lista = resto
    .map(
      (a, i) => `
        <li class="revela" style="--i:${i}"><a href="${c.r(`blog/${a.slug}.html`)}">
          <span class="portada portada--mini">${portada(a.tema)}</span>
          <span class="articulo-item-texto"><span class="meta">${a.categoria}, ${minutosLectura(a)} min</span><strong>${a.titulo}</strong></span>
        </a></li>`
    )
    .join('');
  return `
<section class="seccion blog-inicio" aria-labelledby="blog-titulo">
  <div class="contenedor">
    <div class="encabezado encabezado--doble">
      <h2 id="blog-titulo" class="titulo emerge">Entender también es cuidarse</h2>
      <p class="entrada revela">Artículos claros sobre neurodesarrollo y salud emocional, para familias y adultos que buscan respuestas.</p>
    </div>
    <div class="blog-grid">
      <a class="articulo-destacado revela" href="${c.r(`blog/${destacado.slug}.html`)}">
        <span class="portada">${portada(destacado.tema)}</span>
        <span class="meta">${destacado.categoria}, ${minutosLectura(destacado)} min de lectura</span>
        <h3>${destacado.titulo}</h3>
        <p>${destacado.resumen}</p>
      </a>
      <ul class="articulo-lista">${lista}
      </ul>
    </div>
    <a class="enlace enlace--grande" href="${c.r('blog/index.html')}">Ver todos los artículos</a>
  </div>
</section>`;
}

export function alianzas(c) {
  return `
<section class="seccion alianzas" aria-labelledby="alianzas-titulo">
  <div class="contenedor alianzas-cabeza">
    <h2 id="alianzas-titulo" class="titulo emerge">Navegamos en buena compañía</h2>
    <p class="entrada revela">Instituciones y proyectos con los que trabajamos de cerca.</p>
  </div>
  <div class="mar-boyas" data-vivo>
    <ul class="boyas">
      <li class="boya" style="--d:-1.2s;--t:7s"><span class="boya-nombre">Magico Mundo</span><span class="boya-disco boya-disco--claro"><img src="${c.r('assets/img/alianza-magicomundo.webp')}" alt="Logo de Magico Mundo" width="520" height="520" loading="lazy"></span></li>
      <li class="boya" style="--d:-4.1s;--t:8.4s"><span class="boya-nombre">LogroServis</span><span class="boya-disco"><img src="${c.r('assets/img/alianza-logroservis.webp')}" alt="Logo de LogroServis, educación con visión" width="520" height="520" loading="lazy"></span></li>
      <li class="boya" style="--d:-2.6s;--t:7.6s"><span class="boya-nombre">Radio Bienestar</span><span class="boya-disco boya-disco--claro boya-disco--contener"><img src="${c.r('assets/img/alianza-radio-bienestar.webp')}" alt="Logo de Radio Bienestar con Verónica Báez" width="580" height="520" loading="lazy"></span></li>
      <!-- Pendiente: logo de Nube (Instagram). Reemplazar el texto por <img> cuando llegue. -->
      <li class="boya" style="--d:-5.4s;--t:9s"><span class="boya-nombre">Nube</span><span class="boya-disco boya-disco--texto"><span>Nube</span></span></li>
    </ul>
    <div class="agua" aria-hidden="true">
      ${ola({ clase: 'ola--agua-1', color: 'rgba(147,169,211,.35)' })}
      ${ola({ clase: 'ola--agua-2', color: 'rgba(147,169,211,.5)' })}
    </div>
  </div>
</section>`;
}

export default {
  ruta: 'index.html',
  inicio: true,
  seccion: 'inicio',
  claseBody: 'pagina-inicio',
  titulo: 'Bienestar | Psicología y neuropsicología en Quito, Verónica Báez',
  descripcion:
    'Psicología y neuropsicología en Quito para niños, adolescentes y adultos. Evaluación y rehabilitación neuropsicológica, Estimulación Magnética Transcraneal (EMT), autismo, TDAH, ansiedad y depresión.',
  waMensaje: MENSAJE_WA_GENERAL,
  scripts: ['assets/js/hero.js'],
  ld: () => [negocioLD()],
  cuerpo: (c) =>
    [hero(c), presentacion(c), servicios(c), emt(c), acompanamos(c), mapa(c), pasos(c), blog(c), alianzas(c)].join('\n'),
};
