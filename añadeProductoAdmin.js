const form = document.getElementById('form-producto');
const mensaje = document.getElementById('mensaje');

form.onsubmit = (e) => {
    e.preventDefault();

    const nuevoProducto = {
        id: Date.now(), 
        nombre: document.getElementById('nombre').value,
        precio: parseFloat(document.getElementById('precio').value),
        descripcion: document.getElementById('descripcion').value, // Captura la descripción
        imagen: document.getElementById('imagen').value,
        genero: document.getElementById('genero').value,
        categoria: document.getElementById('categoria').value,
        deporte: document.getElementById('deporte').value,
        marca: document.getElementById('marca').value
    };

    // Guardar en el almacenamiento del navegador
    let productosLocales = JSON.parse(localStorage.getItem('misProductos')) || [];
    productosLocales.push(nuevoProducto);
    localStorage.setItem('misProductos', JSON.stringify(productosLocales));

    mensaje.innerText = "¡Producto añadido con éxito!";
    form.reset();

    setTimeout(() => {
        window.location.href = 'productos.html';
    }, 2000);
};