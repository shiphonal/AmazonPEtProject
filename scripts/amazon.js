import {cart} from '../data/cart.js';
import {products} from '../data/products.js'
import {addToCartText} from './button-add-to-cart.js';

products.forEach((product) => {
    const html = `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}"
              alt = "text">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png"
              alt = "text">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select id = "selected" data-product-id = "${product.id}" class = "js-selector">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" class = "css-icon-checkmark" alt="text">
            Added
          </div>
          
          <p class = "js-button-add-pressed"></p>
          <button class="add-to-cart-button button-primary" 
                  data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>`;
    document.querySelector('.products-grid').innerHTML += html;

    document.querySelectorAll('.add-to-cart-button')
        .forEach((element, index) => {
            element.addEventListener('click', () => addToCartText(index))});
});

document.querySelectorAll('.add-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        let matchingItem;
        let totalCartQuantity = 0;

        cart.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item;
            }
        });

        document.querySelectorAll('.js-selector').forEach((div) => {
            const productIdDev = div.dataset.productId;
            if (productIdDev === productId) {
                if (matchingItem) {
                    matchingItem.quantity += Number(div.value);
                } else {
                    cart.push({
                        productId: productId,
                        quantity: Number(div.value)
                    });
                }
            }
        });

        cart.forEach((item) => {
            totalCartQuantity += item.quantity;
        })

        document.querySelector('.js-cart-quantity').innerText = totalCartQuantity;
        console.log(cart);
    });
});