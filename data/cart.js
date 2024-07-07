import {deliveryOption} from "./deliveryOption.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import price from "../scripts/utils/price.js";

export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
    cart = [];
}

export function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, matchingItem) {
    document.querySelectorAll('.js-selector').forEach((selectorItem) => {
        const productIdDev = selectorItem.dataset.productId;
        if (productIdDev === productId) {
            if (matchingItem) {
                matchingItem.quantity += Number(selectorItem.value);
            } else {
                cart.push({
                    productId: productId,
                    quantity: Number(selectorItem.value),
                    deliveryId: '1'
                });
            }
        }
    });
    saveToLocalStorage();
}

export function updateCartQuantity(productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    addToCart(productId, matchingItem);
    return fullCartQuantity();
}

export function fullCartQuantity() {
    let totalCartQuantity = 0;
    cart.forEach((cartItem) => {
        totalCartQuantity += cartItem.quantity;
    });
    return totalCartQuantity;
}

export function removeFromCart(productId) {
    let deleteIndex;
    cart.forEach((cartItem, index) => {
        if (cartItem.productId === productId) {
            deleteIndex = index;
        }
    });
    cart.splice(deleteIndex, 1);
    saveToLocalStorage();
}

export function updateDeliveryOption(productId, deliveryId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    matchingItem.deliveryId = deliveryId;
    document.querySelector(`.delivery-date-${matchingItem.id}`);
    deliveryChecked(matchingItem);

    saveToLocalStorage();
}

export function deliveryChecked(cartItem) {
    const deliveryId = cartItem.deliveryId;
    let deliveryItem;
    deliveryOption.forEach((option) => {
        if (option.id === deliveryId) {
            deliveryItem = option;
        }
    });
    const today = dayjs();
    const deliveryDate = today.add(
        deliveryItem.deliveryTime,
        'days'
    );
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = deliveryItem.deliveryPrice === 0 ?
        'FREE Shipping' : `${price(deliveryItem.deliveryPrice)} - Shipping`;
    return dateString;
}