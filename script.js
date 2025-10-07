// Authentication state management
class AuthManager {
    constructor() {
        this.currentUser = this.loadUser();
        this.updateAuthUI();
    }

    loadUser() {
        return JSON.parse(localStorage.getItem('farm2home_current_user'));
    }

    saveUser(user) {
        localStorage.setItem('farm2home_current_user', JSON.stringify(user));
        this.currentUser = user;
        this.updateAuthUI();
    }

    logout() {
        localStorage.removeItem('farm2home_current_user');
        this.currentUser = null;
        this.updateAuthUI();
        window.location.href = 'index.html';
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    isFarmer() {
        return this.currentUser && this.currentUser.type === 'farmer';
    }

    updateAuthUI() {
        const loginButtons = document.querySelectorAll('.signup');
        const userGreetings = document.querySelectorAll('.user-greeting');
        
        if (this.isLoggedIn()) {
            // Show user info and logout button
            loginButtons.forEach(button => {
                button.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <span style="color: white; font-weight: bold;">
                            Hello, ${this.currentUser.firstName}!
                        </span>
                        <button onclick="authManager.logout()" class="logout-btn">Logout</button>
                    </div>
                `;
            });

            // Update user greetings
            userGreetings.forEach(greeting => {
                if (greeting) {
                    greeting.textContent = `Hello, ${this.currentUser.firstName}!`;
                }
            });
        } else {
            // Show login button
            loginButtons.forEach(button => {
                button.innerHTML = '<a href="login.html"><button>Login/Signup</button></a>';
            });
        }
    }
}

// Initialize auth manager
window.authManager = new AuthManager();

// Product search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-container button');
    const productItems = document.querySelectorAll('.product-item');

    if (!searchInput) return;

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        productItems.forEach(item => {
            const productName = item.querySelector('h3').textContent.toLowerCase();
            if (searchTerm === '' || productName.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });

        // Clear search when input is emptied
        searchInput.addEventListener('input', (e) => {
            if (e.target.value === '') performSearch();
        });
    }
}

// Smooth scrolling for navigation
function initializeSmoothScroll() {
    const productsLink = document.querySelector('a[href="#products"]');
    if (productsLink) {
        productsLink.addEventListener('click', (e) => {
            e.preventDefault();
            const productsSection = document.getElementById('products');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeSmoothScroll();
    
    // Update cart count on page load
    if (window.cartManager) {
        window.cartManager.updateCartCount();
    }

    // Update auth UI
    if (window.authManager) {
        window.authManager.updateAuthUI();
    }
});

// Listen for cart updates to refresh the count
window.addEventListener('cartUpdated', function() {
    if (window.cartManager) {
        window.cartManager.updateCartCount();
    }
});
