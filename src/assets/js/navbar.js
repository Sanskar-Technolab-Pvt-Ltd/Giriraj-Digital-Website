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


// // Mobile dropdown: Who we are
// const whoBtn = document.getElementById('mobileWhoBtn');
// const whoDropdown = document.getElementById('who-we-are-mobile');
// const whoArrow = document.getElementById('who-arrow');

// if (whoBtn && whoDropdown) {
//   whoBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     whoDropdown.classList.toggle('hidden');
//     whoArrow?.classList.toggle('rotate-180');
//   });
// }


// // Mobile dropdown: What we do
// const whatBtn = document.getElementById('mobileWhatBtn');
// const whatDropdown = document.getElementById('what-we-do-mobile');
// const whatArrow = document.getElementById('what-arrow');

// if (whatBtn && whatDropdown) {
//   whatBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     whatDropdown.classList.toggle('hidden');
//     whatArrow?.classList.toggle('rotate-180');
//   });
// }


// // Resources dropdown: What we do
// const resourcesBtn = document.getElementById('mobileResourceBtn');
// const resourcesDropdown = document.getElementById('resources-mobile');
// const resourcesArrow = document.getElementById('resources-arrow');

// if (resourcesBtn && resourcesDropdown) {
//   resourcesBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     resourcesDropdown.classList.toggle('hidden');
//     resourcesArrow?.classList.toggle('rotate-180');
//   });
// }


// // Industry dropdown: What we do
// const industriesBtn = document.getElementById('industries-served');
// const industriesDropdown = document.getElementById('industries-served-mobile');
// const industriesArrow = document.getElementById('industries-arrow');

// if (industriesBtn && industriesDropdown) {
//   industriesBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     industriesDropdown.classList.toggle('hidden');
//     industriesArrow?.classList.toggle('rotate-180');
//   });
// }


// // Services dropdown: What we do
// const serviceBtn = document.getElementById('services-served');
// const serviceDropdown = document.getElementById('services-served-mobile');
// const serviceArrow = document.getElementById('services-arrow');

// if (serviceBtn && serviceDropdown) {
//   serviceBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     serviceDropdown.classList.toggle('hidden');
//     serviceArrow?.classList.toggle('rotate-180');
//   });
// }


// // Technology Partnership dropdown: What we do
// const techPartnerBtn = document.getElementById('technology-partnership');
// const techPartnerDropdown = document.getElementById('technology-partnership-mobile');
// const techPartnerArrow = document.getElementById('technology-partnership-arrow');

// if (techPartnerBtn && techPartnerDropdown) {
//   techPartnerBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     techPartnerDropdown.classList.toggle('hidden');
//     techPartnerArrow?.classList.toggle('rotate-180');
//   });
// }


// ===============================
// MOBILE MENU LOGIC (LEVEL-WISE)
// ===============================

// Utility helpers
function closeAll(except = null) {
  document.querySelectorAll('.mobile-dropdown').forEach(el => {
    if (el !== except) el.classList.add('hidden');
  });

  document.querySelectorAll('.mobile-arrow').forEach(arrow => {
    arrow.classList.remove('rotate-180');
  });
}


function clearActiveButtons(scope = document) {
  scope.querySelectorAll('.active-dropdown')
    .forEach(btn => btn.classList.remove('active-dropdown'));
}

// -------------------------------
// LEVEL 1 — TOP LEVEL DROPDOWNS
// -------------------------------
function setupTopLevel(buttonId, dropdownId, arrowId) {
  const btn = document.getElementById(buttonId);
  const dropdown = document.getElementById(dropdownId);
  const arrow = document.getElementById(arrowId);

  if (!btn || !dropdown) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();

    const isOpen = !dropdown.classList.contains('hidden');

    // Close all dropdowns
    closeAll();
    clearActiveButtons();

    if (!isOpen) {
      dropdown.classList.remove('hidden');
      arrow?.classList.add('rotate-180');
      btn.classList.add('active-dropdown');

      // Reset inner dropdowns
      dropdown.querySelectorAll('.inner-dropdown').forEach(d => d.classList.add('hidden'));
      dropdown.querySelectorAll('.inner-arrow').forEach(a => a.classList.remove('rotate-180'));
      clearActiveButtons(dropdown);
    }
  });
}

// -------------------------------
// LEVEL 2 — INNER DROPDOWNS
// -------------------------------
function setupInner(buttonId, dropdownId, arrowId, parentId) {
  const btn = document.getElementById(buttonId);
  const dropdown = document.getElementById(dropdownId);
  const arrow = document.getElementById(arrowId);
  const parent = document.getElementById(parentId);

  if (!btn || !dropdown || !parent) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();

    const isOpen = !dropdown.classList.contains('hidden');

    // Close sibling inner dropdowns
    parent.querySelectorAll('.inner-dropdown').forEach(d => {
      if (d !== dropdown) d.classList.add('hidden');
    });

    parent.querySelectorAll('.inner-arrow').forEach(a => {
      if (a !== arrow) a.classList.remove('rotate-180');
    });

    clearActiveButtons(parent);

    // Toggle current
    if (!isOpen) {
      dropdown.classList.remove('hidden');
      arrow?.classList.add('rotate-180');
      btn.classList.add('active-dropdown');
    } else {
      dropdown.classList.add('hidden');
      arrow?.classList.remove('rotate-180');
      btn.classList.remove('active-dropdown');
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
// INIT — INNER (WHAT WE DO)
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