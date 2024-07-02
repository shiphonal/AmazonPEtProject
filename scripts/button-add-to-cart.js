let isPushed = false;
function addToCartText(index) {
    if (!isPushed) {
        isPushed = true;
        document.querySelectorAll('.added-to-cart')
            .forEach((element, indexPar) => {
                if (indexPar === index) {
                    element.classList.add('added-to-cart-pressed');
                    element.classList.remove('added-to-cart');
                    setTimeout(function() {
                        element.classList.add('added-to-cart');
                        element.classList.remove('added-to-cart-pressed');
                        isPushed = false;
                        }, 1000);
                    }
                });
    }
}