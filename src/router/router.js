import {
    createWebHistory,
    createRouter
} from 'vue-router';
import { useAuthStore } from "../stores/auth";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            meta: { requiresAuth: false, },
            component: () => import('../pages/user-mgt/LoginPageView.vue'),
            name: 'LoginPageView',
        },
        {
            path: '/register',
            meta: { requiresAuth: false, },
            component: () => import('../pages/user-mgt/RegisterView.vue'),
            name: 'RegisterView',
        },
        {
            path: '/main',
            component: () => import('../pages/MainLayout.vue'),
            redirect: "/landing-page",
            name: "main",
            meta: { requiresAuth: true },
            children: [
                {
                path: "/landing-page",
                name: "landingPage",
                meta: { requiresAuth: true, },
                component: () => import('../pages/e-commerce/LandingPageView.vue'),
                },
                {
                path: "/product-details/:id",
                name: "productDetails",
                meta: { requiresAuth: true, },
                component: () => import('../pages/e-commerce/product/ProductPage.vue'),
                },
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import('../NotFoundView.vue'),
            name: 'NotFoundView'
        },
    ]
});

router.beforeEach((to) => {
    console.log('the  route to =>', to);
    if(to.name === "LoginPageView") {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem("tokenData");
    };
    // ✅ This will work make sure the correct store is used for the
    // current running app
    const checkTokenInStorage = localStorage.token
    const auth = useAuthStore();
  
    if (to.meta.requiresAuth && !checkTokenInStorage) {
        auth.setError = 'Please login with your credentials';
        return '/'
    };
  })

export { router }