import { paginaHero, botonWa, migasLD } from '../plantillas.mjs';
import { SERVICIOS } from '../partes.mjs';
import { porSlug } from '../articulos.mjs';

const migas = [
  { nombre: 'Inicio', ruta: 'index.html' },
  { nombre: 'Especialidades', ruta: 'especialidades.html' },
];
const wa = 'Hola, quiero información sobre las especialidades de Bienestar.';

const ESP = [
  {
    id: 'neurodivergencias',
    nombre: 'Neurodivergencias',
    color: 'var(--especializacion)',
    intro:
      'La neurodivergencia describe formas de funcionamiento del cerebro distintas a lo que se considera típico: en la atención, el aprendizaje, la comunicación o la forma de procesar los sentidos. Incluye condiciones como el autismo, el TDAH, la dislexia y otras dificultades del aprendizaje. No es un diagnóstico en sí mismo ni algo que haya que corregir: es una forma distinta de funcionar que merece ser comprendida.',
    senales: [
      'Dificultades persistentes para aprender a leer, escribir o calcular.',
      'Problemas de atención u organización que afectan el día a día.',
      'Mucho cansancio después de socializar.',
      'Sensibilidad intensa a ruidos, luces o texturas.',
    ],
    como: 'Hacemos una evaluación neuropsicológica para conocer el perfil completo y armamos un plan de apoyo para la persona, la familia y la escuela.',
    servicios: [0, 1],
    blog: 'neurodivergencia',
  },
  {
    id: 'autismo',
    nombre: 'Autismo',
    color: 'var(--cercania)',
    intro:
      'El trastorno del espectro autista es una condición del neurodesarrollo que influye en la comunicación, la interacción social y la forma de percibir el mundo. Se habla de espectro porque se manifiesta de maneras muy distintas: cada persona autista necesita un tipo y un nivel de apoyo diferente.',
    senales: [
      'Poco contacto visual o no responde a su nombre.',
      'Retraso o pérdida del lenguaje.',
      'Juego repetitivo y apego fuerte a las rutinas.',
      'Intereses muy intensos y específicos.',
      'Dificultad para entender las reglas sociales que nadie explica.',
    ],
    como: 'Evaluamos con entrevista, observación y pruebas estandarizadas. Después acompañamos a la persona y a su familia, y damos recomendaciones para la escuela.',
    servicios: [0, 1],
    blog: 'autismo',
  },
  {
    id: 'tdah',
    nombre: 'TDAH',
    color: 'var(--calma)',
    intro:
      'El trastorno por déficit de atención e hiperactividad afecta la forma en que el cerebro regula la atención, la actividad y los impulsos. Aparece en la infancia y en muchas personas continúa en la adultez. Puede presentarse con predominio de desatención, de hiperactividad e impulsividad, o de ambas.',
    senales: [
      'Se distrae con facilidad y deja tareas sin terminar.',
      'Pierde cosas u olvida instrucciones.',
      'Le cuesta esperar su turno o interrumpe.',
      'Bajo rendimiento a pesar de tener capacidad.',
      'En adultos: postergación, olvidos e inquietud interna.',
    ],
    como: 'Hacemos una evaluación que va más allá de los cuestionarios y descarta otras causas. Si hay TDAH, trabajamos las funciones ejecutivas con rehabilitación neuropsicológica y orientamos a la familia y a la escuela.',
    servicios: [0, 1],
    blog: 'tdah',
  },
  {
    id: 'altas-capacidades',
    nombre: 'Altas capacidades',
    color: 'var(--especializacion)',
    intro:
      'Hablamos de altas capacidades cuando una persona tiene un coeficiente intelectual de 130 o más, lo que corresponde a cerca del 2 % de la población. Además de aprender rápido, estas personas suelen vivir las emociones con mucha intensidad, y pueden aburrirse o sentirse fuera de lugar si su entorno no les desafía.',
    senales: [
      'Vocabulario avanzado desde muy temprano.',
      'Curiosidad intensa y preguntas profundas.',
      'Aprende rápido y se aburre con la repetición.',
      'Gran sensibilidad y sentido de la justicia.',
      'Perfeccionismo o miedo a equivocarse.',
    ],
    como: 'Identificamos las altas capacidades con una evaluación neuropsicológica completa y acompañamos su mundo emocional. También revisamos si hay doble excepcionalidad, por ejemplo junto a un TDAH.',
    servicios: [0],
    blog: 'altas-capacidades',
  },
  {
    id: 'ansiedad-y-depresion',
    nombre: 'Ansiedad y depresión',
    color: 'var(--calma)',
    intro:
      'La ansiedad y la depresión son los problemas de salud mental más frecuentes en el mundo, y tienen tratamiento. La ansiedad se vuelve un problema cuando la preocupación no se apaga y afecta la vida diaria. La depresión es más que tristeza: dura semanas y quita la energía y el interés por las cosas.',
    senales: [
      'Preocupación constante o sensación de peligro.',
      'Tristeza, vacío o irritabilidad que no se van.',
      'Cambios en el sueño o en el apetito.',
      'Pérdida de interés en lo que antes se disfrutaba.',
      'Dificultad para concentrarse.',
    ],
    como: 'Te escuchamos, evaluamos qué está pasando y armamos contigo un plan de acompañamiento. Cuando corresponde, sumamos la Estimulación Magnética Transcraneal junto con rehabilitación neuropsicológica.',
    servicios: [0, 2],
    blog: 'ansiedad-y-depresion',
    alerta: true,
  },
];

function bloque(c, e, i) {
  const art = porSlug(e.blog);
  const serv = e.servicios
    .map((n) => `<li><a href="${c.r(SERVICIOS[n].ruta)}">${SERVICIOS[n].nombre}</a></li>`)
    .join('');
  return `
<section class="seccion especialidad${i % 2 ? ' especialidad--invertida' : ''}" id="${e.id}" aria-labelledby="t-${e.id}" style="--c:${e.color}">
  <div class="contenedor especialidad-grid">
    <div class="especialidad-cabeza">
      <span class="especialidad-circulo" aria-hidden="true"></span>
      <h2 id="t-${e.id}" class="titulo emerge">${e.nombre}</h2>
      <p class="revela">${e.intro}</p>
    </div>
    <div class="especialidad-cuerpo">
      <div class="revela" style="--i:1">
        <h3>Señales frecuentes</h3>
        <ul class="lista-puntos">${e.senales.map((s) => `<li>${s}</li>`).join('')}</ul>
      </div>
      <div class="revela" style="--i:2">
        <h3>Cómo te acompañamos</h3>
        <p>${e.como}</p>
        <ul class="enlaces-servicio">${serv}</ul>
      </div>
      ${e.alerta ? `<div class="nota nota--alerta revela" style="--i:3"><p><strong>Si tienes pensamientos de hacerte daño, no esperes.</strong> Llama al 911 o acude a la emergencia más cercana.</p></div>` : ''}
      <a class="enlace revela" style="--i:3" href="${c.r(`blog/${art.slug}.html`)}">Leer: ${art.titulo}</a>
    </div>
  </div>
</section>`;
}

export default {
  ruta: 'especialidades.html',
  seccion: 'especialidades',
  titulo: 'Especialidades: autismo, TDAH, altas capacidades, ansiedad y depresión | Bienestar Quito',
  descripcion:
    'Neurodivergencias, autismo, TDAH, altas capacidades, ansiedad y depresión. Evaluación y acompañamiento para niños, adolescentes y adultos en Quito.',
  waMensaje: wa,
  ld: () => [migasLD(migas)],
  cuerpo: (c) =>
    [
      paginaHero(c, {
        migas,
        titulo: 'Especialidades',
        entrada:
          'Cada mente funciona a su manera. Estas son las áreas en las que nos especializamos, para niños, adolescentes y adultos.',
        accion: botonWa(c, wa, 'Consulta tu caso'),
        clase: 'pagina-hero--especialidades',
        deco: `<div class="deco-burbujas" data-vivo>${[
          ['var(--especializacion)', '4%', '8%', '50%', '0s'],
          ['var(--cercania)', '42%', '0%', '40%', '-3s'],
          ['var(--calma)', '50%', '36%', '46%', '-6s'],
          ['var(--especializacion)', '24%', '50%', '38%', '-2s'],
          ['var(--calma)', '0%', '52%', '34%', '-5s'],
        ]
          .map(([col, x, y, s, dl]) => `<span style="--c:${col};--x:${x};--y:${y};--s:${s};--d:${dl}"></span>`)
          .join('')}</div>`,
      }),
      `<nav class="indice-esp contenedor" aria-label="Especialidades en esta página"><ul>${ESP.map(
        (e) => `<li><a href="#${e.id}" style="--c:${e.color}">${e.nombre}</a></li>`
      ).join('')}</ul></nav>`,
      ESP.map((e, i) => bloque(c, e, i)).join('\n'),
    ].join('\n'),
  pieCta: {
    titulo: 'No necesitas tener todo claro para escribir.',
    texto: 'Cuéntanos lo que te preocupa y te orientamos sobre el mejor primer paso.',
  },
};
