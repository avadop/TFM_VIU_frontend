import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import HelloWorld from '../components/HelloWorld.vue'
import FacturasView from '../views/facturas/FacturasView.vue'
import GastosView from '../views/gastos/GastosView.vue'
import ProductosView from '../views/productos/ProductosView.vue'
import ClientesView from '../views/clientes/ClientesView.vue'
import Login from '../views/home/Login.vue'
import RegisterUser from '../views/home/RegisterUser.vue'
import store from '../store'


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
              component: Login
          },
          {
            // LEAVE THIS PATH BLANK. Matches /home
            path: '/summary',
            name: 'HelloWorld',
            component: HelloWorld
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
  ]
})

router.beforeEach((to, from, next) => {
  console.log("store.getters.getLoggedUser", store.getters.getLoggedUser)
  console.log("to", to)

  if(to.name !== 'login' && to.name !== 'registration' && store.getters.getLoggedUser){
    next()
  }
  else if((to.name === 'login' || to.name === 'registration') && !store.getters.getLoggedUser){
    next()
  }
});

export default router
