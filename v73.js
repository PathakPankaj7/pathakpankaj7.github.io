(() => {
  const logoItems = [
    { href: 'https://www.cam.ac.uk/', src: 'cambridge.png', alt: 'University of Cambridge' },
    { href: 'https://www.phy.cam.ac.uk/', src: 'cavendish.png', alt: 'Cavendish Laboratory' },
    { href: 'https://www.trin.cam.ac.uk/', src: 'trinity.png', alt: 'Trinity College Cambridge' },
    { href: 'https://home.iitd.ac.in/', src: 'iitd.png', alt: 'IIT Delhi' }
  ];

  const pageBackgrounds = {"research": ["var(--campus-photo-1)"], "publications": ["var(--campus-photo-2)"], "talks": ["var(--campus-photo-6)"], "career": ["var(--campus-photo-3)"], "awards": ["var(--campus-photo-5)"], "contact": ["var(--campus-photo-7)"]};

  const driftClasses = ['drift-a', 'drift-b', 'drift-c', 'drift-d'];
  let timer = null;
  let activeView = '';
  let activeImages = [];
  let imageIndex = 0;
  let slotIndex = 0;

  function ensureDock() {
    const bioColumn = document.querySelector('.hero#home .bio-column') || document.querySelector('.hero#home .bio-flow > :last-child');
    if (!bioColumn || bioColumn.querySelector('.institution-dock')) return;
    const dock = document.createElement('div');
    dock.className = 'institution-dock';
    logoItems.forEach(item => {
      const a = document.createElement('a');
      a.href = item.href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', item.alt);
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt;
      a.appendChild(img);
      dock.appendChild(a);
    });
    const bioText = bioColumn.querySelector('.bio-text');
    if (bioText && bioText.nextSibling) {
      bioColumn.insertBefore(dock, bioText.nextSibling);
    } else {
      bioColumn.appendChild(dock);
    }
  }

  function refreshPortrait() {
    const portrait = document.querySelector('.hero#home .portrait');
    if (portrait) {
      portrait.src = 'portrait-color.webp';
      portrait.alt = 'Portrait of Dr. Pankaj Pathak';
      portrait.loading = 'eager';
      portrait.decoding = 'async';
    }
  }

  function ensureChapterShell() {
    const chapter = document.querySelector('.chapter');
    if (!chapter) return null;
    let slides = chapter.querySelector('.chapter-slides');
    if (!slides) {
      slides = document.createElement('div');
      slides.className = 'chapter-slides';
      for (let i = 0; i < 4; i += 1) {
        const slide = document.createElement('div');
        slide.className = 'chapter-slide';
        slides.appendChild(slide);
      }
      chapter.prepend(slides);
      const glass = document.createElement('div');
      glass.className = 'chapter-glass';
      chapter.appendChild(glass);
      const vignette = document.createElement('div');
      vignette.className = 'chapter-vignette';
      chapter.appendChild(vignette);
    }
    return chapter;
  }

  function applySlide(slide, src, driftClass, active) {
    slide.style.backgroundImage = src.startsWith("var(") ? src : `url("${src}")`;
    slide.className = `chapter-slide ${driftClass}${active ? ' active' : ''}`;
  }

  function stopTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function startSlideshow(chapter) {
    const slideEls = [...chapter.querySelectorAll('.chapter-slide')];
    if (!slideEls.length || !activeImages.length) return;

    slideEls.forEach((slide, idx) => {
      slide.className = 'chapter-slide';
      slide.style.backgroundImage = 'none';
      slide.classList.remove('active');
      if (idx < Math.min(activeImages.length, slideEls.length)) {
        applySlide(slide, activeImages[(imageIndex + idx) % activeImages.length], driftClasses[(imageIndex + idx) % driftClasses.length], idx === 0);
      }
    });
    slotIndex = 0;

    stopTimer();
    if (activeImages.length === 1) return;
    timer = setInterval(() => {
      if (document.hidden || !document.body.classList.contains('inner-view')) return;
      imageIndex = (imageIndex + 1) % activeImages.length;
      const current = slideEls[slotIndex];
      if (current) current.classList.remove('active');
      slotIndex = (slotIndex + 1) % slideEls.length;
      const next = slideEls[slotIndex];
      applySlide(next, activeImages[imageIndex], driftClasses[imageIndex % driftClasses.length], true);
    }, 6200);
  }

  function syncChapterBackground() {
    const view = document.body.dataset.view || (location.hash || '#home').replace('#', '') || 'home';
    if (!document.body.classList.contains('inner-view') || view === 'home') {
      activeView = view;
      stopTimer();
      return;
    }
    const chapter = ensureChapterShell();
    if (!chapter) return;
    if (activeView === view) return;
    activeView = view;
    activeImages = pageBackgrounds[view] || pageBackgrounds.research;
    imageIndex = 0;
    startSlideshow(chapter);
  }

  function init() {
    refreshPortrait();
    ensureDock();
    syncChapterBackground();

    const body = document.body;
    if (body) {
      const observer = new MutationObserver(syncChapterBackground);
      observer.observe(body, { attributes: true, attributeFilter: ['class', 'data-view'] });
    }

    window.addEventListener('hashchange', () => {
      setTimeout(syncChapterBackground, 30);
    });
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) syncChapterBackground();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
