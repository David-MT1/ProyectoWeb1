const urlParams = new URLSearchParams(window.location.search);
const productoId = urlParams.get('id');

// 2. Cargar los datos (JSON + LocalStorage)
async function cargarProducto() {
    const respuesta = await fetch('productos.json');
    const productosJSON = await respuesta.json();
    
    // Unir con los productos que agregaste desde el admin
    const productosAdmin = JSON.parse(localStorage.getItem('misProductos')) || [];
    const todosLosProductos = [...productosJSON, ...productosAdmin];

    // 3. Buscar el producto específico
    const p = todosLosProductos.find(item => item.id == productoId);

    if (p) {
        document.getElementById('detalle-producto').innerHTML = `
            <div class="detalle-imagen">
                <img src="${p.imagen}" alt="${p.nombre}">
            </div>
            <div class="detalle-info">
                <div class="info-header">
                    <p>${p.marca} | ${p.deporte} | ${p.genero}</p>
                    <h1>${p.nombre}</h1>
                </div>
                <p class="precio-grande">S/ ${p.precio.toFixed(2)}</p>
                <p class="descripcion-texto">${p.descripcion || "Este producto no tiene descripción aún."}</p>
                
                <button class="btn-comprar" onclick="agregarAlCarrito(${p.id})">
                    AGREGAR AL CARRITO
                </button>
            </div>
        `;
    } else {
        document.getElementById('detalle-producto').innerHTML = "<h1>Producto no encontrado</h1>";
    }
}

function agregarAlCarrito(id) {
    alert("Producto " + id + " añadido al carrito");
}

cargarProducto();