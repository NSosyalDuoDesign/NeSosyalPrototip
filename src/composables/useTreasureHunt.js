import { computed, ref } from 'vue'

const STORAGE_KEY = 'ne-sosyal-treasure-hunt'

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

function readState() {
  if (typeof localStorage === 'undefined') {
    return { completedStages: [], rewardClaimed: false }
  }

  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
    const completedStages = Array.isArray(stored.completedStages)
      ? stored.completedStages.filter((stage) => treasureClues.some((clue) => clue.id === stage))
      : []

    return {
      completedStages,
      rewardClaimed: stored.rewardClaimed === true,
    }
  } catch {
    return { completedStages: [], rewardClaimed: false }
  }
}

const initialState = readState()
const completedStages = ref(initialState.completedStages)
const rewardClaimed = ref(initialState.rewardClaimed)

function persistState() {
  if (typeof localStorage === 'undefined') return

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      completedStages: completedStages.value,
      rewardClaimed: rewardClaimed.value,
    }),
  )
}

export function useTreasureHunt() {
  const totalStages = treasureClues.length
  const completedCount = computed(() => completedStages.value.length)
  const progress = computed(() => completedCount.value / totalStages)
  const rewardUnlocked = computed(() => completedCount.value === totalStages)
  const nextStage = computed(() => Math.min(completedCount.value + 1, totalStages))

  function completeStage(stage) {
    if (!treasureClues.some((clue) => clue.id === stage)) return
    if (!completedStages.value.includes(stage)) {
      completedStages.value = [...completedStages.value, stage].sort((a, b) => a - b)
      persistState()
    }
  }

  function claimReward() {
    if (!rewardUnlocked.value) return
    rewardClaimed.value = true
    persistState()
  }

  function resetTreasureHunt() {
    completedStages.value = []
    rewardClaimed.value = false
    persistState()
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
