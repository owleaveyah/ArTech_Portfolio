/**
 * OLIVIA GALE PORTFOLIO
 * Powers Pixel Mafia-inspired flow:
 *  - Theme persistence (dark default / optional light mode)
 *  - Slide-out navigation drawer with accordion sub-menus
 *  - Auto-generated right-edge scroll marker rail + active tracking
 *  - Full-bleed Projects Showcase & Services Expertise sliders (tabs, arrows, keys, swipe)
 *  - Project case-study explore modal
 *  - Lightweight ambient particle field in the Hero panel
 */

// ==========================================================================
// DATA FOR PROJECT CASE STUDY MODAL
// ==========================================================================
const PROJECT_DETAILS = [
  {
    slug: "PROJECT 01 • 3D EDUCATIONAL GAME (CAPSTONE THESIS)",
    title: "KonTEXTO",
    description:
      "Directed visual worldbuilding and stylized cel-shaded texturing across both characters and modular classroom environments for a 3D educational game set in a Filipino public high school (Likha High) teaching document formatting—handling asset integration, collision bounds, and custom real-time lighting in Unity.",
    highlights: [
      "ROLE // Art Director & Lead Texture Artist",
      "ENVIRONMENT & TEXTURES // Modular Likha High classroom assets & stylized cel-shaded characters",
      "ENGINE PIPELINE // Asset integration, collision bounds & custom real-time lighting in Unity"
    ],
    tags: ["Blender", "Unity Engine", "Photoshop", "Art Direction", "Lead Texture Artist"],
    demoUrl: "https://kirubiisfyne.itch.io/kontexto",
    codeUrl: "#"
  },
  {
    slug: "PROJECT 02 • INTERACTIVE FARMING & EDUCATIONAL GAME (HACKATHON BUILD)",
    title: "Anii! Grow To Know",
    description:
      "Led visual direction, environment/prop aesthetics, and startup pitch/product strategy as the team's Art Director and Hustler during a rapid hackathon sprint—shaping the cozy agricultural theme, scoping an executable MVP.",
    highlights: [
      "ROLE // Art Director & Project Hustler",
      "VISUAL DIRECTION // Cozy agricultural world, props, and 2D illustrated HUD accents",
      "STRATEGY // Rapid hackathon sprint product strategy & executable MVP scoping"
    ],
    tags: ["Blender", "Unity Engine", "Adobe Photoshop", "Procreate", "Art Direction"],
    demoUrl: "https://kirubiisfyne.itch.io/anii-grow-to-know",
    codeUrl: "#"
  },
  {
    slug: "PROJECT 03 • ATMOSPHERIC RETRO-3D PSYCHOLOGICAL GAME (FINAL PROJECT)",
    title: "See.",
    description:
      "Co-developed a PS1-inspired psychological narrative game (Group See / Ukiyo) following protagonist Hiromi across surreal transitioning spaces between a fisheries college campus and a hospital ward. Designed and textured low-poly character variants (College Girl Hiromi & Hospital Patient Hiromi), modular architectural hallways, and atmospheric lighting scenes in Blender.",
    highlights: [
      "ROLE // 3D Artist, Character & Environment Texturing (Group See / Ukiyo)",
      "CHARACTERS // Low-poly College Girl Hiromi & Hospital Patient Hiromi variants",
      "ENVIRONMENTS // Modular architectural hallways, Hospital-College spaces & Blender lighting"
    ],
    tags: ["Blender", "GIMP", "Allegorithmic Substance Painter", "Character & Env Texturing"],
    demoUrl: "#",
    codeUrl: "#"
  },
  {
    slug: "PROJECT 04 • ATMOSPHERIC SCI-FI ADVENTURE (SOLO PROJECT — IN DEVELOPMENT)",
    title: "IMARA",
    description:
      "Developing an atmospheric post-deluge sci-fi adventure set in a submerged futuristic Philippine archipelago—spanning flooded vertical stilt slums (Ang Taas) and the lantern-lit canals of a sunken Binondo district. Leading end-to-end visual worldbuilding, modular architectural kit planning, hero companion drone (Datu) concepting, and real-time Lumen lighting in Unreal Engine 5.",
    highlights: [
      "ROLE // Creator, Visual Developer & 3D Environment Artist (Active Solo Vertical Slice)",
      "DISTRICTS // Flooded vertical stilt slums (Ang Taas) & lantern-lit Sunken Binondo canals",
      "PIPELINE // Modular architectural kit planning, Datu companion drone & UE5 Lumen lighting"
    ],
    tags: ["Unreal Engine 5", "Blender", "Adobe Photoshop", "Lumen Lighting"],
    demoUrl: "#",
    codeUrl: "#"
  }
];

// ==========================================================================
// 1. THEME CONTROLLER
// ==========================================================================
const THEME_STORAGE_KEY = "portfolio-theme";

function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

function initTheme() {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  applyTheme(saved === "light" ? "light" : "dark");

  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
  });
}

// ==========================================================================
// 2. SLIDE-OUT NAVIGATION DRAWER & ACCORDIONS
// ==========================================================================
function initNavigationDrawer(sliderControllers) {
  const menuToggle = document.getElementById("menu-toggle");
  const navDrawer = document.getElementById("nav-drawer");
  const drawerBackdrop = document.getElementById("drawer-backdrop");

  if (!menuToggle || !navDrawer) return;

  function openDrawer() {
    navDrawer.classList.add("open");
    navDrawer.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("overflow-hidden");
  }

  function closeDrawer() {
    navDrawer.classList.remove("open");
    navDrawer.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("overflow-hidden");
  }

  menuToggle.addEventListener("click", () => {
    if (navDrawer.classList.contains("open")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener("click", closeDrawer);
  }

  // Accordion toggles inside drawer
  navDrawer.querySelectorAll(".accordion-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      const list = btn.closest(".has-subnav")?.querySelector(".subnav-list");
      if (list) list.classList.toggle("open", !expanded);
    });
  });

  // Main drawer anchor jumps
  navDrawer.querySelectorAll(".drawer-jump").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });

  // Sub-navigation buttons jump to section AND select exact slide
  navDrawer.querySelectorAll(".sub-nav-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetSelector = btn.getAttribute("data-target-section");
      const projectIdx = btn.getAttribute("data-project-slide");
      const serviceIdx = btn.getAttribute("data-service-slide");

      if (projectIdx !== null && sliderControllers.projects) {
        sliderControllers.projects.goToSlide(parseInt(projectIdx, 10));
      }
      if (serviceIdx !== null && sliderControllers.services) {
        sliderControllers.services.goToSlide(parseInt(serviceIdx, 10));
      }

      closeDrawer();

      if (targetSelector) {
        const el = document.querySelector(targetSelector);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navDrawer.classList.contains("open")) {
      closeDrawer();
    }
  });
}

// ==========================================================================
// 3. RIGHT-EDGE SCROLL MARKER RAIL & LEFT PAGE DECORATOR SYNC
// ==========================================================================
function initScrollMarkers() {
  const rail = document.getElementById("scroll-marker-block");
  const decoratorLabel = document.getElementById("page-decorator-label");
  const anchors = Array.from(document.querySelectorAll("[anchor-name]"));

  if (!rail || anchors.length === 0) return;

  const markers = anchors.map((section, idx) => {
    const labelText = section.getAttribute("anchor-name") || `Section ${idx + 1}`;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "scroll-marker";
    btn.setAttribute("aria-label", `Jump to ${labelText}`);

    const labelSpan = document.createElement("span");
    labelSpan.className = "label";
    labelSpan.textContent = labelText;
    btn.appendChild(labelSpan);

    btn.addEventListener("click", () => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    rail.appendChild(btn);
    return { section, btn, labelText };
  });

  function updateActiveMarker() {
    const mid = window.scrollY + window.innerHeight * 0.4;
    let activeIdx = 0;

    markers.forEach((item, idx) => {
      const top = item.section.getBoundingClientRect().top + window.scrollY;
      if (top <= mid) {
        activeIdx = idx;
      }
    });

    markers.forEach((item, idx) => {
      item.btn.classList.toggle("active", idx === activeIdx);
    });

    if (decoratorLabel && markers[activeIdx]) {
      decoratorLabel.textContent = markers[activeIdx].labelText.toUpperCase();
    }
  }

  window.addEventListener("scroll", updateActiveMarker, { passive: true });
  window.addEventListener("resize", updateActiveMarker, { passive: true });
  updateActiveMarker();
}

// ==========================================================================
// 4. REUSABLE FULL-BLEED SLIDER (Projects & Services)
// ==========================================================================
function createFullBleedSlider({ deckId, tabContainerId, prevId, nextId, rootId }) {
  const deck = document.getElementById(deckId);
  const tabContainer = document.getElementById(tabContainerId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  const root = document.getElementById(rootId);

  if (!deck) return null;

  const slides = Array.from(deck.children);
  const tabs = tabContainer ? Array.from(tabContainer.querySelectorAll(".tab-item")) : [];
  let currentIndex = 0;

  function goToSlide(index) {
    if (slides.length === 0) return;
    currentIndex = (index + slides.length) % slides.length;
    deck.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, idx) => {
      const isActive = idx === currentIndex;
      slide.classList.toggle("active", isActive);
      if (isActive) {
        slide.removeAttribute("aria-hidden");
      } else {
        slide.setAttribute("aria-hidden", "true");
      }
    });

    tabs.forEach((tab, idx) => {
      const isActive = idx === currentIndex;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      if (isActive && tabContainer) {
        const scrollLeft = tab.offsetLeft - tabContainer.clientWidth * 0.2;
        tabContainer.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetIdx = parseInt(tab.getAttribute("data-slide"), 10);
      if (!Number.isNaN(targetIdx)) {
        goToSlide(targetIdx);
      }
    });
  });

  if (root) {
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToSlide(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToSlide(currentIndex + 1);
      }
    });
  }

  // Touch swipe support
  let touchStartX = 0;
  deck.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  deck.addEventListener(
    "touchend",
    (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (diff > 45) goToSlide(currentIndex - 1);
      else if (diff < -45) goToSlide(currentIndex + 1);
    },
    { passive: true }
  );

  goToSlide(0);
  return { goToSlide };
}

// ==========================================================================
// 5. PROJECT CASE-STUDY MODAL
// ==========================================================================
function initProjectModal() {
  const modal = document.getElementById("project-modal");
  const backdrop = document.getElementById("modal-backdrop");
  const closeBtn = document.getElementById("modal-close");
  const inquireBtn = document.getElementById("modal-inquire");

  const slugEl = document.getElementById("modal-slug");
  const titleEl = document.getElementById("modal-title");
  const descEl = document.getElementById("modal-description");
  const highlightsEl = document.getElementById("modal-highlights");
  const tagsEl = document.getElementById("modal-tags");
  const demoEl = document.getElementById("modal-demo");
  const codeEl = document.getElementById("modal-code");

  if (!modal) return;

  function openModal(index) {
    const item = PROJECT_DETAILS[index];
    if (!item) return;

    slugEl.textContent = item.slug;
    titleEl.textContent = item.title;
    descEl.textContent = item.description;

    highlightsEl.innerHTML = "";
    item.highlights.forEach((line) => {
      const row = document.createElement("div");
      row.className = "modal-highlight-row";
      row.textContent = line;
      highlightsEl.appendChild(row);
    });

    tagsEl.innerHTML = "";
    item.tags.forEach((tag) => {
      const span = document.createElement("span");
      span.textContent = tag;
      tagsEl.appendChild(span);
    });

    demoEl.href = item.demoUrl;
    codeEl.href = item.codeUrl;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden");
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("overflow-hidden");
  }

  document.querySelectorAll(".explore-project-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-project-index"), 10);
      openModal(Number.isNaN(idx) ? 0 : idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);
  if (inquireBtn) inquireBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
}

// ==========================================================================
// 6. LIGHTWEIGHT HERO PARTICLE CANVAS (Atmospheric Pixel Mafia Accent)
// ==========================================================================
function initHeroParticles() {
  const canvas = document.getElementById("hero-particles");
  if (!canvas) return;

  const prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let pointerX = 0;
  let pointerY = 0;
  const PARTICLE_COUNT = 56;
  const particles = [];

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function seedParticles() {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.4,
        vy: -(Math.random() * 0.25 + 0.08),
        vx: (Math.random() - 0.5) * 0.12,
        alpha: Math.random() * 0.45 + 0.15
      });
    }
  }

  window.addEventListener("mousemove", (e) => {
    pointerX = (e.clientX / window.innerWidth - 0.5) * 18;
    pointerY = (e.clientY / window.innerHeight - 0.5) * 18;
  }, { passive: true });

  window.addEventListener("resize", () => {
    resize();
    seedParticles();
  }, { passive: true });

  resize();
  seedParticles();

  function tick() {
    ctx.clearRect(0, 0, width, height);
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const rgb = isLight ? "15, 23, 42" : "217, 236, 238";

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -10) p.y = height + 10;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.fillStyle = `rgba(${rgb}, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x + pointerX * p.r * 0.4, p.y + pointerY * p.r * 0.4, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

// ==========================================================================
// 7. HERO CURSOR PARALLAX & SCROLL-TRIGGERED REVEALS
// ==========================================================================
function initHeroParallax() {
  const hero = document.getElementById("hero");
  if (!hero) return;

  const prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  hero.addEventListener(
    "mousemove",
    (e) => {
      const rect = hero.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty("--parallax-x", `${(nx * 22).toFixed(2)}px`);
      hero.style.setProperty("--parallax-y", `${(ny * 16).toFixed(2)}px`);
    },
    { passive: true }
  );

  hero.addEventListener("mouseleave", () => {
    hero.style.setProperty("--parallax-x", "0px");
    hero.style.setProperty("--parallax-y", "0px");
  });
}

function initScrollReveals() {
  const targets = document.querySelectorAll(
    ".section-heading-block, .pipeline-card, .gallery-frame, .service-band-body, .contact-card, .story-lead-col, .story-narrative-col, .about-pillar-box, .careers-content"
  );

  if (targets.length === 0) return;

  const prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  targets.forEach((el, idx) => {
    el.classList.add("reveal-ready");
    el.style.transitionDelay = `${(idx % 3) * 70}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

// ==========================================================================
// 8. FOOTER YEAR & INIT
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();

  const projectsSlider = createFullBleedSlider({
    deckId: "project-deck",
    tabContainerId: "projects-selection",
    prevId: "project-prev",
    nextId: "project-next",
    rootId: "project-slider-root"
  });

  const servicesSlider = createFullBleedSlider({
    deckId: "service-deck",
    tabContainerId: "services-selection",
    prevId: "service-prev",
    nextId: "service-next",
    rootId: "services-slider-root"
  });

  initNavigationDrawer({ projects: projectsSlider, services: servicesSlider });
  initScrollMarkers();
  initProjectModal();
  initHeroParticles();
  initHeroParallax();
  initScrollReveals();

  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
});
