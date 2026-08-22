const routes = [
  {
    path: '/',
    redirect: '/home',
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
        component: () => import('@/pages/campaign/CampaignCluePage.vue'),
      },
      {
        path: 'reward',
        name: 'campaign-reward',
        component: () => import('@/pages/campaign/CampaignRewardPage.vue'),
      },
    ],
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
