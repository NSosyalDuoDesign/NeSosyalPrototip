const routes = [
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/pages/DemoPage.vue'),
  },
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
      { path: 'discover', name: 'discover', component: () => import('@/pages/DiscoverPage.vue') },
      { path: 'compose', name: 'compose', component: () => import('@/pages/ComposerPage.vue') },
      { path: 'return', name: 'return', component: () => import('@/pages/ReentryPage.vue') },
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
