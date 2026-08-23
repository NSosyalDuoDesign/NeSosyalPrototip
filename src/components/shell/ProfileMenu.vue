<template>
  <q-btn flat no-caps class="profile-trigger" aria-label="Profil menüsünü aç">
    <UserAvatar :name="store.user.displayName" :size="compact ? '36px' : '44px'" />
    <q-icon v-if="!compact" name="keyboard_arrow_down" size="22px" />

    <q-menu anchor="bottom right" self="top right" :offset="[0, 8]" class="profile-menu">
      <q-card class="profile-menu__card">
        <div class="profile-menu__identity">
          <UserAvatar :name="store.user.displayName" size="48px" />
          <div>
            <strong>{{ store.user.displayName }}</strong>
            <span>{{ store.user.handle }}</span>
          </div>
        </div>

        <q-btn
          outline
          no-caps
          color="primary"
          label="Profili Görüntüle"
          to="/profile"
          class="profile-menu__profile-button"
        />
        <q-separator />

        <q-list class="profile-menu__list">
          <q-item tag="label" clickable>
            <q-item-section avatar><q-icon name="dark_mode" /></q-item-section>
            <q-item-section>Karanlık mod</q-item-section>
            <q-item-section side>
              <q-toggle
                :model-value="isDark"
                color="primary"
                aria-label="Karanlık mod"
                @update:model-value="setDarkMode"
              />
            </q-item-section>
          </q-item>
          <q-item v-close-popup clickable to="/settings">
            <q-item-section avatar><q-icon name="manage_accounts" /></q-item-section>
            <q-item-section>Hesap Ayarları</q-item-section>
          </q-item>
          <q-item v-close-popup clickable to="/onboarding">
            <q-item-section avatar><q-icon name="tune" /></q-item-section>
            <q-item-section>İlgi Alanlarım</q-item-section>
          </q-item>
          <q-item v-close-popup clickable to="/return?mode=returning">
            <q-item-section avatar><q-icon name="history" /></q-item-section>
            <q-item-section>Sen Yokken</q-item-section>
          </q-item>
          <q-item v-close-popup clickable to="/demo?demo=1">
            <q-item-section avatar><q-icon name="smart_display" /></q-item-section>
            <q-item-section>Demo Senaryosu</q-item-section>
          </q-item>
          <q-expansion-item icon="group_add" label="Takip önerileri">
            <q-item v-for="person in suggestions" :key="person.handle" class="profile-suggestion">
              <q-item-section>
                <q-item-label>{{ person.name }}</q-item-label>
                <q-item-label caption>{{ person.handle }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  dense
                  flat
                  no-caps
                  color="primary"
                  :icon="isFollowing(person.handle) ? 'check' : 'person_add'"
                  :label="isFollowing(person.handle) ? 'Takipte' : 'Takip et'"
                  :aria-pressed="isFollowing(person.handle)"
                  @click.stop="toggleFollow(person.handle)"
                />
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<script setup>
import { ref } from 'vue'
import UserAvatar from '@/components/ui/UserAvatar.vue'
import { useTheme } from '@/composables/useTheme.js'
import { usePrototypeStore } from '@/stores/prototype.js'

defineProps({
  compact: { type: Boolean, default: false },
})

const store = usePrototypeStore()
const { isDark, setDarkMode } = useTheme()
const followedHandles = ref([])

const suggestions = [
  { name: 'Açık Bilim', handle: '@acikbilim' },
  { name: 'Oyun Atölyesi', handle: '@oyunatolyesi' },
]

function isFollowing(handle) {
  return followedHandles.value.includes(handle)
}

function toggleFollow(handle) {
  followedHandles.value = isFollowing(handle)
    ? followedHandles.value.filter((item) => item !== handle)
    : [...followedHandles.value, handle]
}
</script>

<style scoped>
.profile-trigger {
  min-width: 64px;
  min-height: 50px;
  padding: 0 4px;
  color: var(--ns-text);
  border-radius: var(--radius-round);
}

.profile-trigger :deep(.q-focus-helper) {
  opacity: 0 !important;
}

.profile-trigger :deep(.q-btn__content) {
  gap: 5px;
}

.profile-trigger :deep(.user-avatar),
.profile-trigger :deep(.q-icon) {
  transition:
    color var(--motion-fast) var(--ease-standard),
    box-shadow var(--motion-fast) var(--ease-standard),
    transform var(--motion-fast) var(--ease-standard);
}

.profile-trigger:hover :deep(.user-avatar),
.profile-trigger:focus-visible :deep(.user-avatar),
.profile-trigger[aria-expanded='true'] :deep(.user-avatar) {
  box-shadow: 0 0 0 3px var(--ns-brand-soft);
}

.profile-trigger:hover :deep(.q-icon),
.profile-trigger:focus-visible :deep(.q-icon),
.profile-trigger[aria-expanded='true'] :deep(.q-icon) {
  color: var(--ns-brand);
  transform: translateY(1px);
}

.profile-suggestion .q-btn {
  min-height: 36px;
}
</style>
