import {cartForEach} from '../../../scripts/check/orderSummary.js';
import {cart, loadCart} from "../../../scripts/data/cart.js";
import {loadProductsFetch} from "../../../scripts/data/products.js";

describe('test suite: renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

    // done - позволяет управлять временем, когда функция закончится
    beforeAll((done) => {
        loadProductsFetch().then(() => {
            done();
        });
    });

    beforeEach(() => {
        document.querySelector('.js-test-container')
            .innerHTML = `<div class = "js-order-summary"></div>
                          <div class = "js-payment-summary"></div>
                          <div class = "Checkout-header-middle-section"></div>`;
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryId: '1'
            }]);
        });
        loadCart();
        cartForEach();
    });


    it('displays the cart', () => {
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);

        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');
    });


    it('removes a product', () => {
        document.querySelector(`.js-delete-link-${productId1}`).click();

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(0);

        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null); // .not.toEqual(null);

        expect(
            cart.length
        ).toEqual(0);
    });

    afterAll(() => {
        document.querySelector('.js-test-container').innerHTML = ``;
    });
});