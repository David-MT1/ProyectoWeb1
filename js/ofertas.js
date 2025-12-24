document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. LÓGICA DEL TEMPORIZADOR (Cuenta Regresiva) ===
    const countdown = () => {
        // Establecemos una fecha de fin (puedes cambiarla a tu gusto)
        const countDate = new Date("December 31, 2025 00:00:00").getTime();
        const now = new Date().getTime();
        const gap = countDate - now;

        // Cálculos de tiempo
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        // Calcular días, horas, minutos
        const textDay = Math.floor(gap / day);
        const textHour = Math.floor((gap % day) / hour);
        const textMinute = Math.floor((gap % hour) / minute);

        // Inyectar en el HTML (usamos los selectores de tus clases actuales)
        const timerNumbers = document.querySelectorAll('.temporizador-numero');
        if(timerNumbers.length >= 3) {
            timerNumbers[0].innerText = textDay < 10 ? '0' + textDay : textDay;
            timerNumbers[1].innerText = textHour < 10 ? '0' + textHour : textHour;
            timerNumbers[2].innerText = textMinute < 10 ? '0' + textMinute : textMinute;
        }
    };

    // Ejecutar cada segundo
    setInterval(countdown, 1000);

    // === 2. INTERACTIVIDAD EN LOS BOTONES DE COMPRA ===
    const buyButtons = document.querySelectorAll('.boton-comprar');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const producto = button.parentElement.querySelector('.producto-nombre').innerText;
            
            // Efecto visual rápido
            button.innerText = '¡Añadido! ✅';
            button.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                button.innerText = 'Agregar al Carrito';
                button.style.backgroundColor = ''; // Vuelve al original del CSS
            }, 2000);

            console.log(`Producto añadido: ${producto}`);
        });
    });

    // === 3. EFECTO DE HOVER EN TARJETAS DE CATEGORÍA ===
    const categoryCards = document.querySelectorAll('.tarjeta-categoria');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});