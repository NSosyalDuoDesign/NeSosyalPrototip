export const DEMO_HARSH_DRAFT =
  'Bu fikir tamamen saçmalık, bunu yazan hiçbir şey bilmiyor. Böyle konuşmaya devam etmeyin.'

const rules = [
  {
    severity: 'stronger',
    phrases: ['gerizekalı', 'salak', 'aptal', 'geri zekâlı'],
  },
  {
    severity: 'gentle',
    phrases: ['saçmalık', 'aptalca', 'boş yapma', 'hiçbir şey bilmiyor'],
  },
]

function canonicalize(text) {
  return String(text ?? '')
    .normalize('NFKC')
    .toLocaleLowerCase('tr-TR')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function includesPhrase(text, phrase) {
  return ` ${text} `.includes(` ${canonicalize(phrase)} `)
}

function createSuggestion(text, severity) {
  if (severity === 'stronger') {
    return 'Bu görüşe katılmıyorum; nedenlerini daha açık ve sakin biçimde konuşabiliriz.'
  }

  return String(text)
    .replace(/tamamen saçmalık/giu, 'bana ikna edici gelmiyor')
    .replace(/saçmalık/giu, 'ikna edici değil')
    .replace(/aptalca/giu, 'yeterince düşünülmemiş')
    .replace(/boş yapma/giu, 'konuyu daha somut konuşalım')
    .replace(/hiçbir şey bilmiyor/giu, 'konuya farklı bir noktadan bakıyor olabilir')
}

export function analyzeLanguage(text) {
  const normalizedText = canonicalize(text)
  const matchedRule = rules.find((rule) =>
    rule.phrases.some((phrase) => includesPhrase(normalizedText, phrase)),
  )

  if (!matchedRule) {
    return {
      severity: 'neutral',
      matchedCategory: null,
      suggestionAvailable: false,
      suggestedText: null,
    }
  }

  return {
    severity: matchedRule.severity,
    matchedCategory: 'insulting-language',
    suggestionAvailable: true,
    suggestedText: createSuggestion(text, matchedRule.severity),
  }
}
