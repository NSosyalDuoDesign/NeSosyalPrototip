<template>
  <main class="not-found-page">
    <p class="not-found-page__code">404</p>
    <h1>Bu sayfa bulunamadı</h1>
    <p>Bağlantı değişmiş veya içerik kaldırılmış olabilir.</p>
    <q-btn unelevated no-caps color="primary" to="/home" label="Ana sayfaya dön" />
  </main>
</template>

<style scoped>
.not-found-page {
  display: grid;
  min-height: 100dvh;
  place-content: center;
  justify-items: center;
  padding: var(--space-6);
  color: var(--ns-text-secondary);
  text-align: center;
  background: var(--ns-bg);
}

.not-found-page__code {
  margin: 0;
  color: var(--ns-brand);
  font-size: clamp(3rem, 12vw, 6rem);
  font-weight: 750;
  line-height: 1;
}

.not-found-page h1 {
  margin: var(--space-4) 0 var(--space-2);
  color: var(--ns-text);
  font-size: 1.5rem;
}

.not-found-page > p:not(.not-found-page__code) {
  margin: 0 0 var(--space-5);
}
</style>
