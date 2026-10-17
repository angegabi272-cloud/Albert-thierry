/* ============================================================
   CONFIGURATION
   ============================================================ */
const CONFIG = {
  WHATSAPP_NUMBER: '237654951111',
  PHONE_NUMBER:    '+237654951111',
  EMAIL:           'mobilevisiostudio9@gmail.com',
  CATALOG_URL:     'https://wa.me/c/134450176340090',
  SOCIAL: {
    facebook:  'https://www.facebook.com/profile.php?id=61573500957220&_rdc=1&_rdr#',
    instagram: 'https://www.instagram.com/didier20520?rpxt=MTkxMGgydnFzZzBjYw%3D%3D&utm_source=qr',
    tiktok:    'https://www.tiktok.com/@mobile_visio_studio?_r=1&_t=ZS-9AZHKYDSZDV',
    youtube:   'https://youtube.com/@mobilevisiostudio?si=zm5m8zNMxrbRYyCu'
  },

  /* PHOTOS DU HÉRO — PNG détourés (fond transparent), affichées en alternance.
     Ajoutez vos fichiers dans le dossier img/ puis listez-les ici, ex. :
     HERO_PHOTOS: ['img/albert-thierry-hero.png', 'img/photo-2.png', 'img/photo-3.png'] */
  HERO_PHOTOS: ['img/albert-thierry-hero.png'],
  HERO_INTERVAL: 5000,            // durée d'affichage de chaque photo (ms) = 5 secondes

  /* CERTIFICATS — la section « Mes certificats » apparaît dès qu'il y a au moins une entrée.
     Déposez les images (JPG/PNG/WebP) dans img/certificats/ puis ajoutez, ex. :
     { title: 'Titre du certificat', issuer: 'Organisme', year: '2024', image: 'img/certificats/mon-certificat.jpg' } */
  CERTIFICATES: []
};

const DEFAULT_MSG = "Bonjour Albert, je viens de ton portfolio et j'aimerais discuter d'un projet.";
function waUrl(msg){
  return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg || DEFAULT_MSG)}`;
}

(function(){
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* LOADER */
  document.body.classList.add('is-loading');
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) loader.classList.add('done');
      document.body.classList.remove('is-loading');
    }, 1500);
  });

  /* PROGRESS BAR */
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = (scrollTop / docHeight) * 100 + '%';
  }, { passive: true });

  /* ANNÉE */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* LIENS */
  const waFloat = document.getElementById('waFloat');
  if (waFloat) waFloat.href = waUrl();

  ['catalogBtn', 'catalogBtnHero', 'catalogTop', 'catalogBtnReal'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = CONFIG.CATALOG_URL;
  });

  const contactPhone = document.getElementById('contactPhone');
  if (contactPhone) contactPhone.href = `tel:${CONFIG.PHONE_NUMBER}`;

  const contactWhatsapp = document.getElementById('contactWhatsapp');
  if (contactWhatsapp) contactWhatsapp.href = waUrl();

  document.querySelectorAll('.social-icon').forEach(link => {
    const key = link.dataset.social;
    if (key && CONFIG.SOCIAL[key]) link.href = CONFIG.SOCIAL[key];
  });

  /* PARTENAIRES → WhatsApp */
  document.querySelectorAll('.partner').forEach(p => {
    const name = p.dataset.partner;
    p.href = waUrl(`Bonjour Albert, je vous contacte suite à votre collaboration avec ${name}. J'aimerais discuter d'un projet.`);
    p.target = '_blank';
    p.rel = 'noopener';
  });

  /* MARQUEE INFINI */
  const marqueeInner = document.querySelector('.partners-marquee .marquee-inner');
  if (marqueeInner) {
    // Duplique les logos DANS la piste pour une boucle continue (translateX -50%)
    Array.from(marqueeInner.children).forEach(item => {
      const copy = item.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      copy.tabIndex = -1;
      marqueeInner.appendChild(copy);
    });
  }

  /* NAV SCROLLED + BURGER */
  const nav = document.getElementById('nav');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      burger.classList.toggle('open', open);
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
    }));
  }

  /* NAV ACTIVE */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  /* SMOOTH SCROLL */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* REVEAL */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* SKILLS */
  const skillIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        skillIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.skill').forEach(s => skillIO.observe(s));

  /* COMPTEURS */
  const counters = document.querySelectorAll('.stat-num');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      if (reduce) { el.textContent = target + suffix; counterIO.unobserve(el); return; }
      const dur = 1800;
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.floor(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(step);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterIO.observe(c));

  /* FILTRES */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const realCards = document.querySelectorAll('.real-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      realCards.forEach(card => {
        const show = f === 'all' || card.dataset.cat === f;
        if (show) {
          card.style.display = '';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = '';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(.95)';
          setTimeout(() => { card.style.display = 'none'; }, 250);
        }
      });
    });
  });

  /* ==========================================
     GALERIES INLINE (dans les cartes)
     ========================================== */
  document.querySelectorAll('.real-media[data-gallery]').forEach(media => {
    const track = media.querySelector('.real-gallery-track');
    const images = track.querySelectorAll('img');
    const counterCur = media.querySelector('.real-gallery-counter .cur');
    const prevBtn = media.querySelector('.real-gallery-nav.prev');
    const nextBtn = media.querySelector('.real-gallery-nav.next');
    let index = 0;

    function goTo(i){
      index = (i + images.length) % images.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      if (counterCur) counterCur.textContent = index + 1;
    }

    if (prevBtn) prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goTo(index - 1);
    });
    if (nextBtn) nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goTo(index + 1);
    });

    // Clic sur une image → ouvre la lightbox au bon index
    images.forEach((img, i) => {
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightboxGallery(images, i);
      });
    });
  });

  /* ==========================================
     LIGHTBOX GALERIE
     ========================================== */
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCur = document.getElementById('lightboxCur');
  const lightboxTot = document.getElementById('lightboxTot');

  let currentGallery = [];
  let currentIndex = 0;

  function openLightboxGallery(images, startIndex){
    currentGallery = Array.from(images).map(img => ({
      src: img.src,
      alt: img.alt
    }));
    currentIndex = startIndex;
    renderLightbox();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function openLightboxVideo(videoEl){
    const src = videoEl.querySelector('source')?.src || '';
    const poster = videoEl.getAttribute('poster') || '';
    lightboxContent.innerHTML = `<video controls autoplay playsinline poster="${poster}"><source src="${src}" type="video/mp4"></video>`;
    lightboxCur.parentElement.style.display = 'none';
    lightboxPrev.style.display = 'none';
    lightboxNext.style.display = 'none';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function renderLightbox(){
    const item = currentGallery[currentIndex];
    lightboxContent.innerHTML = `<img src="${item.src}" alt="${item.alt}">`;
    lightboxCur.parentElement.style.display = '';
    lightboxPrev.style.display = currentGallery.length > 1 ? '' : 'none';
    lightboxNext.style.display = currentGallery.length > 1 ? '' : 'none';
    lightboxCur.textContent = currentIndex + 1;
    lightboxTot.textContent = currentGallery.length;
  }

  function closeLightbox(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    const vid = lightboxContent.querySelector('video');
    if (vid) { vid.pause(); vid.currentTime = 0; }
    lightboxContent.innerHTML = '';
    currentGallery = [];
    currentIndex = 0;
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentGallery.length) {
      currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
      renderLightbox();
    }
  });
  if (lightboxNext) lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentGallery.length) {
      currentIndex = (currentIndex + 1) % currentGallery.length;
      renderLightbox();
    }
  });
  if (lightbox) lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  /* ==========================================
     VIDÉOS : Clic sur la vidéo (hors contrôles) → lightbox
     ========================================== */
  document.querySelectorAll('.real-media[data-video] video').forEach(video => {
    video.muted = true;
    // Clic sur la vidéo elle-même (hors boutons de contrôle) → lightbox
    video.addEventListener('click', (e) => {
      // Si clic en bas de la vidéo (zone des contrôles), ne rien faire
      const rect = video.getBoundingClientRect();
      const y = e.clientY - rect.top;
      if (y > rect.height - 40) return;
      e.preventDefault();
      openLightboxVideo(video);
    });
  });

  /* ==========================================
     MODAL DÉTAILS
     ========================================== */
  const detailsModal = document.getElementById('detailsModal');
  const detailsCard = document.getElementById('detailsCard');
  const detailsClose = document.getElementById('detailsClose');

  const descriptions = {
    "Site web de ALDOL Solution": "Conception et développement d'un site vitrine moderne, responsive et optimisé pour ALDOL Solution. Design épuré, navigation fluide et référencement soigné.",
    "Site vitrine pour NAMAASSO association": "Création du site vitrine de l'association NAMAASSO (située à Paris) pour valoriser ses engagements et optimiser l'accès à ses services.",
    "Identité visuelle de Discovery Transit sarl": "Création de logo, charte graphique et déclinaisons print pour la marque Discovery Transit sarl. Une identité forte et cohérente.",
    "Identité visuelle du Département GLT de IUT de DOUALA": "Création de logo, charte graphique et déclinaisons print pour le département GLT de l'IUT de Douala.",
    "visuelle & communication digitale pour CFPAD": "Série d'affiches et flyers promotionnels pour l'établissement CFPAD. Communication visuelle percutante.",
    "visuelle de communication digitale pour le restaurant Kitchen": "Réalisation d'affiches et de flyers promotionnels pour le restaurant Kitchen situé à Ange Raphael.",
    "Spot publicitaire — KPStrategy": "Réalisation, tournage et montage d'un spot publicitaire pour KPStrategy. Un rendu professionnel et impactant.",
    "Événement IUT - visite du Recteur": "Couverture vidéo complète de la visite du Recteur de l'Université de Douala à l'IUT de Douala.",
    "Optimisation des données de KP STRATEGY": "Mise en place d'un système de gestion des données sensibles et formation de l'équipe pour KP STRATEGY."
  };

  function openDetails(card){
    const title = card.dataset.title;
    const cat = card.querySelector('.real-cat')?.textContent || 'Réalisation';
    const media = card.querySelector('.real-media');
    const img = media?.querySelector('.real-gallery-track img') || media?.querySelector('img');
    const video = media?.querySelector('video');
    const desc = descriptions[title] || "Découvrez cette réalisation et contactez-moi pour un projet similaire.";

    let mediaHTML = '';
    if (video) {
      const src = video.querySelector('source')?.src || '';
      const poster = video.getAttribute('poster') || '';
      mediaHTML = `<div class="details-media"><video controls playsinline poster="${poster}"><source src="${src}" type="video/mp4"></video></div>`;
    } else if (img) {
      mediaHTML = `<div class="details-media"><img src="${img.src}" alt="${img.alt}"></div>`;
    }

    detailsCard.innerHTML = `
      <span class="details-tag">${cat}</span>
      <h3>${title}</h3>
      ${mediaHTML}
      <p>${desc}</p>
      <div class="details-actions">
        <a href="${waUrl(`Bonjour Albert, je suis intéressé par ta réalisation "${title}". Peux-tu m'en dire plus ?`)}" target="_blank" rel="noopener" class="btn-wa">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.8-.9-2.1-1-.3-.1-.5-.15-.7.15-.2.3-.8 1-1 1.2-.2.2-.4.25-.7.1-.3-.15-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.65.1-.1.3-.4.45-.55.15-.2.2-.3.3-.5.1-.2.05-.4-.05-.55-.1-.15-.7-1.7-1-2.3-.25-.6-.5-.5-.7-.5H6.5c-.2 0-.55.1-.85.4-.3.3-1.1 1.1-1.1 2.7 0 1.6 1.15 3.15 1.3 3.35.15.2 2.25 3.45 5.45 4.85.75.3 1.35.5 1.8.65.75.25 1.45.2 2 .1.6-.1 1.85-.75 2.1-1.5.25-.7.25-1.35.2-1.5-.1-.15-.3-.2-.6-.35z"/></svg>
          Discuter sur WhatsApp
        </a>
        <button class="btn-secondary" id="detailsCloseBtn">Fermer</button>
      </div>
    `;
    const closeBtn = document.getElementById('detailsCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeDetails);

    detailsModal.classList.add('open');
    detailsModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDetails(){
    detailsModal.classList.remove('open');
    detailsModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    const vid = detailsCard.querySelector('video');
    if (vid) { vid.pause(); vid.currentTime = 0; }
  }

  if (detailsClose) detailsClose.addEventListener('click', closeDetails);
  if (detailsModal) detailsModal.addEventListener('click', (e) => {
    if (e.target === detailsModal) closeDetails();
  });

  /* Échap */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox?.classList.contains('open')) closeLightbox();
      if (detailsModal?.classList.contains('open')) closeDetails();
    }
    if (lightbox?.classList.contains('open') && currentGallery.length > 1) {
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        renderLightbox();
      }
      if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % currentGallery.length;
        renderLightbox();
      }
    }
  });

  /* Bouton détails */
  realCards.forEach(card => {
    const detailsBtn = card.querySelector('.real-details-btn');
    if (detailsBtn) {
      detailsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openDetails(card);
      });
    }
  });

  /* TÉMOIGNAGES : flèches (visibles uniquement si le contenu déborde) */
  const testiGrid = document.querySelector('.testimonials-grid');
  const testiNav  = document.getElementById('testimonialNav');
  const testiPrev = document.getElementById('testiPrev');
  const testiNext = document.getElementById('testiNext');
  if (testiGrid && testiNav && testiPrev && testiNext) {
    const refreshTesti = () => {
      testiNav.hidden = testiGrid.scrollWidth - testiGrid.clientWidth <= 4;
    };
    const slideTesti = (dir) => {
      const card = testiGrid.querySelector('.testimonial');
      const step = card ? card.getBoundingClientRect().width + 20 : testiGrid.clientWidth;
      testiGrid.scrollBy({ left: dir * step, behavior: reduce ? 'auto' : 'smooth' });
    };
    testiPrev.addEventListener('click', () => slideTesti(-1));
    testiNext.addEventListener('click', () => slideTesti(1));
    window.addEventListener('resize', refreshTesti);
    window.addEventListener('load', refreshTesti);
    refreshTesti();
  }

  /* ============================================================
     PHOTOS DU HÉRO : diaporama 3D toutes les 5 s + parallaxe souris
     ============================================================ */
  (function heroSlider(){
    const wrap = document.getElementById('heroPhotoWrap');
    const visual = document.querySelector('.hero-visual');
    if (!wrap || !visual) return;
    const first = wrap.querySelector('.hero-photo-png');
    const known = new Set(first ? [first.getAttribute('src')] : []);
    (CONFIG.HERO_PHOTOS || []).forEach(src => {
      if (!src || known.has(src)) return;
      known.add(src);
      const img = document.createElement('img');
      img.className = 'hero-photo-png';
      img.alt = 'Albert Thierry';
      img.decoding = 'async';
      img.src = src;
      wrap.insertBefore(img, wrap.querySelector('.hero-photo-fallback'));
    });

    let index = 0, timer = null, dotsBox = null;
    const slides = () => Array.from(wrap.querySelectorAll('.hero-photo-png'));

    function buildDots(){
      const list = slides();
      if (dotsBox) dotsBox.remove();
      if (list.length < 2) return;
      dotsBox = document.createElement('div');
      dotsBox.className = 'hero-photo-dots';
      list.forEach((_, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', `Photo ${i + 1}`);
        b.addEventListener('click', () => { show(i); restart(); });
        dotsBox.appendChild(b);
      });
      visual.appendChild(dotsBox);
      markDots();
    }
    function markDots(){
      if (!dotsBox) return;
      Array.from(dotsBox.children).forEach((b, i) => b.classList.toggle('on', i === index));
    }
    function show(n){
      const list = slides();
      if (!list.length) return;
      n = (n + list.length) % list.length;
      const prev = list[index];
      if (prev && n !== index){
        prev.classList.remove('active');
        prev.classList.add('leaving');
        setTimeout(() => prev.classList.remove('leaving'), 1000);
      }
      list[n].classList.add('active');
      index = n;
      markDots();
    }
    function restart(){
      clearInterval(timer);
      if (slides().length > 1){
        timer = setInterval(() => { if (!document.hidden) show(index + 1); }, CONFIG.HERO_INTERVAL || 5000);
      }
    }
    // retire les images introuvables ; bascule sur la photo de secours s'il n'en reste aucune
    function prune(){
      slides().forEach(img => {
        if (img.complete && img.naturalWidth === 0){
          const wasActive = img.classList.contains('active');
          img.remove();
          if (wasActive) index = 0;
        }
      });
      const list = slides();
      if (!list.length){ wrap.classList.add('no-png'); clearInterval(timer); if (dotsBox) dotsBox.remove(); return; }
      if (!list.some(i => i.classList.contains('active'))) list[0].classList.add('active');
      index = Math.max(0, list.findIndex(i => i.classList.contains('active')));
      buildDots(); restart();
    }
    slides().forEach(img => img.addEventListener('error', prune));
    slides().forEach(img => img.addEventListener('load', () => { buildDots(); restart(); }));
    window.addEventListener('load', prune);
    prune();

    // parallaxe 3D à la souris (écrans avec souris uniquement)
    if (!reduce && window.matchMedia('(hover:hover) and (pointer:fine)').matches){
      const zone = document.querySelector('.hero');
      zone.addEventListener('pointermove', e => {
        const r = visual.getBoundingClientRect();
        const mx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
        const my = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
        visual.style.setProperty('--mx', mx.toFixed(3));
        visual.style.setProperty('--my', my.toFixed(3));
        visual.classList.add('is-tilting');
      });
      zone.addEventListener('pointerleave', () => {
        visual.style.setProperty('--mx', 0); visual.style.setProperty('--my', 0);
        visual.classList.remove('is-tilting');
      });
    }
  })();

  /* ============================================================
     CERTIFICATS : générés depuis CONFIG.CERTIFICATES
     ============================================================ */
  (function certificates(){
    const sec  = document.getElementById('certificats');
    const grid = document.getElementById('certGrid');
    const list = Array.isArray(CONFIG.CERTIFICATES) ? CONFIG.CERTIFICATES.filter(c => c && c.image) : [];
    if (!sec || !grid || !list.length) return;
    const imgs = [];
    list.forEach((c, i) => {
      const card = document.createElement('article');
      card.className = 'cert-card reveal d' + ((i % 3) + 1);
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', 'Agrandir : ' + (c.title || 'certificat'));
      const media = document.createElement('div'); media.className = 'cert-media';
      const img = document.createElement('img');
      img.src = c.image; img.alt = c.title || 'Certificat'; img.loading = 'lazy';
      img.addEventListener('error', () => img.remove());
      media.appendChild(img); imgs.push(img);
      const body = document.createElement('div'); body.className = 'cert-body';
      const h3 = document.createElement('h3'); h3.textContent = c.title || '';
      const p = document.createElement('p'); p.textContent = [c.issuer, c.year].filter(Boolean).join(' · ');
      body.appendChild(h3); if (p.textContent) body.appendChild(p);
      card.append(media, body);
      const open = () => openLightboxGallery(imgs, i);
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); open(); } });
      grid.appendChild(card);
      io.observe(card);
    });
    sec.hidden = false;
  })();

  /* ============================================================
     INCLINAISON 3D AU SURVOL DES CARTES
     ============================================================ */
  if (!reduce && window.matchMedia('(hover:hover) and (pointer:fine)').matches){
    document.addEventListener('pointermove', e => {
      const el = e.target.closest && e.target.closest('.service-mini,.real-card,.about-info-card,.testimonial,.cert-card,.timeline-item');
      document.querySelectorAll('.tilting').forEach(t => { if (t !== el){ t.classList.remove('tilting'); t.style.removeProperty('--rx'); t.style.removeProperty('--ry'); } });
      if (!el || !el.classList.contains('visible')) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      el.classList.add('tilting');
      el.style.setProperty('--ry', (x * 14).toFixed(2) + 'deg');
      el.style.setProperty('--rx', (-y * 12).toFixed(2) + 'deg');
    }, { passive:true });
    document.addEventListener('pointerleave', () => {
      document.querySelectorAll('.tilting').forEach(t => t.classList.remove('tilting'));
    });
  }

  /* FORMULAIRE → WhatsApp */
  const contactForm = document.getElementById('contactForm');
  const contactSubmit = document.getElementById('contactSubmit');
  if (contactSubmit && contactForm) {
    contactSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      const inputs = contactForm.querySelectorAll('input, textarea');
      const name = inputs[0]?.value.trim() || '';
      const email = inputs[1]?.value.trim() || '';
      const subject = inputs[2]?.value.trim() || '';
      const message = inputs[3]?.value.trim() || '';
      if (!name || !email) {
        alert('Merci de renseigner votre nom et votre email.');
        return;
      }
      const msg = `Bonjour Albert,\n\nJe m'appelle ${name} (${email}).\n\nSujet : ${subject || 'Non précisé'}\n\nMessage : ${message || 'Pas de message'}\n\nAu plaisir d'échanger !`;
      window.open(waUrl(msg), '_blank', 'noopener');
    });
  }

})();