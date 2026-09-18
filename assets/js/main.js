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

emailjs.init("nRk8GlO9iUUVwaGE-"); // La encuentras en Account > API Keys

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const btnSubmit = document.getElementById('btn-submit');
  const formStatus = document.getElementById('form-status');

  btnSubmit.disabled = true;
  btnSubmit.textContent = 'Enviando...';

  // 1. Te envía el correo a ti
  emailjs.sendForm('service_rc7r2se', 'template_ceikxmr', this)
    .then(() => {
      // 2. Envía la respuesta automática al usuario
      return emailjs.sendForm('service_rc7r2se', 'template_bmdgtx5', this);
    })
    .then(() => {
      formStatus.style.display = 'block';
      formStatus.style.backgroundColor = '#ede9fe';
      formStatus.style.color = '#6d28d9';
      formStatus.innerHTML = '¡Mensaje enviado con éxito! Se ha enviado una confirmación a tu correo.';
      this.reset();
    })
    .catch((error) => {
      formStatus.style.display = 'block';
      formStatus.style.backgroundColor = '#fef2f2';
      formStatus.style.color = '#991b1b';
      formStatus.innerHTML = 'Ocurrió un error al enviar el mensaje.';
    })
    .finally(() => {
      btnSubmit.disabled = false;
      btnSubmit.textContent = 'Enviar mensaje';
    });
});

document.querySelectorAll('.node-download-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    // Verificar si el botón está bloqueado antes de descargar
    if (this.closest('.roadmap-node-wrapper')?.classList.contains('locked')) {
      e.preventDefault();
      return;
    }

    const fileUrl = this.getAttribute('href');
    if (!fileUrl || fileUrl === 'javascript:void(0)') return;

    e.preventDefault(); // Evita cualquier redirección o navegación

    fetch(fileUrl)
      .then(response => {
        if (!response.ok) throw new Error('Error al obtener el archivo');
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // Toma el nombre del archivo de la ruta
        a.download = fileUrl.split('/').pop(); 
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      })
      .catch(err => console.error('Error en la descarga:', err));
  });
});