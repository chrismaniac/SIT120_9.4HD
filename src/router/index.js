import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

import HomePage from '../views/HomePage.vue'
import LocationsPage from '../views/LocationsPage.vue'
import DetailsPage from '../views/DetailsPage.vue'
import ContactPage from '../views/ContactPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/locations',
    name: 'locations',
    component: LocationsPage
  },
  {
    path: '/locations/:id',
    name: 'details',
    component: DetailsPage
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactPage
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,

  scrollBehavior() {
    return { top: 0 }
  }
})

export default router