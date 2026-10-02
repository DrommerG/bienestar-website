import { paginaHero, botonWa, faq, faqLD, migasLD, relacionados, pasosVerticales } from '../plantillas.mjs';
import { ICONO, ola } from '../partes.mjs';
import { MARCA, SUBTITULO, CIUDAD } from '../config.mjs';
import { videoTarjeta } from './inicio.mjs';

const servicioLD = (nombre, descripcion) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: nombre,
  serviceType: nombre,
  description: descripcion,
  areaServed: { '@type': 'City', name: CIUDAD },
  provider: { '@type': 'MedicalBusiness', name: `${MARCA}, ${SUBTITULO}` },
});

const lista = (items) => `<ul class="lista-puntos">${items.map((t) => `<li>${t}</li>`).join('')}</ul>`;

function bloqueQueEs(titulo, frase, parrafos) {
  return `
<section class="seccion bloque-dos" aria-labelledby="que-es">
  <div class="contenedor bloque-dos-grid">
    <div>
      <h2 id="que-es" class="titulo emerge">${titulo}</h2>
      <p class="frase-grande revela">${frase}</p>
    </div>
    <div class="prosa revela" style="--i:1">${parrafos.map((p) => `<p>${p}</p>`).join('')}</div>
  </div>
</section>`;
}

function bloqueAreas(titulo, entrada, areas) {
  return `
<section class="seccion areas-seccion" aria-labelledby="areas-titulo">
  <div class="contenedor">
    <div class="encabezado encabezado--doble">
      <h2 id="areas-titulo" class="titulo emerge">${titulo}</h2>
      <p class="entrada revela">${entrada}</p>
    </div>
    <ul class="areas">${areas
      .map((a, i) => `<li class="area revela" style="--i:${i % 4}"><h3>${a[0]}</h3><p>${a[1]}</p></li>`)
      .join('')}
    </ul>
  </div>
</section>`;
}

function bloqueEdades(titulo, columnas) {
  return `
<section class="seccion edades-seccion" aria-labelledby="edades-titulo">
  <div class="contenedor">
    <h2 id="edades-titulo" class="titulo emerge">${titulo}</h2>
    <div class="edades">${columnas
      .map(
        (col, i) => `
      <div class="edad revela" style="--i:${i};--c:${['var(--cercania)', 'var(--calma)', 'var(--especializacion)'][i]}">
        <h3>${col.t}</h3>
        ${lista(col.items)}
      </div>`
      )
      .join('')}
    </div>
  </div>
</section>`;
}

function bloqueProceso(c, titulo, entrada, pasos, imagen) {
  return `
<section class="seccion proceso" aria-labelledby="proceso-titulo">
  <div class="contenedor proceso-grid">
    <div class="proceso-texto">
      <h2 id="proceso-titulo" class="titulo emerge">${titulo}</h2>
      <p class="entrada revela">${entrada}</p>
      ${pasosVerticales(pasos)}
    </div>
    <div class="proceso-media revela">
      <img src="${c.r(imagen.src)}" alt="${imagen.alt}" width="${imagen.w}" height="${imagen.h}" loading="lazy"${imagen.posicion ? ` style="object-position:${imagen.posicion}"` : ''}>
    </div>
  </div>
</section>`;
}

function bloqueResultado(titulo, items) {
  return `
${ola({ clase: 'ola--sube', color: 'var(--abismo)' })}
<section class="seccion resultado oscuro" data-cabecera="oscura" aria-labelledby="resultado-titulo">
  <div class="contenedor resultado-grid">
    <h2 id="resultado-titulo" class="titulo emerge">${titulo}</h2>
    <ul class="resultado-lista">${items
      .map((t, i) => `<li class="revela" style="--i:${i}"><span class="burbuja-mini" aria-hidden="true"></span>${t}</li>`)
      .join('')}
    </ul>
  </div>
</section>
${ola({ clase: 'ola--baja', color: 'var(--abismo)' })}`;
}

// ---------------- Evaluación neuropsicológica ----------------
const evalMigas = [
  { nombre: 'Inicio', ruta: 'index.html' },
  { nombre: 'Servicios', ruta: 'index.html#servicios' },
  { nombre: 'Evaluación neuropsicológica', ruta: 'servicios/evaluacion-neuropsicologica.html' },
];
const evalWa = 'Hola, quiero información sobre la evaluación neuropsicológica.';
const evalFaq = [
  {
    p: '¿Cuánto dura la evaluación?',
    r: 'Depende de la edad de la persona y del motivo de consulta. Por lo general se completa en varias sesiones. En la primera conversación por WhatsApp te damos una estimación para tu caso.',
  },
  {
    p: '¿Desde qué edad se puede evaluar?',
    r: 'Evaluamos a niños, adolescentes y adultos. Las pruebas se eligen según la edad y el momento del desarrollo de cada persona.',
  },
  {
    p: '¿Cómo preparo a mi hijo o hija?',
    r: 'Explícale que va a hacer juegos y actividades con una psicóloga, y que no es un examen con nota. Que duerma bien la noche anterior y llegue desayunado. Si usa lentes o audífonos, que los lleve.',
  },
  {
    p: '¿El informe sirve para la escuela?',
    r: 'Sí. El informe incluye recomendaciones que la escuela puede usar para hacer adaptaciones en el aula y en las evaluaciones.',
  },
  {
    p: '¿Se puede hacer en línea?',
    r: 'Algunas etapas, como la entrevista inicial y la entrega de resultados, pueden hacerse en línea. Por WhatsApp te contamos qué partes requieren venir al consultorio en Quito.',
  },
];
const evaluacion = {
  ruta: 'servicios/evaluacion-neuropsicologica.html',
  seccion: 'servicios',
  titulo: 'Evaluación neuropsicológica en Quito | Bienestar',
  descripcion:
    'Evaluación neuropsicológica para niños, adolescentes y adultos en Quito: atención, memoria, lenguaje, funciones ejecutivas, TDAH, autismo y altas capacidades. Informe claro y recomendaciones.',
  waMensaje: evalWa,
  ld: () => [
    servicioLD('Evaluación neuropsicológica', 'Estudio de la atención, la memoria, el lenguaje y las funciones ejecutivas con pruebas estandarizadas.'),
    faqLD(evalFaq),
    migasLD(evalMigas),
  ],
  cuerpo: (c) =>
    [
      paginaHero(c, {
        migas: evalMigas,
        titulo: 'Evaluación neuropsicológica',
        entrada:
          'Un estudio detallado de cómo funcionan la atención, la memoria, el lenguaje y otras capacidades de la mente. Para entender qué pasa y decidir con claridad qué hacer después.',
        accion: botonWa(c, evalWa, 'Pregunta por la evaluación') + `<a class="boton boton--borde" href="#proceso-titulo">Cómo es el proceso</a>`,
        imagen: {
          src: 'assets/img/evaluacion-infantil.webp',
          srcset: [['assets/img/evaluacion-infantil-640.webp', 640], ['assets/img/evaluacion-infantil.webp', 1000]],
          alt: 'Niña armando un rompecabezas durante una evaluación neuropsicológica',
          w: 1000, h: 1500, posicion: '40% 40%',
        },
      }),
      bloqueQueEs(
        '¿Qué es?',
        'Una mirada precisa a las capacidades que usamos todos los días.',
        [
          'La evaluación neuropsicológica mide, con pruebas estandarizadas, las funciones que usamos a diario: prestar atención, recordar, organizarnos, comprender y expresarnos, controlar los impulsos.',
          'Los resultados se comparan con lo esperado para la edad de la persona. Así aparecen con claridad sus fortalezas y las áreas que necesitan apoyo, y se puede confirmar o descartar un diagnóstico como TDAH, autismo, dificultades de aprendizaje o altas capacidades.',
        ]
      ),
      bloqueAreas('Qué evaluamos', 'Elegimos las pruebas según el motivo de consulta y la edad. Estas son las áreas más frecuentes.', [
        ['Atención', 'Mantener el foco, elegir a qué atender y cambiar de tarea cuando hace falta.'],
        ['Memoria', 'Guardar y recordar información, tanto lo que se ve como lo que se escucha.'],
        ['Lenguaje', 'Comprender, expresarse y encontrar las palabras.'],
        ['Funciones ejecutivas', 'Planificar, organizarse, frenar impulsos y adaptarse a los cambios.'],
        ['Velocidad de procesamiento', 'Qué tan rápido se recibe y se trabaja la información.'],
        ['Capacidad intelectual', 'El perfil de razonamiento verbal y no verbal.'],
        ['Habilidades visoespaciales', 'Percibir formas, distancias y relaciones en el espacio.'],
        ['Emociones y conducta', 'Cómo se siente la persona y cómo eso influye en su día a día.'],
      ]),
      bloqueEdades('¿Cuándo consultar?', [
        {
          t: 'Niños',
          items: [
            'Le cuesta aprender a leer, escribir o calcular.',
            'Se distrae mucho o no termina las tareas.',
            'Hay retraso en el lenguaje o en el desarrollo.',
            'Se sospecha autismo, TDAH o altas capacidades.',
            'La escuela reporta cambios de conducta.',
          ],
        },
        {
          t: 'Adolescentes',
          items: [
            'Las notas bajan sin una causa clara.',
            'Hay problemas de concentración y organización.',
            'La ansiedad o el desánimo afectan el estudio.',
            'Necesita un informe para pedir adaptaciones.',
          ],
        },
        {
          t: 'Adultos',
          items: [
            'Olvidos frecuentes o cambios en la memoria.',
            'Sospecha de un TDAH que nunca se diagnosticó.',
            'Después de un golpe en la cabeza, un ACV u otra lesión cerebral.',
            'Seguimiento de cambios en la atención o el pensamiento.',
          ],
        },
      ]),
      bloqueProceso(
        c,
        'Cómo es el proceso',
        'Paso a paso, sin apuros y explicándote todo con palabras simples.',
        [
          { t: 'Entrevista inicial', d: 'Conversamos sobre el motivo de consulta, la historia del desarrollo, la salud y el día a día. Con niños, la entrevista es con madre, padre o cuidadores.' },
          { t: 'Sesiones de evaluación', d: 'Aplicamos pruebas estandarizadas en un ambiente tranquilo. El número de sesiones depende de la edad y de lo que necesitamos medir.' },
          { t: 'Análisis de resultados', d: 'Corregimos e interpretamos cada prueba comparándola con lo esperado para la edad.' },
          { t: 'Devolución e informe', d: 'Te explicamos los resultados en una reunión y te entregamos un informe escrito con recomendaciones para casa, escuela o trabajo.' },
        ],
        { src: 'assets/img/veronica-consultorio.webp', alt: 'Verónica Báez sonriendo en su escritorio del consultorio en Quito', w: 1920, h: 1280, posicion: '62% 50%' }
      ),
      bloqueResultado('Qué te llevas', [
        'Un informe escrito, claro y completo.',
        'El perfil de fortalezas y de áreas que necesitan apoyo.',
        'Un diagnóstico, cuando corresponde.',
        'Recomendaciones concretas para casa, escuela o trabajo.',
        'Un plan de intervención, si hace falta.',
      ]),
      faq(c, evalFaq),
      relacionados(c, ['tdah', 'autismo', 'altas-capacidades']),
    ].join('\n'),
  pieCta: {
    titulo: 'Entender es el primer paso.',
    texto: 'Escríbenos y te contamos cómo sería la evaluación en tu caso.',
  },
};

// ---------------- Rehabilitación neuropsicológica ----------------
const rehabMigas = [
  { nombre: 'Inicio', ruta: 'index.html' },
  { nombre: 'Servicios', ruta: 'index.html#servicios' },
  { nombre: 'Rehabilitación neuropsicológica', ruta: 'servicios/rehabilitacion-neuropsicologica.html' },
];
const rehabWa = 'Hola, quiero información sobre la rehabilitación neuropsicológica.';
const rehabFaq = [
  {
    p: '¿Necesito una evaluación antes de empezar?',
    r: 'Sí. El plan de rehabilitación se arma a partir de una evaluación neuropsicológica. Si ya tienes una reciente, la revisamos juntos antes de empezar.',
  },
  {
    p: '¿Cuántas sesiones son?',
    r: 'Depende de los objetivos y de cómo avance cada persona. Los definimos juntos al inicio y revisamos el progreso en el camino.',
  },
  {
    p: '¿Los padres participan?',
    r: 'Sí. En el trabajo con niños y adolescentes damos pautas para practicar en casa, porque lo que se refuerza fuera de la sesión avanza más rápido.',
  },
  {
    p: '¿Se combina con la EMT?',
    r: 'Sí. En el proceso de Estimulación Magnética Transcraneal, la rehabilitación neuropsicológica es parte del tratamiento.',
  },
];
const rehabilitacion = {
  ruta: 'servicios/rehabilitacion-neuropsicologica.html',
  seccion: 'servicios',
  titulo: 'Rehabilitación neuropsicológica en Quito | Bienestar',
  descripcion:
    'Rehabilitación neuropsicológica en Quito para niños, adolescentes y adultos: atención, memoria y funciones ejecutivas. TDAH, dificultades de aprendizaje y lesiones cerebrales.',
  waMensaje: rehabWa,
  ld: () => [
    servicioLD('Rehabilitación neuropsicológica', 'Ejercicios y estrategias para fortalecer la atención, la memoria y las funciones ejecutivas.'),
    faqLD(rehabFaq),
    migasLD(rehabMigas),
  ],
  cuerpo: (c) =>
    [
      paginaHero(c, {
        migas: rehabMigas,
        titulo: 'Rehabilitación neuropsicológica',
        entrada:
          'Un trabajo guiado para fortalecer la atención, la memoria y las funciones ejecutivas, y para aprender estrategias que hagan más fácil el día a día.',
        accion: botonWa(c, rehabWa, 'Pregunta por la rehabilitación') + `<a class="boton boton--borde" href="#proceso-titulo">Cómo trabajamos</a>`,
        imagen: {
          src: 'assets/img/rehabilitacion-paciente.webp',
          alt: 'Paciente adulto sonriendo durante una sesión de rehabilitación neuropsicológica',
          w: 900, h: 1600, posicion: '50% 45%',
        },
      }),
      bloqueQueEs(
        '¿Qué es?',
        'El cerebro cambia con la práctica. La rehabilitación aprovecha esa capacidad.',
        [
          'La rehabilitación neuropsicológica es un conjunto de ejercicios y estrategias diseñados a partir de una evaluación. Su objetivo es mejorar las funciones que están afectadas, compensar las que cuestan más y ganar autonomía en casa, en la escuela o en el trabajo.',
          'Se apoya en la neuroplasticidad: la capacidad del cerebro de reorganizarse y crear nuevas conexiones cuando se entrena de forma constante y bien dirigida.',
        ]
      ),
      bloqueAreas('Qué trabajamos', 'Cada plan es distinto. Estas son las áreas en las que más trabajamos.', [
        ['Atención', 'Sostener el foco por más tiempo y filtrar las distracciones.'],
        ['Memoria', 'Estrategias para guardar y recuperar lo importante.'],
        ['Funciones ejecutivas', 'Planificar, organizarse, frenar impulsos y resolver problemas.'],
        ['Lenguaje', 'Comprensión, expresión y fluidez.'],
        ['Velocidad de procesamiento', 'Responder con más agilidad sin perder precisión.'],
        ['Regulación emocional', 'Reconocer lo que se siente y manejarlo mejor.'],
        ['Habilidades sociales', 'Comunicarse y relacionarse con más confianza.'],
        ['Autonomía', 'Rutinas y apoyos para el día a día.'],
      ]),
      bloqueEdades('¿Para quién es?', [
        {
          t: 'Niños',
          items: [
            'Con TDAH o dificultades de atención.',
            'Con dificultades de aprendizaje.',
            'Con retrasos en el desarrollo o autismo.',
          ],
        },
        {
          t: 'Adolescentes',
          items: [
            'Con problemas de organización y estudio.',
            'Con TDAH que afecta el colegio.',
            'Que necesitan estrategias para ganar autonomía.',
          ],
        },
        {
          t: 'Adultos',
          items: [
            'Después de un traumatismo craneal, un ACV u otra lesión cerebral.',
            'Con cambios en la memoria o la atención.',
            'Como parte del proceso de EMT.',
          ],
        },
      ]),
      bloqueProceso(
        c,
        'Cómo trabajamos',
        'Un plan con metas claras y revisiones en el camino.',
        [
          { t: 'Punto de partida', d: 'Partimos de una evaluación neuropsicológica, nueva o reciente, para saber exactamente qué trabajar.' },
          { t: 'Plan con objetivos', d: 'Definimos metas concretas con la persona y su familia: qué queremos lograr y cómo lo vamos a notar.' },
          { t: 'Sesiones de entrenamiento', d: 'Ejercicios con material, juegos y recursos digitales adaptados a la edad y a los intereses de cada persona.' },
          { t: 'Seguimiento', d: 'Medimos los avances, ajustamos el plan y damos pautas para practicar en casa.' },
        ],
        { src: 'assets/img/rehabilitacion-sesion.webp', alt: 'Sesión de rehabilitación neuropsicológica frente a una pantalla con ejercicios', w: 900, h: 1600, posicion: '50% 60%' }
      ),
      bloqueResultado('Lo que buscamos juntos', [
        'Más atención y menos olvidos en el día a día.',
        'Estrategias que la persona puede usar sola.',
        'Más autonomía en casa, en la escuela o en el trabajo.',
        'Una familia que sabe cómo acompañar.',
        'Avances que se miden y se pueden ver.',
      ]),
      faq(c, rehabFaq),
      relacionados(c, ['tdah', 'neurodivergencia', 'autismo']),
    ].join('\n'),
  pieCta: {
    titulo: 'Cada avance cuenta.',
    texto: 'Escríbenos y armamos juntos el plan de rehabilitación.',
  },
};

// ---------------- Estimulación Magnética Transcraneal ----------------
const emtMigas = [
  { nombre: 'Inicio', ruta: 'index.html' },
  { nombre: 'Servicios', ruta: 'index.html#servicios' },
  { nombre: 'Estimulación Magnética Transcraneal', ruta: 'servicios/estimulacion-magnetica-transcraneal.html' },
];
const emtWa = 'Hola, quiero información sobre la Estimulación Magnética Transcraneal (EMT).';
const emtFaq = [
  {
    p: '¿Duele?',
    r: 'La EMT no es dolorosa. Durante la sesión se siente un golpeteo suave en la cabeza y se escuchan unos clics. Algunas personas sienten una molestia leve en el cuero cabelludo o un dolor de cabeza pasajero, que suele disminuir con las sesiones.',
  },
  {
    p: '¿Cuánto dura el proceso?',
    r: 'El proceso dura 21 días y se acompaña de rehabilitación neuropsicológica. En la evaluación te explicamos la frecuencia de las sesiones para tu caso.',
  },
  {
    p: '¿Quién no puede hacerla?',
    r: 'No se recomienda a personas con implantes metálicos en la cabeza (salvo los de la boca), marcapasos u otros dispositivos implantados, ni a quienes tienen ciertos antecedentes de convulsiones. Por eso siempre hacemos una evaluación previa.',
  },
  {
    p: '¿Reemplaza a la medicación?',
    r: 'No necesariamente. La EMT puede usarse sola o junto con otros tratamientos. Si tomas medicación, no la cambies por tu cuenta: lo coordinamos con tu médico.',
  },
  {
    p: '¿Puedo volver a mis actividades después?',
    r: 'Sí. No se usa anestesia ni sedación, así que puedes seguir con tu día al salir de la sesión.',
  },
];
const emtPagina = {
  ruta: 'servicios/estimulacion-magnetica-transcraneal.html',
  seccion: 'servicios',
  titulo: 'Estimulación Magnética Transcraneal (EMT) en Quito | Bienestar',
  descripcion:
    'Estimulación Magnética Transcraneal (EMT) en Quito: técnica no invasiva para ansiedad, depresión y algunas lesiones cerebrales. Proceso de 21 días con rehabilitación neuropsicológica.',
  waMensaje: emtWa,
  ld: () => [
    servicioLD('Estimulación Magnética Transcraneal (EMT)', 'Técnica no invasiva que usa pulsos magnéticos para estimular zonas específicas del cerebro.'),
    faqLD(emtFaq),
    migasLD(emtMigas),
  ],
  cuerpo: (c) =>
    [
      paginaHero(c, {
        migas: emtMigas,
        titulo: 'Estimulación Magnética Transcraneal',
        entrada:
          'Una técnica no invasiva que usa pulsos magnéticos para estimular zonas específicas del cerebro. En Bienestar se aplica en un proceso de 21 días, junto con rehabilitación neuropsicológica.',
        accion: botonWa(c, emtWa, 'Pregunta por la EMT') + `<a class="boton boton--borde" href="#videos-titulo">Ver los videos</a>`,
        imagen: {
          src: 'assets/img/emt-acompanamiento.webp',
          alt: 'Verónica Báez acompaña a un paciente sentado en el sillón antes de una sesión de EMT',
          w: 900, h: 1600, posicion: '50% 55%',
        },
      }),
      `
<section class="seccion emt-videos" aria-labelledby="videos-titulo">
  <div class="contenedor emt-videos-grid">
    <div class="emt-videos-texto">
      <h2 id="videos-titulo" class="titulo emerge">Mírala de cerca</h2>
      <p class="entrada revela">Verónica te explica en 40 segundos qué es la EMT, y en el segundo video puedes ver cómo es una sesión en nuestro consultorio.</p>
      <p class="revela" style="--i:1">Los dos videos tienen sonido, y el de Verónica incluye subtítulos.</p>
    </div>
    <div class="emt-videos-par">
      <div class="revela" style="--i:1">${videoTarjeta(c, {
        video: 'assets/video/emt-veronica.mp4',
        poster: 'assets/img/emt-veronica-poster.webp',
        etiqueta: 'Reproducir el video: Verónica Báez explica la EMT, 40 segundos, con sonido',
        texto: 'Qué es, 40 s',
        pie: 'Verónica explica la EMT.',
      })}</div>
      <div class="revela" style="--i:2">${videoTarjeta(c, {
        video: 'assets/video/emt-proceso.mp4',
        poster: 'assets/img/emt-proceso-poster.webp',
        etiqueta: 'Reproducir el video: así es el proceso de EMT y rehabilitación en Bienestar, 48 segundos, con sonido',
        texto: 'El proceso, 48 s',
        pie: 'Así es una sesión en Bienestar.',
      })}</div>
    </div>
  </div>
</section>`,
      bloqueQueEs(
        '¿Cómo funciona?',
        'Pulsos magnéticos suaves que activan la zona del cerebro que lo necesita.',
        [
          'Un equipo con una bobina, colocada sobre la cabeza, genera campos magnéticos breves. Estos atraviesan el cuero cabelludo y el cráneo sin dañarlos y estimulan la actividad de las neuronas en una zona concreta, relacionada con el ánimo, la atención u otras funciones.',
          'La persona está despierta y sentada cómodamente. No requiere cirugía ni anestesia, y no genera histotoxicidad, es decir, no daña los órganos. Al terminar puede volver a sus actividades.',
        ]
      ),
      `
<section class="seccion ventajas" aria-labelledby="ventajas-titulo">
  <div class="contenedor ventajas-grid">
    <div class="ventajas-media revela">
      <img src="${c.r('assets/img/emt-equipo.webp')}" alt="Mano ajustando la pantalla del equipo de Estimulación Magnética Transcraneal" width="900" height="1600" loading="lazy">
    </div>
    <div>
      <h2 id="ventajas-titulo" class="titulo emerge">En qué casos se indica</h2>
      <p class="entrada revela">La EMT se indica en niños, adolescentes y adultos, siempre después de una evaluación que confirme que es adecuada para cada caso.</p>
      <ul class="indicaciones revela" style="--i:1">
        <li>Ansiedad</li>
        <li>Depresión</li>
        <li>Algunos casos de lesiones cerebrales</li>
      </ul>
      <dl class="ficha ficha--clara">
        <div class="revela" style="--i:1"><dt>No invasiva</dt><dd>Sin cirugía ni anestesia</dd></div>
        <div class="revela" style="--i:2"><dt>Sin daño a órganos</dt><dd>No genera histotoxicidad</dd></div>
        <div class="revela" style="--i:3"><dt>Ambulatoria</dt><dd>Vuelves a tu día al salir</dd></div>
        <div class="revela" style="--i:4"><dt>Acompañada</dt><dd>Junto a rehabilitación neuropsicológica</dd></div>
      </dl>
    </div>
  </div>
</section>`,
      bloqueProceso(
        c,
        'Cómo es el proceso',
        'Un camino de 21 días, con acompañamiento en cada etapa.',
        [
          { t: 'Evaluación previa', d: 'Revisamos tu historia de salud y lo que te trae a consulta, para confirmar que la EMT es adecuada para ti.' },
          { t: 'Plan de estimulación', d: 'Definimos la zona del cerebro a estimular y la frecuencia de las sesiones.' },
          { t: 'Sesiones de EMT', d: 'Estás sentado en un sillón cómodo mientras el equipo trabaja. Se sienten golpecitos suaves en la cabeza.' },
          { t: 'Rehabilitación neuropsicológica', d: 'El proceso se acompaña de ejercicios de rehabilitación para aprovechar al máximo la estimulación.' },
        ],
        { src: 'assets/img/calma-paciente.webp', alt: 'Paciente descansando con los ojos cerrados en el sillón del consultorio', w: 900, h: 1600, posicion: '50% 50%' }
      ),
      faq(c, emtFaq),
      relacionados(c, ['ansiedad-y-depresion', 'neurodivergencia']),
    ].join('\n'),
  pieCta: {
    titulo: '¿La EMT es para ti?',
    texto: 'Escríbenos y te explicamos el proceso. La decisión siempre se toma después de una evaluación.',
  },
};

export default [evaluacion, rehabilitacion, emtPagina];
