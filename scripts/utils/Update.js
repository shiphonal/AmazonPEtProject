export function beginAdd() {
    document.querySelectorAll('.div-quantity-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            addSaveLogic(productId);
        });
    });
}

let isAddSave = false;
let isAddUpdate = false;

function addSaveLogic(productId) {
    document.querySelector(`.div-quantity-link-${productId}`)
        .innerHTML = `<input class = "css-input-quantity">
            <span class="link-primary div-quantity-link-${productId}">Save</span>`;
    if (!isAddUpdate || !isAddSave) {
        addSave(productId);
        isAddSave = false;
    }
}
function addSave(productId) {
    isAddUpdate = true;
    document.querySelector(`.div-quantity-link-${productId}`)
        .addEventListener('click', () => {
            addUpdateLogic(productId);
        });
}
function addUpdateLogic(productId) {
    document.querySelector(`.div-quantity-link-${productId}`).innerHTML =
        `<span class="link-primary">Update</span>`;
    if (!isAddUpdate || !isAddSave) {
        addUpdate(productId);
        isAddUpdate = false;
    }
}
function addUpdate(productId) {
    isAddSave = true;
    document.querySelector(`.div-quantity-link-${productId}`)
        .addEventListener('click', () => {
            addSaveLogic(productId);
        });
}