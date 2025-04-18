export function fetchProducts(apiUrl) {
    return fetch(apiUrl + '/products')
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching products:', error);
            throw new Error('Could not load products. Please try again.');
        });
}

export function fetchProductDetails(apiUrl, productId) {
    return fetch(apiUrl + '/products/' + productId)
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching product details:', error);
            throw new Error('Could not load product details.');
        });
}