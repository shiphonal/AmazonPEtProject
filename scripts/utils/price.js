export function price(priceCents) {
    return (priceCents / 100).toFixed(2);
}

export default price;