document.addEventListener('DOMContentLoaded', () => {
  const sideNav = document.getElementById('sideNav');
if (sideNav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 250) {
        sideNav.classList.add('visible');
      } else {
        sideNav.classList.remove('visible');
      }
    });
  }
});