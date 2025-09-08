// Products JavaScript for AGS Limited website
// Save this as: js/products.js

// WhatsApp Multi-Number Management System for Products
class ProductWhatsAppSystem {
    constructor() {
        this.whatsappNumbers = [
            { 
                number: '254759591200', 
                display: '0759 591 200', 
                name: 'Sales Team 1',
                status: 'online'
            },
            { 
                number: '254706828718', 
                display: '0706 828 718', 
                name: 'Sales Team 2',
                status: 'online'
            },
            { 
                number: '254115054834', 
                display: '0115 054 834', 
                name: 'Customer Service',
                status: 'away'
            },
            { 
                number: '254706624403', 
                display: '0706 624 403', 
                name: 'Support Team',
                status: 'online'
            }
        ];
        this.currentIndex = 0;
    }

    getNextAvailableNumber() {
        // Find next online number, or fallback to any number
        for (let i = 0; i < this.whatsappNumbers.length; i++) {
            this.currentIndex = (this.currentIndex + 1) % this.whatsappNumbers.length;
            if (this.whatsappNumbers[this.currentIndex].status === 'online') {
                return this.whatsappNumbers[this.currentIndex];
            }
        }
        // If no online numbers, return first number
        return this.whatsappNumbers[0];
    }

    sendProductInquiry(product, selectedNumberIndex = null) {
        let selectedNumber;
        
        if (selectedNumberIndex !== null && selectedNumberIndex >= 0 && selectedNumberIndex < this.whatsappNumbers.length) {
            selectedNumber = this.whatsappNumbers[selectedNumberIndex];
        } else {
            selectedNumber = this.getNextAvailableNumber();
        }
        
        const message = `Hello AGS Limited Company! I'm interested in:

🛍️ Product: ${product.name}
💰 Price: Ksh ${parseFloat(product.price).toFixed(2)}
📦 Available Stock: ${product.stock} units
📂 Category: ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}

Please provide more information about availability and delivery options.

Thank you!`;
        
        const whatsappUrl = `https://wa.me/${selectedNumber.number}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        if (typeof showNotification !== 'undefined') {
            showNotification(`Inquiry sent to ${selectedNumber.name} (${selectedNumber.display})`);
        }
        return selectedNumber;
    }

    createProductWhatsAppSelector(product) {
        const onlineNumbers = this.whatsappNumbers.filter(num => num.status === 'online');
        const awayNumbers = this.whatsappNumbers.filter(num => num.status === 'away');
        
        return `
            <div class="whatsapp-product-selector bg-white p-4 rounded-lg shadow-lg mb-4">
                <h3 class="text-lg font-bold text-gray-800 mb-3">📱 Contact Us About This Product</h3>
                
                <div class="product-summary mb-4 p-3 bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-3">
                        <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-cover rounded-lg">
                        <div>
                            <h4 class="font-semibold text-gray-800">${product.name}</h4>
                            <p class="text-green-600 font-bold">Ksh ${parseFloat(product.price).toFixed(2)}</p>
                            <p class="text-sm text-gray-600">${product.stock} units available</p>
                        </div>
                    </div>
                </div>
                
                <div class="auto-send mb-4">
                    <button id="send-auto-product-whatsapp" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                        🚀 Send to Next Available Agent
                    </button>
                </div>
                
                <div class="divider text-center text-gray-500 mb-4">OR Choose Specific Agent:</div>
                
                ${onlineNumbers.length > 0 ? `
                    <div class="online-agents mb-3">
                        <h4 class="text-sm font-semibold text-green-600 mb-2">🟢 Online Now</h4>
                        <div class="grid gap-2">
                            ${onlineNumbers.map((agent) => {
                                const actualIndex = this.whatsappNumbers.findIndex(num => num.number === agent.number);
                                return `
                                    <div class="agent-option flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                                        <div class="agent-info">
                                            <div class="font-semibold text-gray-800">${agent.name}</div>
                                            <div class="text-sm text-gray-600">${agent.display}</div>
                                        </div>
                                        <button onclick="sendProductToSpecificAgent(${actualIndex})" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                                            Contact
                                        </button>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${awayNumbers.length > 0 ? `
                    <div class="away-agents">
                        <h4 class="text-sm font-semibold text-yellow-600 mb-2">🟡 Currently Away</h4>
                        <div class="grid gap-2">
                            ${awayNumbers.map((agent) => {
                                const actualIndex = this.whatsappNumbers.findIndex(num => num.number === agent.number);
                                return `
                                    <div class="agent-option flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <div class="agent-info">
                                            <div class="font-semibold text-gray-800">${agent.name}</div>
                                            <div class="text-sm text-gray-600">${agent.display}</div>
                                        </div>
                                        <button onclick="sendProductToSpecificAgent(${actualIndex})" class="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                                            Contact
                                        </button>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    updateAgentStatus(index, status) {
        if (index >= 0 && index < this.whatsappNumbers.length) {
            this.whatsappNumbers[index].status = status;
        }
    }
}

// Initialize Product WhatsApp system
const productWhatsAppSystem = new ProductWhatsAppSystem();

// Product Database
const allProducts = [
    // Fruits
    { id: 1, name: 'Red Apples', category: 'fruits', price: 199, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&w=400', stock: 50 },
    { id: 2, name: 'Green Apples', category: 'fruits', price: 189, image: 'https://images.unsplash.com/photo-1619546813926-a78fa372cd2?ixlib=rb-4.0.3&w=400', stock: 45 },
    { id: 3, name: 'Bananas', category: 'fruits', price: 79, image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&w=400', stock: 100 },
    { id: 4, name: 'Oranges', category: 'fruits', price: 249, image: 'https://images.unsplash.com/photo-1547514701-42782101795e?ixlib=rb-4.0.3&w=400', stock: 60 },
    { id: 5, name: 'Strawberries', category: 'fruits', price: 399, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&w=400', stock: 30 },
    { id: 6, name: 'Blueberries', category: 'fruits', price: 499, image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-4.0.3&w=400', stock: 25 },
    { id: 7, name: 'Grapes', category: 'fruits', price: 299, image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?ixlib=rb-4.0.3&w=400', stock: 40 },
    { id: 8, name: 'Pineapple', category: 'fruits', price: 449, image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&w=400', stock: 20 },
    { id: 9, name: 'Watermelon', category: 'fruits', price: 599, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&w=400', stock: 15 },
    { id: 10, name: 'Mangoes', category: 'fruits', price: 179, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&w=400', stock: 35 },
    
    // More fruits
    { id: 11, name: 'Peaches', category: 'fruits', price: 229, image: 'https://images.unsplash.com/photo-1629828815544-ce4d2d2c4f82?ixlib=rb-4.0.3&w=400', stock: 28 },
    { id: 12, name: 'Pears', category: 'fruits', price: 219, image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&w=400', stock: 32 },
    { id: 13, name: 'Plums', category: 'fruits', price: 279, image: 'https://images.unsplash.com/photo-1574328296379-68edd8cb2b0c?ixlib=rb-4.0.3&w=400', stock: 24 },
    { id: 14, name: 'Cherries', category: 'fruits', price: 549, image: 'https://images.unsplash.com/photo-1551205850-eeaa32e6b287?ixlib=rb-4.0.3&w=400', stock: 18 },
    { id: 15, name: 'Kiwi', category: 'fruits', price: 329, image: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?ixlib=rb-4.0.3&w=400', stock: 22 },
    { id: 16, name: 'Avocado', category: 'fruits', price: 149, image: 'https://images.unsplash.com/photo-1549424403-97c54fba7c87?ixlib=rb-4.0.3&w=400', stock: 33 },
    { id: 17, name: 'Lemons', category: 'fruits', price: 89, image: 'https://images.unsplash.com/photo-1590502593747-42a4501fba2a?ixlib=rb-4.0.3&w=400', stock: 42 },
    { id: 18, name: 'Limes', category: 'fruits', price: 79, image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-4.0.3&w=400', stock: 38 },
    { id: 19, name: 'Grapefruit', category: 'fruits', price: 199, image: 'https://images.unsplash.com/photo-1571835782488-312b0cea57c9?ixlib=rb-4.0.3&w=400', stock: 29 },
    { id: 20, name: 'Coconut', category: 'fruits', price: 299, image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-4.0.3&w=400', stock: 16 },

    // Vegetables
    { id: 31, name: 'Tomatoes', category: 'vegetables', price: 249, image: 'https://images.unsplash.com/photo-1546470427-227e7b2ced4b?ixlib=rb-4.0.3&w=400', stock: 55 },
    { id: 32, name: 'Carrots', category: 'vegetables', price: 129, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&w=400', stock: 48 },
    { id: 33, name: 'Broccoli', category: 'vegetables', price: 279, image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-4.0.3&w=400', stock: 36 },
    { id: 34, name: 'Cauliflower', category: 'vegetables', price: 349, image: 'https://images.unsplash.com/photo-1510627498534-cf7e9002faeb?ixlib=rb-4.0.3&w=400', stock: 24 },
    { id: 35, name: 'Spinach', category: 'vegetables', price: 299, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&w=400', stock: 42 },
    { id: 36, name: 'Lettuce', category: 'vegetables', price: 179, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-4.0.3&w=400', stock: 38 },
    { id: 37, name: 'Cucumber', category: 'vegetables', price: 149, image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?ixlib=rb-4.0.3&w=400', stock: 52 },
    { id: 38, name: 'Bell Peppers', category: 'vegetables', price: 329, image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&w=400', stock: 41 },
    { id: 39, name: 'Onions', category: 'vegetables', price: 199, image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?ixlib=rb-4.0.3&w=400', stock: 65 },
    { id: 40, name: 'Garlic', category: 'vegetables', price: 499, image: 'https://images.unsplash.com/photo-1553725439-3266c7356ad4?ixlib=rb-4.0.3&w=400', stock: 28 },
    { id: 41, name: 'Potatoes', category: 'vegetables', price: 199, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&w=400', stock: 75 },
    { id: 42, name: 'Sweet Potatoes', category: 'vegetables', price: 249, image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?ixlib=rb-4.0.3&w=400', stock: 34 },
    { id: 43, name: 'Zucchini', category: 'vegetables', price: 219, image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?ixlib=rb-4.0.3&w=400', stock: 29 },
    { id: 44, name: 'Eggplant', category: 'vegetables', price: 289, image: 'https://images.unsplash.com/photo-1659261200833-ec8761558af7?ixlib=rb-4.0.3&w=400', stock: 22 },
    { id: 45, name: 'Mushrooms', category: 'vegetables', price: 399, image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&w=400', stock: 18 },
    { id: 46, name: 'Green Beans', category: 'vegetables', price: 299, image: 'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?ixlib=rb-4.0.3&w=400', stock: 33 },
    { id: 47, name: 'Corn', category: 'vegetables', price: 199, image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&w=400', stock: 45 },
    { id: 48, name: 'Celery', category: 'vegetables', price: 229, image: 'https://images.unsplash.com/photo-1590978061461-a2f1295aab79?ixlib=rb-4.0.3&w=400', stock: 31 },
    { id: 49, name: 'Cabbage', category: 'vegetables', price: 189, image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?ixlib=rb-4.0.3&w=400', stock: 39 },
    { id: 50, name: 'Kale', category: 'vegetables', price: 299, image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?ixlib=rb-4.0.3&w=400', stock: 26 },

    // Herbs
    { id: 61, name: 'Basil', category: 'herbs', price: 299, image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf488d?ixlib=rb-4.0.3&w=400', stock: 45 },
    { id: 62, name: 'Parsley', category: 'herbs', price: 199, image: 'https://images.unsplash.com/photo-1553671214-62e7b5bd1d8a?ixlib=rb-4.0.3&w=400', stock: 52 },
    { id: 63, name: 'Cilantro', category: 'herbs', price: 189, image: 'https://images.unsplash.com/photo-1586611198363-ae7e1d2e5b56?ixlib=rb-4.0.3&w=400', stock: 48 },
    { id: 64, name: 'Rosemary', category: 'herbs', price: 349, image: 'https://images.unsplash.com/photo-1594297317929-e2e4e6bfcd61?ixlib=rb-4.0.3&w=400', stock: 23 },
    { id: 65, name: 'Thyme', category: 'herbs', price: 329, image: 'https://images.unsplash.com/photo-1593115057322-e94b77572f20?ixlib=rb-4.0.3&w=400', stock: 27 },
    { id: 66, name: 'Oregano', category: 'herbs', price: 279, image: 'https://images.unsplash.com/photo-1592568281295-fd2c1b6d9e27?ixlib=rb-4.0.3&w=400', stock: 31 },
    { id: 67, name: 'Sage', category: 'herbs', price: 399, image: 'https://images.unsplash.com/photo-1555898597-84e87b07b1c5?ixlib=rb-4.0.3&w=400', stock: 19 },
    { id: 68, name: 'Mint', category: 'herbs', price: 249, image: 'https://images.unsplash.com/photo-1617893972871-8fbb5cf34c84?ixlib=rb-4.0.3&w=400', stock: 35 },
    { id: 69, name: 'Dill', category: 'herbs', price: 289, image: 'https://images.unsplash.com/photo-1616969829950-26ce98d02e08?ixlib=rb-4.0.3&w=400', stock: 29 },
    { id: 70, name: 'Chives', category: 'herbs', price: 299, image: 'https://images.unsplash.com/photo-1559843501-4b49c94ccecb?ixlib=rb-4.0.3&w=400', stock: 33 },

    // Exotic fruits
    { id: 76, name: 'Dragon Fruit', category: 'exotic', price: 699, image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-4.0.3&w=400', stock: 12 },
    { id: 77, name: 'Passion Fruit', category: 'exotic', price: 479, image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-4.0.3&w=400', stock: 14 },
    { id: 78, name: 'Lychee', category: 'exotic', price: 549, image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-4.0.3&w=400', stock: 13 },
    { id: 79, name: 'Star Fruit', category: 'exotic', price: 499, image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-4.0.3&w=400', stock: 15 },
    { id: 80, name: 'Durian', category: 'exotic', price: 1299, image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-4.0.3&w=400', stock: 5 },
    { id: 81, name: 'Jackfruit', category: 'exotic', price: 899, image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-4.0.3&w=400', stock: 8 },
    { id: 82, name: 'Guava', category: 'exotic', price: 349, image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-4.0.3&w=400', stock: 24 },
    { id: 83, name: 'Papaya', category: 'exotic', price: 289, image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-4.0.3&w=400', stock: 26 },
    { id: 84, name: 'Custard Apple', category: 'exotic', price: 799, image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-4.0.3&w=400', stock: 12 },
    { id: 85, name: 'Rambutan', category: 'exotic', price: 799, image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-4.0.3&w=400', stock: 8 }
];

// Product display variables
let currentFilter = 'all';
let displayedProducts = 0;

// WhatsApp functions for products
function showProductWhatsAppSelector(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    // Store the product globally for later use
    window.currentProduct = product;
    
    // Create modal or show selector
    const existingModal = document.getElementById('product-whatsapp-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'product-whatsapp-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-md w-full max-h-96 overflow-y-auto">
            <div class="p-4">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold">Contact About Product</h2>
                    <button onclick="closeProductWhatsAppModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                </div>
                ${productWhatsAppSystem.createProductWhatsAppSelector(product)}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listener for auto-send button
    document.getElementById('send-auto-product-whatsapp').addEventListener('click', function() {
        productWhatsAppSystem.sendProductInquiry(window.currentProduct);
        closeProductWhatsAppModal();
    });
}

function sendProductToSpecificAgent(agentIndex) {
    if (window.currentProduct) {
        productWhatsAppSystem.sendProductInquiry(window.currentProduct, agentIndex);
        closeProductWhatsAppModal();
    }
}

function closeProductWhatsAppModal() {
    const modal = document.getElementById('product-whatsapp-modal');
    if (modal) {
        modal.remove();
    }
    window.currentProduct = null;
}

// Product loading and display functions
function loadProducts(filter = 'all', limit = 24) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    if (displayedProducts === 0) {
        grid.innerHTML = '';
    }
    
    let filteredProducts = filter === 'all' ? allProducts : allProducts.filter(p => p.category === filter);
    let productsToShow = filteredProducts.slice(displayedProducts, displayedProducts + limit);
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        grid.appendChild(productCard);
    });
    
    displayedProducts += productsToShow.length;
    
    // Hide/show load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        if (displayedProducts >= filteredProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300';
    card.innerHTML = `
        <div class="relative overflow-hidden h-48">
            <img src="${product.image}" alt="${product.name}" class="product-image w-full h-full object-cover">
            <div class="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                <i class="far fa-heart text-gray-400 hover:text-red-500 cursor-pointer" onclick="toggleFavorite(this, ${product.id})"></i>
            </div>
            <div class="absolute top-3 left-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </div>
            ${product.stock < 10 ? '<div class="absolute bottom-3 left-3 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Low Stock</div>' : ''}
        </div>
        <div class="p-4">
            <h3 class="font-bold text-lg mb-2">${product.name}</h3>
            <p class="text-gray-600 text-sm mb-3">Stock: ${product.stock} units</p>
            <div class="flex justify-between items-center mb-3">
                <div>
                    <span class="text-green-600 font-bold text-xl">Ksh ${parseFloat(product.price).toFixed(2)}</span>
                    <span class="text-gray-500 text-sm">/unit</span>
                </div>
            </div>
            <div class="flex space-x-2">
                <button onclick="addToCart(${product.id})" class="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all transform hover:scale-105">
                    <i class="fas fa-cart-plus mr-1"></i> Add to Cart
                </button>
                <button onclick="showProductWhatsAppSelector(${product.id})" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all">
                    <i class="fab fa-whatsapp mr-1"></i> Ask
                </button>
            </div>
        </div>
    `;
    return card;
}

function filterProducts(category) {
    currentFilter = category;
    displayedProducts = 0;
    loadProducts(category);
}

function toggleFavorite(element, productId) {
    element.classList.toggle('far');
    element.classList.toggle('fas');
    element.classList.toggle('text-red-500');
    
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        if (element.classList.contains('fas')) {
            if (typeof showNotification !== 'undefined') {
                showNotification(`${product.name} added to favorites!`);
            }
        } else {
            if (typeof showNotification !== 'undefined') {
                showNotification(`${product.name} removed from favorites!`);
            }
        }
    }
}

// Get products by category
function getProductsByCategory(category) {
    return allProducts.filter(product => product.category === category);
}

// Get product by ID
function getProductById(id) {
    return allProducts.find(product => product.id === id);
}

// Search products
function searchProducts(query) {
    return allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
}

// Sort products
function sortProducts(products, sortBy = 'name', order = 'asc') {
    return [...products].sort((a, b) => {
        let comparison = 0;
        
        switch (sortBy) {
            case 'name':
                comparison = a.name.localeCompare(b.name);
                break;
            case 'price':
                comparison = parseFloat(a.price) - parseFloat(b.price);
                break;
            case 'stock':
                comparison = a.stock - b.stock;
                break;
            case 'category':
                comparison = a.category.localeCompare(b.category);
                break;
            default:
                comparison = 0;
        }
        
        return order === 'desc' ? -comparison : comparison;
    });
}

// Get random products
function getRandomProducts(count = 6) {
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Get featured products (high stock, good price)
function getFeaturedProducts(count = 8) {
    const featured = allProducts
        .filter(product => product.stock > 20 && parseFloat(product.price) < 500)
        .sort((a, b) => b.stock - a.stock);
    return featured.slice(0, count);
}

// Get low stock products
function getLowStockProducts(threshold = 15) {
    return allProducts.filter(product => product.stock <= threshold);
}

// Get products by price range
function getProductsByPriceRange(min = 0, max = 99999) {
    return allProducts.filter(product => {
        const price = parseFloat(product.price);
        return price >= min && price <= max;
    });
}

// Update product stock (for admin)
function updateProductStock(productId, newStock) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        product.stock = parseInt(newStock);
        return true;
    }
    return false;
}

// Update product price (for admin)
function updateProductPrice(productId, newPrice) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        product.price = parseFloat(newPrice);
        return true;
    }
    return false;
}

// Add new product (for admin)
function addNewProduct(productData) {
    const newId = Math.max(...allProducts.map(p => p.id)) + 1;
    const newProduct = {
        id: newId,
        name: productData.name,
        category: productData.category,
        price: parseFloat(productData.price),
        image: productData.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&w=400',
        stock: parseInt(productData.stock) || 0
    };
    
    allProducts.unshift(newProduct);
    return newProduct;
}

// Delete product (for admin)
function deleteProduct(productId) {
    const index = allProducts.findIndex(p => p.id === productId);
    if (index > -1) {
        const deletedProduct = allProducts.splice(index, 1)[0];
        return deletedProduct;
    }
    return null;
}

// Get category statistics
function getCategoryStats() {
    const stats = {};
    const categories = ['fruits', 'vegetables', 'herbs', 'exotic'];
    
    categories.forEach(category => {
        const categoryProducts = allProducts.filter(p => p.category === category);
        stats[category] = {
            count: categoryProducts.length,
            totalStock: categoryProducts.reduce((sum, p) => sum + p.stock, 0),
            averagePrice: (categoryProducts.reduce((sum, p) => sum + parseFloat(p.price), 0) / categoryProducts.length).toFixed(2),
            lowStockCount: categoryProducts.filter(p => p.stock <= 15).length
        };
    });
    
    return stats;
}

// Initialize products based on URL parameters
function initializeProductsFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    
    if (filterParam && ['fruits', 'vegetables', 'herbs', 'exotic'].includes(filterParam)) {
        currentFilter = filterParam;
        
        // Update active filter button if it exists
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.className = 'filter-btn bg-white text-gray-700 px-6 py-2 rounded-full border hover:bg-gray-100 transition-all';
        });
        
        const activeButton = Array.from(filterButtons).find(btn => 
            btn.textContent.toLowerCase().includes(filterParam)
        );
        if (activeButton) {
            activeButton.className = 'filter-btn active bg-green-600 text-white px-6 py-2 rounded-full transition-all';
        }
    }
    
    loadProducts(currentFilter);
}

// Product validation
function validateProduct(productData) {
    const errors = [];
    
    if (!productData.name || productData.name.trim().length < 2) {
        errors.push('Product name must be at least 2 characters long');
    }
    
    if (!productData.category || !['fruits', 'vegetables', 'herbs', 'exotic'].includes(productData.category)) {
        errors.push('Please select a valid category');
    }
    
    if (!productData.price || parseFloat(productData.price) <= 0) {
        errors.push('Price must be greater than 0');
    }
    
    if (productData.stock !== undefined && parseInt(productData.stock) < 0) {
        errors.push('Stock cannot be negative');
    }
    
    return errors;
}

// Format product for display
function formatProductForDisplay(product) {
    return {
        ...product,
        formattedPrice: `Ksh ${parseFloat(product.price).toFixed(2)}`,
        categoryDisplay: product.category.charAt(0).toUpperCase() + product.category.slice(1),
        stockStatus: product.stock > 20 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock',
        stockClass: product.stock > 20 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
    };
}

// Utility functions
function formatPrice(price) {
    return `Ksh ${parseFloat(price).toFixed(2)}`;
}

function formatCurrency(amount) {
    return `Ksh ${parseFloat(amount).toFixed(2)}`;
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        allProducts,
        loadProducts,
        createProductCard,
        filterProducts,
        getProductsByCategory,
        getProductById,
        searchProducts,
        sortProducts,
        getRandomProducts,
        getFeaturedProducts,
        getLowStockProducts,
        getProductsByPriceRange,
        updateProductStock,
        updateProductPrice,
        addNewProduct,
        deleteProduct,
        getCategoryStats,
        validateProduct,
        formatProductForDisplay,
        formatPrice,
        formatCurrency,
        productWhatsAppSystem,
        showProductWhatsAppSelector,
        sendProductToSpecificAgent,
        closeProductWhatsAppModal
    };
}
// function copyTillNumber() { /* copy the function from above */ }
// function updateOrderTotal(amount) { /* copy the function from above */ }