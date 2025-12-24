// js/carrito.js

// Clave para localStorage
const CART_KEY = 'champions_cart';

// Obtener carrito actual
function getCart() {
    const cartElement = localStorage.getItem(CART_KEY);
    return cartElement ? JSON.parse(cartElement) : [];
}

// Guardar carrito
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartIcon();
}

// Agregar producto
function addToCart(product) {
    let cart = getCart();
    const existingIndex = cart.findIndex(item => item.id == product.id);

    if (existingIndex > -1) {
        // Si ya existe, aumentar cantidad
        cart[existingIndex].cantidad += 1;
    } else {
        // Si no existe, agregar con cantidad 1
        product.cantidad = 1;
        cart.push(product);
    }

    saveCart(cart);
    alert('Producto agregado al carrito exitosamente');
}

// Eliminar producto
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id != productId);
    saveCart(cart);
    renderCartPage(); // Si estamos en la página del carrito
}

// Actualizar cantidad
function updateQuantity(productId, change) {
    let cart = getCart();
    const index = cart.findIndex(item => item.id == productId);

    if (index > -1) {
        cart[index].cantidad += change;
        if (cart[index].cantidad <= 0) {
            cart.splice(index, 1);
        }
    }

    saveCart(cart);
    renderCartPage();
}

// Actualizar el contador del icono del carrito (si existe)
function updateCartIcon() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', updateCartIcon);
