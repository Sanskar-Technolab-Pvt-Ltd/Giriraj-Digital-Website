

document.querySelectorAll('[data-dropdown-toggle]').forEach(trigger => {

  const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
  if (!isDesktop) return;


  const dropdownId = trigger.dataset.dropdownToggle;
  const dropdown = document.getElementById(dropdownId);

  if (!dropdown) return;

  const links = dropdown.querySelectorAll('.menu-link');
  const blocks = dropdown.querySelectorAll('.content-block');
  const defaultId = dropdown.dataset.default;

  const ACTIVE_CLASSES = ['border-[#0d6efd]!', 'bg-[#D9D9D933]'];

  function resetActive() {
    links.forEach(link => {
      link.classList.remove(...ACTIVE_CLASSES);
    });
    blocks.forEach(block => block.classList.add('hidden'));
  }

  function activate(link) {
    resetActive();
    link.classList.add(...ACTIVE_CLASSES);
    document.getElementById(link.dataset.target)?.classList.remove('hidden');
  }

  // \ DEFAULT active when dropdown opens
  trigger.addEventListener('mouseenter', () => {
    const defaultLink = dropdown.querySelector(
      `.menu-link[data-target="${defaultId}"]`
    );
    if (defaultLink) activate(defaultLink);
  });

  // Hover switching
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      activate(link);
    });
  });
});

// ===============================
// ELEMENTS
// ===============================
const mobileMenuBtn = document.querySelector('[data-collapse-toggle="navbar-cta"]');
const mobileMenu = document.getElementById('navbar-cta');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');

let isMenuOpen = false;
let ignoreNextOutside = false;

// ===============================
// BODY SCROLL LOCK
// ===============================
function lockBodyScroll(lock) {
  document.body.style.overflow = lock ? 'hidden' : '';
}

// ===============================
// OPEN / CLOSE MENU (NO TOGGLE INSIDE)
// ===============================
function openMobileMenu() {
  mobileMenu.classList.remove('hidden');
  iconOpen.classList.add('hidden');
  iconClose.classList.remove('hidden');
  mobileMenuBtn.setAttribute('aria-expanded', 'true');
  lockBodyScroll(true);
  isMenuOpen = true;
}

function closeMobileMenu() {
  mobileMenu.classList.add('hidden');
  iconOpen.classList.remove('hidden');
  iconClose.classList.add('hidden');
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
  lockBodyScroll(false);

  closeAll();
  clearActiveButtons();

  isMenuOpen = false;
}

// ===============================
// HAMBURGER CLICK (ONLY TOGGLE PLACE)
// ===============================
mobileMenuBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  ignoreNextOutside = true;

  if (isMenuOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }

  // allow outside click again AFTER this tick
  setTimeout(() => {
    ignoreNextOutside = false;
  }, 0);
});

// ===============================
// OUTSIDE CLICK (POINTERDOWN – VERY IMPORTANT)
// ===============================
// document.addEventListener('pointerdown', (e) => {
//   if (window.innerWidth >= 1024) return;
//   if (!isMenuOpen) return;
//   if (ignoreNextOutside) return;

//   if (
//     mobileMenu.contains(e.target) ||
//     e.target.closest('[data-collapse-toggle="navbar-cta"]')
//   ) return;

//   closeMobileMenu();
// });


// ===============================
// UTILITIES
// ===============================
function closeAll(except = null) {
  document.querySelectorAll('.mobile-dropdown').forEach(el => {
    if (el !== except) el.classList.add('hidden');
  });

  document.querySelectorAll('.inner-dropdown').forEach(el => {
    el.classList.add('hidden');
  });

  document.querySelectorAll('.mobile-arrow').forEach(arrow => {
    arrow.classList.remove('rotate-180');
  });
}

function clearActiveButtons(scope = document) {
  scope
    .querySelectorAll('.active-dropdown')
    .forEach(btn => btn.classList.remove('active-dropdown'));
}

// ===============================
// LEVEL 1 — TOP DROPDOWNS
// ===============================
function setupTopLevel(buttonId, dropdownId, arrowId) {
  const btn = document.getElementById(buttonId);
  const dropdown = document.getElementById(dropdownId);
  const arrow = document.getElementById(arrowId);

  if (!btn || !dropdown || !arrow) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isOpen = !dropdown.classList.contains('hidden');

    // Reset everything first
    closeAll();
    clearActiveButtons();

    if (isOpen) return;

    // Open current
    dropdown.classList.remove('hidden');
    arrow.classList.add('rotate-180');
    btn.classList.add('active-dropdown');
  });
}

// ===============================
// LEVEL 2 — INNER DROPDOWNS
// ===============================
function setupInner(buttonId, dropdownId, arrowId, parentId) {
  const btn = document.getElementById(buttonId);
  const dropdown = document.getElementById(dropdownId);
  const arrow = document.getElementById(arrowId);
  const parent = document.getElementById(parentId);

  if (!btn || !dropdown || !arrow || !parent) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isOpen = !dropdown.classList.contains('hidden');

    // Close siblings
    parent.querySelectorAll('.inner-dropdown').forEach(d => {
      if (d !== dropdown) d.classList.add('hidden');
    });

    parent.querySelectorAll('.mobile-arrow').forEach(a => {
      if (a !== arrow) a.classList.remove('rotate-180');
    });

    clearActiveButtons(parent);

    if (isOpen) {
      dropdown.classList.add('hidden');
      arrow.classList.remove('rotate-180');
      btn.classList.remove('active-dropdown');
    } else {
      dropdown.classList.remove('hidden');
      arrow.classList.add('rotate-180');
      btn.classList.add('active-dropdown');
    }
  });
}

// ===============================
// INIT — TOP LEVEL
// ===============================
setupTopLevel('mobileWhoBtn', 'who-we-are-mobile', 'who-arrow');
setupTopLevel('mobileWhatBtn', 'what-we-do-mobile', 'what-arrow');
setupTopLevel('mobileResourceBtn', 'resources-mobile', 'resources-arrow');

// ===============================
// INIT — INNER LEVEL
// ===============================
setupInner(
  'industries-served-area',
  'industries-served-mobile',
  'industries-arrow',
  'what-we-do-mobile'
);

setupInner(
  'services-served',
  'services-served-mobile',
  'services-arrow',
  'what-we-do-mobile'
);

setupInner(
  'technology-partnership-area',
  'technology-partnership-mobile',
  'technology-partnership-arrow',
  'what-we-do-mobile'
);

setupInner(
  'case-study-area',
  'case-study-mobile',
  'case-study-arrow',
  'resources-mobile'
);


const navbar = document.getElementById("navbar-main");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navbar.classList.add("shadow-md");
  } else {
    navbar.classList.remove("shadow-md");
  }
});
