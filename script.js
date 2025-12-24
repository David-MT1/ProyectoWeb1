// Desarrollador B - Lógica del proyecto
// Colaborador: Percy Molina
// Proyecto: Tienda Online

console.log("Sistema de tienda iniciado");

// Lista básica de productos
let productos = [
    "Laptop - $500",
    "Mouse - $20", 
    "Teclado - $35"
];

// Carrito simple
let carrito = [];

// Función para mostrar productos
function mostrarProductos() {
    console.log("Productos disponibles:");
    productos.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto}`);
    });
}

// Función para agregar al carrito
function agregarAlCarrito(item) {
    carrito.push(item);
    console.log(`Agregado: ${item}`);
}

// Función para ver carrito
function verCarrito() {
    if (carrito.length === 0) {
        console.log("Carrito vacío");
    } else {
        console.log("Tu carrito:");
        carrito.forEach(item => console.log(`- ${item}`));
    }
}

// Pruebas básicas
mostrarProductos();
agregarAlCarrito("Laptop - $500");
verCarrito();













const menuBtn = document.getElementById('mobile-menu');
const nav = document.getElementById('navegacion');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuBtn.classList.toggle('open');
});

// Cerrar al hacer clic en un enlace (opcional)
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuBtn.classList.remove('open');
    });
});