// GEÇİCİ: /psikolog sayfasıyla aynı sebepten (blog CMS'i ile uyumsuz)
// elle oluşturuldu. Panelden yönetilmiyor.
// Kaynakça ve altındaki bölümler (yazar hakkında, sorumluluk reddi)
// kullanıcı isteğiyle dahil edilmedi.

export const metaTitle = "İstanbul Psikolog ve Terapi Hizmetleri | Psk. Mert Koçak";
export const metaDescription =
  "İstanbul psikolog ararken uzman seçimi, ücret, ilçe erişimi ve seans saati nasıl planlanır? Etiler'deki klinikten yol haritası. Psk. Mert Koçak.";

export const heroEyebrow = "Rehber";
export const heroTitle = "İstanbul Psikolog: Terapi Süreci, Ücretler ve Uzman Seçimi";
export const breadcrumbLabel = "İstanbul Psikolog";

export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: FaqItem[] = [
  {
    question: "İstanbul'da psikolog ücretleri ne kadar?",
    answer:
      "2026 yılında İstanbul'da bireysel seans ücretleri genel olarak yaklaşık 3.000-8.000 TL aralığında değişkenlik göstermektedir. İstanbul, ülke genelindeki bandın üst tarafında yer alır; ilçe, kurum tipi, seans süresi ve uzmanın ekol eğitimleri bu aralık içindeki yeri belirler. Çift ve aile seansları süre farkı nedeniyle daha yüksek konumlanır. Bu bir bant bilgisidir, doğrulanmış bir ortalama değildir.",
  },
  {
    question: "İstanbul'da psikoloğa gitmek için hangi ilçede olmak gerekir?",
    answer:
      "Belirli bir ilçede oturma zorunluluğu yoktur, ancak ulaşım süresi terapinin devamlılığını doğrudan etkiler. Kliniğe yakın bölgelerden (Beşiktaş, Etiler, Levent, Nişantaşı, Şişli, Sarıyer) yüz yüze seans pratiktir. Ulaşımın uzun sürdüğü ilçelerden gelenler için yaygın çözüm, sürecin bir kısmını online yürütmektir.",
  },
  {
    question: "İstanbul'da akşam veya cumartesi seans bulunur mu?",
    answer:
      "Bulunur, ancak İstanbul'da en çok talep gören ve en hızlı dolan aralık budur. Çalışan danışanların çoğu 18.00 sonrasını istediği için akşam slotları sınırlıdır. Klinikte çalışma saatleri hafta içi 09.00-20.00, cumartesi 10.00-16.00'dır. Süreç boyunca aynı sabit saatte devam etmek, her hafta yeniden saat aramaktan daha sürdürülebilir olur.",
  },
  {
    question: "Anadolu yakasından Etiler'e gelmek mantıklı mı?",
    answer:
      "Haftalık düzenli bir seans için köprü geçişi çoğu kişide sürdürülebilir olmuyor; birkaç hafta sonra iptaller başlıyor. Uygulamada işe yarayan düzen şudur: süreç online yürütülür, belirli aşamalarda yüz yüze görüşme planlanır. Karar mesafeye değil, sizin o yolu üç ay boyunca her hafta yapıp yapamayacağınıza göre verilmelidir.",
  },
  {
    question: "İstanbul'da psikolog seçerken nelere dikkat etmeliyim?",
    answer:
      "Beş şeye bakın: lisans ve yüksek lisans bilgisi, çalıştığı ekol ve aldığı eğitimler, sizin konunuzda deneyimi, seans çerçevesinin (süre, ücret, iptal koşulları) baştan net konuşulması ve ulaşabileceğiniz bir mesafede olması. Unvan yerine eğitim geçmişini sorun; İstanbul'da tabelalarda çok çeşitli unvanlar kullanılıyor ve hepsi klinik yetkinlik anlamına gelmiyor.",
  },
];

// GEÇİCİ NOT — bu sayfadaki linkler:
// - bireysel-terapi, evlilik-iliski-terapisi (cift-terapisi düzeltildi),
//   depresyon-terapisi (depresyon-tedavisi düzeltildi), kaygi-bozukluklari
//   (anksiyete-tedavisi düzeltildi, 2 yerde), psikolog: sitede var, link kaldı.
// - Şu an sitede olmayanlar (aile-terapisi, panik-atak-tedavisi [2 yerde],
//   cocuk-psikologu, psikoterapi, online-terapi [2 yerde], klinik-psikolog,
//   psikolog-randevu [2 yerde], etiler-psikolog) düz metne çevrildi —
//   sayfalar eklenince tekrar linklenecek.
// - "KATMAN LİNKLERİ" olarak yorumlanmış gelecekteki İstanbul+konu
//   sayfalarına (istanbul-bireysel-terapi vb.) hiç yer verilmedi, kaynakta
//   zaten yorum satırıydı.
export const articleHtml = `
<p class="lead"><strong>İstanbul'da psikolog ararken üç şey belirleyicidir: uzmanın unvanı ve klinik eğitimi, çalışma alanının sizin konunuzla örtüşmesi ve seansa düzenli gelebileceğiniz bir ulaşım mesafesi. Bu şehirde üçüncü madde sanıldığından çok daha kritiktir; terapide sonucu belirleyen en güçlü değişken devamlılıktır ve İstanbul'da devamlılığı en çok yol kırar.</strong></p>

<p>Terapinin ne olduğunu, kimin ne yaptığını ve süreçte neler olduğunu <a href="/psikolog">psikolog nedir, ne iş yapar</a> rehberinde ayrıntılı anlattım. Bu sayfa onun tekrarı değil: burada yalnızca <strong>İstanbul'da yaşayan biri için değişen şeyleri</strong> yazıyorum — ulaşımın süreci nasıl etkilediği, seans saatinin nasıl seçileceği, ücretin şehirde nasıl konumlandığı, hangi ilçeden nasıl gelindiği ve bu şehre özgü başvuru nedenleri.</p>

<h2>İstanbul psikolog arayışında ilk soru: hangi uzmana gitmeli?</h2>

<p>İstanbul'da arama yaptığınızda karşınıza önce dizin siteleri ve randevu platformları çıkar; bunların sıralaması uzmanlık uyumuna değil, platform içi görünürlüğe göre kurulur. Bu yüzden ilk eleme sizde olmalı.</p>

<p>Pratik sıralama şu: <strong>tabloya tıbbi bir yön eşlik ediyorsa</strong> — ilaç kullanımı, yatarak tedavi geçmişi, ağır işlevsellik kaybı — psikiyatri hekimiyle başlamak daha doğrudur. <strong>Konu ağırlıkla psikolojik süreçse</strong> — ilişki sorunları, kaygı, motivasyon, yas, iletişim — psikoterapiyle başlanır. Unvanların tam ayrımını ve kimin neye yetkili olduğunu klinik psikolog ve psikoterapist farkı yazısında ele aldım.</p>

<p>İstanbul'a özgü bir uyarı: bu şehirde tabelalarda ve profil sayfalarında çok çeşitli unvanlar kullanılıyor ve hepsi klinik yetkinliği tanımlamıyor. Türkiye'de tıbbi tanı koyma ve reçete yazma yetkisi <em>1219 sayılı Kanun</em> ile hekimlere aittir. Karşınızdaki kişiye <strong>hangi bölümden lisans aldığını ve yüksek lisansının olup olmadığını</strong> sormak en hızlı doğrulama yoludur.</p>

<h2>İstanbul psikolog seçiminde ulaşım neden belirleyici?</h2>

<p>Bu, İstanbul'da terapiyle ilgili en az konuşulan ama en çok fark yaratan konu. Danışma odasında yıllar içinde gördüğüm örüntü şu: <strong>süreç genellikle motivasyon bittiği için değil, yol bittiği için yarım kalıyor.</strong></p>

<p>Mekanizma basit. Terapinin işe yaraması düzenli devama bağlıdır; düzenli devam ise haftalık olarak tekrarlanabilir bir yük gerektirir. Tek yönü kırk beş dakika olan bir yol, elli dakikalık seans için haftada iki saatlik bir taahhüt demektir. İlk üç hafta yapılır. Yoğun bir hafta, yağmurlu bir gün ya da kötü bir gün geldiğinde ilk iptal olur — ve terapide <strong>iptal edilen seans, yapılmamış seanstır.</strong></p>

<blockquote>
  <p>Danışanlara sık sorduğum soru şu: "Bu yolu, kendinizi en kötü hissettiğiniz hafta da yapabilir misiniz?" Çünkü terapiye en çok ihtiyaç duyulan hafta, tam olarak gelmenin en zor olduğu haftadır.</p>
</blockquote>

<p>Bunun pratik sonucu şu: İstanbul'da uzman seçerken mesafeyi bir konfor kriteri değil, <strong>tedavi kriteri</strong> olarak değerlendirin. İki seçenek arasında kalıyorsanız, size daha yakın olanı seçmek çoğu zaman daha iyi bir klinik karardır.</p>

<h2>İstanbul psikolog randevusu için hangi saat aralığı işe yarar?</h2>

<p>Seans saati, İstanbul'da başlı başına bir planlama konusu. Üç aralığın kendine göre mantığı var:</p>

<table>
  <caption>Seans saati seçenekleri ve İstanbul'daki karşılığı</caption>
  <thead>
    <tr><th>Aralık</th><th>Kimin için işler</th><th>Dikkat edilecek</th></tr>
  </thead>
  <tbody>
    <tr><td>Sabah 09.00-11.00</td><td>Esnek çalışanlar, ev düzeni uygun olanlar</td><td>Trafiğin en yoğun olduğu saatlerden çıkmak gerekir</td></tr>
    <tr><td>Öğle arası 12.00-14.00</td><td>Levent, Maslak, Zincirlikuyu ve Şişli hattında çalışanlar</td><td>Seans öncesi ve sonrası için toplam süreyi baştan hesaplayın</td></tr>
    <tr><td>Akşam 18.00-20.00</td><td>Standart mesai düzeni</td><td>En çok talep gören, en hızlı dolan aralık</td></tr>
    <tr><td>Cumartesi 10.00-16.00</td><td>Hafta içi hiç uygun olmayanlar, çiftler</td><td>Sınırlı sayıda slot; süreklilik için sabit saat önerilir</td></tr>
  </tbody>
</table>

<p>Klinikte çalışma saatleri hafta içi <strong>09.00-20.00</strong>, cumartesi <strong>10.00-16.00</strong>. Deneyimime dayalı tek öneri: sürecin başında bir saat seçip <em>onu sabitleyin</em>. Her hafta yeniden saat aramak, İstanbul'da terapiyi bırakmanın en sessiz yoludur.</p>

<h2>İki yaka, tek klinik: Etiler'e nereden nasıl gelinir?</h2>

<p>Klinik <strong>Beşiktaş Etiler</strong>'de, Nisbetiye Caddesi hattında. Aşağıdaki tablo, ilçelere göre pratikte ne önerdiğimi gösteriyor — süre tahmini vermiyorum, çünkü İstanbul'da süre saate göre değişir ve yanıltıcı olur.</p>

<table>
  <caption>İlçelere göre pratik öneri</caption>
  <thead>
    <tr><th>Bölge</th><th>İlçeler</th><th>Pratikte işleyen</th></tr>
  </thead>
  <tbody>
    <tr><td>Klinik çevresi</td><td>Etiler, Nisbetiye, Beşiktaş, Levent, Bebek, Ortaköy</td><td>Yüz yüze; yürüme veya kısa araç mesafesi</td></tr>
    <tr><td>Yakın hat</td><td>Nişantaşı, Şişli, Mecidiyeköy, Zincirlikuyu, Sarıyer, Maslak</td><td>Yüz yüze; metro ve otobüs hatları elverişli</td></tr>
    <tr><td>Avrupa yakası geneli</td><td>Bakırköy, Beyoğlu, Fatih, Kağıthane, Eyüpsultan, Başakşehir, Beylikdüzü</td><td>Karma düzen: seansların bir kısmı online</td></tr>
    <tr><td>Anadolu yakası</td><td>Kadıköy, Üsküdar, Ataşehir, Ümraniye, Maltepe, Kavacık, Bostancı</td><td>Ağırlıkla online; belirli aşamalarda yüz yüze planlama</td></tr>
    <tr><td>Şehir dışı ve yurt dışı</td><td>—</td><td>Tamamen online</td></tr>
  </tbody>
</table>

<p>Anadolu yakasıyla ilgili dürüst olmak gerekirse: haftalık düzenli bir seans için köprü geçişi çoğu kişide sürdürülebilir olmuyor. Birkaç hafta iyi gidiyor, sonra iptaller başlıyor. Bu yüzden Anadolu yakasından gelen danışanlarla genellikle süreci online kuruyor, belirli aşamalarda yüz yüze görüşme planlıyoruz.</p>

<h2>Hangi konuda destek arıyorsunuz?</h2>

<p>İstanbul'dan gelen başvurularda konu başlıkları şöyle dağılıyor. Her başlığın kendi sayfasında sürecin nasıl işlediğini ayrıntılı anlattım:</p>

<table>
  <caption>Çalışma alanları ve ilgili sayfalar</caption>
  <thead>
    <tr><th>Konu</th><th>Ne zaman bu başlıkla başlanır</th></tr>
  </thead>
  <tbody>
    <tr><td><a href="/bireysel-terapi">Bireysel terapi</a></td><td>Zorlanma ağırlıkla kişinin kendi iç dünyasındaysa</td></tr>
    <tr><td><a href="/evlilik-iliski-terapisi">Çift terapisi</a></td><td>Sorun iki yetişkin arasındaki ilişkideyse</td></tr>
    <tr><td>Aile terapisi</td><td>Hane düzeni, ebeveynlik veya kuşaklar arası çatışma varsa</td></tr>
    <tr><td><a href="/depresyon-terapisi">Depresyon tedavisi</a></td><td>Enerji, ilgi ve işlevsellik belirgin biçimde düştüyse</td></tr>
    <tr><td><a href="/kaygi-bozukluklari">Anksiyete tedavisi</a></td><td>Kaygı hayat alanını daraltmaya başladıysa</td></tr>
    <tr><td>Panik atak tedavisi</td><td>Ataklar tekrarlıyor ve yeni atak korkusu yerleştiyse</td></tr>
    <tr><td>Çocuk psikoloğu</td><td>Çocuk veya ergende süreklilik gösteren bir zorlanma varsa</td></tr>
    <tr><td>Terapi nedir, nasıl işler</td><td>Süreci ve ekolleri genel olarak anlamak istiyorsanız</td></tr>
    <tr><td>Online terapi</td><td>Yüz yüze gelmek pratik değilse</td></tr>
  </tbody>
</table>

<p>Hangi başlığa bakacağınızdan emin olmanız gerekmiyor; bu ayrımı yapmak ön görüşmenin işi. Randevu sürecinin nasıl işlediğini psikolog randevusu nasıl alınır yazısında anlattım.</p>

<h2>Kalabalık, metro ve trafik: İstanbul'a özgü tetikleyiciler</h2>

<p>Kaygı bozukluklarında tetikleyiciler kişinin yaşadığı şehre göre şekillenir ve İstanbul bu konuda kendine özgü bir ortam üretiyor. Sık gördüğüm dört örüntü:</p>

<ul>
  <li><strong>Metro ve metrobüs kalabalığı.</strong> Kapalı, yoğun ve çıkışın kontrolde olmadığı ortamlar panik tablolarında en sık kaçınılan yerler arasında.</li>
  <li><strong>Köprü ve tünel.</strong> "Durup inemem" hissi, ataklarda tipik bir tetikleyici; kaçınma haritası genellikle buradan büyümeye başlıyor.</li>
  <li><strong>Trafikte geçen sürenin öngörülemezliği.</strong> Kontrol kaybı hissi, kaygı ve öfke tablolarını birlikte besliyor.</li>
  <li><strong>Uzun yol ve düzensiz uyku.</strong> Ulaşımın günden çaldığı süre, uyku düzenini bozarak depresyon ve kaygı tablolarını dolaylı olarak ağırlaştırıyor.</li>
</ul>

<p>Bunun terapide iki karşılığı var. Birincisi, bu ortamların <strong>kaçınma listesine girip girmediği</strong> baştan taranır. İkincisi — ve İstanbul'un avantajı budur — kademeli maruz bırakma çalışmasında kullanılacak basamaklar zaten şehrin içinde hazır: iki duraklık metro, sakin saatte bir asansör, kalabalıklaşan bir cadde. Bu çalışmanın nasıl kurulduğunu <a href="/kaygi-bozukluklari">anksiyete tedavisi</a> sayfasında anlattım.</p>

<h2>Deprem kaygısı: İstanbul'da sık gelen bir başvuru nedeni</h2>

<p>Bu başlık, İstanbul'u diğer şehirlerden ayıran ve son yıllarda başvurularda belirgin biçimde artan bir konu. Önce net bir cümle: <strong>deprem kaygısı, gerçek bir riske verilen anlaşılır bir tepkidir; kendi başına bir hastalık değildir.</strong> Hazırlıklı olmayı sağlayan kaygı işlevseldir.</p>

<p>Değerlendirme gerektiren nokta, kaygının işlevsel olmaktan çıktığı yerdir:</p>

<ul>
  <li>Uykuya dalmakta zorlanma, giyinik uyuma, gece sık uyanma</li>
  <li>Sarsıntı olmadığı hâlde sarsıntı hissetme, sürekli tetikte olma</li>
  <li>Belirli binalara, katlara veya kapalı alanlara girememe</li>
  <li>Haber ve sosyal medya takibinin saatler alması, bırakılamaması</li>
  <li>Çocuklarda okula gitmeme, ebeveynden ayrılamama, gerileme belirtileri</li>
</ul>

<p>Bunlar günlük işlevselliği etkilemeye başladıysa değerlendirme yerinde olur. T.C. Sağlık Bakanlığı da deprem sonrası ruh sağlığı bilgilendirmelerinde, belirtilerin iş, aile ve sosyal hayatı etkilemesi durumunda profesyonel destek alınmasını öneriyor. Tabloya panik atak eşlik ediyorsa panik atak tedavisi sayfası süreci ayrıntılı anlatıyor.</p>

<p>Terapide çalışılan şey riski yok saymak değildir — bu, işe yaramayan ve dürüst olmayan bir yaklaşım olurdu. Çalışılan şey ikisinin ayrılmasıdır: <em>hazırlık</em> (çanta, tatbikat, buluşma planı) kontrolü artırır ve kaygıyı düşürür; <em>kontrol arayışı</em> (sürekli haber takibi, güvence sorma) ise kısa vadede rahatlatıp uzun vadede kaygıyı büyütür.</p>

<h2>İstanbul psikolog ücretleri neye göre değişir?</h2>

<p>2026 yılında İstanbul'da bireysel seans ücretleri genel olarak yaklaşık <strong>3.000-8.000 TL</strong> aralığında değişkenlik göstermektedir. Bu bir bant bilgisidir, doğrulanmış bir ortalama değildir; kesin rakam için ilgili uzmandan bilgi alınmalıdır.</p>

<p>İstanbul'a özgü olan şu: şehir, ülke genelindeki bandın <strong>üst tarafında</strong> konumlanır. Bandın neresinde olunacağını belirleyen faktörler:</p>

<ul>
  <li><strong>İlçe.</strong> Merkezi ve yüksek kiralı bölgelerdeki klinikler bandın üstüne yakın seyreder. Bu bir kalite göstergesi değil, maliyet yansımasıdır.</li>
  <li><strong>Kurum tipi.</strong> Özel muayenehane, danışmanlık merkezi, hastane ve kamu kurumları farklı bantlarda yer alır.</li>
  <li><strong>Seans süresi ve tipi.</strong> Bireysel 50 dakika; çift 80-90 dakika; aile 60-90 dakika. Süre farkı doğrudan ücrete yansır.</li>
  <li><strong>Uzmanın ekol eğitimleri.</strong> EMDR, şema terapi gibi sertifikalı eğitimler uzun ve maliyetlidir.</li>
  <li><strong>Online veya yüz yüze.</strong> Online seanslar bazı uygulamalarda daha erişilebilir konumlanır.</li>
</ul>

<p>Bir uyarı: <strong>ücret tek başına kalite göstergesi değildir.</strong> Bandın üstünde olmak deneyim garantisi vermediği gibi, altında olmak da yetersizlik anlamına gelmez. Bakılacak şey fiyat değil, eğitim geçmişi ve konu uyumudur.</p>

<p>Bütçe bir engel oluşturuyorsa İstanbul'da erişilebilir kapılar görece güçlü: üniversitelerin psikoloji bölümlerine bağlı uygulama merkezleri, belediyelerin ücretsiz danışmanlık birimleri, devlet hastanelerinin psikiyatri poliklinikleri ve Toplum Ruh Sağlığı Merkezleri. Ayrıca <strong>ücretsiz ön görüşme</strong> sunuyorum; bu görüşme, ücretli bir sürece girmeden önce uyum olup olmadığını anlamanızı sağlar.</p>

<h2>İstanbul'da online psikolog mu, yüz yüze seans mı?</h2>

<p>Bu sorunun İstanbul'daki cevabı diğer şehirlerden farklı, çünkü denklemin içinde yol var. Basit bir hesap: tek yönü kırk beş dakika olan bir seans, elli dakikalık görüşme için yaklaşık iki saatlik bir haftalık taahhüt demektir. Aynı seansın online yapılması bu süreyi elli dakikaya indirir.</p>

<p>Bu yüzden İstanbul'da online tercihi bir kolaylık meselesi olmaktan çıkıp <strong>sürecin ayakta kalmasını sağlayan bir araca</strong> dönüşebiliyor. Öte yandan yüz yüze görüşmenin de kendine özgü kazanımları var ve bazı çalışmalar oda dışına taşar.</p>

<p>Pratikte kullandığım düzen şu: kliniğe yakın bölgelerde yaşayanlarla yüz yüze; uzak ilçelerden gelenlerle karma; şehir dışı ve yurt dışındaki danışanlarla tamamen online. Karar mesafeye değil, <em>sizin o yolu üç ay boyunca her hafta yapıp yapamayacağınıza</em> göre verilir. Online sürecin nasıl işlediğini online terapi yazısında anlattım.</p>

<h2>İyi bir İstanbul psikoloğu seçerken sorulacak beş soru</h2>

<p>Randevu almadan önce sorabileceğiniz, cevabı sizi bilgilendirecek beş soru:</p>

<ol>
  <li><strong>Hangi bölümden lisans aldınız, yüksek lisansınız var mı?</strong> Klinik yetkinliğin en doğrudan göstergesi budur.</li>
  <li><strong>Hangi ekolle çalışıyorsunuz?</strong> Bilişsel davranışçı terapi, EMDR, şema terapi gibi. Ekol, sürecin nasıl işleyeceğini belirler.</li>
  <li><strong>Benim konumda deneyiminiz var mı?</strong> Genel yetkinlik ile konu deneyimi farklı şeylerdir.</li>
  <li><strong>Seans süresi, ücreti ve iptal koşulları nedir?</strong> Bunların ilk görüşmede net konuşulması bir çerçeve göstergesidir.</li>
  <li><strong>Gerekirse psikiyatri yönlendirmesi yapıyor musunuz?</strong> Sınırını bilen ve yönlendiren uzman, güvenilir uzmandır.</li>
</ol>

<p>Bu soruları sormak kaba değil, yerinde bir davranıştır. Cevap vermekten rahatsız olan bir uzman, zaten aradığınız uzman değildir.</p>

<h2>Etiler psikolog: ilçe düzeyinde en yakın seçenek</h2>

<p>Klinik İstanbul'un tamamına hizmet veriyor, ancak fiziksel olarak <strong>Etiler</strong>'de bulunuyor. Etiler, Nisbetiye, Levent, Bebek ve Akatlar çevresinde oturuyor ya da bu hatta çalışıyorsanız, ulaşım süresi terapinin devamlılığını kolaylaştıran bir avantaja dönüşüyor.</p>

<p>Semtin kendi bağlamı — ulaşım, otopark, çevredeki iş merkezlerinden gelen danışan profili ve mesai sonrası seans planlaması — ayrı bir konu. Bunları Etiler psikolog sayfasında ilçe düzeyinde ayrıntılı anlattım.</p>

<h2>Nasıl başlanır?</h2>

<p>İstanbul'da yaşıyor ve terapi düşünüyorsanız ilk adım karmaşık değil: ücretsiz ön görüşmede konunuzu, uygun saat aralığınızı ve yüz yüze mi online mı ilerleyeceğimizi birlikte netleştiriyoruz. Klinik Beşiktaş Etiler'de, Nisbetiye Caddesi hattında; hafta içi 09.00-20.00, cumartesi 10.00-16.00 arasında çalışıyorum. Ücretsiz ön görüşme için <a href="/#contact">iletişim</a> bölümünden bana ulaşabilirsiniz.</p>
`;
