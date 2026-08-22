export const discoveryCollections = Object.freeze({
  daily: Object.freeze([
    { postId: 'post-robotics-lab', rank: 1, reason: 'Hızla yükseliyor' },
    { postId: 'post-accessible-apps', rank: 2, reason: 'İlgi alanlarından' },
    { postId: 'post-indie-game', rank: 3, reason: 'Bugünün keşfi' },
    { postId: 'post-basketball-poll', rank: 4, reason: 'Bugünün tartışması' },
    { postId: 'post-space-audio', rank: 5, reason: 'Bilim topluluklarında konuşuluyor' },
    { postId: 'post-finance-notes', rank: 6, reason: 'Bugün kaydedilenlerden' },
    { postId: 'post-city-library', rank: 7, reason: 'Yakınındaki iyi fikirlerden' },
  ]),
  weekly: Object.freeze([
    { postId: 'post-space-audio', rank: 1, reason: 'Haftanın öne çıkanlarından' },
    { postId: 'post-finance-notes', rank: 2, reason: 'Bu hafta ilgi gördü' },
    { postId: 'post-public-spaces', rank: 3, reason: 'Hafta boyunca konuşuldu' },
    { postId: 'post-open-air-cinema', rank: 4, reason: 'Haftalık seçki' },
    { postId: 'post-indie-game', rank: 5, reason: 'Oyun topluluklarında bu hafta' },
    { postId: 'post-basketball-poll', rank: 6, reason: 'Haftanın tartışması' },
  ]),
  overlooked: Object.freeze([
    {
      postId: 'post-city-library',
      rank: 1,
      reason: 'Takip ettiğin alanlarda gözden kaçmış olabilir',
    },
    { postId: 'post-music-archive', rank: 2, reason: 'Daha az kişinin gördüğü' },
    { postId: 'post-open-air-cinema', rank: 3, reason: 'Sessizce yükseliyor' },
  ]),
})

export const risingTopics = Object.freeze([
  {
    id: 'topic-robotics',
    label: 'Erişilebilir robotik',
    topicIds: ['bilim', 'teknoloji'],
    score: 96,
  },
  {
    id: 'topic-indie-coop',
    label: 'Birlikte oynanan bağımsız yapımlar',
    topicIds: ['oyun'],
    score: 83,
  },
  {
    id: 'topic-open-air',
    label: 'Açık hava kültür etkinlikleri',
    topicIds: ['kultur-sanat', 'yerel'],
    score: 75,
  },
  { id: 'topic-budget', label: 'Sade bütçe yöntemleri', topicIds: ['finans'], score: 69 },
])
