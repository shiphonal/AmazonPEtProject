export const cart = [];

export function addToCart(productId, matchingItem) {
    document.querySelectorAll('.js-selector').forEach((selectorItem) => {
        const productIdDev = selectorItem.dataset.productId;
        if (productIdDev === productId) {
            if (matchingItem) {
                matchingItem.quantity += Number(selectorItem.value);
            } else {
                cart.push({
                    productId: productId,
                    quantity: Number(selectorItem.value)
                });
            }
        }
    });
}

export function updateCartQuantity(productId) {
    let matchingItem;
    let totalCartQuantity = 0;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    addToCart(productId, matchingItem);
    cart.forEach((cartItem) => {
        totalCartQuantity += cartItem.quantity;
    });

    return totalCartQuantity;
}