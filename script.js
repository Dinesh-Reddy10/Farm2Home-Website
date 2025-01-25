let cart = [];

function browseProducts() {
    window.location.href = "#products";
}

function addToCart(productName, price) {
    const product = { name: productName, price: price, quantity: 1 };

    const existingProductIndex = cart.findIndex(item => item.name === productName);
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    updateCartCount();
    alert(productName + " has been added to your cart!");
    saveCart();
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartCount();
    }
}

document.addEventListener('DOMContentLoaded', loadCart);


