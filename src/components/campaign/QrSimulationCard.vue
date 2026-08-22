<template>
  <section class="qr-simulation" aria-labelledby="qr-simulation-title">
    <div class="qr-simulation__visual" role="img" aria-label="Demo QR kodu görseli">
      <q-icon name="qr_code_2" size="132px" />
      <span class="qr-simulation__scan-line" aria-hidden="true" />
    </div>

    <div>
      <p class="qr-simulation__eyebrow">Demo tarama</p>
      <h2 id="qr-simulation-title">Kodu buldun mu?</h2>
      <p>Gerçek kamera açılmaz. Bu buton, kampanya QR’ını bulduğunu simüle eder.</p>
    </div>

    <q-btn
      unelevated
      no-caps
      color="primary"
      :loading="loading"
      :disable="loading"
      icon="center_focus_strong"
      label="Kodu tara (demo)"
      class="qr-simulation__button"
      @click="$emit('scan')"
    />
  </section>
</template>

<script setup>
defineProps({
  loading: { type: Boolean, default: false },
})

defineEmits(['scan'])
</script>

<style scoped>
.qr-simulation {
  display: grid;
  justify-items: center;
  gap: var(--space-5);
  padding: var(--space-6);
  color: #d9e1ea;
  text-align: center;
  background: rgba(22, 33, 48, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-xl);
}

.qr-simulation__visual {
  position: relative;
  display: grid;
  width: 168px;
  height: 168px;
  color: #172130;
  background: #f7fbff;
  border: 8px solid #ffffff;
  border-radius: var(--radius-lg);
  place-items: center;
  overflow: hidden;
}

.qr-simulation__scan-line {
  position: absolute;
  right: 10px;
  bottom: 18%;
  left: 10px;
  height: 2px;
  background: var(--ns-cyan);
  box-shadow: 0 0 12px rgba(32, 198, 232, 0.7);
  animation: scan-line 2.4s var(--ease-standard) infinite alternate;
}

.qr-simulation__eyebrow {
  margin: 0 0 var(--space-1) !important;
  color: #63d8ed !important;
  font-size: 0.75rem;
  font-weight: 700;
}

.qr-simulation h2 {
  margin: 0 0 var(--space-2);
  color: #f4f7fb;
  font-size: 1.125rem;
}

.qr-simulation p {
  max-width: 360px;
  margin: 0;
  color: #aeb9c7;
  font-size: 0.875rem;
  line-height: 1.5;
}

.qr-simulation__button {
  width: min(100%, 280px);
  min-height: 48px;
  border-radius: var(--radius-md);
  font-weight: 650;
}

@keyframes scan-line {
  from {
    transform: translateY(-94px);
  }
  to {
    transform: translateY(0);
  }
}

@media (max-width: 380px) {
  .qr-simulation {
    padding: var(--space-5) var(--space-4);
  }

  .qr-simulation__visual {
    width: 148px;
    height: 148px;
  }
}
</style>
