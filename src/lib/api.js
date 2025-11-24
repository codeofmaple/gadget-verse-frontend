const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://gadget-verse-backend.vercel.app/api';

class ApiClient {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        if (config.body) {
            config.body = JSON.stringify(config.body);
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Products API
    async getProducts(filters = {}) {
        const params = new URLSearchParams();

        if (filters.category) params.append('category', filters.category);
        if (filters.search) params.append('search', filters.search);

        const queryString = params.toString();
        const endpoint = `/products${queryString ? `?${queryString}` : ''}`;

        return this.request(endpoint);
    }

    async getRecentProducts() {
        return this.request('/products/recent');
    }

    async getProduct(id) {
        return this.request(`/products/${id}`);
    }

    async addProduct(productData) {
        return this.request('/products', {
            method: 'POST',
            body: productData,
        });
    }

    async deleteProduct(id) {
        return this.request(`/products/${id}`, {
            method: 'DELETE',
        });
    }
}

export const apiClient = new ApiClient();