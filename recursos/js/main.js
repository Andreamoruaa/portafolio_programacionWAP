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

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const btnSubmit = document.getElementById('btn-submit');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Cambiar estado del botón mientras se envía
      btnSubmit.disabled = true;
      btnSubmit.textContent = 'Enviando...';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Mensaje de éxito en pantalla
          formStatus.style.display = 'block';
          formStatus.style.backgroundColor = '#ede9fe';
          formStatus.style.color = '#6d28d9';
          formStatus.style.border = '1px solid #c4b5fd';
          formStatus.innerHTML = '¡Gracias por tu mensaje! Lo he recibido correctamente y en breve me pondré en contacto contigo.';
          
          contactForm.reset();
        } else {
          throw new Error('Ocurrió un problema al enviar el formulario.');
        }
      } catch (error) {
        formStatus.style.display = 'block';
        formStatus.style.backgroundColor = '#fef2f2';
        formStatus.style.color = '#991b1b';
        formStatus.style.border = '1px solid #fca5a5';
        formStatus.innerHTML = 'Ocurrió un error al enviar el mensaje. Por favor intenta de nuevo.';
      } finally {
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Enviar mensaje';
      }
    });
  }
});