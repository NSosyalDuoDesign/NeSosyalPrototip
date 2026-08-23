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
        </q-list>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<script setup>
import UserAvatar from '@/components/ui/UserAvatar.vue'
import { useTheme } from '@/composables/useTheme.js'
import { usePrototypeStore } from '@/stores/prototype.js'

defineProps({
  compact: { type: Boolean, default: false },
})

const store = usePrototypeStore()
const { isDark, setDarkMode } = useTheme()
</script>

<style scoped>
.profile-trigger {
  min-width: 64px;
  min-height: 50px;
  padding: 0 4px;
  color: var(--ns-text);
  border-radius: var(--radius-round);
}

.profile-trigger :deep(.q-btn__content) {
  gap: 5px;
}
</style>
