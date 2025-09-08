// Common JavaScript functions for AGS Limited website
// Save this as: js/common.js

// Global variables
let cart = [];

// Initialize common functionality
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
});

// Cart functionality
function addToCart(productId) {
    if (typeof allProducts === 'undefined') {
        console.error('Products not loaded');
        return;
    }
    
    const product = allProducts.find(p => p.id === productId);
    if (!product) {
        showNotification('Product not found!', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartDisplay();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    updateCartSidebar();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
            updateCartSidebar();
        }
    }
}

function updateCartDisplay() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
     showPaymentSection();   
    }
    
    // Update cart sidebar if it's open
    const sidebar = document.getElementById('cartSidebar');
    if (sidebar && sidebar.classList.contains('-translate-x-0')) {
        updateCartSidebar();
    }
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    if (sidebar) {
        sidebar.classList.toggle('translate-x-full');
        sidebar.classList.toggle('-translate-x-0');
        
        if (sidebar.classList.contains('-translate-x-0')) {
            updateCartSidebar();
        }
    }
}

function updateCartSidebar() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-gray-500 text-center py-8">Your cart is empty</p>';
        cartTotal.textContent = 'Ksh 0.00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item flex items-center justify-between p-4 border-b">
            <div class="flex items-center space-x-3">
                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                <div>
                    <h4 class="font-semibold">${item.name}</h4>
                    <p class="text-sm text-gray-500">Ksh ${parseFloat(item.price).toFixed(2)} each</p>
                </div>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="updateQuantity(${item.id}, -1)" class="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center">
                    <i class="fas fa-minus text-xs"></i>
                </button>
                <span class="w-8 text-center font-semibold">${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)" class="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center">
                    <i class="fas fa-plus text-xs"></i>
                </button>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700 ml-2">
                    <i class="fas fa-trash text-sm"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    cartTotal.textContent = `Ksh ${total.toFixed(2)}`;
}

function clearCart() {
    cart = [];
    updateCartDisplay();
    showPaymentSection();
    updateCartSidebar();
    showNotification('Cart cleared!');
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const orderDetails = cart.map(item => 
        `${item.quantity}x ${item.name} - Ksh ${(parseFloat(item.price) * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    
    const message = `Hello AGS Limited Company! I'd like to place an order:

${orderDetails}

Total: Ksh ${total.toFixed(2)}



Please confirm availability and delivery details.

Thank you!`;
    
    const whatsappUrl = `https://wa.me/254714096025?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    if (notification && notificationText) {
        notificationText.textContent = message;
        notification.className = `notification ${type === 'error' ? 'bg-red-600' : 'bg-green-600'} text-white px-6 py-4 rounded-lg shadow-lg`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Utility functions
function formatPrice(price) {
    return `Ksh ${parseFloat(price).toFixed(2)}`;
}

function formatCurrency(amount) {
    return `Ksh ${parseFloat(amount).toFixed(2)}`;
}

// Mobile menu toggle (for future mobile navigation)
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Local storage helpers (for future use)
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.warn('Could not save to localStorage:', error);
    }
}

function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.warn('Could not load from localStorage:', error);
        return null;
    }
}

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return re.test(phone);
}

// Loading states
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="flex items-center justify-center py-8"><i class="fas fa-spinner fa-spin text-2xl text-green-600"></i><span class="ml-2">Loading...</span></div>';
    }
}

function hideLoading(elementId, content = '') {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = content;
    }
}