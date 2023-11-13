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
                refreshToken: '',
                type: localStorage.getItem('type') || '',
                token: localStorage.getItem('token') || null,
                tokenRefresh: localStorage.getItem('tokenRefresh') || null,
            }
        },
        actions: {
            setUsername(username) {
                this.username = username;
            },
            setUser(user) {
                this.user = user
            },
            setTokens( accessToken, refreshToken) {
                this.accessToken = accessToken;
                this.refreshToken = refreshToken;
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
            logout() {
                console.log('log user out completely and clear data');
                this.token = null;
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem("tokenData");
            },
        },
        
    })
