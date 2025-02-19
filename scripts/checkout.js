import {renderOrderSummary} from './check/orderSummary.js';
import {renderPaymentSummary} from "./check/paymentSummary.js";
import {loadProductsFetch} from "./data/products.js";


// async - преобразует функцию так, чтобы она возвращала promise
async function loadPage() {
    try {
        // throw 'error1';

        // await позволяет писать асинхронный код как обычный
        // await можно использовать только внутри async function
        await loadProductsFetch();
        /*
          //  чтобы не использовать then мы можем сохранить
          //  результат await в переменную

        const promise = await new Promise((resolve, reject) => {
            throw 'error2';
            loadProducts(() => {
                reject('error3');
                resolve('value1');
        });
         */
    } catch (error) {
        console.log('Unexpected error');
        console.log(error);
    }

    renderOrderSummary();
    renderPaymentSummary();
} loadPage().then();



/* version 2
  //  здесь мы можем указать promis`ы, которые должны
  //  выполнятся одновременно, пока они все не закончатся

Promise.all([
    loadProductsFetch()

]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
 */


/* version 1
 //  в js всё делается многопоточно изначально,
 //  а так мы выполняем всё последовательно

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


