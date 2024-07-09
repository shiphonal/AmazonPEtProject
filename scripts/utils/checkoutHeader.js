import {fullCartQuantity} from "../data/cart.js";

export function checkoutHeader() {
    document.querySelector('.Checkout-header-middle-section').innerHTML =
        `Checkout (<a class="return-to-home-link" href="amazon.html">${fullCartQuantity()} items</a>)`;
}

export function checkoutPayment() {
    document.querySelector('.js-quantity-items')
        .innerHTML = `Items (${fullCartQuantity()}):`;
}