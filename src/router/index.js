import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/HomeView.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/computeView.vue'),
    children: [
      {
        path: '/',
        name: 'welcome',
        component: () => import('@/components/welcome.vue'),
      },
      {
        path: 'W-dDW-dBm',
        name: 'W-dDW-dBm',
        component: () => import('@/components/rf/unitConversion/W-dDW-dBm.vue'),
      },
      {
        path: 'dBm-dBμV-dBmW',
        name: 'dBm-dBμV-dBmW',
        component: () => import('@/components/rf/unitConversion/dBm-dBμV-dBmW.vue'),
      },
      {
        path: 'helical-inductance',
        name: 'helical-inductance',
        component: () => import('@/components/circuit/inductance/helical-inductance.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
