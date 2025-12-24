// ========================================
// FUNCIONES DEL MODAL (GLOBALES)
// ========================================

function showBrandModal(name, description) {
    console.log('showBrandModal llamada con:', name, description);
    
    const modal = document.getElementById('brandModal');
    const modalName = document.getElementById('modalBrandName');
    const modalDesc = document.getElementById('modalBrandDesc');
    
    if (!modal) {
        console.error('ERROR: No se encontró el modal con id="brandModal"');
        return;
    }
    
    if (!modalName) {
        console.error('ERROR: No se encontró el elemento con id="modalBrandName"');
        return;
    }
    
    if (!modalDesc) {
        console.error('ERROR: No se encontró el elemento con id="modalBrandDesc"');
        return;
    }
    
    // Establecer contenido
    modalName.textContent = name;
    modalDesc.textContent = description;
    
    // Mostrar modal
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    
    // Forzar animación
    setTimeout(() => {
        modal.style.opacity = "1";
    }, 10);
    
    console.log('Modal mostrado correctamente');
}

function closeBrandModal() {
    console.log('closeBrandModal llamada');
    
    const modal = document.getElementById('brandModal');
    
    if (!modal) {
        console.error('ERROR: No se encontró el modal');
        return;
    }
    
    modal.style.opacity = "0";
    
    setTimeout(() => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }, 300);
    
    console.log('Modal cerrado correctamente');
}

// ========================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('=== INICIO DE CARGA ===');
    
    // Verificar que las funciones están disponibles
    console.log('showBrandModal disponible:', typeof showBrandModal === 'function');
    console.log('closeBrandModal disponible:', typeof closeBrandModal === 'function');
    
    // ========================================
    // SELECTORES
    // ========================================
    const brandSearch = document.getElementById('brandSearch');
    const brandsGrid = document.getElementById('brandsGrid');
    const brandCards = document.querySelectorAll('.brand-card:not(.coming-soon)');
    const modal = document.getElementById('brandModal');
    const moreInfoButtons = document.querySelectorAll('.more-info-btn');
    
    console.log('Elementos encontrados:');
    console.log('- Buscador:', brandSearch ? 'SÍ' : 'NO');
    console.log('- Grid de marcas:', brandsGrid ? 'SÍ' : 'NO');
    console.log('- Total de tarjetas:', brandCards.length);
    console.log('- Modal:', modal ? 'SÍ' : 'NO');
    console.log('- Botones "Ver más":', moreInfoButtons.length);
    
    // ========================================
    // VERIFICAR ONCLICK EN BOTONES
    // ========================================
    moreInfoButtons.forEach((button, index) => {
        const onclickAttr = button.getAttribute('onclick');
        console.log(`Botón ${index + 1} onclick:`, onclickAttr);
        
        // Agregar listener adicional como respaldo
        button.addEventListener('click', function(e) {
            console.log('Click detectado en botón', index + 1);
            e.preventDefault();
            e.stopPropagation();
        });
    });
    
    // ========================================
    // BUSCADOR EN TIEMPO REAL
    // ========================================
    if (brandSearch) {
        brandSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            console.log('Buscando:', searchTerm);

            brandCards.forEach(card => {
                const brandName = card.getAttribute('data-name').toLowerCase();
                
                if (brandName.includes(searchTerm)) {
                    card.style.display = "flex";
                    card.style.animation = "fadeIn 0.4s ease forwards";
                } else {
                    card.style.display = "none";
                }
            });

            checkNoResults(searchTerm);
        });
        
        // Animaciones del buscador
        brandSearch.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 4px 12px rgba(0, 210, 255, 0.3)';
        });

        brandSearch.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
    }
    
    // ========================================
    // EVENTOS DEL MODAL
    // ========================================
    
    if (modal) {
        // Cerrar al hacer clic fuera
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeBrandModal();
            }
        });
        
        console.log('Event listener del modal configurado');
    }

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeBrandModal();
        }
    });
    
    // ========================================
    // ANIMACIÓN DE ENTRADA
    // ========================================
    brandCards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        
        setTimeout(() => {
            card.style.transition = "all 0.5s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, 100 * index);
    });
    
    // ========================================
    // EFECTOS HOVER
    // ========================================
    brandCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    moreInfoButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    console.log('=== CARGA COMPLETADA ===');
});

// ========================================
// FUNCIONES AUXILIARES
// ========================================

function checkNoResults(term) {
    const existingMsg = document.getElementById('no-results-msg');
    const cardsVisible = Array.from(document.querySelectorAll('.brand-card'))
                             .filter(c => c.style.display !== "none").length;

    if (cardsVisible === 0 && term !== "") {
        if (!existingMsg) {
            const msg = document.createElement('p');
            msg.id = 'no-results-msg';
            msg.style.cssText = `
                text-align: center;
                grid-column: 1 / -1;
                padding: 40px;
                font-size: 1.2rem;
                color: #cbd5e1;
                background: rgba(0, 210, 255, 0.05);
                border-radius: 10px;
                border: 2px dashed rgba(0, 210, 255, 0.3);
                margin: 20px 0;
            `;
            msg.textContent = `❌ No se encontraron resultados para "${term}"`;
            document.getElementById('brandsGrid').appendChild(msg);
        }
    } else if (existingMsg) {
        existingMsg.remove();
    }
}

function resetSearch() {
    const brandSearch = document.getElementById('brandSearch');
    if (brandSearch) {
        brandSearch.value = '';
        brandSearch.dispatchEvent(new Event('input'));
    }
}

// ========================================
// ESTILOS DINÁMICOS
// ========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .brand-card {
        transition: all 0.3s ease;
    }

    .modal {
        transition: opacity 0.3s ease;
        opacity: 0;
    }

    .modal[style*="display: flex"] {
        opacity: 1;
    }

    .more-info-btn {
        transition: all 0.2s ease;
        cursor: pointer;
    }
`;
document.head.appendChild(style);

console.log('Script marcas.js cargado completamente');