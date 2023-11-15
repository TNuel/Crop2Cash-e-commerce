import { defineStore } from 'pinia'
import axios from "axios";

export const useCartStore = defineStore('cart',
    {
        state: () => {
            return { 
                carts: [],
                addToCartArray: [],
             }
        },
        actions: {
            setCarts(carts) {
                this.carts = carts
            },
            setAddToCartArray(product) {
                this.addToCartArray = product
            },
            // get all product in cart
            async getCarts() {
                try {
                    const response = await axios.get(`carts`)
                    console.log(response);
                    console.log('products store response =>', response);
                    return response;
                    
                } catch (error) {
                    
                    console.error('Error fetching products:', error);
                }
                
                
            },
            
            // Action to add a new product to the backend
            async addProduct(cart) {
                try {
                    // Replace the URL with your actual backend API endpoint
                    const response = await axios.post('carts', cart);
                    console.log(response);
                    console.log('products store response =>', response);
                    return response;
                } catch (error) {
                    console.error('Error adding product:', error);
                }
            },
            
            // Action to remove a product by ID from the backend
            async removeProduct(cartId) {
                try {
                    // Replace the URL with your actual backend API endpoint
                    const response = await axios.delete(`carts/${cartId}`);
                    console.log(response);
                    console.log('products store response =>', response);
                    return response;
                } catch (error) {
                    console.error('Error removing product:', error);
                }
            },

            // Action to change the quantity of a product product by ID from the backend
            async changeProductQuantity(cartId) {
                try {
                    // Replace the URL with your actual backend API endpoint
                    const response = await axios.put(`carts/${cartId}`);
                    console.log(response);
                    console.log('products store response =>', response);
                    return response;
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
