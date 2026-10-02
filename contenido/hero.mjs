// Héroe guiado por el scroll: modo video (inicio) o modo mar dibujado (Sobre Verónica).
// Las bandas de texto se pasan como HTML; hero.js las coreografía según data-a / data-b.
import { ola } from './partes.mjs';

export function heroScroll(c, { modo, bandas, titulo = 'hero-titulo', video = null }) {
  const esVideo = modo === 'video';
  const datos = esVideo
    ? ` data-video="${c.r(video.src)}" data-poster="${c.r(video.poster)}" data-bytes="${video.bytes}"`
    : '';
  const capas = esVideo
    ? `<div class="hero-poster" aria-hidden="true"></div>
    <img class="hero-fijo" data-src="${c.r(video.fijo)}" alt="" aria-hidden="true">
    <video class="hero-video" preload="none" muted playsinline aria-hidden="true" tabindex="-1"></video>`
    : `<canvas class="hero-mar" aria-hidden="true"></canvas>`;
  return `
<section class="hero hero--${esVideo ? 'video' : 'mar'}" data-cabecera="oscura" aria-labelledby="${titulo}"${datos}>
  <div class="hero-escena">
    ${capas}
    <div class="hero-scrim" aria-hidden="true"></div>
${bandas}
    <div class="hero-pista" aria-hidden="true"><span>Desliza</span><i></i></div>
    <svg class="hero-anillo" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="126" style="stroke-dashoffset:var(--ld,126)"/></svg>
    ${ola({ clase: 'ola--hero', color: 'var(--claridad)' })}
  </div>
</section>`;
}
