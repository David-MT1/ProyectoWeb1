

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. GESTIÓN DEL HEADER Y BOTÓN "VOLVER ARRIBA"
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        // Efecto dinámico en el Header
        if (window.scrollY > 50) {
            header.style.padding = "0.8rem 2rem"; // Se hace más pequeño
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
            header.style.background = "rgba(255, 255, 255, 0.98)";
        } else {
            header.style.padding = "1.2rem 2rem"; // Tamaño original
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            header.style.background = "white";
        }

        // Mostrar/Ocultar elementos con scroll (opcional)
        revealOnScroll();
    });

    // 2. EFECTO DE REVELADO PARA SECCIONES (Scroll Reveal)
    // Este efecto hace que las secciones de Categorías y Beneficios aparezcan suavemente
    function revealOnScroll() {
        // Seleccionamos las nuevas tarjetas de categoría y los ítems de beneficios
        const revealElements = document.querySelectorAll('.category-card, .feature-item');
        
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Si el elemento está a la vista
            if (elementTop < windowHeight - 100) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
                el.style.transition = "all 0.8s ease-out";
            }
        });
    }

    // Inicializar estados para el efecto de revelado
    const elementsToHide = document.querySelectorAll('.category-card, .feature-item');
    elementsToHide.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
    });

    // 3. SCROLL SUAVE PARA ENLACES INTERNOS
    // Permite que al hacer clic en las marcas la página baje suavemente
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Solo actuar si el enlace tiene un ID de destino
            if (href !== "#" && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 4. LÓGICA DE INTERACCIÓN EN CATEGORÍAS
    // Añade un efecto de escala al pasar el mouse por los botones de compra
    const shopButtons = document.querySelectorAll('.btn-shop');
    shopButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = "scale(1.1)";
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = "scale(1)";
        });
    });

    // Ejecutar revelado una vez al cargar por si el usuario ya está a mitad de página
    revealOnScroll();
});

/**
 * Función extra por si decides mantener botones de scroll 
 * o navegación dinámica en el futuro
 */
function scrollBrands(direction) {
    // Nota: Como ahora las 3 marcas ocupan toda la pantalla, 
    // esta función ya no es necesaria a menos que agregues más de 3.
    console.log("Navegación de marcas: ", direction);
}