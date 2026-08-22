const routes = [
  {
    path: '/onboarding',
    name: 'onboarding',
    component: () => import('@/pages/OnboardingPage.vue'),
  },
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('@/pages/IndexPage.vue') },
      { path: 'second', component: () => import('@/pages/SecondPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
]

export default routes
