import {fullCartQuantity} from "../../data/cart.js";

export function checkoutHeader() {
    document.querySelector('.checkout-header-middle-section')
        .innerHTML = `Checkout (<a class="return-to-home-link"
                              href="amazon.html">${fullCartQuantity()} items</a>)`;
}
