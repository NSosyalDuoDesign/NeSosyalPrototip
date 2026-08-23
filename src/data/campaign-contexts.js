export const CAMPAIGN_ENTRY_MODES = Object.freeze({
  visitor: 'visitor',
  member: 'member',
})

export const CAMPAIGN_LAYER_IDS = Object.freeze(['pulse', 'perspectives', 'overlooked', 'live'])

export const campaignContexts = Object.freeze([
  {
    id: 'series',
    sourceType: 'Dizi yayını',
    sourceLabel: 'Kıyıdaki Ev · 8. bölüm',
    sourceDetail: 'Bölüm şimdi yayında',
    icon: 'live_tv',
    accent: 'violet',
    headline: 'Sence gerçekten doğruyu mu söylüyor?',
    hook: 'Az önceki sahnede Deniz, mektubu ilk kez gördüğünü söyledi. İzleyiciler ayrıntılarda başka bir hikâye buluyor.',
    momentLabel: 'Son sahne · 22.14',
    visualTitle: 'Kapı kapanmadan 8 saniye önce',
    visualDetail: 'Bu sahne etrafında oluşan canlı sosyal katman şimdi açık.',
    tags: ['Bölüm teorileri', 'Canlı izleyici', 'Sahne ayrıntıları'],
    reaction: {
      question: 'Deniz mektubu daha önce görmüş müydü?',
      helper: 'Cevabını verdikten sonra izleyicilerin ne düşündüğünü göreceksin.',
      options: [
        { id: 'knew', label: 'Evet, biliyordu', shortLabel: 'Biliyordu', percentage: 58 },
        { id: 'unsure', label: 'Henüz emin değilim', shortLabel: 'Emin değilim', percentage: 17 },
        {
          id: 'truth',
          label: 'Hayır, doğruyu söylüyor',
          shortLabel: 'Doğru söylüyor',
          percentage: 25,
        },
      ],
    },
    pulse: {
      participantCount: '18.420',
      recentDelta: '+2.180',
      summary: 'İzleyicilerin çoğu, Deniz’in mektubu daha önce gördüğünü düşünüyor.',
      nuance:
        'Her dört kişiden biri ise sahnedeki sessizliği suçluluk değil şaşkınlık olarak yorumluyor.',
    },
    perspectives: [
      {
        id: 'series-perspective-1',
        author: 'Ece Arın',
        handle: '@ecearin',
        tone: 'violet',
        label: 'Sahne ayrıntısı',
        body: 'Mektuba değil, masadaki boş çerçeveye baktı. Bence bildiği şey mektubun içeriği değil, kimin bıraktığı.',
        engagement: '1.284 yanıt',
      },
      {
        id: 'series-perspective-2',
        author: 'Kare Kare',
        handle: '@karekare',
        tone: 'blue',
        label: 'Karşı yorum',
        body: 'Bir önceki bölümde aynı saati taktığını görüyoruz. Zaman çizelgesi tutuyorsa mektubu önceden görmesi mümkün değil.',
        engagement: '846 yanıt',
      },
      {
        id: 'series-perspective-3',
        author: 'Mert Suna',
        handle: '@mertsuna',
        tone: 'cyan',
        label: 'Başka bir olasılık',
        body: 'Tartışma “yalan söylüyor mu?” diye ilerliyor ama asıl soru mektubun gerçekten ona yazılıp yazılmadığı olabilir.',
        engagement: '612 yanıt',
      },
    ],
    overlooked: {
      kicker: 'İzleyicilerin yakaladığı ayrıntı',
      title: 'Duvardaki fotoğraf bu bölümde ilk kez değişti',
      body: 'Aynı odanın önceki üç bölümdeki görüntülerini karşılaştıran kullanıcılar, fotoğraftaki üçüncü kişinin bu sahneden hemen önce kaldırıldığını fark etti.',
      metric: 'Son 12 dakikada 3.640 kişi bu ayrıntıyı konuştu',
      icon: 'frame_inspect',
    },
    live: {
      activeCount: '6.840 kişi',
      recentDelta: 'Son 10 dakikada +4.120 gönderi',
      clusters: ['Mektubun sahibi', 'Değişen fotoğraf', 'Deniz’in zaman çizelgesi'],
      posts: [
        {
          author: 'Selin',
          handle: '@selinizliyor',
          body: 'Fotoğraf ayrıntısı teoriyi tamamen değiştiriyor.',
          time: 'şimdi',
        },
        {
          author: 'Bora',
          handle: '@borakare',
          body: 'Saat detayı yüzünden çoğunluğa katılamıyorum.',
          time: '1 dk.',
        },
        {
          author: 'Dizi Arası',
          handle: '@diziarasi',
          body: 'Yönetmenin geçen haftaki röportajı bu sahneye başka bir anlam katıyor.',
          time: '2 dk.',
        },
      ],
    },
    cta: {
      label: "NSosyal'da Devam Et",
      memberLabel: 'Tartışmaya Katıl',
      transitionTitle: 'Bu konuşma kaldığın yerde hazır',
      transitionBody:
        'NSosyal’a geçtiğinde aynı bölüm, aynı tepkin ve açtığın bütün bakış açıları seni bekleyecek.',
    },
  },
  {
    id: 'debate',
    sourceType: 'Canlı tartışma',
    sourceLabel: 'Kent Gündemi · Canlı yayın',
    sourceDetail: 'Programda görüşler karşı karşıya',
    icon: 'podcasts',
    accent: 'blue',
    headline: 'Sizce şehir merkezi hafta sonu araç trafiğine kapanmalı mı?',
    hook: 'Program konuyu ekonomi ve trafik üzerinden tartışıyor. NSosyal’da yayını izleyenler erişim, esnaf ve kamusal alan taraflarını birlikte konuşuyor.',
    momentLabel: 'Canlı yayın · 31. dakika',
    visualTitle: 'Şehir merkezinin hafta sonu kullanımı',
    visualDetail: 'Ekrandaki tartışmanın etrafında oluşan farklı görüşler burada buluşuyor.',
    tags: ['Kent yaşamı', 'Ulaşım', 'Yerel esnaf'],
    reaction: {
      question: 'Sana en yakın yaklaşım hangisi?',
      helper: 'Seçimin kayıt veya üyelik gerektirmez.',
      options: [
        {
          id: 'pilot',
          label: 'Önce kademeli pilot uygulansın',
          shortLabel: 'Kademeli pilot',
          percentage: 47,
        },
        {
          id: 'close',
          label: 'Hafta sonu tamamen kapansın',
          shortLabel: 'Tamamen kapansın',
          percentage: 29,
        },
        {
          id: 'open',
          label: 'Araç trafiğine açık kalsın',
          shortLabel: 'Açık kalsın',
          percentage: 24,
        },
      ],
    },
    pulse: {
      participantCount: '9.760',
      recentDelta: '+1.090',
      summary: 'En güçlü ortak görüş, karar öncesinde ölçülebilir bir pilot uygulama yapılması.',
      nuance:
        'Tam kapanmayı destekleyenlerle karşı çıkanlar, toplu taşımanın güçlendirilmesi konusunda aynı noktada buluşuyor.',
    },
    perspectives: [
      {
        id: 'debate-perspective-1',
        author: 'Derya Kılıç',
        handle: '@deryakent',
        tone: 'blue',
        label: 'Esnaf bakışı',
        body: 'Kapanma tek başına çözüm değil. Teslimat saatleri ve kısa süreli park alanları planlanmadan küçük işletmeler zorlanır.',
        engagement: '728 yanıt',
      },
      {
        id: 'debate-perspective-2',
        author: 'Yaya Şehir',
        handle: '@yayasehir',
        tone: 'cyan',
        label: 'Kamusal alan',
        body: 'Pilot hafta sonunda yaya sayısı ve esnaf cirosu birlikte ölçülürse tartışma varsayımlardan çıkıp veriye dayanabilir.',
        engagement: '1.041 yanıt',
      },
      {
        id: 'debate-perspective-3',
        author: 'Emre Soy',
        handle: '@emresoy',
        tone: 'violet',
        label: 'Erişim kaygısı',
        body: 'Hareket kısıtlılığı olanlar için merkeze erişim çözülmeden “herkes için meydan” demek eksik kalıyor.',
        engagement: '892 yanıt',
      },
    ],
    overlooked: {
      kicker: 'Programda henüz konuşulmayan',
      title: 'Erişilebilir ulaşım, iki tarafın da ortak eksik noktası',
      body: 'NSosyal’daki konuşmada yükselen başlık, kapanma kararından önce erişilebilir ring hattı ve engelsiz durakların planlanması gerektiğini gösteriyor.',
      metric: 'Erişilebilirlik başlığı 18 dakikada 1.420 katkı aldı',
      icon: 'accessible_forward',
    },
    live: {
      activeCount: '4.210 kişi',
      recentDelta: 'Son 10 dakikada +1.870 gönderi',
      clusters: ['Pilot uygulama', 'Esnaf lojistiği', 'Erişilebilir ring'],
      posts: [
        {
          author: 'Nehir',
          handle: '@nehiryazar',
          body: 'Program iki seçenek konuşuyor, oysa iyi tasarlanmış bir pilot üçüncü yol olabilir.',
          time: 'şimdi',
        },
        {
          author: 'Kent Notları',
          handle: '@kentnotlari',
          body: 'Benzer uygulamalarda teslimat saatleri nasıl çözülmüş, örnekleri topladım.',
          time: '1 dk.',
        },
        {
          author: 'Murat',
          handle: '@muratyerel',
          body: 'Erişilebilirlik başlığının yayında da sorulmasını istiyorum.',
          time: '3 dk.',
        },
      ],
    },
    cta: {
      label: 'Canlı Akışı Aç',
      memberLabel: 'Görüşünü Paylaş',
      transitionTitle: 'Canlı tartışma NSosyal’da sürüyor',
      transitionBody:
        'Aynı konu başlığına, gördüğün karşıt görüşlere ve seçtiğin yaklaşıma doğrudan döneceksin.',
    },
  },
  {
    id: 'city',
    sourceType: 'Şehir ilanı',
    sourceLabel: 'Ankara · Açık hava gündemi',
    sourceDetail: 'Ankara’dan görüşler canlı akıyor',
    icon: 'location_city',
    accent: 'cyan',
    headline: 'Ankara bugün bunu konuşuyor.',
    hook: 'Gece ulaşımının hafta sonları 02.00’ye kadar uzatılması öneriliyor. Şehirde yaşayanların öncelikleri aynı değil.',
    momentLabel: 'Kızılay · Bugün',
    visualTitle: 'Gece ulaşımı nasıl devam etmeli?',
    visualDetail: 'Ankara’daki gerçek zamanlı yerel konuşma burada büyüyor.',
    tags: ['Ankara', 'Gece ulaşımı', 'Şehir yaşamı'],
    reaction: {
      question: 'Gece seferleri için en doğru başlangıç ne?',
      helper: 'Şehrin nabzını görmek için sana yakın seçeneği işaretle.',
      options: [
        {
          id: 'core',
          label: 'Ana hatlarda her gece uzatılsın',
          shortLabel: 'Ana hatlar',
          percentage: 51,
        },
        {
          id: 'weekend',
          label: 'Önce hafta sonu denensin',
          shortLabel: 'Hafta sonu',
          percentage: 34,
        },
        {
          id: 'other',
          label: 'Önce başka ulaşım sorunları çözülsün',
          shortLabel: 'Başka öncelikler',
          percentage: 15,
        },
      ],
    },
    pulse: {
      participantCount: '12.680',
      recentDelta: '+860',
      summary: 'Katılımcıların yarısından fazlası ana hatlarda düzenli gece seferini destekliyor.',
      nuance:
        'Hafta sonu pilotunu seçenler güvenlik ve talep verisi görülmeden kalıcı karar verilmemesini istiyor.',
    },
    perspectives: [
      {
        id: 'city-perspective-1',
        author: 'Ankara Gece',
        handle: '@ankaragece',
        tone: 'cyan',
        label: 'Çalışanların sesi',
        body: 'Gece seferi yalnızca eğlence değil; vardiyası 00.00’da biten binlerce kişi için eve dönüş meselesi.',
        engagement: '1.506 yanıt',
      },
      {
        id: 'city-perspective-2',
        author: 'Ozan Berk',
        handle: '@ozanberk',
        tone: 'blue',
        label: 'Mahalle bağlantısı',
        body: 'Metro saatini uzatmak yetmez. Son duraktan mahallelere güvenli ring olmazsa çözüm yarım kalır.',
        engagement: '934 yanıt',
      },
      {
        id: 'city-perspective-3',
        author: 'Sade Şehir',
        handle: '@sadesehir',
        tone: 'violet',
        label: 'Kademeli yaklaşım',
        body: 'Üç hafta sonu boyunca talebi ölçüp hatları veriye göre büyütmek hem bütçe hem erişim açısından daha gerçekçi.',
        engagement: '688 yanıt',
      },
    ],
    overlooked: {
      kicker: 'Gözden kaçan ihtiyaç',
      title: 'Gece ulaşımını en çok vardiyalı çalışanlar konuşuyor',
      body: 'Yerel konuşmalarda hastane, lojistik ve hizmet sektörü çalışanlarının paylaşımları hızla artıyor. Konu yalnızca hafta sonu eğlencesi değil.',
      metric: 'Vardiyalı çalışanlardan son bir saatte 2.060 katkı',
      icon: 'nightlife',
    },
    live: {
      activeCount: '5.530 kişi',
      recentDelta: 'Son 10 dakikada +2.240 gönderi',
      clusters: ['Gece metrosu', 'Mahalle ringleri', 'Vardiyalı çalışanlar'],
      posts: [
        {
          author: 'Aslı',
          handle: '@aslivardiya',
          body: 'Hastaneden gece çıkınca iki araç değiştirmek zorunda kalıyorum.',
          time: 'şimdi',
        },
        {
          author: 'Başkent Rota',
          handle: '@baskentrota',
          body: 'Ana hat + talebe göre ring modeli için örnek bir rota çıkardık.',
          time: '2 dk.',
        },
        {
          author: 'Can',
          handle: '@cankentte',
          body: 'Hafta sonu pilotu hızlıca ölçülebilir bir başlangıç olur.',
          time: '3 dk.',
        },
      ],
    },
    cta: {
      label: 'Ankara Konuşmasına Katıl',
      memberLabel: 'Yerel Akışta Paylaş',
      transitionTitle: 'Ankara konuşması senin seçiminle açılıyor',
      transitionBody:
        'NSosyal’a geçtiğinde genel ana sayfa yerine doğrudan bu yerel konuşmaya döneceksin.',
    },
  },
  {
    id: 'launch',
    sourceType: 'Teknoloji etkinliği',
    sourceLabel: 'Afet iletişim cihazı · Canlı tanıtım',
    sourceDetail: 'Canlı tanıtım sürüyor',
    icon: 'cell_tower',
    accent: 'blue',
    headline: 'Bu teknolojide ilk öncelik ne olmalı?',
    hook: 'Yeni taşınabilir iletişim cihazı, altyapının kesildiği anlarda bağlantı kurmayı hedefliyor. Etkinlikteki izleyiciler hangi özelliğin önce gelmesi gerektiğini tartışıyor.',
    momentLabel: 'Canlı tanıtım · Demo alanı',
    visualTitle: 'Bağlantı yokken iletişim',
    visualDetail:
      'Teknik sunum, kullanıcı ihtiyaçları ve saha deneyimleriyle birlikte tartışılıyor.',
    tags: ['Afet iletişimi', 'Saha deneyimi', 'Erişilebilir teknoloji'],
    reaction: {
      question: 'Sence ilk öncelik hangisi?',
      helper: 'Topluluğun teknik özelliklerden önce neye değer verdiğini gör.',
      options: [
        {
          id: 'coverage',
          label: 'Daha geniş kapsama alanı',
          shortLabel: 'Kapsama',
          percentage: 43,
        },
        { id: 'battery', label: 'Daha uzun pil ömrü', shortLabel: 'Pil ömrü', percentage: 35 },
        {
          id: 'simple',
          label: 'Herkes için kolay kullanım',
          shortLabel: 'Kolay kullanım',
          percentage: 22,
        },
      ],
    },
    pulse: {
      participantCount: '7.340',
      recentDelta: '+740',
      summary:
        'Kapsama alanı öne çıkıyor; pil ömrü ise saha deneyimi olan kullanıcıların ilk tercihi.',
      nuance:
        'Kolay kullanım daha düşük görünse de erişilebilirlik konuşmalarında en hızlı yükselen başlık.',
    },
    perspectives: [
      {
        id: 'launch-perspective-1',
        author: 'Saha Haberleşme',
        handle: '@sahahaberlesme',
        tone: 'blue',
        label: 'Saha deneyimi',
        body: 'Kapsama önemli ama 48 saat çalışmayan bir cihaz kritik anda yük olur. Pil değişimi ve şarj standardı açıkça anlatılmalı.',
        engagement: '746 yanıt',
      },
      {
        id: 'launch-perspective-2',
        author: 'Erişilebilir Tekno',
        handle: '@erisilebilirtekno',
        tone: 'cyan',
        label: 'Kullanım kolaylığı',
        body: 'Ekranı okuyamayan veya eldivenle çalışan biri cihazı tek başına kullanabiliyor mu? Başarı ölçütü bu da olmalı.',
        engagement: '581 yanıt',
      },
      {
        id: 'launch-perspective-3',
        author: 'Açık Standart',
        handle: '@acikstandart',
        tone: 'violet',
        label: 'Birlikte çalışabilirlik',
        body: 'Farklı ekiplerin cihazları birbiriyle konuşamıyorsa en iyi donanım bile ortak sahada sınırlı kalır.',
        engagement: '690 yanıt',
      },
    ],
    overlooked: {
      kicker: 'Sunumda kısa geçilen',
      title: 'Cihazın gücü kadar açık standartlarla çalışması da tartışılıyor',
      body: 'NSosyal’daki teknik topluluklar, farklı kurumların aynı sahada ortak ağ kurabilmesini ürünün gizli başarı ölçütü olarak öne çıkarıyor.',
      metric: 'Birlikte çalışabilirlik başlığı 24 dakikada 980 katkı aldı',
      icon: 'hub',
    },
    live: {
      activeCount: '3.180 kişi',
      recentDelta: 'Son 10 dakikada +1.260 gönderi',
      clusters: ['Pil standardı', 'Açık protokol', 'Erişilebilir kullanım'],
      posts: [
        {
          author: 'İpek',
          handle: '@ipeksahada',
          body: 'Değiştirilebilir pil detayı gerçek saha koşullarında çok kritik.',
          time: 'şimdi',
        },
        {
          author: 'Mühendis Notu',
          handle: '@muhendisnotu',
          body: 'Açık protokol dokümanı yayınlanırsa topluluk çok hızlı katkı verir.',
          time: '1 dk.',
        },
        {
          author: 'Deniz',
          handle: '@denizerisim',
          body: 'Fiziksel tuş ve sesli yönlendirme seçeneklerini de görmeliyiz.',
          time: '2 dk.',
        },
      ],
    },
    cta: {
      label: "Canlı Akışı NSosyal'da Aç",
      memberLabel: 'Teknik Tartışmaya Katıl',
      transitionTitle: 'Teknik konuşma kaldığın yerden sürüyor',
      transitionBody:
        'Seçtiğin öncelik ve açtığın saha görüşleri aynı bağlam merkezi içinde hazır olacak.',
    },
  },
])

export const campaignContextIds = Object.freeze(campaignContexts.map((context) => context.id))

export const campaignReactionOptionIds = Object.freeze(
  Object.fromEntries(
    campaignContexts.map((context) => [
      context.id,
      Object.freeze(context.reaction.options.map((option) => option.id)),
    ]),
  ),
)

export function resolveCampaignContextId(value) {
  return campaignContextIds.includes(value) ? value : campaignContextIds[0]
}

export function getCampaignContext(value) {
  const contextId = resolveCampaignContextId(value)
  return campaignContexts.find((context) => context.id === contextId)
}

export function campaignEntryLocation(contextId, mode = CAMPAIGN_ENTRY_MODES.visitor, query = {}) {
  const resolvedId = resolveCampaignContextId(contextId)

  if (mode === CAMPAIGN_ENTRY_MODES.member) {
    return {
      name: 'campaign-context-hub',
      params: { contextId: resolvedId },
      query: { source: 'qr', ...query },
    }
  }

  return {
    name: 'campaign',
    query: { context: resolvedId, mode: CAMPAIGN_ENTRY_MODES.visitor, ...query },
  }
}
