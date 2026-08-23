<template>
  <div class="ut-page">
    <header class="ut-topbar">
      <router-link class="ut-brand" to="/demo" aria-label="NSosyal demo ekranına dön">
        <strong>NSosyal</strong>
        <span>Kullanılabilirlik testi</span>
      </router-link>
      <div class="ut-topbar__actions">
        <q-btn
          flat
          round
          :icon="isDark ? 'light_mode' : 'dark_mode'"
          :aria-label="isDark ? 'Aydınlık görünüme geç' : 'Karanlık görünüme geç'"
          @click="toggleDarkMode"
        />
        <q-btn flat no-caps icon="arrow_back" label="Sunum moduna dön" to="/demo" />
      </div>
    </header>

    <main class="ut-shell">
      <section class="ut-hero" aria-labelledby="usability-title">
        <div>
          <span class="ut-eyebrow">Araştırmacı aracı</span>
          <h1 id="usability-title">NSosyal kullanılabilirlik testi</h1>
          <p>
            Görev sonuçlarını test sırasında kaydet; SUS puanını ve rapora eklenebilir sonuç metnini
            otomatik oluştur.
          </p>
        </div>
        <div class="ut-hero__meta" aria-label="Test kapsamı">
          <span><strong>6</strong> görev</span>
          <span><strong>10</strong> SUS ifadesi</span>
          <span><strong>20–25</strong> dakika</span>
        </div>
      </section>

      <nav class="ut-section-nav" aria-label="Kullanılabilirlik testi bölümleri">
        <a href="#session">Oturum</a>
        <a href="#tasks">Görevler</a>
        <a href="#questionnaire">Anket</a>
        <a href="#results">Sonuçlar</a>
      </nav>

      <section class="ut-guide" aria-labelledby="guide-title">
        <q-icon name="record_voice_over" size="24px" aria-hidden="true" />
        <div>
          <h2 id="guide-title">Moderatör için kısa akış</h2>
          <ol>
            <li>Katılımcıdan görev boyunca düşündüklerini sesli anlatmasını iste.</li>
            <li>Yardım etmeden önce takıldığı noktayı ve hatayı kaydet.</li>
            <li>Her görev sonrası zorluğu katılımcıya 1–5 arasında sordur.</li>
            <li>Sonunda SUS ve açık uçlu soruları katılımcının yanıtlamasını sağla.</li>
          </ol>
        </div>
        <span class="ut-guide__document">
          <q-icon name="description" aria-hidden="true" /> Docs/USABILITY_TEST.md
        </span>
      </section>

      <q-form class="ut-form" @submit.prevent="saveSession">
        <section id="session" class="ut-card" aria-labelledby="session-title">
          <header class="ut-card__header">
            <div>
              <span>1 · Oturum bilgisi</span>
              <h2 id="session-title">Katılımcıyı tanımla</h2>
            </div>
            <q-chip v-if="editingId" dense color="primary" text-color="white" icon="edit">
              Kayıt düzenleniyor
            </q-chip>
          </header>

          <p class="ut-privacy-note">
            <q-icon name="privacy_tip" aria-hidden="true" /> İsim, e-posta veya telefon gibi kişisel
            bilgi kaydetme; yalnızca katılımcı kodu kullan.
          </p>

          <div class="ut-fields ut-fields--participant">
            <q-input
              v-model.trim="session.participantCode"
              outlined
              label="Katılımcı kodu *"
              hint="Örn. K01"
              maxlength="16"
            />
            <q-input v-model="session.testDate" outlined type="date" label="Test tarihi *" />
            <q-select
              v-model="session.device"
              outlined
              emit-value
              map-options
              :options="deviceOptions"
              label="Test cihazı *"
            />
            <q-select
              v-model="session.familiarity"
              outlined
              emit-value
              map-options
              :options="familiarityOptions"
              label="NSosyal aşinalığı *"
            />
            <q-input
              v-model.trim="session.moderatorCode"
              outlined
              label="Moderatör kodu"
              hint="İsteğe bağlı"
              maxlength="16"
            />
          </div>
        </section>

        <section id="tasks" class="ut-section" aria-labelledby="tasks-title">
          <header class="ut-section__header">
            <div>
              <span>2 · Görev ölçümü</span>
              <h2 id="tasks-title">Davranışı gözlemle</h2>
              <p>Görev metnini oku; başarı ölçütünü katılımcıya gösterme.</p>
            </div>
            <div class="ut-legend" aria-label="Zorluk ölçeği">
              <span><strong>1</strong> çok kolay</span>
              <span><strong>5</strong> çok zor</span>
            </div>
          </header>

          <article
            v-for="(task, index) in usabilityTasks"
            :key="task.id"
            class="ut-task"
            :aria-labelledby="`${task.id}-title`"
          >
            <header class="ut-task__header">
              <span class="ut-task__number">{{ index + 1 }}</span>
              <div>
                <span>{{ task.phase }}</span>
                <h3 :id="`${task.id}-title`">{{ task.title }}</h3>
              </div>
              <q-btn
                outline
                no-caps
                color="primary"
                icon-right="open_in_new"
                label="Görevi aç"
                :href="taskHref(task.location)"
                target="_blank"
              />
            </header>

            <p class="ut-task__instruction">{{ task.instruction }}</p>
            <details class="ut-task__criteria">
              <summary>Moderatör başarı ölçütü</summary>
              <p>{{ task.successCriteria }}</p>
            </details>

            <div class="ut-task__measurements">
              <q-select
                v-model="taskResult(task.id).status"
                outlined
                dense
                emit-value
                map-options
                :options="taskStatusOptions"
                label="Sonuç *"
              />

              <div class="ut-timer">
                <q-input
                  v-model.number="taskResult(task.id).durationSeconds"
                  outlined
                  dense
                  min="0"
                  type="number"
                  label="Süre (sn) *"
                />
                <q-btn
                  flat
                  round
                  color="primary"
                  :icon="timerTaskId === task.id ? 'stop_circle' : 'timer'"
                  :aria-label="
                    timerTaskId === task.id
                      ? `${task.title} süresini durdur`
                      : `${task.title} süresini başlat`
                  "
                  @click="toggleTimer(task.id)"
                >
                  <q-tooltip>
                    {{ timerTaskId === task.id ? `Durdur · ${timerElapsed} sn` : 'Süreyi başlat' }}
                  </q-tooltip>
                </q-btn>
              </div>

              <q-input
                v-model.number="taskResult(task.id).assistanceCount"
                outlined
                dense
                min="0"
                type="number"
                label="Yardım"
              />
              <q-input
                v-model.number="taskResult(task.id).errorCount"
                outlined
                dense
                min="0"
                type="number"
                label="Hata"
              />
              <q-select
                v-model="taskResult(task.id).difficulty"
                outlined
                dense
                :options="scaleOptions"
                label="Zorluk 1–5 *"
              />
            </div>

            <q-input
              v-model.trim="taskResult(task.id).note"
              outlined
              autogrow
              type="textarea"
              label="Gözlem notu"
              placeholder="Nerede durdu, ne söyledi, nasıl ilerledi?"
            />
          </article>
        </section>

        <section id="questionnaire" class="ut-section" aria-labelledby="questionnaire-title">
          <header class="ut-section__header">
            <div>
              <span>3 · Oturum sonrası</span>
              <h2 id="questionnaire-title">SUS ve deneyim değerlendirmesi</h2>
              <p>1 = Kesinlikle katılmıyorum, 5 = Kesinlikle katılıyorum.</p>
            </div>
            <div class="ut-score-preview" aria-live="polite">
              <span>SUS</span>
              <strong>{{ currentSus === null ? '—' : currentSus }}</strong>
              <small>/100</small>
            </div>
          </header>

          <div class="ut-question-list">
            <fieldset v-for="(question, index) in susQuestions" :key="question.id">
              <legend>
                <span>{{ index + 1 }}</span>
                {{ question.text }}
              </legend>
              <q-option-group
                v-model="session.susRatings[question.id]"
                inline
                color="primary"
                :options="ratingOptions"
                :aria-label="question.text"
              />
            </fieldset>
          </div>

          <div class="ut-subsection-title">
            <span>NSosyal’e özel</span>
            <h3>Bağlamsal deneyim işe yaradı mı?</h3>
          </div>
          <div class="ut-question-list">
            <fieldset v-for="question in productQuestions" :key="question.id">
              <legend>{{ question.text }}</legend>
              <q-option-group
                v-model="session.productRatings[question.id]"
                inline
                color="primary"
                :options="ratingOptions"
                :aria-label="question.text"
              />
            </fieldset>
          </div>

          <div class="ut-fields ut-fields--qualitative">
            <q-input
              v-model.trim="session.qualitative.easiest"
              outlined
              autogrow
              type="textarea"
              label="En kolay bulduğu nokta"
            />
            <q-input
              v-model.trim="session.qualitative.confusing"
              outlined
              autogrow
              type="textarea"
              label="Karıştıran veya yavaşlatan nokta"
            />
            <q-input
              v-model.trim="session.qualitative.improvement"
              outlined
              autogrow
              type="textarea"
              label="En önemli iyileştirme önerisi"
            />
            <q-input
              v-model.trim="session.qualitative.quote"
              outlined
              autogrow
              type="textarea"
              label="Raporda kullanılabilecek katılımcı ifadesi"
            />
          </div>
        </section>

        <section class="ut-save-panel" aria-labelledby="save-title">
          <div>
            <h2 id="save-title">Oturumu tamamla</h2>
            <p v-if="missingItems.length" aria-live="polite">
              Kaydetmek için {{ missingItems.length }} alan grubu kaldı:
              {{ missingItems.slice(0, 3).join(', ')
              }}<template v-if="missingItems.length > 3">…</template>
            </p>
            <p v-else class="ut-complete" aria-live="polite">
              <q-icon name="task_alt" aria-hidden="true" /> Tüm zorunlu ölçümler tamamlandı.
            </p>
          </div>
          <div>
            <q-btn v-if="editingId" flat no-caps label="Düzenlemeyi iptal et" @click="resetForm" />
            <q-btn
              unelevated
              no-caps
              color="primary"
              icon="save"
              :label="editingId ? 'Kaydı güncelle' : 'Katılımcıyı kaydet'"
              :disable="missingItems.length > 0"
              type="submit"
            />
          </div>
        </section>
      </q-form>

      <section id="results" class="ut-results" aria-labelledby="results-title">
        <header class="ut-section__header">
          <div>
            <span>4 · Toplu sonuç</span>
            <h2 id="results-title">Rapor özeti</h2>
            <p>Yalnızca bu tarayıcıya açıkça kaydettiğin gerçek test oturumları hesaplanır.</p>
          </div>
          <div class="ut-results__actions">
            <q-btn
              outline
              no-caps
              color="primary"
              icon="download"
              label="Ham CSV"
              :disable="savedSessions.length === 0"
              @click="downloadCsv"
            />
            <q-btn
              unelevated
              no-caps
              color="primary"
              icon="content_copy"
              label="Raporu kopyala"
              @click="copyReport"
            />
          </div>
        </header>

        <div v-if="savedSessions.length === 0" class="ut-empty">
          <q-icon name="assignment" size="36px" aria-hidden="true" />
          <h3>Henüz kaydedilmiş katılımcı yok</h3>
          <p>İlk oturumu kaydettiğinde görev metrikleri ve rapor burada oluşacak.</p>
        </div>

        <template v-else>
          <div class="ut-summary-grid">
            <article>
              <q-icon name="groups" aria-hidden="true" />
              <span>Katılımcı</span>
              <strong>{{ summary.participantCount }}</strong>
            </article>
            <article>
              <q-icon name="check_circle" aria-hidden="true" />
              <span>Tam görev başarısı</span>
              <strong>{{ summary.overallSuccessRate ?? 0 }}%</strong>
            </article>
            <article>
              <q-icon name="speed" aria-hidden="true" />
              <span>Ortalama SUS</span>
              <strong>{{ summary.averageSus ?? '—' }}<small>/100</small></strong>
            </article>
            <article>
              <q-icon name="insights" aria-hidden="true" />
              <span>SUS yorumu</span>
              <strong class="ut-summary-grid__label">{{
                susInterpretation(summary.averageSus)
              }}</strong>
            </article>
          </div>

          <div class="ut-table-wrap" tabindex="0" aria-label="Görev sonuçları tablosu">
            <table>
              <thead>
                <tr>
                  <th>Görev</th>
                  <th>Test</th>
                  <th>Başarı</th>
                  <th>Kısmi</th>
                  <th>Başarısız</th>
                  <th>Ort. süre</th>
                  <th>Zorluk</th>
                  <th>Yardım / hata</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="task in summary.taskMetrics" :key="task.taskId">
                  <th>{{ task.title }}</th>
                  <td>{{ task.testedCount }}</td>
                  <td>{{ metricText(task.successRate, '%') }}</td>
                  <td>{{ task.partialCount }}</td>
                  <td>{{ task.failureCount }}</td>
                  <td>{{ metricText(task.averageDurationSeconds, ' sn') }}</td>
                  <td>{{ metricText(task.averageDifficulty, '/5') }}</td>
                  <td>{{ task.assistanceCount }} / {{ task.errorCount }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="ut-saved-list">
            <header>
              <h3>Katılımcı kayıtları</h3>
              <q-btn
                flat
                no-caps
                color="negative"
                icon="delete_sweep"
                label="Tüm kayıtları sil"
                @click="showClearDialog = true"
              />
            </header>
            <article v-for="saved in savedSessions" :key="saved.id">
              <div>
                <strong>{{ saved.participantCode }}</strong>
                <span
                  >{{ saved.testDate }} · {{ optionLabel(deviceOptions, saved.device) }} · SUS
                  {{ calculateSusScore(saved.susRatings) }}/100</span
                >
              </div>
              <div>
                <q-btn
                  flat
                  round
                  icon="edit"
                  :aria-label="`${saved.participantCode} kaydını düzenle`"
                  @click="editSession(saved)"
                />
                <q-btn
                  flat
                  round
                  color="negative"
                  icon="delete"
                  :aria-label="`${saved.participantCode} kaydını sil`"
                  @click="confirmDelete(saved)"
                />
              </div>
            </article>
          </div>
        </template>

        <div class="ut-report">
          <header>
            <div>
              <span>Markdown</span>
              <h3>Rapora hazır metin</h3>
            </div>
            <q-btn
              flat
              no-caps
              color="primary"
              icon="download"
              label=".md indir"
              @click="downloadReport"
            />
          </header>
          <q-input
            :model-value="reportMarkdown"
            readonly
            outlined
            type="textarea"
            rows="18"
            aria-label="Otomatik oluşturulan kullanılabilirlik testi raporu"
          />
        </div>
      </section>
    </main>

    <q-dialog v-model="showDeleteDialog">
      <q-card class="ut-dialog">
        <q-card-section>
          <h2>Kaydı sil?</h2>
          <p>{{ pendingDelete?.participantCode }} katılımcısının sonucu geri alınamaz.</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat no-caps label="Vazgeç" />
          <q-btn
            v-close-popup
            unelevated
            no-caps
            color="negative"
            label="Kaydı sil"
            @click="deleteSession"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showClearDialog">
      <q-card class="ut-dialog">
        <q-card-section>
          <h2>Tüm test kayıtlarını sil?</h2>
          <p>Bu tarayıcıda kayıtlı bütün katılımcı sonuçları kalıcı olarak silinir.</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat no-caps label="Vazgeç" />
          <q-btn
            v-close-popup
            unelevated
            no-caps
            color="negative"
            label="Tümünü sil"
            @click="clearSessions"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { copyToClipboard, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme.js'
import {
  USABILITY_STORAGE_KEY,
  calculateSusScore,
  createUsabilitySession,
  deviceOptions,
  familiarityOptions,
  generateUsabilityCsv,
  generateUsabilityReport,
  productQuestions,
  scaleOptions,
  summarizeUsabilitySessions,
  susInterpretation,
  susQuestions,
  taskStatusOptions,
  usabilityTasks,
} from '@/data/usability-test.js'

const $q = useQuasar()
const router = useRouter()
const { isDark, toggleDarkMode } = useTheme()
const ratingOptions = scaleOptions.map((value) => ({ label: String(value), value }))

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function loadSessions() {
  if (typeof window === 'undefined') return []

  try {
    const parsed = JSON.parse(window.localStorage.getItem(USABILITY_STORAGE_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const savedSessions = ref(loadSessions())

function nextParticipantNumber() {
  const usedNumbers = savedSessions.value
    .map((saved) => /^K(\d+)$/i.exec(saved.participantCode)?.[1])
    .map(Number)
    .filter(Number.isFinite)
  return Math.max(0, ...usedNumbers) + 1
}

const session = ref(createUsabilitySession(nextParticipantNumber()))
const editingId = ref(null)
const timerTaskId = ref(null)
const timerElapsed = ref(0)
const timerStartedAt = ref(null)
const showDeleteDialog = ref(false)
const showClearDialog = ref(false)
const pendingDelete = ref(null)
let timerHandle = null

const currentSus = computed(() => calculateSusScore(session.value.susRatings))
const summary = computed(() => summarizeUsabilitySessions(savedSessions.value))
const reportMarkdown = computed(() => generateUsabilityReport(savedSessions.value))

const missingItems = computed(() => {
  const items = []
  if (!session.value.participantCode.trim()) items.push('katılımcı kodu')
  else if (
    savedSessions.value.some(
      (saved) =>
        saved.id !== editingId.value &&
        saved.participantCode.toLowerCase() === session.value.participantCode.trim().toLowerCase(),
    )
  ) {
    items.push('benzersiz katılımcı kodu')
  }
  if (!session.value.testDate) items.push('test tarihi')

  session.value.taskResults.forEach((result, index) => {
    if (result.status === 'not_tested') items.push(`${index + 1}. görev sonucu`)
    if (
      result.durationSeconds === null ||
      result.durationSeconds === '' ||
      !Number.isFinite(Number(result.durationSeconds)) ||
      Number(result.durationSeconds) < 0
    ) {
      items.push(`${index + 1}. görev süresi`)
    }
    if (!scaleOptions.includes(Number(result.difficulty))) items.push(`${index + 1}. görev zorluğu`)
    if (
      result.assistanceCount === '' ||
      !Number.isFinite(Number(result.assistanceCount)) ||
      Number(result.assistanceCount) < 0 ||
      result.errorCount === '' ||
      !Number.isFinite(Number(result.errorCount)) ||
      Number(result.errorCount) < 0
    ) {
      items.push(`${index + 1}. görev yardım/hata sayısı`)
    }
  })

  if (
    susQuestions.some((question) => !scaleOptions.includes(session.value.susRatings[question.id]))
  ) {
    items.push('SUS yanıtları')
  }
  if (
    productQuestions.some(
      (question) => !scaleOptions.includes(session.value.productRatings[question.id]),
    )
  ) {
    items.push('NSosyal değerlendirmesi')
  }

  return items
})

function optionLabel(options, value) {
  return options.find((option) => option.value === value)?.label || 'Belirtilmedi'
}

function metricText(value, suffix = '') {
  return Number.isFinite(value) ? `${value}${suffix}` : '—'
}

function taskHref(location) {
  return router.resolve(location).href
}

function taskResult(taskId) {
  return session.value.taskResults.find((result) => result.taskId === taskId)
}

function persistSessions() {
  try {
    window.localStorage.setItem(USABILITY_STORAGE_KEY, JSON.stringify(savedSessions.value))
    return true
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Kayıt tarayıcıya yazılamadı. Depolama iznini kontrol edip tekrar dene.',
    })
    return false
  }
}

function stopTimer() {
  if (!timerTaskId.value || timerStartedAt.value === null) return
  const result = taskResult(timerTaskId.value)
  const elapsed = Math.max(1, Math.round((Date.now() - timerStartedAt.value) / 1000))
  result.durationSeconds = (Number(result.durationSeconds) || 0) + elapsed
  window.clearInterval(timerHandle)
  timerHandle = null
  timerTaskId.value = null
  timerStartedAt.value = null
  timerElapsed.value = 0
}

function toggleTimer(taskId) {
  if (timerTaskId.value === taskId) {
    stopTimer()
    return
  }
  if (timerTaskId.value) stopTimer()

  timerTaskId.value = taskId
  timerStartedAt.value = Date.now()
  timerElapsed.value = 0
  timerHandle = window.setInterval(() => {
    timerElapsed.value = Math.round((Date.now() - timerStartedAt.value) / 1000)
  }, 1000)
}

function resetForm() {
  stopTimer()
  editingId.value = null
  session.value = createUsabilitySession(nextParticipantNumber())
  document.querySelector('#session')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function saveSession() {
  if (missingItems.value.length) return
  stopTimer()

  const saved = {
    ...clone(session.value),
    participantCode: session.value.participantCode.trim().toUpperCase(),
    updatedAt: new Date().toISOString(),
  }
  const existingIndex = savedSessions.value.findIndex((item) => item.id === editingId.value)
  const previousSessions = clone(savedSessions.value)
  if (existingIndex >= 0) savedSessions.value.splice(existingIndex, 1, saved)
  else savedSessions.value.push(saved)

  if (!persistSessions()) {
    savedSessions.value = previousSessions
    return
  }
  $q.notify({ type: 'positive', message: `${saved.participantCode} sonucu kaydedildi.` })
  resetForm()
  requestAnimationFrame(() => {
    document.querySelector('#results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

function editSession(saved) {
  stopTimer()
  editingId.value = saved.id
  session.value = clone(saved)
  document.querySelector('#session')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function confirmDelete(saved) {
  pendingDelete.value = saved
  showDeleteDialog.value = true
}

function deleteSession() {
  if (!pendingDelete.value) return
  const previousSessions = clone(savedSessions.value)
  savedSessions.value = savedSessions.value.filter((item) => item.id !== pendingDelete.value.id)
  if (!persistSessions()) {
    savedSessions.value = previousSessions
    return
  }
  if (editingId.value === pendingDelete.value.id) resetForm()
  pendingDelete.value = null
  $q.notify({ message: 'Katılımcı kaydı silindi.' })
}

function clearSessions() {
  const previousSessions = clone(savedSessions.value)
  savedSessions.value = []
  if (!persistSessions()) {
    savedSessions.value = previousSessions
    return
  }
  resetForm()
  $q.notify({ message: 'Tüm kullanılabilirlik testi kayıtları silindi.' })
}

async function copyReport() {
  try {
    await copyToClipboard(reportMarkdown.value)
    $q.notify({ type: 'positive', message: 'Rapor metni panoya kopyalandı.' })
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Rapor kopyalanamadı; metni alttaki alandan seçebilirsin.',
    })
  }
}

function download(content, filename, type) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

function downloadReport() {
  download(
    reportMarkdown.value,
    'nsosyal-kullanilabilirlik-raporu.md',
    'text/markdown;charset=utf-8',
  )
}

function downloadCsv() {
  download(
    `\ufeff${generateUsabilityCsv(savedSessions.value)}`,
    'nsosyal-kullanilabilirlik-ham-veri.csv',
    'text/csv;charset=utf-8',
  )
}

onBeforeUnmount(stopTimer)
</script>

<style scoped>
.ut-page {
  min-height: 100dvh;
  color: var(--ns-text);
  background: var(--ns-bg-subtle);
}

.ut-topbar,
.ut-topbar__actions,
.ut-hero,
.ut-hero__meta,
.ut-guide,
.ut-card__header,
.ut-section__header,
.ut-task__header,
.ut-save-panel,
.ut-results__actions,
.ut-saved-list header,
.ut-saved-list article,
.ut-report header {
  display: flex;
  align-items: center;
}

.ut-topbar {
  position: sticky;
  z-index: 5;
  top: 0;
  justify-content: space-between;
  min-height: 64px;
  padding: 8px 24px;
  background: color-mix(in srgb, var(--ns-surface) 94%, transparent);
  border-bottom: 1px solid var(--ns-border);
  backdrop-filter: blur(16px);
}

.ut-brand {
  display: grid;
  color: inherit;
  text-decoration: none;
}

.ut-brand strong {
  font-size: 17px;
  letter-spacing: -0.02em;
}

.ut-brand span {
  color: var(--ns-text-secondary);
  font-size: 10px;
  font-weight: 600;
}

.ut-topbar__actions {
  gap: 4px;
}

.ut-topbar .q-btn {
  min-height: var(--touch-target);
  color: var(--ns-text-secondary);
}

.ut-shell {
  display: grid;
  gap: 24px;
  width: min(100%, 1040px);
  padding: 40px 24px 100px;
  margin: 0 auto;
}

.ut-hero {
  gap: 28px;
  justify-content: space-between;
}

.ut-eyebrow,
.ut-card__header span,
.ut-section__header > div > span,
.ut-task__header > div > span,
.ut-subsection-title span,
.ut-report header span {
  color: var(--ns-brand);
  font-size: 11px;
  font-weight: 750;
  letter-spacing: 0.02em;
}

.ut-hero h1,
.ut-hero p,
.ut-guide h2,
.ut-guide ol,
.ut-card__header h2,
.ut-section__header h2,
.ut-section__header p,
.ut-task h3,
.ut-task p,
.ut-subsection-title h3,
.ut-save-panel h2,
.ut-save-panel p,
.ut-empty h3,
.ut-empty p,
.ut-saved-list h3,
.ut-report h3,
.ut-dialog h2,
.ut-dialog p {
  margin: 0;
}

.ut-hero h1 {
  margin-top: 5px;
  font-size: clamp(27px, 5vw, 40px);
  line-height: 1.15;
  letter-spacing: -0.035em;
}

.ut-hero p {
  max-width: 650px;
  margin-top: 8px;
  color: var(--ns-text-secondary);
  font-size: 14px;
  line-height: 1.55;
}

.ut-hero__meta {
  flex: 0 0 auto;
  gap: 1px;
  overflow: hidden;
  background: var(--ns-border);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-md);
}

.ut-hero__meta span {
  display: grid;
  min-width: 104px;
  min-height: 70px;
  padding: 12px;
  color: var(--ns-text-secondary);
  font-size: 10px;
  background: var(--ns-surface);
  place-content: center;
  text-align: center;
}

.ut-hero__meta strong {
  color: var(--ns-text);
  font-size: 19px;
}

.ut-section-nav {
  display: flex;
  gap: 6px;
  padding: 6px;
  overflow-x: auto;
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-round);
  scrollbar-width: none;
}

.ut-section-nav a {
  min-width: max-content;
  padding: 9px 18px;
  color: var(--ns-text-secondary);
  font-size: 12px;
  font-weight: 650;
  text-decoration: none;
  border-radius: var(--radius-round);
}

.ut-section-nav a:hover {
  color: var(--ns-text);
  background: var(--ns-surface-hover);
}

.ut-guide {
  align-items: flex-start;
  gap: 14px;
  padding: 18px;
  color: #0d6140;
  background: color-mix(in srgb, var(--ns-success) 8%, var(--ns-surface));
  border: 1px solid color-mix(in srgb, var(--ns-success) 28%, var(--ns-border));
  border-radius: var(--radius-lg);
}

.ut-guide > div {
  flex: 1;
}

.body--dark .ut-guide {
  color: #8de0b9;
}

.ut-guide h2 {
  font-size: 15px;
}

.ut-guide ol {
  display: grid;
  gap: 3px;
  padding-left: 18px;
  margin-top: 7px;
  font-size: 11px;
  line-height: 1.45;
}

.ut-guide__document {
  display: flex;
  flex: 0 0 auto;
  gap: 6px;
  align-items: center;
  min-height: 36px;
  padding: 7px 10px;
  font-size: 10px;
  font-weight: 700;
  background: color-mix(in srgb, var(--ns-success) 8%, var(--ns-surface));
  border-radius: var(--radius-sm);
}

.ut-form,
.ut-section,
.ut-question-list,
.ut-saved-list,
.ut-report {
  display: grid;
  gap: 16px;
}

.ut-card,
.ut-task,
.ut-results {
  padding: 22px;
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-lg);
}

.ut-card__header,
.ut-section__header {
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.ut-card__header h2,
.ut-section__header h2 {
  margin-top: 3px;
  font-size: 21px;
  line-height: 1.25;
}

.ut-section__header p {
  margin-top: 5px;
  color: var(--ns-text-secondary);
  font-size: 11px;
}

.ut-privacy-note {
  display: flex;
  gap: 7px;
  align-items: center;
  padding: 10px 12px;
  margin: 16px 0;
  color: var(--ns-text-secondary);
  font-size: 11px;
  background: var(--ns-bg-subtle);
  border-radius: var(--radius-sm);
}

.ut-fields {
  display: grid;
  gap: 14px;
}

.ut-fields--participant {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.ut-fields--qualitative {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.ut-section {
  scroll-margin-top: 84px;
}

.ut-legend {
  display: flex;
  gap: 12px;
  color: var(--ns-text-secondary);
  font-size: 10px;
}

.ut-task {
  display: grid;
  gap: 16px;
}

.ut-task__header {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 12px;
}

.ut-task__number {
  display: grid;
  width: 38px;
  height: 38px;
  color: var(--ns-brand);
  font-size: 13px;
  font-weight: 800;
  background: var(--ns-brand-soft);
  border-radius: 50%;
  place-items: center;
}

.ut-task h3 {
  margin-top: 2px;
  font-size: 17px;
}

.ut-task__instruction {
  max-width: 760px;
  font-size: 14px;
  line-height: 1.55;
}

.ut-task__criteria {
  padding: 11px 13px;
  color: var(--ns-text-secondary);
  font-size: 11px;
  background: var(--ns-bg-subtle);
  border-radius: var(--radius-sm);
}

.ut-task__criteria summary {
  cursor: pointer;
  font-weight: 700;
}

.ut-task__criteria p {
  margin-top: 7px;
  line-height: 1.5;
}

.ut-task__measurements {
  display: grid;
  grid-template-columns: minmax(150px, 1.35fr) minmax(130px, 1fr) repeat(3, minmax(90px, 0.7fr));
  gap: 10px;
}

.ut-timer {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 3px;
}

.ut-timer .q-btn {
  min-width: var(--touch-target);
  min-height: var(--touch-target);
}

.ut-score-preview {
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 4px;
  align-items: baseline;
  min-width: 112px;
  padding: 10px 14px;
  color: var(--ns-text-secondary);
  background: var(--ns-bg-subtle);
  border-radius: var(--radius-md);
}

.ut-score-preview span,
.ut-score-preview small {
  font-size: 10px;
  font-weight: 700;
}

.ut-score-preview strong {
  color: var(--ns-text);
  font-size: 22px;
}

.ut-question-list fieldset {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 16px;
  align-items: center;
  min-width: 0;
  padding: 14px 16px;
  margin: 0;
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-md);
}

.ut-question-list legend {
  display: contents;
  font-size: 13px;
  line-height: 1.45;
}

.ut-question-list legend span {
  display: inline-grid;
  width: 24px;
  height: 24px;
  margin-right: 7px;
  color: var(--ns-brand);
  font-size: 10px;
  font-weight: 800;
  background: var(--ns-brand-soft);
  border-radius: 50%;
  place-items: center;
}

.ut-subsection-title {
  display: grid;
  gap: 3px;
  margin-top: 10px;
}

.ut-subsection-title h3 {
  font-size: 18px;
}

.ut-save-panel {
  justify-content: space-between;
  gap: 18px;
  padding: 20px;
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-lg);
}

.ut-save-panel h2 {
  font-size: 17px;
}

.ut-save-panel p {
  max-width: 620px;
  margin-top: 4px;
  color: var(--ns-text-secondary);
  font-size: 11px;
  line-height: 1.45;
}

.ut-save-panel > div:last-child {
  display: flex;
  flex: 0 0 auto;
  gap: 8px;
}

.ut-save-panel .q-btn {
  min-height: var(--touch-target);
}

.ut-complete {
  color: var(--ns-success) !important;
  font-weight: 700;
}

.ut-results {
  display: grid;
  gap: 20px;
  scroll-margin-top: 84px;
}

.ut-results__actions {
  gap: 8px;
}

.ut-empty {
  display: grid;
  min-height: 190px;
  color: var(--ns-text-secondary);
  border: 1px dashed var(--ns-border-strong);
  border-radius: var(--radius-md);
  place-content: center;
  text-align: center;
}

.ut-empty h3 {
  margin-top: 10px;
  color: var(--ns-text);
  font-size: 16px;
}

.ut-empty p {
  max-width: 440px;
  margin-top: 5px;
  font-size: 11px;
}

.ut-summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.ut-summary-grid article {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 3px 8px;
  align-items: center;
  min-height: 98px;
  padding: 14px;
  background: var(--ns-bg-subtle);
  border-radius: var(--radius-md);
}

.ut-summary-grid .q-icon {
  grid-row: 1 / span 2;
  color: var(--ns-brand);
  font-size: 22px;
}

.ut-summary-grid span {
  color: var(--ns-text-secondary);
  font-size: 10px;
  font-weight: 650;
}

.ut-summary-grid strong {
  font-size: 24px;
}

.ut-summary-grid strong small {
  color: var(--ns-text-secondary);
  font-size: 10px;
}

.ut-summary-grid .ut-summary-grid__label {
  font-size: 13px;
  line-height: 1.25;
}

.ut-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-md);
}

.ut-table-wrap table {
  width: 100%;
  min-width: 800px;
  border-collapse: collapse;
  font-size: 11px;
}

.ut-table-wrap th,
.ut-table-wrap td {
  padding: 11px 12px;
  text-align: right;
  border-bottom: 1px solid var(--ns-border);
}

.ut-table-wrap th:first-child,
.ut-table-wrap td:first-child {
  text-align: left;
}

.ut-table-wrap thead th {
  color: var(--ns-text-secondary);
  font-size: 9px;
  text-transform: uppercase;
  background: var(--ns-bg-subtle);
}

.ut-table-wrap tbody th {
  font-weight: 650;
}

.ut-table-wrap tbody tr:last-child th,
.ut-table-wrap tbody tr:last-child td {
  border-bottom: 0;
}

.ut-saved-list header {
  justify-content: space-between;
}

.ut-saved-list h3,
.ut-report h3 {
  font-size: 16px;
}

.ut-saved-list article {
  justify-content: space-between;
  gap: 12px;
  min-height: 60px;
  padding: 10px 12px;
  background: var(--ns-bg-subtle);
  border-radius: var(--radius-sm);
}

.ut-saved-list article > div:first-child {
  display: grid;
}

.ut-saved-list article span {
  color: var(--ns-text-secondary);
  font-size: 10px;
}

.ut-report header {
  justify-content: space-between;
}

.ut-dialog {
  width: min(440px, calc(100vw - 32px));
  color: var(--ns-text);
  background: var(--ns-surface);
}

.ut-dialog h2 {
  font-size: 19px;
}

.ut-dialog p {
  margin-top: 7px;
  color: var(--ns-text-secondary);
  font-size: 12px;
}

@media (max-width: 799px) {
  .ut-shell {
    padding: 28px 16px 80px;
  }

  .ut-hero {
    align-items: flex-start;
    flex-direction: column;
  }

  .ut-hero__meta {
    width: 100%;
  }

  .ut-hero__meta span {
    flex: 1;
    min-width: 0;
  }

  .ut-fields--participant,
  .ut-summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .ut-task__measurements {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .ut-task__measurements > :first-child {
    grid-column: 1 / -1;
  }

  .ut-question-list fieldset {
    grid-template-columns: minmax(0, 1fr);
  }

  .ut-question-list :deep(.q-option-group) {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 599px) {
  .ut-topbar {
    padding: 7px 12px;
  }

  .ut-topbar__actions > .q-btn:last-child :deep(.q-btn__content span) {
    display: none;
  }

  .ut-shell {
    gap: 18px;
    padding-right: 12px;
    padding-left: 12px;
  }

  .ut-hero__meta span {
    min-height: 64px;
    padding: 8px 4px;
  }

  .ut-guide {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    padding: 15px;
  }

  .ut-guide__document {
    grid-column: 2;
    justify-self: start;
  }

  .ut-card,
  .ut-task,
  .ut-results {
    padding: 16px;
  }

  .ut-card__header,
  .ut-section__header,
  .ut-save-panel {
    align-items: flex-start;
    flex-direction: column;
  }

  .ut-fields--participant,
  .ut-fields--qualitative,
  .ut-summary-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .ut-task__header {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .ut-task__header .q-btn {
    grid-column: 2;
    justify-self: start;
  }

  .ut-task__measurements {
    grid-template-columns: minmax(0, 1fr);
  }

  .ut-task__measurements > :first-child {
    grid-column: auto;
  }

  .ut-legend {
    width: 100%;
    justify-content: space-between;
  }

  .ut-question-list fieldset {
    padding: 13px 12px;
  }

  .ut-question-list :deep(.q-radio) {
    justify-content: center;
    min-width: 42px;
    min-height: 42px;
    margin-right: 0;
  }

  .ut-save-panel > div:last-child,
  .ut-results__actions {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .ut-save-panel .q-btn,
  .ut-results__actions .q-btn {
    width: 100%;
  }

  .ut-saved-list header {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 370px) {
  .ut-hero__meta span {
    font-size: 9px;
  }

  .ut-save-panel > div:last-child,
  .ut-results__actions {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
