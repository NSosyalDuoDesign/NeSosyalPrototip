<template>
  <section
    class="experience-preview"
    :data-experience="preset"
    aria-labelledby="experience-preview-title"
  >
    <div class="experience-preview__heading">
      <div>
        <span>Canlı önizleme</span>
        <h2 id="experience-preview-title">Akış görünümü</h2>
      </div>
      <span class="experience-preview__badge">{{ presetLabel }}</span>
    </div>

    <article class="preview-post">
      <header>
        <div class="preview-avatar">EA</div>
        <div>
          <strong>Ece Arın</strong>
          <span>@ecearin · Bugün</span>
        </div>
        <q-icon name="more_horiz" aria-hidden="true" />
      </header>
      <p>
        Şehir bostanında bu hafta açık atölye var. Birlikte öğrenmek isteyen herkese kapımız açık.
      </p>
      <div class="preview-media" aria-hidden="true">
        <q-icon name="eco" size="32px" />
      </div>
      <footer>
        <span><q-icon name="chat_bubble_outline" /><small>Yanıtla</small></span>
        <span><q-icon name="favorite_border" /><small>Beğen</small></span>
        <span><q-icon name="bookmark_border" /><small>Kaydet</small></span>
      </footer>
    </article>
  </section>
</template>

<script setup>
defineProps({
  preset: { type: String, required: true },
  presetLabel: { type: String, required: true },
})
</script>

<style scoped>
.experience-preview {
  --preview-padding: 18px;
  --preview-body-size: 14px;
  --preview-media-height: 128px;
  --preview-label-display: inline;
  --preview-gap: 14px;
  display: grid;
  gap: 14px;
  align-content: start;
  padding: 18px;
  background: var(--ns-bg-subtle);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-lg);
}

.experience-preview[data-experience='fluid'] {
  --preview-padding: 14px;
  --preview-body-size: 13px;
  --preview-media-height: 92px;
  --preview-label-display: none;
  --preview-gap: 10px;
}

.experience-preview[data-experience='comfortable'] {
  --preview-padding: 22px;
  --preview-body-size: 16px;
  --preview-media-height: 164px;
  --preview-gap: 18px;
}

.experience-preview__heading,
.preview-post header,
.preview-post footer {
  display: flex;
  align-items: center;
}

.experience-preview__heading {
  gap: 12px;
  justify-content: space-between;
}

.experience-preview__heading > div {
  display: grid;
  gap: 2px;
}

.experience-preview__heading > div > span {
  color: var(--ns-brand);
  font-size: 11px;
  font-weight: 700;
}

.experience-preview h2 {
  margin: 0;
  font-size: 17px;
}

.experience-preview__badge {
  color: var(--ns-text-secondary);
  font-size: 11px;
  font-weight: 650;
}

.preview-post {
  display: grid;
  gap: var(--preview-gap);
  padding: var(--preview-padding);
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-md);
  transition: padding var(--experience-motion-duration, 180ms) var(--ease-standard);
}

.preview-post header {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr) 24px;
  gap: 10px;
}

.preview-avatar {
  display: grid;
  width: 38px;
  height: 38px;
  color: var(--ns-brand);
  font-size: 12px;
  font-weight: 700;
  background: var(--ns-brand-soft);
  border-radius: 50%;
  place-items: center;
}

.preview-post header > div:nth-child(2) {
  display: grid;
  min-width: 0;
}

.preview-post strong,
.preview-post header span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.preview-post strong {
  font-size: 13px;
}

.preview-post header span {
  color: var(--ns-text-secondary);
  font-size: 11px;
}

.preview-post header > .q-icon {
  color: var(--ns-text-tertiary);
}

.preview-post p {
  margin: 0;
  font-size: var(--preview-body-size);
  line-height: 1.55;
  transition: font-size var(--experience-motion-duration, 180ms) var(--ease-standard);
}

.preview-media {
  display: grid;
  height: var(--preview-media-height);
  color: #2d7c5a;
  background: #e8f4ed;
  border-radius: var(--radius-sm);
  place-items: center;
  transition: height var(--experience-motion-duration, 180ms) var(--ease-standard);
}

.preview-post footer {
  justify-content: space-between;
  color: var(--ns-text-secondary);
}

.preview-post footer span {
  display: flex;
  gap: 5px;
  align-items: center;
  min-height: 32px;
  font-size: 11px;
}

.preview-post footer small {
  display: var(--preview-label-display);
}

@media (max-width: 380px) {
  .experience-preview {
    padding: 14px;
  }
}
</style>
