class ShoppingCart {
    constructor() {
        this.items = [];
        this.cartModal = document.querySelector('.cart-modal');
        this.cartItems = document.querySelector('.cart-items');
        this.cartTotal = document.querySelector('.cart-total');
        this.cartCount = document.querySelector('.cart-count');
        this.initEventListeners();
    }

    initEventListeners() {
        document.querySelector('.cart-icon').addEventListener('click', () => this.openCart());
        document.querySelector('.close-cart').addEventListener('click', () => this.closeCart());
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => this.addToCart(e.target.closest('.product-card')));
        });

        document.querySelector('.checkout-btn').addEventListener('click', () => this.checkout());
    }

    addToCart(productCard) {
        const product = {
            name: productCard.querySelector('h3').textContent,
            price: parseFloat(productCard.querySelector('.price').textContent.replace('₱', '')),
            image: productCard.querySelector('img').src
        };
        this.items.push(product);
        this.updateCart();
    }

    updateCart() {
        this.cartItems.innerHTML = '';

        this.items.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <p>${item.name}</p>
                    <p>₱${item.price.toFixed(2)}</p>
                    <button onclick="cart.removeItem(${index})">Remove</button>
                </div>
            `;
            this.cartItems.appendChild(cartItemElement);
        });
        const total = this.items.reduce((sum, item) => sum + item.price, 0);
        this.cartTotal.textContent = total.toFixed(2);
        this.cartCount.textContent = this.items.length;
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.updateCart();
    }

    openCart() {
        this.cartModal.style.display = 'block';
    }

    closeCart() {
        this.cartModal.style.display = 'none';
    }

    checkout() {
        alert('Thank you for your purchase!');
        this.items = [];
        this.updateCart();
        this.closeCart();
    }
}

class ProductDetails {
    constructor() {
        this.modal = document.querySelector('.product-details-modal');
        this.modalContent = document.querySelector('.product-details-container');
        this.initEventListeners();
    }

    initEventListeners() {
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', (e) => this.showDetails(e.target.closest('.product-card')));
        });

        document.querySelector('.close-details').addEventListener('click', () => this.closeModal());
    }

    showDetails(productCard) {
        const name = productCard.querySelector('h3').textContent;
        const price = productCard.querySelector('.price').textContent;
        const image = productCard.querySelector('img').src;
        const stars = productCard.querySelector('.stars').innerHTML;
        const description = productCard.querySelector('.product-description') ? 
                            productCard.querySelector('.product-description').innerHTML : 
                            'No description available';

        this.modalContent.innerHTML = `
            <img src="${image}" alt="${name}">
            <div class="product-info">
                <h2>${name}</h2>
                <div class="stars">${stars}</div>
                <p class="price">${price}</p>
                <div class="product-full-description">
                    ${description}
                </div>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;

        this.modalContent.querySelector('.add-to-cart').addEventListener('click', () => {
            cart.addToCart(productCard);
            this.closeModal();
        });

        this.modal.style.display = 'block';
    }

    closeModal() {
        this.modal.style.display = 'none';
    }
}

class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.initEventListeners();
    }

    initEventListeners() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const answer = item.querySelector('.faq-answer');
                const icon = question.querySelector('i');
                
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                } else {
                    answer.style.display = 'block';
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
            });
        });
    }
}

class ProductGenerator {
    constructor() {
        this.productGrid = document.querySelector('#products .product-grid');
        this.generateProducts();
    }

    generateProducts() {
        const products = [
            { 
                name: "F&S Achilles <br> 100 ml", 
                price: 2100, 
                image: "achilles.webp",
                description: "A powerful and masculine fragrance inspired by the legendary Greek hero. Features notes of bergamot, leather, and warm spices with a long-lasting amber base."
            },
            { 
                name: "F&S Amethyste <br> 50 ml", 
                price: 2150, 
                image: "amethyste.webp",
                description: "An elegant and mystical perfume with rich purple florals and crystal-inspired clarity. Contains notes of violet, iris, and amethyst accord with a powdery vanilla drydown."
            },
            { 
                name: "Feralde Berlin <br> 50 ml", 
                price: 1300, 
                image: "berlin.webp",
                description: "A contemporary urban fragrance capturing the essence of Berlin's vibrant streets. Blends citrus and aromatic notes with woody undertones and a hint of metallic accord."
            },
            { 
                name: "Feralde Supremacy <br> 50 ml", 
                price: 1299, 
                image: "supremacy.webp",
                description: "A prestigious and commanding scent designed for those who demand excellence. Features black pepper, rich oud, and aged cognac notes with a smoky vanilla base."
            },
            { 
                name: "Feralde Chivalry <br> 50 ml", 
                price: 1250, 
                image: "chivalry.webp",
                description: "A noble and gallant fragrance inspired by medieval knights. Combines fresh lavender, aromatic herbs, and leather notes with a warm ambery base."
            },
            { 
                name: "Replica <br> By the Fireplace <br> 50 ml", 
                price: 1573, 
                image: "by-the-fireplace.webp",
                description: "A warm and comforting scent that recreates the feeling of sitting by a crackling fireplace. Features clove, chestnut, and vanilla notes with a smoky wood base."
            },
            { 
                name: "Replica <br>Wicked Love <br> 50 ml", 
                price: 755, 
                image: "wicked-love.webp",
                description: "A seductive and passionate fragrance that captures forbidden romance. Combines dark berries, heady florals, and spicy elements with a musky amber foundation."
            },
            { 
                name: "Replica <br>Coffee Break <br> 50 ml", 
                price: 498, 
                image: "coffee-break.webp",
                description: "A cozy and inviting scent reminiscent of a moment of pause in a busy day. Features rich coffee, sweet milk, and subtle spices with a comforting vanilla base."
            },
            { 
                name: "Replica <br>Sailing Day <br> 50 ml", 
                price: 650, 
                image: "sailingday.webp",
                description: "A fresh and aquatic fragrance that captures the essence of a day at sea. Combines marine notes, salty air, and citrus with a clean ambergris drydown."
            },
            { 
                name: "Replica <br>Matcha Meditation <br> 50 ml", 
                price: 1910, 
                image: "matcha.webp",
                description: "A serene and contemplative scent inspired by the Japanese tea ceremony. Features matcha tea, aromatic herbs, and white chocolate with a calming cedar base."
            }
        ];

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <p class="price">₱${product.price.toFixed(2)}</p>
                <div class="product-description" style="display: none;">${product.description}</div>
                <p class="short-description">${product.description.substring(0, 60)}...</p>
                <button class="add-to-cart">Add to Cart</button>
                <button class="view-details">View Details</button>
            `;
            this.productGrid.appendChild(productCard);
        });
        this.updateFeaturedProducts();
    }

    updateFeaturedProducts() {
        const featuredProducts = {
            "skyfall.webp": {
                price: 1850,
                description: "A bold and refreshing fragrance that captures the essence of adventure and sophistication. Features invigorating citrus top notes with a heart of aromatic woods and a deep, masculine base."
            },
            "canella.webp": {
                price: 2050,
                description: "A warm and spicy fragrance centered around cinnamon and rich woods. Combines sweet and spicy notes with a creamy vanilla and sandalwood base for a comforting yet sophisticated scent."
            },
            "horus.webp": {
                price: 1750,
                description: "An exotic and mysterious fragrance inspired by ancient Egypt. Blends incense, saffron, and warm spices with a rich amber and papyrus base."
            },
            "italian-spirit.webp": {
                price: 1950,
                description: "A bright and vibrant fragrance capturing the essence of the Italian Mediterranean. Features zesty citrus, aromatic herbs, and sun-warmed fig with a mossy base."
            },
            "at-the-sunsets.webp": {
                price: 1675,
                description: "A romantic and dreamy fragrance that evokes peaceful coastal evenings. Combines warm amber, sea salt, and coconut with vanilla and sandalwood for a sunset-inspired experience."
            },
            "classico.webp": {
                price: 1890,
                description: "A timeless and elegant fragrance that honors traditional perfumery. Features bergamot, aromatic lavender, and precious woods with a sophisticated amber base."
            }
        };

        document.querySelectorAll('.product-card.featured').forEach(card => {
            const imageSrc = card.querySelector('img').src.split('/').pop();
            
            if (featuredProducts[imageSrc]) {
                let priceElement = card.querySelector('.price');
                if (!priceElement) {
                    priceElement = document.createElement('p');
                    priceElement.classList.add('price');
                    card.appendChild(priceElement);
                }
                priceElement.textContent = `₱${featuredProducts[imageSrc].price.toFixed(2)}`;
                let descElement = card.querySelector('.product-description');
                if (!descElement) {
                    descElement = document.createElement('div');
                    descElement.classList.add('product-description');
                    descElement.style.display = 'none';
                    card.appendChild(descElement);
                }
                descElement.textContent = featuredProducts[imageSrc].description;
                let shortDesc = card.querySelector('.short-description');
                if (!shortDesc) {
                    shortDesc = document.createElement('p');
                    shortDesc.classList.add('short-description');
                    const addToCartBtn = card.querySelector('.add-to-cart');
                    if (addToCartBtn) {
                        card.insertBefore(shortDesc, addToCartBtn);
                    } else {
                        card.appendChild(shortDesc);
                    }
                }
                shortDesc.textContent = featuredProducts[imageSrc].description.substring(0, 60) + "...";
                if (!card.querySelector('.add-to-cart')) {
                    const addToCartBtn = document.createElement('button');
                    addToCartBtn.classList.add('add-to-cart');
                    addToCartBtn.textContent = 'Add to Cart';
                    card.appendChild(addToCartBtn);
                }
                
                if (!card.querySelector('.view-details')) {
                    const viewDetailsBtn = document.createElement('button');
                    viewDetailsBtn.classList.add('view-details');
                    viewDetailsBtn.textContent = 'View Details';
                    card.appendChild(viewDetailsBtn);
                }
            }
        });
        
        document.querySelectorAll('.add-to-cart').forEach(button => {
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            newButton.addEventListener('click', (e) => {
                window.cart.addToCart(e.target.closest('.product-card'));
            });
        });
        
        document.querySelectorAll('.view-details').forEach(button => {
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            newButton.addEventListener('click', (e) => {
                window.productDetails.showDetails(e.target.closest('.product-card'));
            });
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    const navItems = document.querySelectorAll('nav ul li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });
    window.cart = new ShoppingCart();
    window.productDetails = new ProductDetails();
    const faqAccordion = new FAQAccordion();
    const productGenerator = new ProductGenerator();
});

document.addEventListener('DOMContentLoaded', function() {
    function checkAuth() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn !== 'true') {
            window.location.href = 'login.html';
        }
    }
    checkAuth();
    function setupLogout() {
        const navIcons = document.querySelector('.nav-icons');
        if (navIcons) {
            const username = localStorage.getItem('username');

            const userElement = document.createElement('span');
            userElement.className = 'user-info';
            userElement.innerHTML = `
                <span class="username-display">${username}</span>
                <span class="logout-btn"><i class="fas fa-sign-out-alt"></i></span>
            `;
            userElement.style.marginRight = '15px';
            userElement.style.display = 'flex';
            userElement.style.alignItems = 'center';
            userElement.style.cursor = 'pointer';

            const logoutBtn = userElement.querySelector('.logout-btn');
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                window.location.href = 'login.html';
            });
            
            navIcons.insertBefore(userElement, navIcons.firstChild);
            
            const usernameDisplay = userElement.querySelector('.username-display');
            usernameDisplay.style.marginRight = '10px';
        }
    }
    
    setupLogout();
});