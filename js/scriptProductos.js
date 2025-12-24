let productos = [];
let filtrados = [];
let pagina = 1;
const cantidad = 9;

const cajaProductos = document.getElementById('lista-productos');
const textoPagina = document.getElementById('numero-pagina');

// Cargar productos desde el Backend
fetch('/api/products')
    .then(res => res.json())
    .then(data => {
        // Mapear los datos de la DB a la estructura que espera el frontend
        // DB: id, nombre, precio, imagen_url, ...
        // Frontend espera: id, nombre, precio, imagen ...

        productos = data.map(p => ({
            id: p.id,
            nombre: p.nombre,
            precio: parseFloat(p.precio),
            imagen: p.imagen_url || "https://via.placeholder.com/300", // Fallback image
            categoria: p.categoria,
            genero: p.genero,
            marca: p.marca,
            descripcion: p.descripcion
        }));

        filtrados = productos;
        mostrarTienda();
    })
    .catch(err => console.error("Error cargando productos:", err));

function mostrarTienda() {
    cajaProductos.innerHTML = "";

    let inicio = (pagina - 1) * cantidad;
    let fin = inicio + cantidad;
    let visibles = filtrados.slice(inicio, fin);

    visibles.forEach(p => {
        let card = `
            <div class="item" onclick="verDetalle(${p.id})" style="cursor: pointer;">
                <img src="${p.imagen}">
                <p class="nombre">${p.nombre}</p>
                <p class="precio">S/ ${p.precio.toFixed(2)}</p>
            </div>
        `;
        cajaProductos.innerHTML += card;
    });

    actualizarBotones();
}

function verDetalle(id) {
    window.location.href = `producto.html?id=${id}`;
}

document.querySelectorAll('.opcion').forEach(boton => {
    boton.onclick = (e) => {
        let categoriaFiltro = e.target.getAttribute('data-filtro');
        let valorFiltro = e.target.innerText;

        filtrados = productos.filter(p => p[categoriaFiltro] === valorFiltro);
        pagina = 1;
        mostrarTienda();
    };
});

document.getElementById('atras').onclick = () => {
    if (pagina > 1) {
        pagina--;
        mostrarTienda();
    }
};

document.getElementById('adelante').onclick = () => {
    let totalPaginas = Math.ceil(filtrados.length / cantidad);
    if (pagina < totalPaginas) {
        pagina++;
        mostrarTienda();
    }
};

document.getElementById('boton-limpiar').onclick = () => {
    filtrados = productos;
    pagina = 1;
    mostrarTienda();
};

function actualizarBotones() {
    let totalPaginas = Math.ceil(filtrados.length / cantidad);
    textoPagina.innerText = `Página ${pagina} de ${totalPaginas || 1}`;
}