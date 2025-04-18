export class ProductService {
    constructor(baseUrl) {
        this.apiUrl = baseUrl;
    }

    async getProducts() {
        try {
            const response = await fetch(`${this.apiUrl}/products`);
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    async getProduct(id) {
        try {
            const response = await fetch(`${this.apiUrl}/products/${id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch product details: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
}