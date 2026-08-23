import { ref } from 'vue'
import { Dark } from 'quasar'

const THEME_STORAGE_KEY = 'nsosyal.theme'
const isDark = ref(false)
let initialized = false

function resolveInitialTheme() {
  if (typeof window === 'undefined') return false

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme === 'dark') return true
  if (savedTheme === 'light') return false
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches === true
}

function applyTheme(dark, persist = true) {
  isDark.value = Boolean(dark)
  Dark.set(isDark.value)

  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light'
    document.documentElement.style.colorScheme = isDark.value ? 'dark' : 'light'
  }

  if (persist && typeof window !== 'undefined') {
    window.localStorage.setItem(THEME_STORAGE_KEY, isDark.value ? 'dark' : 'light')
  }
}

export function useTheme() {
  if (!initialized) {
    initialized = true
    applyTheme(resolveInitialTheme(), false)
  }

  return {
    isDark,
    setDarkMode: (value) => applyTheme(value),
    toggleDarkMode: () => applyTheme(!isDark.value),
  }
}
