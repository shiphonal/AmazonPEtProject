import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import price from "../scripts/utils/price.js";

export const deliveryOption = [{
    id: '1',
    deliveryTime: '7',
    deliveryPrice: 0
}, {
    id: '2',
    deliveryTime: '3',
    deliveryPrice: 499
}, {
    id: '3',
    deliveryTime: '1',
    deliveryPrice: 999
}];

export function getDeliveryOption(deliveryId) {
    let deliveryItem;
    deliveryOption.forEach((option) => {
        if (option.id === deliveryId) {
            deliveryItem = option;
        }
    });
    return deliveryItem || deliveryOption[0];
}

export function deliveryChecked(cartItem) {
    const deliveryId = cartItem.deliveryId;
    let deliveryItem = getDeliveryOption(deliveryId);
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