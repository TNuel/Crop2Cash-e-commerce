import { defineStore } from 'pinia'
import axios from "axios";

export const useProductStore = defineStore('product',
    {
        state: () => {
            return { products: [] }
        },
        actions: {
            setUser(products) {
                this.products = products
            },
            async getProducts() {
                try {
                    const response = await axios.get(`products`)
                    console.log(response);
                    console.log('products store response =>', response);
                    return response;
                    
                } catch (error) {
                    
                    console.error('Error fetching products:', error);
                }
                
                
            },
            // Action to fetch products from the backend
            async getProductDetails(productId) {
                try {
                    // Replace the URL with your actual backend API endpoint
                    const response = await axios.get(`products/${productId}`);
                    console.log(response);
                    console.log('product details store response =>', response);

                    return response;
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            },
            
            // Action to aget all product category
            async getProductCategories() {
                try {
                    // Replace the URL with your actual backend API endpoint
                    const response = await axios.get('products/categories');
                    
                    // If the request is successful, update the local state
                    console.log(response);
                    console.log('product details store response =>', response);
        
                    return response;
                } catch (error) {
                    console.error('Error adding product:', error);
                }
            },

            // Action to add a new product to the backend
            async addProduct(product) {
                try {
                    // Replace the URL with your actual backend API endpoint
                    const response = await fetch('https://your-api.com/products', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(product),
                    });

                    // If the request is successful, update the local state
                    if (response.ok) {
                        this.products.push(product);
                    }
                } catch (error) {
                    console.error('Error adding product:', error);
                }
            },

            // Action to remove a product by ID from the backend
            async removeProduct(productId) {
                try {
                    // Replace the URL with your actual backend API endpoint
                    const response = await fetch(`https://your-api.com/products/${productId}`, {
                        method: 'DELETE',
                    });

                    // If the request is successful, update the local state
                    if (response.ok) {
                        this.products = this.products.filter(product => product.id !== productId);
                    }
                } catch (error) {
                    console.error('Error removing product:', error);
                }
            },

            // Action to update the details of a product in the backend
            async sortProductsByCategory(category) {
                try {
                    console.log('product category oooooooooooooooooooooooooooooooooooooo =>', category);
                    if(category == "All Categories") {
                        console.log('product category for all categories =>', category);
                        // Replace the URL with your actual backend API endpoint
                        // product category => All Categories
                        const response = await axios.get(`products`);
                        console.log(response);
                        console.log('product details for all response =>', response);
    
                        return response;
                    } else {
                        // Replace the URL with your actual backend API endpoint
                        const response = await axios.get(`products/category/${category}`);
                        console.log(response);
                        console.log('product details store response =>', response);
    
                        return response;
                    }
                } catch (error) {
                    console.error('Error updating product:', error);
                }
            },
        },

    })
