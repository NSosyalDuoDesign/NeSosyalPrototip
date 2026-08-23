import { computed } from 'vue'
import { usePrototypeStore } from '@/stores/prototype.js'

export const treasureClues = [
  {
    id: 1,
    location: 'Şehrin ritmi',
    title: 'Seslerin kesiştiği yeri bul',
    clue: 'Günün ilk hareketi başladığında farklı yollar aynı meydanda buluşur. İlk işaret, kalabalığın içindeki mavi ayrıntıda.',
    nextHint: 'Sonraki ipucu seni merakın iz bıraktığı bir köşeye götürecek.',
  },
  {
    id: 2,
    location: 'Merakın izi',
    title: 'Soruların çoğaldığı yere bak',
    clue: 'Cevaplardan önce soruların konuşulduğu, fikirlerin paylaşıldıkça büyüdüğü yerde ikinci kod seni bekliyor.',
    nextHint: 'Son adımda yalnızca gördüğüne değil, gözden kaçana da dikkat et.',
  },
  {
    id: 3,
    location: 'Gözden kaçan',
    title: 'Sessizce yükseleni keşfet',
    clue: 'Herkes aynı yöne bakarken küçük bir ayrıntı başka bir hikâye anlatır. Son kod, keşfetmeye devam edenler için burada.',
    nextHint: 'Rotayı tamamladın. Gizli keşfin açılmak üzere.',
  },
]

export function useTreasureHunt() {
  const store = usePrototypeStore()
  const totalStages = treasureClues.length
  const completedStages = computed(() => store.treasureHunt.completedStages)
  const completedCount = computed(() => completedStages.value.length)
  const progress = computed(() => completedCount.value / totalStages)
  const rewardUnlocked = computed(() => store.treasureHunt.rewardUnlocked)
  const rewardClaimed = computed(() => store.treasureHunt.rewardClaimed)
  const nextStage = computed(() => Math.min(completedCount.value + 1, totalStages))

  function completeStage(stage) {
    if (!treasureClues.some((clue) => clue.id === stage)) return
    store.advanceTreasureHunt(stage, `NS-${String(stage).padStart(2, '0')}`)
  }

  function claimReward() {
    store.claimTreasureReward()
  }

  function resetTreasureHunt() {
    store.seedTreasureHunt(false)
  }

  return {
    claimReward,
    completeStage,
    completedCount,
    completedStages,
    nextStage,
    progress,
    resetTreasureHunt,
    rewardClaimed,
    rewardUnlocked,
    totalStages,
  }
}
