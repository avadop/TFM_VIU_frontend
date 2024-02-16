import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import FacturasView from '../views/facturas/FacturasView.vue'
import GastosView from '../views/gastos/GastosView.vue'
import ProductosView from '../views/productos/ProductosView.vue'
import ClientesView from '../views/clientes/ClientesView.vue'
import Login from '../views/home/Login.vue'
import RegisterUser from '../views/home/RegisterUser.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
          {
              // LEAVE THIS PATH BLANK. Matches /home
              path: '',
              name: 'login',
              component: Login,
          },
          {
              path: '/registration',
              name: 'registration',
              component: RegisterUser,
          }
      ]
    },
    {
      path: '/facturas',
      name: 'facturas',
      component: FacturasView
    },
    {
      path: '/gastos',
      name: 'gastos',
      component: GastosView
    },
    {
      path: '/productos',
      name: 'productos',
      component: ProductosView
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: ClientesView
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
