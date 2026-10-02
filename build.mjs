// Genera el sitio estático en ./sitio a partir de ./contenido.
// Uso: node build.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { documento } from './contenido/partes.mjs';
import { SITIO_URL } from './contenido/config.mjs';
import inicio from './contenido/paginas/inicio.mjs';
import servicios from './contenido/paginas/servicios.mjs';
import especialidades from './contenido/paginas/especialidades.mjs';
import sobre from './contenido/paginas/sobre.mjs';
import blog from './contenido/paginas/blog.mjs';

const RAIZ = dirname(fileURLToPath(import.meta.url));
const SALIDA = join(RAIZ, 'sitio');

const paginas = [inicio, ...servicios, especialidades, sobre, ...blog];

for (const p of paginas) {
  const destino = join(SALIDA, p.ruta);
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, documento(p), 'utf8');
  console.log('ok', p.ruta);
}

const robots = ['User-agent: *', 'Allow: /'];
if (SITIO_URL) {
  robots.push(`Sitemap: ${SITIO_URL}/sitemap.xml`);
  const hoy = new Date().toISOString().slice(0, 10);
  const urls = paginas
    .map((p) => `  <url><loc>${SITIO_URL}/${p.ruta === 'index.html' ? '' : p.ruta}</loc><lastmod>${hoy}</lastmod></url>`)
    .join('\n');
  writeFileSync(
    join(SALIDA, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    'utf8'
  );
  console.log('ok sitemap.xml');
}
writeFileSync(join(SALIDA, 'robots.txt'), robots.join('\n') + '\n', 'utf8');
console.log(`\n${paginas.length} páginas generadas en ${SALIDA}`);
