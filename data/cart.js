export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
    cart = [];
}

export function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, matchingItem) {
    document.querySelectorAll('.js-selector').forEach((selectorItem) => {
        const productIdDev = selectorItem.dataset.productId;
        if (productIdDev === productId) {
            if (matchingItem) {
                matchingItem.quantity += Number(selectorItem.value);
            } else {
                cart.push({
                    productId: productId,
                    quantity: Number(selectorItem.value),
                    deliveryId: '1'
                });
            }
        }
    });
    saveToLocalStorage();
}

export function updateCartQuantity(productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    addToCart(productId, matchingItem);
    return fullCartQuantity();
}

export function fullCartQuantity() {
    let totalCartQuantity = 0;
    cart.forEach((cartItem) => {
        totalCartQuantity += cartItem.quantity;
    });
    return totalCartQuantity;
}

export function removeFromCart(productId) {
    let deleteIndex;
    cart.forEach((cartItem, index) => {
        if (cartItem.productId === productId) {
            deleteIndex = index;
        }
    });
    cart.splice(deleteIndex, 1);
    saveToLocalStorage();
}