import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import About from '../views/About.vue'
import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'articals',
        name: 'Articals',
        component: ()=>import('../views/Articals.vue'),
      },
      {
        path: 'post',
        name: 'PostArtical',
        component: ()=>import('../views/PostArtical.vue')
      },
      {
        path: 'person',
        name: 'Person',
        component: ()=>import('../views/Person.vue'),
      },
    ],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: ()=>import('../views/Search.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
