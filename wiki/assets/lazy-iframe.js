// Lazy-load YouTube iframes — kliknięcie thumb podmienia na iframe.
// Bez tego embeddujemy 7 iframe'ów na start = brutalne CWV na telefonie.

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.video-frame button.play');
  if (!btn) return;
  const frame = btn.closest('.video-frame');
  const id = frame?.dataset.youtubeId;
  if (!id) return;

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
  iframe.title = frame.dataset.title || 'YouTube video';
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;
  iframe.loading = 'lazy';
  frame.replaceChildren(iframe);
});

// Eager-preload thumb from YT na hover (ułatwia rozpoznanie video).
// Robimy to JS-em zamiast <img>, żeby nie odpalać 7 requestów na start.
const io = ('IntersectionObserver' in window)
  ? new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const frame = entry.target;
        const id = frame.dataset.youtubeId;
        if (!id || frame.querySelector('.thumb')) continue;
        const img = new Image();
        img.className = 'thumb';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.alt = '';
        img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
        frame.prepend(img);
        io.unobserve(frame);
      }
    }, { rootMargin: '200px' })
  : null;

if (io) {
  document.querySelectorAll('.video-frame[data-youtube-id]').forEach((f) => io.observe(f));
}
