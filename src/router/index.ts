import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { applyDefaultLayout } from '@/router/apply_default_layout.ts'
import CenteredLayout from '@/layouts/CenteredLayout.vue'
import { is_valid_uuid } from '@/utils/validate_uuid.ts'
import { get_cookie } from '@/utils/cookie'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./../views/AboutView.vue'),
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('./../views/LoginView.vue'),
    meta: {
      layout: CenteredLayout,
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('./../views/SignupView.vue'),
    meta: {
      layout: CenteredLayout,
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('./../views/ProfileView.vue'),
  },
  {
    path: '/device/:uuid',
    name: 'device',
    component: () => import('./../views/DeviceView.vue'),
    beforeEnter: (to, from, next) => {
      if (is_valid_uuid(to.params.uuid as string)) {
        next()
      } else {
        next({ name: 'home' })
      }
    },
  },
  {
    path: '/logs',
    name: 'logs',
    component: () => import('../views/LogsView.vue'),

  },
]
applyDefaultLayout(routes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = get_cookie('access_token')
  const publicPages = ['login', 'signup', 'home']
  if (!publicPages.includes(to.name as string) && !token) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
