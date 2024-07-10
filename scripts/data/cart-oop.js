function Cart(localStorageKey) {
    return {
        cartItems: undefined,
        loadCart() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
            if (!this.cartItems) {
                this.cartItems = [];
            }
        },
        saveToLocalStorage() {
            localStorage.setItem(localStorageKey,
                JSON.stringify(this.cartItems));
        },
        addToCart(productId, matchingItem) {
            document.querySelectorAll('.js-selector').forEach((selectorItem) => {
                const productIdDev = selectorItem.dataset.productId;
                if (productIdDev === productId)
                    this.logicAddToCart(productId, matchingItem, selectorItem.value);
            });
        },
        logicAddToCart(productId, matchingItem, selector) {
            if (matchingItem)
                matchingItem.quantity += Number(selector);
            else {
                this.cartItems.push({
                    productId: productId,
                    quantity: Number(selector),
                    deliveryId: '1'
                });
            }
            this.saveToLocalStorage();
        },
        removeFromCart(productId) {
            let deleteIndex;
            this.cartItems.forEach((cartItem, index) => {
                if (cartItem.productId === productId)
                    deleteIndex = index;
            });
            this.cartItems.splice(deleteIndex, 1);
            this.saveToLocalStorage();
        },
        updateCartQuantity(productId) {
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId)
                    matchingItem = cartItem;
            });
            this.addToCart(productId, matchingItem);
            return this.fullCartQuantity();
        },
        fullCartQuantity() {
            let totalCartQuantity = 0;
            this.cartItems.forEach((cartItem) => {
                totalCartQuantity += cartItem.quantity;
            });
            return totalCartQuantity;
        }
    };
}

export const cart = Cart();
export const businessCart = Cart();
cart.loadCart('cart-oop');
businessCart.loadCart('cart-business');

console.log(cart);
console.log(businessCart);
