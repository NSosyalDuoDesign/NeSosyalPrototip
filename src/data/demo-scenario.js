import { DEMO_HARSH_DRAFT } from '@/services/language-intervention.js'

export const demoScenario = Object.freeze([
  {
    id: 1,
    title: 'Kampanya',
    shortTitle: 'QR kampanyası',
    description: 'QR ile başlayan dijital hazine avını aç.',
    status: 'integration',
    dependency: '03 — QR Campaign & Digital Treasure Hunt',
  },
  {
    id: 2,
    title: 'Ödül ve giriş',
    shortTitle: 'Ödül / giriş',
    description: 'Simüle edilen avı bitirip NSosyal’e geç.',
    status: 'integration',
    dependency: '03 — QR Campaign & Digital Treasure Hunt',
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
    status: 'integration',
    dependency: '05 — Personalized Home Feed',
  },
  {
    id: 5,
    title: 'Açık öneri kontrolü',
    shortTitle: 'Akış kontrolü',
    description: 'Bir gönderiyi ilgili, diğerini ilgisiz işaretleyip sonucu göster.',
    status: 'integration',
    dependency: '05 — Personalized Home Feed',
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
    status: 'integration',
    dependency: '07 — Adaptive Experience Presets',
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

  if (id === 1) store.seedTreasureHunt(false)
  if (id === 2) store.seedTreasureHunt(true)
  if (id === 3) store.seedOnboarding(false)
  if (id === 4) store.seedOnboarding(true)
  if (id === 5) store.seedSpecificFeedback()
  if (id === 6) store.seedOnboarding(true)
  if (id === 7) store.setExperiencePreset('comfortable')
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
