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

    // Enviar al Backend
    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoProducto)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                mensaje.innerText = "¡Producto añadido a la Base de Datos!";
                mensaje.style.color = "green";
                form.reset();
                setTimeout(() => {
                    // Opcional: Redirigir o limpiar
                    // window.location.href = 'productos.html';
                }, 2000);
            } else {
                mensaje.innerText = "Error: " + data.message;
                mensaje.style.color = "red";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            mensaje.innerText = "Error al conectar con el servidor.";
            mensaje.style.color = "red";
        });


};