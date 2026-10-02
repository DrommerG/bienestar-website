// Servidor local de vista previa para ./sitio (sin dependencias).
// Uso: node servidor.mjs  ->  http://localhost:4173
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(fileURLToPath(new URL('.', import.meta.url)), 'sitio');
const PUERTO = Number(process.env.PORT) || 4173;
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.json': 'application/json',
};

createServer(async (req, res) => {
  try {
    let ruta = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (ruta.endsWith('/')) ruta += 'index.html';
    const archivo = normalize(join(RAIZ, ruta));
    if (!archivo.startsWith(RAIZ)) { res.writeHead(403).end(); return; }
    const info = await stat(archivo);
    if (info.isDirectory()) { res.writeHead(301, { Location: ruta + '/' }).end(); return; }
    const datos = await readFile(archivo);
    res.writeHead(200, { 'Content-Type': TIPOS[extname(archivo)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(datos);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('No encontrado');
  }
}).listen(PUERTO, () => console.log(`Vista previa en http://localhost:${PUERTO}`));
