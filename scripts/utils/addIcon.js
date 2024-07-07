export function addToCartText(buttonId) {
    document.querySelectorAll('.added-to-cart')
        .forEach((element) => {
            const divId = element.dataset.productId;
            if (divId === buttonId) {
                element.classList.add('added-to-cart-pressed');
                element.classList.remove('added-to-cart');
                setTimeout(function() {
                    element.classList.add('added-to-cart');
                    element.classList.remove('added-to-cart-pressed');
                    }, 1000);
                }
            });
}