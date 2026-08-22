<template>
  <section class="reward-reveal" aria-labelledby="reward-title">
    <div class="reward-reveal__badge" aria-hidden="true">
      <q-icon name="travel_explore" size="42px" />
    </div>
    <p class="reward-reveal__eyebrow">Gizli keşif açıldı</p>
    <h1 id="reward-title">Merak Rotası rozeti senin</h1>
    <p>
      Üç işareti de takip ettin. NSosyal’e giriş yaptığında keşif alanındaki özel kampanya vurgusu
      seni karşılayacak.
    </p>
    <div class="reward-reveal__actions">
      <q-btn
        unelevated
        no-caps
        color="primary"
        label="NSosyal’e geç"
        icon-right="arrow_forward"
        to="/home?entry=campaign"
        class="reward-reveal__primary"
        @click="$emit('claim')"
      />
      <q-btn flat no-caps label="Rotayı yeniden gör" color="white" to="/campaign" />
    </div>
  </section>
</template>

<script setup>
defineEmits(['claim'])
</script>

<style scoped>
.reward-reveal {
  display: grid;
  justify-items: center;
  color: #d8e0e9;
  text-align: center;
}

.reward-reveal__badge {
  display: grid;
  width: 92px;
  height: 92px;
  margin-bottom: var(--space-5);
  color: #0d1622;
  background: linear-gradient(135deg, var(--ns-cyan), var(--ns-brand) 58%, var(--ns-violet));
  border: 5px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius-round);
  place-items: center;
  animation: reward-arrive 360ms var(--ease-standard) both;
}

.reward-reveal__eyebrow {
  margin: 0 0 var(--space-2) !important;
  color: #64d8ee !important;
  font-size: 0.75rem;
  font-weight: 750;
}

.reward-reveal h1 {
  max-width: 520px;
  margin: 0;
  color: #f5f8fb;
  font-size: clamp(1.75rem, 7vw, 2.5rem);
  line-height: 1.12;
  letter-spacing: -0.035em;
}

.reward-reveal > p:last-of-type {
  max-width: 500px;
  margin: var(--space-4) 0 0;
  color: #aeb9c7;
  line-height: 1.6;
}

.reward-reveal__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.reward-reveal__primary {
  min-height: 48px;
  padding-inline: var(--space-5);
  border-radius: var(--radius-md);
  font-weight: 650;
}

@keyframes reward-arrive {
  from {
    opacity: 0;
    transform: scale(0.84);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
