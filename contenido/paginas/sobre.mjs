import { botonWa, migasLD } from '../plantillas.mjs';
import { ICONO, ola } from '../partes.mjs';
import { heroScroll } from '../hero.mjs';
import { alianzas } from './inicio.mjs';

const migas = [
  { nombre: 'Inicio', ruta: 'index.html' },
  { nombre: 'Sobre Verónica', ruta: 'sobre-veronica.html' },
];
const wa = 'Hola Verónica, quiero agendar una cita.';

// "La marea que se calma": la historia de Bienestar mientras el mar pasa de agitado a quieto.
function hero(c) {
  return heroScroll(c, {
    modo: 'mar',
    titulo: 'sobre-titulo',
    bandas: `
    <div class="banda banda-1" data-a="0" data-b="0.24">
      <nav class="migas migas--claras" aria-label="Estás aquí"><ol><li><a href="${c.r('index.html')}">Inicio</a></li><li aria-current="page">Sobre Verónica</li></ol></nav>
      <h1 id="sobre-titulo" class="hero-titulo">
        <span class="hero-linea">Verónica Báez</span>
      </h1>
      <p class="hero-sub">Psicóloga y neuropsicóloga clínica. Acompaño a niños, adolescentes y adultos a entender su mente y a recuperar la calma.</p>
      <div class="hero-acciones solo-estatico">
        ${botonWa(c, wa, 'Escríbele a Verónica')}
        <a class="boton boton--borde-claro" href="#pilares-titulo">Su forma de trabajar</a>
      </div>
    </div>

    <div class="banda banda-2 banda--tejido" data-a="0.27" data-b="0.5">
      <p class="banda-titulo" data-partir="c">Muchas personas pasan años sin saber por qué todo les cuesta más.</p>
      <p class="banda-sub">Familias que no saben cómo ayudar a un hijo que aprende distinto. Adultos que cargan con la ansiedad en silencio.</p>
    </div>

    <div class="banda banda-3 banda--niebla" data-a="0.53" data-b="0.75">
      <p class="banda-titulo"><span class="niebla-suave" aria-hidden="true">Bienestar nace para que eso cambie.</span><span class="niebla-nitida">Bienestar nace para que eso cambie.</span></p>
      <p class="banda-sub">Un lugar tranquilo donde la ciencia y la cercanía trabajan juntas, a tu ritmo.</p>
    </div>

    <div class="banda banda-4 banda--subida" data-a="0.79" data-b="1">
      <p class="banda-titulo" data-partir="w">La mente también debe ser atendida.</p>
      <p class="banda-sub">Con la misma seriedad y el mismo cuidado que damos al cuerpo.</p>
      <div class="hero-acciones">
        ${botonWa(c, wa, 'Escríbele a Verónica')}
        <a class="boton boton--borde-claro" href="#pilares-titulo">Su forma de trabajar</a>
      </div>
    </div>`,
  });
}

export default {
  ruta: 'sobre-veronica.html',
  seccion: 'sobre',
  heroOscuro: true,
  titulo: 'Verónica Báez, psicóloga y neuropsicóloga clínica en Quito | Bienestar',
  descripcion:
    'Conoce a Verónica Báez, psicóloga y neuropsicóloga clínica en Quito. Acompaña a niños, adolescentes y adultos con un enfoque humano, cercano y especializado.',
  waMensaje: wa,
  scripts: ['assets/js/hero.js'],
  ld: () => [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Verónica Báez',
      jobTitle: 'Psicóloga y neuropsicóloga clínica',
      worksFor: { '@type': 'MedicalBusiness', name: 'Bienestar, Psicología y Neuropsicología' },
      address: { '@type': 'PostalAddress', addressLocality: 'Quito', addressCountry: 'EC' },
    },
    migasLD(migas),
  ],
  cuerpo: (c) =>
    [
      hero(c),
      `
<section class="seccion consultorio" aria-labelledby="consultorio-titulo">
  <div class="contenedor consultorio-grid">
    <div class="consultorio-media revela">
      <img src="${c.r('assets/img/veronica-consultorio.webp')}" srcset="${c.r('assets/img/veronica-consultorio-960.webp')} 960w, ${c.r('assets/img/veronica-consultorio.webp')} 1920w" sizes="(max-width: 860px) 92vw, 56vw" alt="Verónica Báez sonriendo en su escritorio del consultorio de Bienestar en Quito" width="1920" height="1280" loading="lazy">
    </div>
    <div class="consultorio-texto">
      <h2 id="consultorio-titulo" class="titulo emerge">Un consultorio pensado para la calma</h2>
      <p class="entrada revela">En Bienestar cada persona recibe una evaluación seria, una explicación clara y un acompañamiento que respeta su ritmo.</p>
      <p class="revela" style="--i:1">Atiendo de forma presencial en Quito y también en línea, con niños, adolescentes, adultos y sus familias.</p>
    </div>
  </div>
</section>`,
      `
<section class="seccion pilares" aria-labelledby="pilares-titulo">
  <div class="contenedor">
    <h2 id="pilares-titulo" class="titulo emerge">Mi forma de trabajar</h2>
    <div class="pilares-grid">
      <article class="pilar revela" style="--i:0;--c:var(--cercania)">
        <h3>Humana</h3>
        <p>Antes que un diagnóstico, cada persona tiene una historia. La primera conversación es para escuchar: qué te preocupa, qué has intentado y qué esperas.</p>
      </article>
      <article class="pilar revela" style="--i:1;--c:var(--calma)">
        <h3>Cercana</h3>
        <p>Explico cada paso con palabras simples y sin tecnicismos. Estamos en contacto directo por WhatsApp y las familias participan en el proceso.</p>
      </article>
      <article class="pilar revela" style="--i:2;--c:var(--especializacion)">
        <h3>Especializada</h3>
        <p>Trabajo con pruebas neuropsicológicas estandarizadas y técnicas con respaldo científico, como la rehabilitación neuropsicológica y la Estimulación Magnética Transcraneal.</p>
      </article>
    </div>
  </div>
</section>`,
      `
<section class="seccion formacion" aria-labelledby="formacion-titulo">
  <div class="contenedor formacion-grid">
    <div>
      <h2 id="formacion-titulo" class="titulo emerge">Formación y experiencia</h2>
      <p class="revela">Psicóloga y neuropsicóloga clínica, con trabajo en evaluación y rehabilitación neuropsicológica para niños, adolescentes y adultos.</p>
    </div>
    <!-- PENDIENTE: completar con el documento de formación que enviará Verónica. -->
    <div class="pendiente revela" style="--i:1">
      <p class="pendiente-etiqueta">Contenido pendiente</p>
      <p>Aquí irán los títulos, especializaciones, cursos y años de experiencia de Verónica, según el documento que va a enviar.</p>
    </div>
  </div>
</section>`,
      `
${ola({ clase: 'ola--sube', color: 'var(--abismo)' })}
<section class="seccion radio oscuro" data-cabecera="oscura" aria-labelledby="radio-titulo">
  <div class="contenedor radio-grid">
    <div class="radio-media revela">
      <img src="${c.r('assets/img/alianza-radio-bienestar.webp')}" alt="Logo de Radio Bienestar con Verónica Báez" width="580" height="520" loading="lazy">
    </div>
    <div>
      <h2 id="radio-titulo" class="titulo emerge">Radio Bienestar</h2>
      <p class="entrada revela">Verónica también conduce Radio Bienestar, un espacio para hablar de psicología, neuropsicología, familia y pareja con palabras simples.</p>
      <p class="frase-script revela" style="--i:1">Tu mente también merece cuidado</p>
    </div>
  </div>
</section>
${ola({ clase: 'ola--baja', color: 'var(--abismo)' })}`,
      alianzas(c),
    ].join('\n'),
  pieCta: {
    titulo: 'Conversemos.',
    texto: 'Escríbeme por WhatsApp y coordinamos tu primera cita, en el consultorio en Quito o en línea.',
  },
};
