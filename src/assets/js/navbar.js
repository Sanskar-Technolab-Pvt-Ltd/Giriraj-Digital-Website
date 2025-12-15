const btn = document.querySelector('[data-collapse-toggle="navbar-cta"]');
const openIcon = document.getElementById('icon-open');
const closeIcon = document.getElementById('icon-close');

// initial state
openIcon.classList.remove('hidden');
closeIcon.classList.add('hidden');

btn.addEventListener('click', () => {
  // wait for Flowbite to update aria-expanded
  requestAnimationFrame(() => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      openIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    } else {
      closeIcon.classList.add('hidden');
      openIcon.classList.remove('hidden');
    }
  });
});
