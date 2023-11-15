import {
    createWebHistory,
    createRouter
} from 'vue-router'

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
})

export { router }