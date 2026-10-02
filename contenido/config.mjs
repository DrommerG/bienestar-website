// Datos generales del sitio. Cambia aquí y vuelve a generar con: node build.mjs

// Número de WhatsApp: solo dígitos, con código de país (593) y sin el 0 inicial.
export const WHATSAPP = '593990435774';
export const WHATSAPP_VISIBLE = '+593 99 043 5774';

// DEPLOY STEP: poner aquí la dirección final del sitio (ej. https://www.bienestar.ec).
// Mientras esté vacío, no se generan canonical, og:url ni sitemap.xml.
export const SITIO_URL = '';

export const MARCA = 'Bienestar';
export const SUBTITULO = 'Psicología y Neuropsicología';
export const PROFESIONAL = 'Verónica Báez';
export const CIUDAD = 'Quito';
export const PAIS = 'Ecuador';

// Pendiente: dirección exacta del consultorio. Si queda vacío, se muestra solo "Quito, Ecuador".
export const DIRECCION = '';

export const ANIO = 2026;

export const MENSAJE_WA_GENERAL = 'Hola, quiero agendar una cita en Bienestar.';

export const waUrl = (mensaje = MENSAJE_WA_GENERAL) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
