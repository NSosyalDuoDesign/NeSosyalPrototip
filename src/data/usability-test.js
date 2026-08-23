export const USABILITY_STORAGE_KEY = 'nsosyal.usability-results.v1'

export const usabilityTasks = [
  {
    id: 'context-discovery',
    phase: 'Bağlamsal deneyim',
    title: 'Konuşmanın katmanlarını keşfet',
    instruction:
      'Dizi sahnesiyle ilgili fikrini belirt. Topluluğun görüşünü, farklı bir bakışı ve gözden kaçan ayrıntıyı bul.',
    successCriteria:
      'Katılımcı tepki verir; topluluk dağılımını, perspektifleri ve gözden kaçan alanı yönlendirme olmadan bulur.',
    location: '/campaign?context=series&mode=visitor',
  },
  {
    id: 'context-continuity',
    phase: 'Bağlamsal deneyim',
    title: 'Aynı konuşmada devam et',
    instruction:
      'Devam eden canlı konuşmayı incele ve tartışmaya katılabileceğin noktaya kadar ilerle.',
    successCriteria:
      'Katılımcı ana eylemi doğru yorumlar ve aynı bağlamın NSosyal içindeki merkezine ulaşır.',
    location: '/campaign?context=series&mode=visitor',
  },
  {
    id: 'member-context',
    phase: 'Bağlamsal deneyim',
    title: 'Üye olarak bağlama gir',
    instruction:
      'Canlı tartışma bağlamına doğrudan gir. Topluluk nabzını kontrol et ve yanıt vermeyi dene.',
    successCriteria:
      'Katılımcı bağlam merkezini genel akıştan ayırır, nabzı bulur ve katılım eylemini başlatır.',
    location: '/campaign?context=debate&mode=member',
  },
  {
    id: 'feed-control',
    phase: 'Genel ürün deneyimi',
    title: 'Akışını kontrol et',
    instruction:
      'Ana akışta ilgini çeken veya çekmeyen bir paylaşım bul ve tercihini NSosyal’e bildir.',
    successCriteria:
      'Katılımcı İlgileniyorum/İlgilenmiyorum kontrolünü bulur ve oluşan geri bildirimi anlar.',
    location: '/home',
  },
  {
    id: 'overlooked-discovery',
    phase: 'Genel ürün deneyimi',
    title: 'Gözden kaçanı bul',
    instruction:
      'Keşfet alanında normalde gözünden kaçabilecek içeriklerin neden gösterildiğini bul.',
    successCriteria:
      'Katılımcı Gözden Kaçanlar alanına ulaşır ve içeriğin gösterilme gerekçesini ifade eder.',
    location: '/discover?tab=daily',
  },
  {
    id: 'appearance-control',
    phase: 'Genel ürün deneyimi',
    title: 'Görünümü kendine göre ayarla',
    instruction: 'Okumayı daha rahat bulacağın görünümü seç ve açık/karanlık görünümü değiştir.',
    successCriteria:
      'Katılımcı görünüm ayarlarını bulur, Rahat seçeneğini ve tema kontrolünü başarıyla kullanır.',
    location: '/settings',
  },
]

export const taskStatusOptions = [
  { label: 'Başarılı', value: 'success', color: 'positive' },
  { label: 'Kısmen başarılı', value: 'partial', color: 'warning' },
  { label: 'Başarısız', value: 'failure', color: 'negative' },
  { label: 'Test edilmedi', value: 'not_tested', color: 'grey' },
]

export const deviceOptions = [
  { label: 'Telefon', value: 'mobile' },
  { label: 'Tablet', value: 'tablet' },
  { label: 'Masaüstü / dizüstü', value: 'desktop' },
]

export const familiarityOptions = [
  { label: 'NSosyal’i ilk kez görüyor', value: 'new' },
  { label: 'NSosyal’i daha önce görmüş', value: 'aware' },
  { label: 'NSosyal’i düzenli kullanıyor', value: 'member' },
]

export const susQuestions = [
  { id: 'sus-1', text: 'NSosyal’i sık sık kullanmak isteyeceğimi düşünüyorum.' },
  { id: 'sus-2', text: 'NSosyal’i gereksiz yere karmaşık buldum.' },
  { id: 'sus-3', text: 'NSosyal’in kullanımını kolay buldum.' },
  {
    id: 'sus-4',
    text: 'NSosyal’i kullanabilmek için teknik bir kişinin desteğine ihtiyaç duyabilirim.',
  },
  { id: 'sus-5', text: 'NSosyal’deki işlevlerin birbiriyle uyumlu olduğunu düşündüm.' },
  { id: 'sus-6', text: 'NSosyal’de çok fazla tutarsızlık olduğunu düşündüm.' },
  { id: 'sus-7', text: 'Çoğu insanın NSosyal’i kullanmayı hızlıca öğrenebileceğini düşünüyorum.' },
  { id: 'sus-8', text: 'NSosyal’i kullanmayı hantal buldum.' },
  { id: 'sus-9', text: 'NSosyal’i kullanırken kendime güvendim.' },
  { id: 'sus-10', text: 'NSosyal’i kullanmadan önce birçok şey öğrenmem gerekti.' },
]

export const productQuestions = [
  {
    id: 'context-clarity',
    text: 'Açılan konuşmanın izlediğim içerikle ilişkisini hemen anladım.',
  },
  {
    id: 'value-before-membership',
    text: 'Üye olmadan önce NSosyal’deki sosyal değeri görebildim.',
  },
  {
    id: 'context-continuity',
    text: 'NSosyal’de devam ettiğimde aynı konuşmanın korunduğunu hissettim.',
  },
  {
    id: 'participation-intent',
    text: 'Bu konuşmaya NSosyal üzerinden katılmak isterdim.',
  },
]

export const scaleOptions = [1, 2, 3, 4, 5]

function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `usability-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function localDate() {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60_000
  return new Date(now.getTime() - offset).toISOString().slice(0, 10)
}

export function createUsabilitySession(participantNumber = 1) {
  return {
    id: createId(),
    participantCode: `K${String(participantNumber).padStart(2, '0')}`,
    testDate: localDate(),
    moderatorCode: '',
    device: 'mobile',
    familiarity: 'new',
    taskResults: usabilityTasks.map((task) => ({
      taskId: task.id,
      status: 'not_tested',
      durationSeconds: null,
      assistanceCount: 0,
      errorCount: 0,
      difficulty: null,
      note: '',
    })),
    susRatings: Object.fromEntries(susQuestions.map((question) => [question.id, null])),
    productRatings: Object.fromEntries(productQuestions.map((question) => [question.id, null])),
    qualitative: {
      easiest: '',
      confusing: '',
      improvement: '',
      quote: '',
    },
    createdAt: new Date().toISOString(),
  }
}

export function calculateSusScore(ratings) {
  const answers = susQuestions.map((question) => Number(ratings?.[question.id]))
  if (answers.some((answer) => !Number.isInteger(answer) || answer < 1 || answer > 5)) {
    return null
  }

  const contribution = answers.reduce((total, answer, index) => {
    return total + (index % 2 === 0 ? answer - 1 : 5 - answer)
  }, 0)

  return contribution * 2.5
}

function average(values) {
  const valid = values.filter((value) => Number.isFinite(value))
  if (valid.length === 0) return null
  return valid.reduce((sum, value) => sum + value, 0) / valid.length
}

function optionalNumber(value) {
  if (value === null || value === undefined || value === '') return null
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

function round(value, digits = 1) {
  if (!Number.isFinite(value)) return null
  const power = 10 ** digits
  return Math.round(value * power) / power
}

function countBy(items, key) {
  return items.reduce((counts, item) => {
    const value = item?.[key] || 'unknown'
    counts[value] = (counts[value] || 0) + 1
    return counts
  }, {})
}

export function summarizeUsabilitySessions(sessions = []) {
  const validSessions = sessions.filter((session) => session && session.participantCode)
  const susScores = validSessions
    .map((session) => calculateSusScore(session.susRatings))
    .filter(Number.isFinite)

  const taskMetrics = usabilityTasks.map((task) => {
    const results = validSessions
      .map((session) => session.taskResults?.find((result) => result.taskId === task.id))
      .filter((result) => result && result.status !== 'not_tested')

    const successCount = results.filter((result) => result.status === 'success').length
    const partialCount = results.filter((result) => result.status === 'partial').length
    const failureCount = results.filter((result) => result.status === 'failure').length

    return {
      taskId: task.id,
      title: task.title,
      testedCount: results.length,
      successCount,
      partialCount,
      failureCount,
      successRate: results.length ? round((successCount / results.length) * 100) : null,
      averageDurationSeconds: round(
        average(results.map((result) => optionalNumber(result.durationSeconds))),
      ),
      averageDifficulty: round(average(results.map((result) => optionalNumber(result.difficulty)))),
      assistanceCount: results.reduce(
        (sum, result) => sum + (Number(result.assistanceCount) || 0),
        0,
      ),
      errorCount: results.reduce((sum, result) => sum + (Number(result.errorCount) || 0), 0),
    }
  })

  const productMetrics = productQuestions.map((question) => ({
    questionId: question.id,
    text: question.text,
    average: round(
      average(
        validSessions.map((session) => optionalNumber(session.productRatings?.[question.id])),
      ),
    ),
  }))
  const testedTaskCount = taskMetrics.reduce((sum, task) => sum + task.testedCount, 0)
  const successfulTaskCount = taskMetrics.reduce((sum, task) => sum + task.successCount, 0)

  return {
    participantCount: validSessions.length,
    dateFrom: validSessions.map((session) => session.testDate).sort()[0] || null,
    dateTo:
      validSessions
        .map((session) => session.testDate)
        .sort()
        .at(-1) || null,
    deviceCounts: countBy(validSessions, 'device'),
    familiarityCounts: countBy(validSessions, 'familiarity'),
    averageSus: round(average(susScores)),
    susResponseCount: susScores.length,
    overallSuccessRate: testedTaskCount
      ? round((successfulTaskCount / testedTaskCount) * 100)
      : null,
    taskMetrics,
    productMetrics,
  }
}

export function susInterpretation(score) {
  if (!Number.isFinite(score)) return 'Henüz hesaplanmadı'
  if (score >= 80) return 'Çok güçlü kullanılabilirlik'
  if (score >= 68) return 'İyi kullanılabilirlik'
  if (score >= 51) return 'İyileştirmeye açık'
  return 'Öncelikli iyileştirme gerekli'
}

function optionLabel(options, value) {
  return options.find((option) => option.value === value)?.label || 'Belirtilmedi'
}

function distributionText(counts, options) {
  return options
    .filter((option) => counts[option.value])
    .map((option) => `${option.label}: ${counts[option.value]}`)
    .join(', ')
}

function metric(value, suffix = '') {
  return Number.isFinite(value) ? `${value}${suffix}` : '—'
}

function escapeTable(value) {
  return String(value ?? '')
    .replaceAll('|', '\\|')
    .replaceAll('\n', ' ')
}

function qualitativeLines(sessions, field, fallback) {
  const lines = sessions
    .filter((session) => session.qualitative?.[field]?.trim())
    .map(
      (session) =>
        `- **${escapeTable(session.participantCode)}:** ${session.qualitative[field].trim()}`,
    )

  return lines.length ? lines.join('\n') : fallback
}

export function generateUsabilityReport(sessions = []) {
  const summary = summarizeUsabilitySessions(sessions)
  if (summary.participantCount === 0) {
    return [
      '# NSosyal Kullanılabilirlik Testi Sonuçları',
      '',
      '> Henüz kaydedilmiş katılımcı sonucu yok. Bu rapor gerçek oturumlar kaydedildikçe otomatik oluşur.',
    ].join('\n')
  }

  const taskRows = summary.taskMetrics.map(
    (task) =>
      `| ${escapeTable(task.title)} | ${task.testedCount} | ${metric(task.successRate, '%')} | ${task.partialCount} | ${task.failureCount} | ${metric(task.averageDurationSeconds, ' sn')} | ${metric(task.averageDifficulty, '/5')} | ${task.assistanceCount} | ${task.errorCount} |`,
  )

  const productRows = summary.productMetrics.map(
    (item) => `| ${escapeTable(item.text)} | ${metric(item.average, '/5')} |`,
  )

  const priorityLines = [...summary.taskMetrics]
    .sort(
      (left, right) =>
        (left.successRate ?? 101) - (right.successRate ?? 101) ||
        (right.averageDifficulty ?? -1) - (left.averageDifficulty ?? -1) ||
        (right.averageDurationSeconds ?? -1) - (left.averageDurationSeconds ?? -1),
    )
    .slice(0, 3)
    .map(
      (task) =>
        `- **${escapeTable(task.title)}:** ${metric(task.successRate, '%')} tam başarı, ${metric(task.averageDifficulty, '/5')} zorluk, ${metric(task.averageDurationSeconds, ' sn')} ortalama süre, ${task.assistanceCount} yardım ve ${task.errorCount} hata.`,
    )

  const sessionRows = sessions.map((session) => {
    const sus = calculateSusScore(session.susRatings)
    return `| ${escapeTable(session.participantCode)} | ${session.testDate || '—'} | ${optionLabel(deviceOptions, session.device)} | ${optionLabel(familiarityOptions, session.familiarity)} | ${metric(sus, '/100')} |`
  })

  const dateRange =
    summary.dateFrom === summary.dateTo
      ? summary.dateFrom
      : `${summary.dateFrom || '—'} – ${summary.dateTo || '—'}`

  return [
    '# NSosyal Kullanılabilirlik Testi Sonuçları',
    '',
    '## Yönetici özeti',
    '',
    `- **Katılımcı sayısı:** ${summary.participantCount}`,
    `- **Test tarihleri:** ${dateRange}`,
    `- **Tam görev başarısı:** ${metric(summary.overallSuccessRate, '%')}`,
    `- **Ortalama SUS:** ${metric(summary.averageSus, '/100')} — ${susInterpretation(summary.averageSus)}`,
    `- **Cihaz dağılımı:** ${distributionText(summary.deviceCounts, deviceOptions) || 'Belirtilmedi'}`,
    `- **NSosyal aşinalığı:** ${distributionText(summary.familiarityCounts, familiarityOptions) || 'Belirtilmedi'}`,
    '',
    '> Başarı oranı yalnızca “Başarılı” olarak işaretlenen görevleri kapsar; kısmi başarılar tam başarı sayılmaz. SUS bir kullanılabilirlik göstergesidir, yüzde değildir.',
    '',
    '## Yöntem',
    '',
    'Katılımcılar altı görevi düşünerek sesli anlatım yöntemiyle tamamladı. Moderatör görev başarısını, süreyi, yardım ve hata sayılarını, algılanan zorluğu kaydetti. Oturum sonunda standart 10 maddelik SUS ve NSosyal’e özel dört ifade yanıtlandı.',
    '',
    '## Görev sonuçları',
    '',
    '| Görev | Test | Başarı | Kısmi | Başarısız | Ort. süre | Zorluk | Yardım | Hata |',
    '| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |',
    ...taskRows,
    '',
    '## Öncelik sinyalleri',
    '',
    '_Aşağıdaki sıra düşük başarı, yüksek zorluk ve uzun süre ölçümlerinden otomatik üretilmiştir; nihai bulgu olarak nitel gözlemlerle doğrulanmalıdır._',
    '',
    ...priorityLines,
    '',
    '## Ürüne özel değerlendirme',
    '',
    '| İfade | Ortalama |',
    '| --- | ---: |',
    ...productRows,
    '',
    '## Katılımcı özeti',
    '',
    '| Kod | Tarih | Cihaz | Aşinalık | SUS |',
    '| --- | --- | --- | --- | ---: |',
    ...sessionRows,
    '',
    '## En kolay bulunan noktalar',
    '',
    qualitativeLines(sessions, 'easiest', '_Yorum kaydedilmedi._'),
    '',
    '## Karıştıran veya yavaşlatan noktalar',
    '',
    qualitativeLines(sessions, 'confusing', '_Yorum kaydedilmedi._'),
    '',
    '## İyileştirme önerileri',
    '',
    qualitativeLines(sessions, 'improvement', '_Yorum kaydedilmedi._'),
    '',
    '## Katılımcı ifadeleri',
    '',
    qualitativeLines(sessions, 'quote', '_Doğrudan ifade kaydedilmedi._'),
    '',
    '## Yorumlama ve sonraki adım',
    '',
    '- En düşük görev başarı oranı ile en yüksek zorluk/süre değerlerini birlikte değerlendirin.',
    '- Birden fazla katılımcıda tekrarlanan gözlemleri önceliklendirin.',
    '- Kritik akış değişikliklerinden sonra aynı görevlerle kısa bir doğrulama turu yapın.',
  ].join('\n')
}

export function generateUsabilityCsv(sessions = []) {
  const headers = [
    'katilimci_kodu',
    'tarih',
    'cihaz',
    'asinalik',
    'gorev',
    'durum',
    'sure_saniye',
    'yardim_sayisi',
    'hata_sayisi',
    'zorluk_1_5',
    'sus_0_100',
    'gozlem',
  ]

  const csvValue = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`
  const rows = sessions.flatMap((session) => {
    const sus = calculateSusScore(session.susRatings)
    return usabilityTasks.map((task) => {
      const result = session.taskResults?.find((item) => item.taskId === task.id) || {}
      return [
        session.participantCode,
        session.testDate,
        optionLabel(deviceOptions, session.device),
        optionLabel(familiarityOptions, session.familiarity),
        task.title,
        optionLabel(taskStatusOptions, result.status),
        result.durationSeconds,
        result.assistanceCount,
        result.errorCount,
        result.difficulty,
        sus,
        result.note,
      ]
        .map(csvValue)
        .join(',')
    })
  })

  return [headers.map(csvValue).join(','), ...rows].join('\n')
}
