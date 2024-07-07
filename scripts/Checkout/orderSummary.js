import {cart, removeFromCart, fullCartQuantity, updateDeliveryOption}
    from '../../data/cart.js';
import {getProduct} from '../../data/products.js'
import price from '../utils/price.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOption, deliveryChecked} from '../../data/deliveryOption.js';
// import {beginAdd} from 'utils/update.js';



export function renderOrderSummary() {
    document.querySelector('.checkout-header-middle-section')
        .innerHTML = `Checkout (<a class="return-to-home-link"
                              href="amazon.html">${fullCartQuantity()} items</a>)`;
    document.querySelector('.js-order-summary').innerHTML = '';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        const matchingProduct = getProduct(productId);

        document.querySelector('.js-order-summary').innerHTML +=
            `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date-${matchingProduct.id} delivery-date">
          Delivery date: ${deliveryChecked(cartItem)}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}" alt = "text">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${price(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <div data-product-id = "${matchingProduct.id}" 
                   class = "div-quantity-link div-quantity-link-${matchingProduct.id}">
                <span class="update-quantity-link link-primary">Update</span>
              </div>
              <span class="delete-quantity-link link-primary js-delete-link"
                    data-product-id = "${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${createHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>`;
    });


    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            const container = document.querySelector(`.js-cart-item-container-${productId}`)
            container.remove();
            renderOrderSummary();
        })

    });


    function createHTML(matchingProduct, cartItem) {
        let html = '';
        deliveryOption.forEach((deliveryItem) => {
            const today = dayjs();
            const deliveryDate = today.add(
                deliveryItem.deliveryTime,
                'days'
            );
            const dateString = deliveryDate.format('dddd, MMMM D');
            const priceString = deliveryItem.deliveryPrice === 0 ?
                'FREE Shipping' : `${price(deliveryItem.deliveryPrice)} - Shipping`;


            const isChecked = deliveryItem.id === cartItem.deliveryId;
            html += `<div class="delivery-option"
                      data-product-id = "${matchingProduct.id}"
                      data-delivery-option-id = "${deliveryItem.id}">
             <input type="radio" 
                    class="delivery-option-input" 
                    name="delivery-option-${matchingProduct.id}"
                    ${isChecked ? 'checked' : ''}>
             <div>
               <div class="delivery-option-date">
                 ${dateString}
               </div>
               <div class="delivery-option-price">
                 ${priceString}
               </div>
             </div>
        </div>`;
        });
        return html;
    }

    document.querySelectorAll('.delivery-option').forEach((element) => {
        const productId = element.dataset.productId;
        const deliveryId = element.dataset.deliveryOptionId;
        element.addEventListener('click', () => {
            updateDeliveryOption(productId, deliveryId);
            renderOrderSummary();
        });
    });
}
