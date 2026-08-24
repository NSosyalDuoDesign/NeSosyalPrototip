export const interestTaxonomy = Object.freeze([
  {
    id: 'spor',
    label: 'Spor',
    description: 'Takımlar, branşlar ve spor kültürü',
    iconKey: 'sports_soccer',
  },
  {
    id: 'teknoloji',
    label: 'Teknoloji',
    description: 'Ürünler, girişimler ve dijital yaşam',
    iconKey: 'devices',
  },
  {
    id: 'gundem',
    label: 'Gündem',
    description: 'Günün öne çıkan konuşmaları',
    iconKey: 'campaign',
  },
  {
    id: 'siyaset',
    label: 'Siyaset',
    description: 'Politika, katılım ve kamusal tartışmalar',
    iconKey: 'account_balance',
  },
  {
    id: 'oyun',
    label: 'Oyun',
    description: 'Oyun dünyası ve oyuncu toplulukları',
    iconKey: 'sports_esports',
  },
  {
    id: 'bilim',
    label: 'Bilim',
    description: 'Araştırmalar, uzay ve merak uyandıran keşifler',
    iconKey: 'science',
  },
  {
    id: 'kultur-sanat',
    label: 'Kültür & Sanat',
    description: 'Edebiyat, sahne sanatları ve sergiler',
    iconKey: 'palette',
  },
  {
    id: 'finans',
    label: 'Finans',
    description: 'Ekonomi okuryazarlığı ve kişisel finans',
    iconKey: 'account_balance_wallet',
  },
  {
    id: 'muzik',
    label: 'Müzik',
    description: 'Yeni sesler, konserler ve müzik kültürü',
    iconKey: 'headphones',
  },
  {
    id: 'sinema',
    label: 'Sinema',
    description: 'Filmler, diziler ve kamera arkası',
    iconKey: 'movie',
  },
  {
    id: 'yerel',
    label: 'Yerel',
    description: 'Şehrinden hikâyeler ve yakınındaki gelişmeler',
    iconKey: 'location_on',
  },
])

export const interestIds = Object.freeze(interestTaxonomy.map((interest) => interest.id))
