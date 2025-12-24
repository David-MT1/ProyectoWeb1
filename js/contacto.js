document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    // 1. VALIDACIÓN Y ENVÍO SIMULADO
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue

            // Obtener valores
            const nombre = document.getElementById('nombre').value;
            
            // Simular carga
            const btn = contactForm.querySelector('.btn-enviar');
            btn.innerText = "Enviando...";
            btn.disabled = true;

            setTimeout(() => {
                // Mostrar mensaje de éxito
                formStatus.innerHTML = `✅ ¡Gracias ${nombre}! Tu mensaje ha sido enviado con éxito. Nos contactaremos pronto.`;
                formStatus.className = "form-success";
                
                // Limpiar formulario
                contactForm.reset();
                btn.innerText = "Enviar Mensaje";
                btn.disabled = false;
            }, 1500);
        });
    }

    // 2. EFECTO HOVER EN ICONOS DE REDES SOCIALES
    const socialIcons = document.querySelectorAll('.social-lista li a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            icon.style.transform = 'scale(1.3) rotate(10deg)';
            icon.style.transition = 'all 0.3s ease';
        });
        icon.addEventListener('mouseout', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // 3. ACTUALIZAR MAPA (Opcional: Si quieres que el mapa sea real de Arequipa)
    const iframeMap = document.querySelector('.map-container iframe');
    if (iframeMap) {
        // Coordenadas aproximadas del centro de Arequipa (Plaza de Armas)
        iframeMap.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15303.49479383636!2d-71.5435985!3d-16.3988079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424a5647589c3f%3A0x673c6a461c28c6e2!2sPlaza%20de%20Armas%20de%20Arequipa!5e0!3m2!1ses-419!2spe!4v1700000000000!5m2!1ses-419!2spe";
    }
});