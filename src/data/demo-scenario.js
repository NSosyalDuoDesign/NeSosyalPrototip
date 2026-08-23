import { DEMO_HARSH_DRAFT } from '@/services/language-intervention.js'

export const demoScenario = Object.freeze([
  {
    id: 1,
    title: 'Bağlama açılan QR',
    shortTitle: 'Ziyaretçi QR akışı',
    description: 'Dizi yayını QR’ından üye olmadan sosyal katmanları aç.',
    status: 'ready',
    location: { name: 'campaign', query: { context: 'series', mode: 'visitor' } },
  },
  {
    id: 2,
    title: 'Aynı konuşmada devam',
    shortTitle: 'Üye bağlam merkezi',
    description: 'Aynı dizi bağlamını doğrudan NSosyal içinde aç.',
    status: 'ready',
    location: {
      name: 'campaign-context-hub',
      params: { contextId: 'series' },
      query: { source: 'demo', continued: '1' },
    },
  },
  {
    id: 3,
    title: 'İlgi alanı seçimi',
    shortTitle: 'Onboarding',
    description: 'Teknoloji, Bilim ve Oyun seçimleriyle kişiselleştirmeyi başlat.',
    status: 'ready',
    location: { name: 'onboarding' },
  },
  {
    id: 4,
    title: 'Kişiselleştirilmiş ana sayfa',
    shortTitle: 'Kişisel akış',
    description: 'Seçilen konuların ana akış sırasını değiştirdiğini göster.',
    status: 'ready',
    location: { name: 'home' },
  },
  {
    id: 5,
    title: 'Açık öneri kontrolü',
    shortTitle: 'Akış kontrolü',
    description: 'Bir gönderiyi ilgili, diğerini ilgisiz işaretleyip sonucu göster.',
    status: 'ready',
    location: { name: 'home' },
  },
  {
    id: 6,
    title: 'Keşif',
    shortTitle: 'Keşif seçkileri',
    description: 'Bugün, Bu Hafta ve Gözden Kaçanlar sekmelerini incele.',
    status: 'ready',
    location: { name: 'discover', query: { tab: 'daily' } },
  },
  {
    id: 7,
    title: 'Deneyim tercihi',
    shortTitle: 'Rahat görünüm',
    description: 'Dengeli görünümden Rahat görünüme geçişi göster.',
    status: 'ready',
    location: { name: 'settings', query: { presetPreview: 'comfortable' } },
  },
  {
    id: 8,
    title: 'Yapıcı paylaşım',
    shortTitle: 'Yapıcı dil',
    description: 'Sabit demo metniyle dostça dil uyarısını çalıştır.',
    status: 'ready',
    location: { name: 'compose', query: { demoDraft: 'harsh' } },
  },
  {
    id: 9,
    title: 'Geri dönen kullanıcı',
    shortTitle: 'Sen yokken',
    description: 'Geri dönüş durumunu hazırlayıp yeni kalma nedenlerini göster.',
    status: 'ready',
    location: { name: 'return', query: { mode: 'returning' } },
  },
  {
    id: 10,
    title: 'Prototipi sıfırla',
    shortTitle: 'Sıfırla',
    description: 'Yerel demo tercihlerini öngörülebilir başlangıç durumuna döndür.',
    status: 'ready',
    location: { name: 'demo' },
  },
])

export function demoStepById(stepId) {
  return demoScenario.find((step) => step.id === Number(stepId)) ?? demoScenario[0]
}

export function prepareDemoStep(store, stepId) {
  const id = Number(stepId)

  if (id === 1) store.seedCampaignVisitor('series')
  if (id === 2) store.seedCampaignMember('series')
  if (id === 3) store.seedOnboarding(false)
  if (id === 4) store.seedOnboarding(true)
  if (id === 5) store.seedSpecificFeedback()
  if (id === 6) store.seedOnboarding(true)
  if (id === 7) store.setExperiencePreset('balanced')
  if (id === 8) store.seedComposerText(DEMO_HARSH_DRAFT)
  if (id === 9) store.seedReturningUser()
}

export function resetDemoState(store, storage) {
  store.resetPrototypeState(storage)
}

export function demoLocation(step) {
  const location = step.location ?? { name: 'demo' }
  return {
    ...location,
    query: {
      ...(location.query ?? {}),
      demo: '1',
      demoStep: String(step.id),
    },
  }
}
