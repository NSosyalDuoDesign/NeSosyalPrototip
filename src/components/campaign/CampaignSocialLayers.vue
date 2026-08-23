<template>
  <div class="campaign-social-layers">
    <section
      v-if="hasLayer('pulse') && !hasLayer('perspectives')"
      class="campaign-layer-prompt"
      aria-labelledby="perspective-prompt-title"
    >
      <div>
        <span>Yüzdelerin arkasında ne var?</span>
        <h2 id="perspective-prompt-title">İnsanlar neden farklı düşünüyor?</h2>
        <p>Çoğunluğun yanında, aynı ana başka yerden bakan görüşleri de aç.</p>
      </div>
      <q-btn
        unelevated
        no-caps
        color="primary"
        label="Farklı bakışları gör"
        icon-right="arrow_forward"
        @click="$emit('reveal', 'perspectives')"
      />
    </section>

    <Transition name="campaign-layer">
      <section
        v-if="hasLayer('perspectives')"
        class="campaign-layer campaign-perspectives"
        aria-labelledby="perspectives-title"
      >
        <header class="campaign-layer__heading">
          <div>
            <span>Farklı bir bakış</span>
            <h2 id="perspectives-title">Aynı ana üç yorum</h2>
          </div>
          <q-icon name="forum" aria-hidden="true" />
        </header>

        <div class="campaign-perspectives__grid">
          <CampaignPerspectiveCard
            v-for="perspective in context.perspectives"
            :key="perspective.id"
            :perspective="perspective"
            @reply="$emit('reply', perspective)"
          />
        </div>

        <div v-if="!hasLayer('overlooked')" class="campaign-layer__next">
          <div>
            <strong>Ana tartışmanın dışında ne var?</strong>
            <span>Topluluğun yakaladığı ikincil katmanı aç.</span>
          </div>
          <q-btn
            outline
            no-caps
            color="primary"
            label="Gözden kaçanı aç"
            icon-right="visibility"
            @click="$emit('reveal', 'overlooked')"
          />
        </div>
      </section>
    </Transition>

    <Transition name="campaign-layer">
      <section
        v-if="hasLayer('overlooked')"
        class="campaign-layer campaign-overlooked"
        aria-labelledby="overlooked-title"
      >
        <div class="campaign-overlooked__icon" aria-hidden="true">
          <q-icon :name="context.overlooked.icon" />
        </div>
        <div>
          <span>{{ context.overlooked.kicker }}</span>
          <h2 id="overlooked-title">{{ context.overlooked.title }}</h2>
          <p>{{ context.overlooked.body }}</p>
          <strong
            ><q-icon name="trending_up" aria-hidden="true" />
            {{ context.overlooked.metric }}</strong
          >
        </div>
      </section>
    </Transition>

    <div v-if="hasLayer('overlooked') && !hasLayer('live')" class="campaign-layer__next">
      <div>
        <strong>Konuşma burada bitmiyor</strong>
        <span>Şu anda NSosyal’da oluşan canlı akışı gör.</span>
      </div>
      <q-btn
        unelevated
        no-caps
        color="primary"
        label="Şu anda konuşulanları gör"
        icon-right="sensors"
        @click="$emit('reveal', 'live')"
      />
    </div>

    <Transition name="campaign-layer">
      <section
        v-if="hasLayer('live')"
        class="campaign-layer campaign-live"
        aria-labelledby="campaign-live-title"
      >
        <header class="campaign-live__heading">
          <div>
            <span><i aria-hidden="true" /> Şu anda konuşuluyor</span>
            <h2 id="campaign-live-title">NSosyal canlı konuşması</h2>
          </div>
          <div class="campaign-live__counts">
            <strong>{{ context.live.activeCount }}</strong>
            <span>{{ context.live.recentDelta }}</span>
          </div>
        </header>

        <ul class="campaign-live__clusters" aria-label="Aktif konuşma kümeleri">
          <li v-for="cluster in context.live.clusters" :key="cluster"># {{ cluster }}</li>
        </ul>

        <div class="campaign-live__posts" aria-label="Son konuşma önizlemeleri">
          <article v-for="post in context.live.posts" :key="post.handle">
            <UserAvatar :name="post.author" size="38px" />
            <div>
              <header>
                <strong>{{ post.author }}</strong>
                <span>{{ post.handle }} · {{ post.time }}</span>
              </header>
              <p>{{ post.body }}</p>
            </div>
          </article>
        </div>

        <footer v-if="!member" class="campaign-conversion-cta">
          <div>
            <span>Konuşmanın tamamı NSosyal’da</span>
            <strong>Görüşünü ekle, bu bağlamda devam et.</strong>
            <small>Genel ana sayfaya değil, doğrudan bu konuşmaya döneceksin.</small>
          </div>
          <q-btn
            unelevated
            no-caps
            color="primary"
            :label="context.cta.label"
            icon-right="arrow_forward"
            @click="$emit('convert')"
          />
        </footer>
      </section>
    </Transition>
  </div>
</template>

<script setup>
import CampaignPerspectiveCard from '@/components/campaign/CampaignPerspectiveCard.vue'
import UserAvatar from '@/components/ui/UserAvatar.vue'

const props = defineProps({
  context: { type: Object, required: true },
  revealedLayers: { type: Array, default: () => [] },
  member: { type: Boolean, default: false },
})

defineEmits(['convert', 'reply', 'reveal'])

function hasLayer(layerId) {
  return props.member || props.revealedLayers.includes(layerId)
}
</script>

<style scoped>
.campaign-social-layers {
  display: grid;
  gap: 20px;
}

.campaign-layer,
.campaign-layer-prompt,
.campaign-layer__next {
  color: var(--ns-text);
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-lg);
}

.campaign-layer-prompt,
.campaign-layer__next,
.campaign-layer__heading,
.campaign-live__heading,
.campaign-conversion-cta {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
}

.campaign-layer-prompt {
  padding: 20px 24px;
}

.campaign-layer-prompt > div,
.campaign-layer__heading > div,
.campaign-live__heading > div,
.campaign-conversion-cta > div,
.campaign-layer__next > div {
  display: grid;
  gap: 4px;
}

.campaign-layer-prompt span,
.campaign-layer__heading span,
.campaign-overlooked > div > span,
.campaign-conversion-cta span {
  color: var(--ns-brand);
  font-size: 11px;
  font-weight: 750;
}

.campaign-layer-prompt h2,
.campaign-layer__heading h2,
.campaign-overlooked h2,
.campaign-live h2 {
  margin: 0;
  font-size: clamp(19px, 4vw, 24px);
  line-height: 1.25;
}

.campaign-layer-prompt p {
  margin: 0;
  color: var(--ns-text-secondary);
  font-size: 12px;
}

.campaign-layer-prompt .q-btn,
.campaign-layer__next .q-btn,
.campaign-conversion-cta .q-btn {
  flex: 0 0 auto;
  min-height: 44px;
  border-radius: var(--radius-md);
}

.campaign-layer {
  padding: clamp(20px, 4vw, 28px);
}

.campaign-layer__heading > .q-icon {
  color: var(--ns-brand);
  font-size: 28px;
}

.campaign-perspectives__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 20px;
}

.campaign-layer__next {
  padding: 18px 20px;
}

.campaign-perspectives .campaign-layer__next {
  margin-top: 18px;
  background: var(--ns-bg-subtle);
}

.campaign-layer__next strong {
  font-size: 13px;
}

.campaign-layer__next span {
  color: var(--ns-text-secondary);
  font-size: 11px;
}

.campaign-overlooked {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  gap: 20px;
  background: color-mix(in srgb, var(--ns-brand-soft) 45%, var(--ns-surface));
  border-color: color-mix(in srgb, var(--ns-brand) 28%, var(--ns-border));
}

.campaign-overlooked__icon {
  display: grid;
  width: 64px;
  height: 64px;
  color: var(--ns-brand);
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-md);
  place-items: center;
}

.campaign-overlooked__icon .q-icon {
  font-size: 30px;
}

.campaign-overlooked p {
  margin: 10px 0 0;
  color: var(--ns-text-secondary);
  font-size: 13px;
  line-height: 1.55;
}

.campaign-overlooked > div > strong {
  display: flex;
  gap: 7px;
  align-items: center;
  margin-top: 14px;
  color: var(--ns-brand);
  font-size: 11px;
}

.campaign-live__heading {
  align-items: flex-start;
}

.campaign-live__heading > div:first-child > span {
  display: flex;
  gap: 7px;
  align-items: center;
  color: var(--ns-danger);
  font-size: 11px;
  font-weight: 750;
}

.campaign-live__heading i {
  width: 7px;
  height: 7px;
  background: var(--ns-danger);
  border-radius: 50%;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--ns-danger) 14%, transparent);
}

.campaign-live__counts {
  text-align: right;
}

.campaign-live__counts strong {
  font-size: 14px;
}

.campaign-live__counts span {
  color: var(--ns-text-secondary);
  font-size: 10px;
}

.campaign-live__clusters {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  padding: 0;
  margin: 20px 0 0;
  list-style: none;
}

.campaign-live__clusters li {
  padding: 6px 8px;
  color: var(--ns-brand);
  font-size: 10px;
  font-weight: 650;
  background: var(--ns-brand-soft);
  border-radius: var(--radius-xs);
}

.campaign-live__posts {
  margin-top: 16px;
  border-top: 1px solid var(--ns-border);
}

.campaign-live__posts article {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 11px;
  padding: 15px 0;
}

.campaign-live__posts article + article {
  border-top: 1px solid var(--ns-border);
}

.campaign-live__posts article > div,
.campaign-live__posts header {
  min-width: 0;
}

.campaign-live__posts header {
  display: flex;
  gap: 7px;
  align-items: baseline;
}

.campaign-live__posts header strong {
  font-size: 12px;
}

.campaign-live__posts header span {
  overflow: hidden;
  color: var(--ns-text-secondary);
  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.campaign-live__posts p {
  margin: 4px 0 0;
  font-size: 12px;
  line-height: 1.5;
}

.campaign-conversion-cta {
  padding-top: 20px;
  margin-top: 4px;
  border-top: 1px solid var(--ns-border);
}

.campaign-conversion-cta strong {
  font-size: 15px;
}

.campaign-conversion-cta small {
  color: var(--ns-text-secondary);
  font-size: 10px;
}

.campaign-layer-enter-active,
.campaign-layer-leave-active {
  transition:
    opacity var(--motion-base) var(--ease-standard),
    transform var(--motion-base) var(--ease-standard);
}

.campaign-layer-enter-from,
.campaign-layer-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 760px) {
  .campaign-perspectives__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 560px) {
  .campaign-layer-prompt,
  .campaign-layer__next,
  .campaign-conversion-cta {
    align-items: stretch;
    flex-direction: column;
  }

  .campaign-layer-prompt .q-btn,
  .campaign-layer__next .q-btn,
  .campaign-conversion-cta .q-btn {
    width: 100%;
  }

  .campaign-overlooked {
    grid-template-columns: minmax(0, 1fr);
  }

  .campaign-live__heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .campaign-live__counts {
    text-align: left;
  }
}
</style>
