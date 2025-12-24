document.addEventListener('DOMContentLoaded', () => {
    
    const brandSearch = document.getElementById('brandSearch');
    const brandCards = document.querySelectorAll('.brand-card:not(.coming-soon)');
    const modal = document.getElementById('brandModal');

    // 1. FILTRADO DINÁMICO CON ANIMACIÓN
    if (brandSearch) {
        brandSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            brandCards.forEach(card => {
                const brandName = card.querySelector('.brand-name').textContent.toLowerCase();
                
                if (brandName.includes(searchTerm)) {
                    card.style.display = 'block';
                    // Pequeña animación de entrada
                    card.style.animation = 'fadeIn 0.4s ease-out forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // 2. GESTIÓN DEL MODAL (Mejorada)
    // Definimos las funciones globalmente para que funcionen con el 'onclick' del HTML
    window.showBrandModal = (nombre, descripcion) => {
        const modalName = document.getElementById('modalBrandName');
        const modalDesc = document.getElementById('modalBrandDesc');
        
        if (modalName && modalDesc && modal) {
            modalName.textContent = nombre;
            modalDesc.textContent = descripcion;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Evita scroll al estar abierto
        }
    };

    window.closeBrandModal = () => {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Devuelve el scroll
        }
    };

    // Cerrar modal al hacer clic fuera del contenido blanco
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeBrandModal();
        }
    });

    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") closeBrandModal();
    });
});