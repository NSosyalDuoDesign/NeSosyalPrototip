const routes = [
  {
    path: '/',
    redirect: '/home',
  },
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
    path: '/campaign',
    component: () => import('@/layouts/CampaignLayout.vue'),
    children: [
      {
        path: '',
        name: 'campaign',
        component: () => import('@/pages/campaign/CampaignLandingPage.vue'),
      },
      {
        path: 'clue/:stage',
        name: 'campaign-clue',
        redirect: (to) => ({
          path: '/campaign',
          query: { ...to.query, context: to.query.context ?? 'series', mode: 'visitor' },
        }),
      },
      {
        path: 'reward',
        name: 'campaign-reward',
        redirect: (to) => ({
          name: 'campaign-context-hub',
          params: { contextId: to.query.context ?? 'series' },
          query: { source: 'legacy', ...to.query },
        }),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: 'home', name: 'home', component: () => import('@/pages/IndexPage.vue') },
      { path: 'discover', name: 'discover', component: () => import('@/pages/DiscoverPage.vue') },
      { path: 'compose', name: 'compose', component: () => import('@/pages/ComposerPage.vue') },
      { path: 'create', redirect: '/compose' },
      { path: 'return', name: 'return', component: () => import('@/pages/ReentryPage.vue') },
      {
        path: 'notifications',
        name: 'notifications',
        component: () => import('@/pages/PlaceholderPage.vue'),
      },
      { path: 'profile', name: 'profile', component: () => import('@/pages/PlaceholderPage.vue') },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/pages/ExperienceSettingsPage.vue'),
      },
      {
        path: 'context/:contextId',
        name: 'campaign-context-hub',
        component: () => import('@/pages/campaign/CampaignContextHubPage.vue'),
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
