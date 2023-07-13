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
        path: 'W-dBW-dBm',
        name: 'W-dBW-dBm',
        component: () => import('@/components/rf/unitConversion/W-dBW-dBm.vue'),
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
      {
        path: 'Voltage-standing-wave-ratio',
        name: 'Voltage-standing-wave-ratio',
        component: () => import('@/components/rf/unitConversion/Voltage-standing-wave-ratio.vue'),
      },
      {
        path: 'Slit-line',
        name: 'Slit-line',
        component: () => import('@/components/rf/transmissionLine/Slit-line.vue'),
      },
      {
        path: 'Strip-line',
        name: 'Strip-line',
        component: () => import('@/components/rf/transmissionLine/Strip-line.vue'),
      },
      {
        path: 'Microstrip-line-characteristic-impedance',
        name: 'Microstrip-line-characteristic-impedance',
        component: () => import('@/components/rf/transmissionLine/Microstrip-line-characteristic-impedance.vue'),
      },
      {
        path: 'Microstrip-line',
        name: 'Microstrip-line',
        component: () => import('@/components/rf/transmissionLine/Microstrip-line.vue'),
      },
      {
        path: 'Skin-effect-depth',
        name: 'Skin-effect-depth',
        component: () => import('@/components/rf/transmissionLine/Skin-effect-depth.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
