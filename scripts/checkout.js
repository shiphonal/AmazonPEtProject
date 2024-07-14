import {renderOrderSummary} from './check/orderSummary.js';
import {renderPaymentSummary} from "./check/paymentSummary.js";
import {loadProducts} from "./data/products.js";

// здесь мы можем указать promis`ы, которые должны
// выполнятся одновременно, пока они все не закончатся
Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve('value 1');
        });
    })

]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});


/*
// в js всё делается многопоточно изначально, а так мы выполняем всё последовательно
new Promise((resolve) => {
    loadProducts(() => {
        resolve('value 1');
    });

}).then((value) => {
    console.log(value);
    renderOrderSummary();
    renderPaymentSummary();
});
 */


