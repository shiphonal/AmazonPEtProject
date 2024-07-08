import {cart, saveToLocalStorage} from '../../data/cart.js'

export function renderUpdateSave(item) {
    if (item[0] % 2) {
        return 'Save';
    } else {
        cart[item[1]].quantity = Number(document.querySelector('.js-input-quantity').value);
        saveToLocalStorage();
        return 'Update';
    }
}

export function renderInput(item) {
    if (item[0] % 2) {
        return `<input class = "css-input-quantity js-input-quantity">`;
    } else {
        return ``;
    }
}