import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import PaymentForm from '@/components/PaymentForm.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '@/views/Shop.vue'),
    children: [
      {
        path: 'payment',
        component: PaymentForm,
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
