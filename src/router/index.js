import { createRouter, createWebHistory } from 'vue-router'
import PersonajesView from '../views/PersonajesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: PersonajesView
    },
    {
      path: '/personajes/:id',
      name: 'personajes',
      component: PersonajesView
    },
    {
      path: '/peliculas/:page/:id',
      name: 'peliculas',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FilmsView.vue')
    }
  ]
})

export default router
