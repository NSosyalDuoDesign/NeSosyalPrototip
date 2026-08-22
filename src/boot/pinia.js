import { defineBoot } from '#q-app'
import { createPinia } from 'pinia'
import { usePrototypeStore } from '@/stores/prototype.js'

export default defineBoot(({ app }) => {
  const pinia = createPinia()
  app.use(pinia)

  const prototypeStore = usePrototypeStore(pinia)
  prototypeStore.hydratePrototypeState()
  prototypeStore.$subscribe(
    () => {
      prototypeStore.persistPrototypeState()
    },
    { detached: true },
  )
})
