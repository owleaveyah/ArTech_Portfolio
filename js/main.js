// Theme toggle and persistence
const THEME_STORAGE_KEY = "portfolio-theme";

function getPreferredTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

function initTheme() {
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  const themeToggleBtn = document.getElementById("theme-toggle");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const nextTheme = isLight ? "dark" : "light";
      applyTheme(nextTheme);
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    });
  }

  // React to OS-level theme changes if user has not explicitly chosen
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? "light" : "dark");
      }
    });
  }
}

function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (!menuToggle || !navMenu) return;

  function toggleMenu(open) {
    const shouldOpen = open !== undefined ? open : !navMenu.classList.contains("is-active");
    navMenu.classList.toggle("is-active", shouldOpen);
    menuToggle.setAttribute("aria-expanded", String(shouldOpen));
  }

  menuToggle.addEventListener("click", () => {
    toggleMenu();
  });

  // Close menu when clicking on any navigation link
  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggleMenu(false);
    });
  });

  // Close menu when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("is-active")) {
      toggleMenu(false);
      menuToggle.focus();
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      navMenu.classList.contains("is-active") &&
      !navMenu.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      toggleMenu(false);
    }
  });

  // Auto close if viewport resized back to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navMenu.classList.contains("is-active")) {
      toggleMenu(false);
    }
  });
}

// Automatically set the current year in the footer and init theme
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileMenu();

  const currentYearSpan = document.getElementById("current-year");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
