// WhatsApp Multi-Number Order System
class WhatsAppOrderSystem {
    constructor() {
        this.whatsappNumbers = [
            { 
                number: '254759591200', 
                display: '0759 591 200', 
                name: 'Sales Team 1',
                status: 'online' // Simulated status - you'll need to update this manually
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

    // Format order message
    formatOrderMessage(orderDetails) {
        const { productName, quantity, customerName, customerPhone, additionalInfo } = orderDetails;
        
        return `🛒 *NEW ORDER*
        
📱 Customer: ${customerName}
☎️ Phone: ${customerPhone}
🛍️ Product: ${productName}
📦 Quantity: ${quantity}
${additionalInfo ? `📝 Notes: ${additionalInfo}` : ''}

Thank you for choosing us!`;
    }

    // Get next available number (round-robin)
    getNextNumber() {
        this.currentIndex = (this.currentIndex + 1) % this.whatsappNumbers.length;
        return this.whatsappNumbers[this.currentIndex];
    }

    // Send to automatic number
    sendToAutoNumber(orderDetails) {
        const selectedNumber = this.getNextNumber();
        const message = this.formatOrderMessage(orderDetails);
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${selectedNumber.number}?text=${encodedMessage}`;
        
        window.open(whatsappURL, '_blank');
        
        // Update UI to show which number was selected
        this.showSelectedNumber(selectedNumber);
    }

    // Send to specific number
    sendToSpecificNumber(numberIndex, orderDetails) {
        if (numberIndex >= 0 && numberIndex < this.whatsappNumbers.length) {
            const selectedNumber = this.whatsappNumbers[numberIndex];
            const message = this.formatOrderMessage(orderDetails);
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${selectedNumber.number}?text=${encodedMessage}`;
            
            window.open(whatsappURL, '_blank');
            this.showSelectedNumber(selectedNumber);
        }
    }

    // Show which number was selected
    showSelectedNumber(number) {
        const statusDiv = document.getElementById('whatsapp-status');
        if (statusDiv) {
            statusDiv.innerHTML = `
                <div class="alert alert-success">
                    Order sent to: <strong>${number.name}</strong> (${number.display})
                </div>
            `;
        }
    }

    // Create the WhatsApp selection interface
    createWhatsAppInterface() {
        return `
            <div id="whatsapp-order-section" class="whatsapp-section">
                <h3>📱 Send Order via WhatsApp</h3>
                
                <!-- Auto-select option -->
                <div class="auto-option">
                    <button id="send-auto" class="btn btn-primary btn-lg">
                        🚀 Send to Next Available Agent
                    </button>
                </div>
                
                <div class="divider">OR</div>
                
                <!-- Manual selection -->
                <h4>Choose Specific Agent:</h4>
                <div class="agents-list">
                    ${this.whatsappNumbers.map((agent, index) => `
                        <div class="agent-card ${agent.status}">
                            <div class="agent-info">
                                <strong>${agent.name}</strong><br>
                                <span class="phone-number">${agent.display}</span><br>
                                <span class="status-indicator status-${agent.status}">
                                    ${agent.status === 'online' ? '🟢 Online' : '🟡 Away'}
                                </span>
                            </div>
                            <button class="btn btn-outline-success send-specific" data-index="${index}">
                                Send Order
                            </button>
                        </div>
                    `).join('')}
                </div>
                
                <div id="whatsapp-status"></div>
            </div>
        `;
    }

    // Initialize the system
    init() {
        // Add CSS styles
        this.addStyles();
        
        // Create interface
        const container = document.getElementById('whatsapp-container');
        if (container) {
            container.innerHTML = this.createWhatsAppInterface();
        }
        
        // Add event listeners
        this.attachEventListeners();
    }

    // Add event listeners
    attachEventListeners() {
        // Auto-send button
        const autoBtn = document.getElementById('send-auto');
        if (autoBtn) {
            autoBtn.addEventListener('click', () => {
                const orderDetails = this.collectOrderDetails();
                if (orderDetails) {
                    this.sendToAutoNumber(orderDetails);
                }
            });
        }

        // Specific agent buttons
        const specificBtns = document.querySelectorAll('.send-specific');
        specificBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                const orderDetails = this.collectOrderDetails();
                if (orderDetails) {
                    this.sendToSpecificNumber(index, orderDetails);
                }
            });
        });
    }

    // Collect order details from form
    collectOrderDetails() {
        // You can customize this based on your form fields
        const productName = document.getElementById('product-name')?.value || 'Product';
        const quantity = document.getElementById('quantity')?.value || '1';
        const customerName = document.getElementById('customer-name')?.value || '';
        const customerPhone = document.getElementById('customer-phone')?.value || '';
        const additionalInfo = document.getElementById('additional-info')?.value || '';

        if (!customerName || !customerPhone) {
            alert('Please fill in customer name and phone number');
            return null;
        }

        return {
            productName,
            quantity,
            customerName,
            customerPhone,
            additionalInfo
        };
    }

    // Add CSS styles
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .whatsapp-section {
                border: 2px solid #25D366;
                border-radius: 10px;
                padding: 20px;
                margin: 20px 0;
                background-color: #f8f9fa;
            }
            
            .auto-option {
                text-align: center;
                margin-bottom: 20px;
            }
            
            .btn {
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                text-decoration: none;
                display: inline-block;
            }
            
            .btn-primary {
                background-color: #25D366;
                color: white;
            }
            
            .btn-lg {
                font-size: 1.2em;
                padding: 15px 30px;
            }
            
            .btn-outline-success {
                background-color: transparent;
                color: #25D366;
                border: 2px solid #25D366;
            }
            
            .btn:hover {
                opacity: 0.9;
                transform: translateY(-2px);
            }
            
            .divider {
                text-align: center;
                margin: 20px 0;
                font-weight: bold;
                color: #666;
            }
            
            .agents-list {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 15px;
                margin-top: 15px;
            }
            
            .agent-card {
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 15px;
                background-color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .agent-card.online {
                border-left: 4px solid #28a745;
            }
            
            .agent-card.away {
                border-left: 4px solid #ffc107;
            }
            
            .agent-info {
                flex-grow: 1;
            }
            
            .phone-number {
                color: #666;
                font-family: monospace;
            }
            
            .status-indicator {
                font-size: 0.9em;
                margin-top: 5px;
                display: inline-block;
            }
            
            .status-online {
                color: #28a745;
            }
            
            .status-away {
                color: #ffc107;
            }
            
            .alert {
                padding: 15px;
                margin: 15px 0;
                border-radius: 5px;
            }
            
            .alert-success {
                background-color: #d4edda;
                border: 1px solid #c3e6cb;
                color: #155724;
            }
        `;
        document.head.appendChild(style);
    }

    // Method to manually update agent status (call this from your admin panel)
    updateAgentStatus(index, status) {
        if (index >= 0 && index < this.whatsappNumbers.length) {
            this.whatsappNumbers[index].status = status;
            // Re-render the interface
            this.init();
        }
    }
}

// Initialize the WhatsApp order system
const whatsappOrderSystem = new WhatsAppOrderSystem();

// Function to start the system (call this when your page loads)
function initWhatsAppOrders() {
    whatsappOrderSystem.init();
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WhatsAppOrderSystem;
}