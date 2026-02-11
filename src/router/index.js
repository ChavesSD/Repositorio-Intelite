import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: { title: 'intelitehub' },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue'),
      meta: { title: 'Admin — intelitehub' },
    },
  ],
})

router.afterEach((to) => {
  document.title = to.meta.title || 'intelitehub'
})

export default router
