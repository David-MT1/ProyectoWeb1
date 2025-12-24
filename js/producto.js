const urlParams = new URLSearchParams(window.location.search);
const productoId = urlParams.get('id');

// 2. Cargar los datos (JSON + LocalStorage)
async function cargarProducto() {
    // 2. Cargar los datos desde el Backend
    // Idealmente tendrías un endpoint /api/products/<id>, pero por simplicidad filtramos aquí
    const respuesta = await fetch('/api/products');
    const todosLosProductos = await respuesta.json();

    // Normalizar datos (mapear imagen_url a imagen)
    const productosNormalizados = todosLosProductos.map(p => ({
        ...p,
        imagen: p.imagen_url,
        precio: parseFloat(p.precio)
    }));

    // 3. Buscar el producto específico
    window.currentProduct = productosNormalizados.find(item => item.id == productoId);

    if (window.currentProduct) {
        const p = window.currentProduct;
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
                
                <button class="btn-comprar" onclick="handleAddToCart()">
                    AGREGAR AL CARRITO
                </button>
            </div>
        `;
    } else {
        document.getElementById('detalle-producto').innerHTML = "<h1>Producto no encontrado</h1>";
    }
}

function handleAddToCart() {
    if (window.currentProduct) {
        addToCart(window.currentProduct);
    } else {
        alert("Error: Producto no cargado correctamente");
    }
}

cargarProducto();