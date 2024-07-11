import {renderOrderSummary} from './check/orderSummary.js';
import {renderPaymentSummary} from "./check/paymentSummary.js";
import {loadProducts} from "./data/products.js";

loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
