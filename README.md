# Bienestar · Psicología y Neuropsicología

Sitio web de Bienestar, consultorio de Verónica Báez en Quito. HTML, CSS y JavaScript sin frameworks.

- `sitio/`: el sitio listo para publicar (esta carpeta es la que se sube al hosting).
- `contenido/`: textos y estructura de cada página.
- `build.mjs`: genera las páginas de `sitio/` a partir de `contenido/`.
- `servidor.mjs`: vista previa local.

## Uso

```bash
node build.mjs
node servidor.mjs
```

La vista previa queda en http://localhost:4173.

## Cambios frecuentes

- **Número de WhatsApp, dirección y dominio:** `contenido/config.mjs`, después `node build.mjs`.
- **Artículos del blog:** `contenido/articulos.mjs`.

## Pendiente

- Logo de Nube (alianza).
- Formación de Verónica (sección "Formación y experiencia").
- Dirección exacta del consultorio.
- Número de WhatsApp definitivo y dominio.
