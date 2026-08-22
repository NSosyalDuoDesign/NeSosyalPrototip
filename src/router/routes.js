const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: 'home', name: 'home', component: () => import('@/pages/IndexPage.vue') },
      {
        path: 'discover',
        name: 'discover',
        component: () => import('@/pages/PlaceholderPage.vue'),
      },
      { path: 'create', name: 'create', component: () => import('@/pages/PlaceholderPage.vue') },
      {
        path: 'notifications',
        name: 'notifications',
        component: () => import('@/pages/PlaceholderPage.vue'),
      },
      { path: 'profile', name: 'profile', component: () => import('@/pages/PlaceholderPage.vue') },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/pages/PlaceholderPage.vue'),
      },
      { path: 'second', redirect: '/discover' },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
]

export default routes
