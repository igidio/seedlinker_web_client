import DefaultLayout from '@/layouts/DefaultLayout.vue'
import type { RouteRecordRaw } from 'vue-router'

export function applyDefaultLayout(routes: RouteRecordRaw[]) {
  routes.forEach((route) => {
    if (!route.meta) {
      route.meta = {}
    }
    if (!route.meta.layout) {
      route.meta.layout = DefaultLayout
    }
    if (route.children) {
      applyDefaultLayout(route.children)
    }
  })
}
