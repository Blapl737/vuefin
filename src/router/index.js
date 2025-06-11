import { createRouter, createWebHistory } from 'vue-router'
import home from '../components/pages/home.vue'
import product from '../components/pages/product.vue'
import cart from '../components/pages/cart.vue'
import categorypr from '../components/pages/category.vue'
import favorite from '../components/pages/Fovorite.vue'
import category from '../components/pages/category.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/product/:id',
    name: 'product',
    component: product
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart
  },
  {
    path: '/category/:categoryId/:categoryName',
    name: 'categorypr',
    component: categorypr
  },
  {
    path: '/favorites',
    name: 'ProductDetail',
    component: favorite
  },
  {
    path: '/category',
    name: 'category',
    component: category
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
