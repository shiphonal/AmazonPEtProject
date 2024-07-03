export const cart = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
    }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
}];

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

export function removeFromCart(productId) {
    let deleteIndex;
    cart.forEach((cartItem, index) => {
        if (cartItem.productId === productId) {
            deleteIndex = index;
        }
    });
    cart.splice(deleteIndex, 1);
    return deleteIndex;
}