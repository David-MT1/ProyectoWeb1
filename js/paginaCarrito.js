// js/paginaCarrito.js

function renderCartPage() {
    const cart = getCart(); // Función global de carrito.js
    const container = document.getElementById('cart-content');

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <h2>Tu carrito está vacío</h2>
                <p>¡Explora nuestra tienda y añade tus productos favoritos!</p>
                <a href="productos.html" class="btn-checkout" style="text-decoration:none; display:inline-block; margin-top:20px;">Ir a la Tienda</a>
            </div>
        `;
        updateCartIcon(); // Asegurar que el icono muestre 0
        return;
    }

    let html = `
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
    `;

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.precio * item.cantidad;
        total += itemTotal;

        html += `
            <tr>
                <td>
                    <div style="display:flex; align-items:center; gap:15px;">
                        <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-img">
                        <div>
                            <strong>${item.nombre}</strong><br>
                            <span style="color:#777; font-size:0.9rem;">${item.marca}</span>
                        </div>
                    </div>
                </td>
                <td>S/ ${item.precio.toFixed(2)}</td>
                <td>
                    <button onclick="updateQuantity(${item.id}, -1)" style="padding:2px 8px; cursor:pointer;">-</button>
                    <span style="margin:0 10px;">${item.cantidad}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" style="padding:2px 8px; cursor:pointer;">+</button>
                </td>
                <td>S/ ${itemTotal.toFixed(2)}</td>
                <td>
                    <button class="btn-remove" onclick="removeFromCart(${item.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>

        <div class="cart-summary">
            <h3>Total a Pagar: <span class="total-price">S/ ${total.toFixed(2)}</span></h3>
            <button class="btn-checkout" onclick="alert('¡Gracias por tu compra! (Funcionalidad de pago pendiente)')">Proceder al Pago</button>
            <button class="btn-remove" onclick="clearCart()" style="background:#555; margin-left:10px;">Vaciar Carrito</button>
        </div>
    `;

    container.innerHTML = html;
    updateCartIcon();
}

function clearCart() {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
        localStorage.removeItem(CART_KEY);
        renderCartPage();
    }
}

// Inicializar renderizado
document.addEventListener('DOMContentLoaded', renderCartPage);
