const routes = [
  {
    path: '/return',
    name: 'return',
    component: () => import('@/pages/ReentryPage.vue'),
  },
  {
    path: '/compose',
    name: 'compose',
    component: () => import('@/pages/ComposerPage.vue'),
  },
  {
    path: '/discover',
    name: 'discover',
    component: () => import('@/pages/DiscoverPage.vue'),
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
