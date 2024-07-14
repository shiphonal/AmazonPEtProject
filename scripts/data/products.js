import price from '../utils/price.js';

export function getProduct(productId) {
    let matchingProduct;
    products.forEach((productItem) => {
        if (productItem.id === productId) {
            matchingProduct = productItem;
        }
    });
    return matchingProduct;
}

class Product {
    id; image; name; rating; priceCents;
    constructor(productDetails) {
        this.id = productDetails.id;
        this.image = productDetails.image;
        this.name = productDetails.name;
        this.rating = productDetails.rating;
        this.priceCents = productDetails.priceCents;
    }

    getStarsUrl() {
      return `images/ratings/rating-${this.rating.stars*10}.png`;
    }

    getPrice() {
        return `$${price(this.priceCents)}`;
    }

    extraInfoHTML() {
        return ``;
    }
}

class Clothing extends Product {
    sizeChartLink;
    constructor(productDetails) {
      super(productDetails);
      this.sizeChartLink = productDetails.sizeChartLink;
    }

    extraInfoHTML() {
        return `<a href = "${this.sizeChartLink}" 
                 target = "_blank">Size chart</a>`;
    }
}

export let products = [];

export function loadProducts(fun) { // callback function
    const xhr = new XMLHttpRequest();
    // Это нужно для того, чтобы страница или запрос не грузился, юа выполнялся асинхронно
    xhr.addEventListener('load', () => {
        products = JSON.parse(xhr.response).map((productItem) => {
            if (productItem.type === 'clothing')
                return new Clothing(productItem);
            return new Product(productItem)
        });
        fun();
    });
    xhr.open('GET', 'https://supersimplebackend.dev/products');
    xhr.send();

    xhr.addEventListener('error', (error) => {
        console.log('Unexpected error');
    });
}

export function loadProductsFetch() {
    return fetch('https://supersimplebackend.dev/products')
        .then((response) => {
            return response.json();
        })

        .then((productsData) => {
            products = productsData.map((productItem) => {
                if (productItem.type === 'clothing')
                    return new Clothing(productItem);
                return new Product(productItem)
            });
        }).catch(() => {
            console.log('Unexpected error');
        });
}
