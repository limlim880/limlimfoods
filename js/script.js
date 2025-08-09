// ✅ Limlim site loaded.
console.log("✅ Limlim site loaded.");

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAV MENU TOGGLE =====
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.querySelector('nav ul.nav-links'); // use specific selector

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // ===== DARK MODE TOGGLE =====
  const darkToggle = document.getElementById('dark-toggle');
  if (darkToggle) {
    // Load saved mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }

    // Toggle on click
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const mode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', mode);
    });
  }

  // ===== STICKY HEADER ON SCROLL =====
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ===== SMOOTH SCROLL (Optional) =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
