import {calculationWithCart, cart, loadCart} from "../../../scripts/data/cart.js";

describe('test suite: addToCart', () => {
    it('add an existing product to the cart', () => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryId: '1'
            }]);
        });
        loadCart();

        calculationWithCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryId: '1'
            }, 1);
        expect((cart.length)).toEqual(1);
        expect((localStorage.setItem)).toHaveBeenCalledTimes(1);
        expect((cart[0].productId)).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect((cart[0].quantity)).toEqual(2);
    });


    it('add a new product to the cart', () => {
        spyOn(localStorage, 'setItem'); // с помощью этого мы не сохраняем в localStorage нашу cart
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        }); // очищаем localStorage.cart
        loadCart();
        calculationWithCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', undefined, 1);
        expect((cart.length)).toEqual(1);
        expect((localStorage.setItem)).toHaveBeenCalledTimes(1);
        expect((cart[0].productId)).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect((cart[0].quantity)).toEqual(1);
    });
});