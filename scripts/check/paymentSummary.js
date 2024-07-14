import {cart} from '../data/cart.js';
import {getProduct} from '../data/products.js'
import {getDeliveryOption} from '../data/deliveryOption.js';
import price from '../utils/price.js';
import {checkoutPayment} from "../utils/checkoutHeader.js";
import {addOrder} from "../data/orders.js";

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let deliveryPriceCents = 0;
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += cartItem.quantity * product.priceCents;
        deliveryPriceCents += getDeliveryOption(cartItem.deliveryId).deliveryPrice;
    });

    const totalBeforeTaxCents = productPriceCents + deliveryPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    document.querySelector('.js-payment-summary').innerHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class = "js-quantity-items">Items (0):</div>
            <div class="payment-summary-money">$${price(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${price(deliveryPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${price(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${price(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${price(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>`;

    document.querySelector('.js-place-order').addEventListener('click', async() => {
        // GET request - что-то взять с сайта
        // POST request - что-то создать на сайте
        // DELETE request - что-то удалить с сайта
        // PUT request - что-то обновить в сайте
        try {
            const response = await fetch('https://supersimplebackend.dev/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cart: cart
                })
            });

            const order = await response.json();
            addOrder(order);
        } catch (error) {
            console.log('Unexpected error');
        }
        window.location.href = 'orders.html';
    });

    checkoutPayment();
}