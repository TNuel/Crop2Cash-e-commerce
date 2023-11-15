import { defineStore } from 'pinia'
import { login } from '../api/auth'
import axios from "axios";

export const useAuthStore = defineStore('auth',
    {
        state: () => {
            return {
                id: 'user',
                username: "",
                user: {},
                accessToken: '',
                errorMessage: '',
                isLoggedIn: false,
                type: localStorage.getItem('type') || '',
                token: localStorage.getItem('token') || null,
            }
        },
        actions: {
            setUsername(username) {
                this.username = username;
            },
            setUser(user) {
                this.user = user
            },
            setIsLoggedIn(isLoggedIn) {
                this.isLoggedIn = isLoggedIn
            },
            setError( message) {
                this.error = message;
            },
            setTokens( accessToken) {
                this.accessToken = accessToken;
            },
          
              clearTokens() {
                this.accessToken = '';
                this.refreshToken = '';
              },
            async login(credentials) {
                
                const response = await login(credentials)
                console.log(credentials);
                console.log('store response =>',response);


                const accessToken = response.token
                this.token = accessToken
                localStorage.setItem('token', response.token)

                const token = accessToken;
                return response;
                

            },

            // User registration 
            async register(credentials) {
                console.log(credentials);
                const response = await axios.post(`users`)
                console.log('store response =>',response);
                return response;
                
            },

            // log user out and clear store and local storage
            logout() {
                console.log('log user out completely and clear data');
                this.token = null;
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem("tokenData");
            },
        },
        
    })
