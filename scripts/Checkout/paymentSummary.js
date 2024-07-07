import {cart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js'
import {getDeliveryOption} from '../../data/deliveryOption.js';
import price from '../utils/price.js';

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
            <div>Items (3):</div>
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

          <button class="place-order-button button-primary">
            Place your order
          </button>`;
}