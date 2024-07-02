products.forEach((product) => {
    const html = `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select id = "selected">
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
            <img src="images/icons/checkmark.png" class = "css-icon-checkmark">
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

        if (matchingItem) {
            matchingItem.quantity += Number(document.getElementById("selected").value);
        } else {
            cart.push({
                productId: productId,
                quantity: 1
            });
        }

        cart.forEach((item) => {
            totalCartQuantity += item.quantity;
        })

        document.querySelector('.js-cart-quantity').innerText = totalCartQuantity;
        console.log(cart);
    });
});