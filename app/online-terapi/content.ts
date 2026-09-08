// /psikolog, /istanbul-psikolog ve /etiler-psikolog sayfalarıyla aynı
// sebepten (blog CMS'i ile uyumsuz) elle oluşturuldu. Buradaki değerler
// `page.tsx`'te backend "SEO Sayfaları" panelinden (slug: online-terapi)
// çekilen içerik yoksa kullanılan YEDEK (fallback) içeriktir — panelde bu
// slug'a kayıt eklenirse orası önceliklidir.
// Kaynakça ve altındaki bölümler (yazar hakkında, sorumluluk reddi)
// kullanıcı isteğiyle dahil edilmedi.

export const metaTitle = "Online Terapi ve Online Psikolog | Klinik Psk. Mert Koçak";
export const metaDescription =
  "Online terapi nedir, yüz yüze kadar etkili mi, kimler için uygun ve online psikolog seçerken nelere bakmalı? Kanıtlarla anlatıyorum. Mert Koçak.";

export const heroEyebrow = "Rehber";
export const heroTitle = "Online Terapi Nedir, Yüz Yüze Kadar Etkili mi?";
export const breadcrumbLabel = "Online Terapi";

export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: FaqItem[] = [
  {
    question: "Online terapi yüz yüze kadar etkili mi?",
    answer:
      "Videokonferansla yürütülen bilişsel davranışçı terapiyi inceleyen 16 randomize kontrollü çalışma ve 1.745 katılımcılık bir meta-analiz, orta düzeyde etki bulmuş (g = −0,49) ve bu sonucun yüz yüze BDT'de bildirilenlere çok benzediğini belirtmiştir. Ancak belirli tablolarda araştırma sayısı hâlâ sınırlıdır.",
  },
  {
    question: "Online terapi kimler için uygun değildir?",
    answer:
      "Kendine zarar verme riski veya akut kriz varsa, tıbbi arındırma gerektiren bir bağımlılık tablosu söz konusuysa, evde mahrem bir alan bulunamıyorsa ya da bedensel muayene gerekiyorsa yüz yüze çerçeve tercih edilmelidir. Bu durumlarda süreç genellikle karma yürütülür.",
  },
  {
    question: "Online psikolog seçerken nelere bakmalıyım?",
    answer:
      "Beş şeyi randevu öncesinde öğrenin: uzmanın unvanı, çalıştığı ekol, aynı uzmanla devam edip edemeyeceğiniz, seans süresi ve iptal koşulları, gizlilik ve kayıt politikası. Bu bilgileri alamıyorsanız bu başlı başına bir sinyaldir.",
  },
  {
    question: "Online terapi seansı kaydedilir mi?",
    answer:
      "Uzaktan Sağlık Hizmetlerinin Sunumu Hakkında Yönetmelik'e göre seans, her iki tarafın açık rızası olmaksızın görüntülü veya sesli kayıt altına alınamaz. Rıza verilse dahi kayıtlar on iki aydan fazla saklanamaz. Uygulamamda seans kaydı alınmaz.",
  },
  {
    question: "Online terapi için ne gerekiyor?",
    answer:
      "Kararlı bir internet bağlantısı, kamerası ve mikrofonu çalışan bir cihaz ve kulaklık yeterlidir. Asıl gereklilik teknik değil mekânsaldır: seans boyunca kapısı kapanabilen, kimsenin girmeyeceği bir alan gerekir.",
  },
  {
    question: "Yurt dışından online terapi alabilir miyim?",
    answer:
      "Evet. Yurt dışında yaşayan Türkçe konuşan danışanlarla düzenli olarak çalışıyorum. Saat farkı için seans saati baştan sabitlenir ve bulunduğunuz ülkedeki acil durum numaraları ilk görüşmede birlikte not edilir.",
  },
  {
    question: "Online terapi ücretleri ne kadar?",
    answer:
      "2026 yılında İstanbul'da bireysel seans ücretleri genel olarak yaklaşık 3.000–8.000 TL aralığında değişkenlik göstermektedir. Online seans bazı uygulamalarda daha alt bantta konumlanır. Platformlarda ayrıca bir aracılık payı bulunur.",
  },
  {
    question: "Online danışmanlık ile online terapi arasında fark var mı?",
    answer:
      "Günlük dilde ikisi aynı anlamda kullanılıyor; fark hizmetin adında değil, onu veren kişinin unvanında. Online terapi, belirli bir ekole dayanan ve süreç olarak planlanan psikoterapiyi anlatır. Online danışmanlık daha geniş bir başlıktır; altında kimin, hangi eğitimle çalıştığını ayrıca sormak gerekir.",
  },
];

// GEÇİCİ NOT — link durumu: sitede gerçekten var olan sayfalara giden
// linkler düzeltilip korundu (depresyon-tedavisi -> depresyon-terapisi,
// anksiyete-tedavisi -> kaygi-bozukluklari, bireysel-terapi, istanbul-psikolog
// oldukları gibi zaten doğru). Anchor'lar da sitedeki gerçek id'lere
// düzeltildi (#hakkimda -> #about, #iletisim -> #contact). Sitede henüz
// var olmayan sayfalara (klinik-psikolog, psikolog-randevu,
// istanbul-online-terapi) giden linkler düz metne çevrildi — sayfalar
// eklenince tekrar linklenecek. Kaynakça/Yazar hakkında/Sorumluluk reddi
// bölümleri kullanıcı isteğiyle dahil edilmedi. SSS ayrı bir bölüm olarak
// (TherapyFaq bileşeniyle) gösterildiği için makale gövdesine tekrar
// eklenmedi.
export const articleHtml = `
<h2>Online terapi nedir?</h2>

<p>Online terapi, psikoterapi sürecinin görüntülü görüşme üzerinden yürütülmesidir. Yöntem, süre ve çerçeve yüz yüze seansla aynıdır: aynı ekol, aynı seans süresi, aynı gizlilik ilkesi. Değişen tek şey buluşma biçimidir. Mesaj ya da sohbet robotu üzerinden yürüyen uygulamalar bu tanımın dışındadır.</p>

<!-- GÖRSEL — dosya yüklendikten sonra yorumu kaldırın (kalite kapısı: her sayfada 1+ görsel)
<figure>
  <img src="/gorseller/online-terapi-gorusme-ekrani.jpg"
       alt="Online terapi seansı için hazırlanmış sessiz bir çalışma köşesi ve dizüstü bilgisayar"
       width="1200" height="800" loading="lazy" decoding="async">
  <figcaption>Online psikolog görüşmesi canlı ve görüntülü yürür; seans süresi ve çerçevesi yüz yüze seansla aynıdır.</figcaption>
</figure>
-->

<p>Son ayrımı özellikle vurgulamak istiyorum, çünkü &ldquo;online terapi&rdquo; başlığı altında birbirinden çok farklı şeyler pazarlanıyor: yapay zekâ sohbet uygulamaları, yazışma tabanlı destek paketleri, kayıtlı video kursları. Bunların bir kısmı işe yarar bir şey sunabilir ama <strong>hiçbiri psikoterapi değildir.</strong> Bu sayfada anlattığım şey, bir ruh sağlığı uzmanıyla canlı görüntülü olarak yürütülen seanslardır.</p>

<h2>Online terapi, online psikolog ve online danışmanlık aynı şey mi?</h2>

<p>Bu üç ifade günlük dilde çoğu zaman aynı şeyi anlatıyor: görüntülü görüşmeyle yürütülen psikolojik destek. Gerçek fark hizmetin adında değil, onu verenin unvanında. &ldquo;Psikolog&rdquo; ve &ldquo;klinik psikolog&rdquo; unvanları mevzuatla korunuyor; &ldquo;danışman&rdquo;, &ldquo;terapist&rdquo; ve &ldquo;koç&rdquo; ifadeleri ise tek başına bir eğitim güvencesi vermiyor.</p>

<dl>
  <dt>Online terapi</dt>
  <dd>Psikoterapinin görüntülü görüşmeyle yürütülen biçimi. Belirli bir ekole &mdash; bilişsel davranışçı terapi, EMDR gibi &mdash; dayanır ve tek görüşme değil, süreç olarak planlanır.</dd>

  <dt>Online psikolog</dt>
  <dd>Aramanın hizmete değil kişiye odaklandığı hâli. Burada bakılacak tek şey unvanın hangisi olduğudur: psikolog, klinik psikolog ya da psikiyatrist.</dd>

  <dt>Online danışmanlık</dt>
  <dd>Üçünün en geniş olanı. Rehberlik ve psikolojik danışmanlık mezunlarının verdiği hizmeti de, mevzuatta karşılığı bulunmayan koçluk türlerini de kapsayacak biçimde kullanılıyor. Bu yüzden başlığın kendisi değil, altındaki unvan bilgi veriyor.</dd>
</dl>

<p>Pratikte bu ayrım şuna karşılık geliyor: hangi ifadeyle arama yaptığınızın önemi yok, randevu almadan önce karşınızdaki kişinin unvanını ve hangi ekolle çalıştığını öğrenin. Online danışmanlık arayan danışanların bana en sık sorduğu soru da bu oluyor &mdash; &ldquo;kiminle görüşeceğimi nereden bileceğim?&rdquo;. Cevabı ücretsiz ön görüşmede netleşiyor.</p>

<h2>Online terapi yüz yüze kadar etkili mi?</h2>

<p>Bu sorunun cevabı artık tahmine dayanmıyor. Videokonferansla yürütülen bilişsel davranışçı terapiyi inceleyen bir sistematik derleme ve meta-analiz, <strong>16 randomize kontrollü çalışmayı ve 1.745 katılımcıyı</strong> bir araya getiriyor. Bulunan birleşik etki büyüklüğü <em>g</em>&nbsp;=&nbsp;&minus;0,49 &mdash; yani <strong>orta düzeyde bir etki.</strong></p>

<p>Bu rakamın asıl anlamı karşılaştırmada: araştırmacılar, buldukları etki büyüklüğünün depresyon ve kaygı için <strong>yüz yüze BDT'de bildirilen sonuçlara çok benzer</strong> olduğunu belirtiyor.</p>

<p>Şimdi rakiplerin çoğunun yazmadığı kısmı da yazayım, çünkü dürüstlük burada önemli: aynı çalışmanın yazarları <strong>belirli tablolarda hâlâ sınırlı sayıda araştırma bulunduğunu</strong> açıkça söylüyor. Derlemedeki 16 çalışmanın 10'u depresyon üzerine; yaygın kaygı bozukluğu, obsesif kompulsif bozukluk ve benzeri başlıklarda birer çalışma var. Yani &ldquo;online terapi her tabloda yüz yüzeyle birebir aynıdır&rdquo; demek verinin söylediğinden fazlasını söylemek olur.</p>

<p>Doğru cümle şu: <strong>bilişsel davranışçı çerçevede yürütülen, depresyon ve kaygı ağırlıklı süreçlerde online terapi güçlü bir seçenektir.</strong> Benim ekolüm de bilişsel davranışçı terapi ve EMDR; sitedeki <a href="/depresyon-terapisi">depresyon</a> ve <a href="/kaygi-bozukluklari">kaygı bozukluğu</a> başlıkları da tam bu alana denk düşüyor.</p>

<h2>Kimler için uygun, kimler için değil?</h2>

<p>Bu yöntemi savunurken sınırlarını gizlemek, sonunda danışana zarar veriyor. Ayrım şu:</p>

<table>
  <caption>Online seansın uygunluğu</caption>
  <thead>
    <tr><th>Uygun</th><th>Yüz yüze tercih edilmeli</th></tr>
  </thead>
  <tbody>
    <tr><td>Kaygı, panik, depresyon ağırlıklı süreçler</td><td>Kendine zarar verme riski veya akut kriz</td></tr>
    <tr><td>İlişki, iletişim ve bağlanma çalışmaları</td><td>Tıbbi arındırma gerektiren bağımlılık tabloları</td></tr>
    <tr><td>Şehir dışı, yurt dışı, yoğun mesai düzeni</td><td>Evde mahrem bir alan bulunamaması</td></tr>
    <tr><td>Ulaşımın süreci kesintiye uğrattığı durumlar</td><td>Bedensel muayene gerektiren değerlendirmeler</td></tr>
    <tr><td>Kliniğe gelmeyi zorlaştıran fiziksel engel</td><td>Küçük yaş grubuyla yürütülen oyun temelli çalışmalar</td></tr>
  </tbody>
</table>

<p>Sağ sütundaki maddelerden biri sizin için geçerliyse bu terapiye uygun olmadığınız anlamına gelmez; <strong>başlangıç biçiminin farklı olması gerektiği</strong> anlamına gelir. Uygulamada çoğu süreç karma yürüyor: yüz yüze başlanıyor, düzen oturduktan sonra bir kısım seans online devam ediyor.</p>

<h2>Online psikolog seçerken nelere bakmalı?</h2>

<p>Online psikolog aramalarında sonuç sayfası neredeyse tamamen platformlarla dolu ve seçim kriteri çoğu zaman görünmez oluyor. Randevu almadan önce cevabını bilmeniz gereken beş şey:</p>

<ol>
  <li><strong>Unvan.</strong> Karşınızdaki kişi psikolog mu, klinik psikolog mu, psikiyatrist mi? Online danışmanlık başlığı altında sunulan hizmetlerde bu bilgi çoğu zaman görünmüyor; &ldquo;terapist&rdquo;, &ldquo;danışman&rdquo; ya da &ldquo;koç&rdquo; ifadeleri tek başına bir yeterlilik göstermez. Ayrımı klinik psikolog ve psikoterapist farkı sayfasında ayrıntılı yazdım.</li>
  <li><strong>Ekol.</strong> Hangi yaklaşımla çalışıyor ve bu yaklaşım sizin tablonuza uygun mu?</li>
  <li><strong>Süreklilik.</strong> Aynı uzmanla devam edebilecek misiniz, yoksa her seans yeniden mi eşleşeceksiniz?</li>
  <li><strong>Çerçeve.</strong> Seans süresi, iptal koşulları ve ücret baştan net mi?</li>
  <li><strong>Gizlilik.</strong> Görüşme hangi ortamda yapılıyor, kayıt alınıyor mu, veriler nerede tutuluyor?</li>
</ol>

<p>Bu beş sorunun cevabını randevu öncesinde alamıyorsanız, sorun sizde değil. İyi bir online psikolog bu bilgileri zaten kendiliğinden verir; vermemesi başlı başına bir bilgidir.</p>

<h2>Online danışmanlık platformu mu, doğrudan terapist mi?</h2>

<p>İkisi de mümkün ve ikisinin de yeri var. Ama fark, danışanların çoğunun ilk seansta fark etmediği bir yerde ortaya çıkıyor: <strong>terapötik ittifak.</strong> Psikoterapide sonucu en güçlü yordayan etkenlerden biri, danışan ile terapist arasında kurulan güven ve iş birliği bağıdır. Bu bağ birikerek kuruluyor.</p>

<table>
  <caption>İki modelin pratik farkı</caption>
  <thead>
    <tr><th>Başlık</th><th>Platform</th><th>Doğrudan terapist</th></tr>
  </thead>
  <tbody>
    <tr><td>Uzman seçimi</td><td>Genellikle eşleştirme algoritmasıyla</td><td>Kendiniz seçersiniz</td></tr>
    <tr><td>Süreklilik</td><td>Uzman değişebilir</td><td>Aynı kişiyle devam</td></tr>
    <tr><td>Erişim kolaylığı</td><td>Yüksek, hızlı başlangıç</td><td>Randevu planlaması gerekir</td></tr>
    <tr><td>Yüz yüzeye geçiş</td><td>Çoğunlukla mümkün değil</td><td>İstendiğinde klinikte devam</td></tr>
    <tr><td>Çerçevenin sahibi</td><td>Platform politikası</td><td>Terapistle doğrudan anlaşma</td></tr>
  </tbody>
</table>

<p>Son satır özellikle önemli. Süreç ilerledikçe bazı danışanlar yüz yüze görüşmek istiyor &mdash; özellikle EMDR gibi çalışmalarda ya da sürecin kritik bir evresinde. Doğrudan bir uzmanla çalışıyorsanız bu geçiş bir hafta içinde olur; klinik Etiler'de, <a href="/istanbul-psikolog">İstanbul psikolog</a> arayışındaki danışanlar için ulaşılabilir bir noktada.</p>

<p>Son olarak, konuşulması gereken ama neredeyse hiç yazılmayan bir madde: <strong>bağlantı seans ortasında koparsa ne olacak?</strong> Bunu ilk görüşmede karara bağlıyoruz. Kural basit: beş dakika içinde bağlantı kurulamazsa telefonla arıyorum ve seansı ya telefondan tamamlıyoruz ya da aynı hafta içinde yeniden planlıyoruz. Ücretlendirme bu durumda yeniden değerlendirilir. Bu küçük anlaşma, teknik bir aksaklığın danışanda &ldquo;yarıda bırakıldım&rdquo; duygusu yaratmasını engelliyor &mdash; ki bu duygu, özellikle terk edilme hassasiyeti olan danışanlarda sanıldığından çok daha ağır oturuyor.</p>

<h2>Ekrandan gerçek bir bağ kurulabilir mi?</h2>

<p>Bu, ön görüşmelerde en sık duyduğum itiraz. Arkasındaki endişe haklı: psikoterapide sonucu en güçlü yordayan etkenlerden biri, danışan ile terapist arasında kurulan güven ve iş birliği bağıdır. Bağ kurulmuyorsa yöntem ne olursa olsun süreç yürümez.</p>

<p>Buna iki türlü cevap verebilirim. Birincisi veriden: yukarıdaki meta-analizde online yürütülen süreçler yüz yüze bildirilenlere benzer sonuçlar üretiyor. <strong>Sonuç üretilen bir süreçte bağ kurulmuş demektir</strong> &mdash; ikisi ayrılabilir şeyler değil.</p>

<p>İkincisi odadan: ekranın bağı zayıflattığı yönündeki beklenti çoğu danışanda ilk üç seansta kırılıyor. Hatta bazı danışanlarda tersi oluyor. Kendi evinde, kendi koltuğunda oturan biri, tanımadığı bir binaya gelip bekleme odasında sırasını beklemiş birinden daha çabuk açılabiliyor. Utanç eşiği yüksek başlıklarda &mdash; cinsellik, bağımlılık, aldatma &mdash; bu farkı düzenli olarak görüyorum.</p>

<p>Bağın zayıfladığı gerçek durumlar da var ve bunlar teknikle ilgili: donan görüntü, gecikmeli ses, sürekli kesilen bağlantı. Bir insanın yüzündeki değişimi görememek terapide gerçek bir kayıptır. Bu yüzden bağlantı kalitesi bir konfor meselesi değil, sürecin bir parçası.</p>

<h2>İlk online seans için ne gerekiyor?</h2>

<p>Teknik gereklilik listesi kısa: kararlı bir internet bağlantısı, kamerası ve mikrofonu çalışan bir cihaz, kulaklık. Kulaklık isteğe bağlı değil &mdash; hem ses kalitesini yükseltiyor hem de konuşulanların odadan dışarı çıkmasını engelliyor.</p>

<p>Asıl mesele teknik değil, <strong>mekân</strong>. Seans boyunca kapısı kapanabilen, kimsenin girmeyeceği bir alan gerekiyor. Bu alanı bulmak bazı danışanlar için evin kendisinden değil, ev halkından kaynaklanan bir zorluk. İşe yarayan çözümler: mesai öncesi ya da sonrası saat seçmek, park edilmiş bir arabadan bağlanmak, ev halkına seans saatini önceden bildirmek.</p>

<p>Bir de görgü kuralı gibi görünen ama klinik karşılığı olan bir madde: seansa yürürken, market sırasında ya da toplu taşımada bağlanmayın. Terapinin işlemesi için gereken şey yalnızca konuşmak değil, o konuşmanın oturduğu sabit bir çerçeve.</p>

<h2>Kaç seans sürer, ne zaman sonuç alınır?</h2>

<p>Süre, seansın online ya da yüz yüze olmasına göre değişmiyor; <strong>konuya göre değişiyor.</strong> Kaygı ve panik ağırlıklı süreçlerde on iki&ndash;on altı seanslık bir çerçeve çoğu zaman yeterli oluyor. Depresyonda süre tablonun ağırlığına bağlı. Bağlanma ve ilişki örüntüleri üzerinde çalışılan süreçler daha uzun sürüyor.</p>

<p>&ldquo;Ne zaman sonuç alırım?&rdquo; sorusunun pratik cevabı ise şu: ilk fark edilir değişim genellikle dördüncü ile altıncı seans arasında geliyor ve çoğu zaman beklenen yerden gelmiyor. İnsanlar belirtinin kaybolmasını bekliyor; ilk değişen şey genellikle belirtiye verilen tepki oluyor. Panik atak hâlâ geliyor ama artık kişiyi eskisi kadar korkutmuyor. O eşik geçildikten sonra gerisi hızlanıyor.</p>

<p>Sekizinci seansa kadar hiçbir hareket yoksa bu bir başarısızlık değil, <strong>gözden geçirme sinyali</strong>: hedefi mi yanlış koyduk, yöntem mi uymadı, yoksa altta ele alınmamış bir tablo mu var? Bunu açıkça konuşuyoruz.</p>

<h2>Online terapi seansı kaydedilebilir mi?</h2>

<p>Kural net: <strong>her iki tarafın açık rızası olmadan seans görüntülü veya sesli olarak kayıt altına alınamaz.</strong> Bu, Uzaktan Sağlık Hizmetlerinin Sunumu Hakkında Yönetmelik'te yazılı bir hükümdür. Rıza verilse bile kayıtların saklanmasının bir sınırı var: on iki ayı geçemez, sürenin dolmasıyla silinir.</p>

<p>Pratikte benim seanslarımda kayıt alınmaz. Bunu bir tercih olarak söylüyorum: kaydedildiğini bilen bir insan farklı konuşuyor, terapi ise tam olarak farklı konuşmama alanıdır. Karşı taraftan da aynısını bekliyorum &mdash; danışanın seansı kaydetmesi de aynı kurala tabi.</p>

<p>Gizliliğin sınırları online seansta da yüz yüzeyle aynıdır: kendine ya da başkasına yönelik somut ve yakın tehlike, çocuk ve kırılgan grupların istismarı, mahkeme kararı. Bunları ilk görüşmede açıkça anlatıyorum; ayrıntısını <a href="/bireysel-terapi">bireysel terapi</a> sayfasında bulabilirsiniz.</p>

<h2>Yurt dışından katılmak mümkün mü?</h2>

<p>Evet ve bu, danışan grubumun düzenli bir parçası. Yurt dışında yaşayan Türkçe konuşan danışanlar için asıl sorun uzmana erişim değil, <strong>ana dilde terapi</strong> bulmak. Duygu, utanç ve çocukluk anıları çoğu insanda ana dilde saklı; ikinci bir dilde anlatılan aynı olay, anlatanın kendisine bile uzak geliyor.</p>

<p>Pratik iki not: saat farkı için seans saatini birlikte sabitliyoruz &mdash; kaygan bir saat düzeni sürecin en sık bozulma nedeni. İkincisi, bulunduğunuz ülkede acil bir durumda başvurulacak yerel numaraları ilk görüşmede birlikte not ediyoruz; Türkiye'deki hatlar oradan işe yaramaz.</p>

<h2>Online terapi ücretleri neye göre değişir?</h2>

<p>2026 yılında İstanbul'da bireysel seans ücretleri genel olarak yaklaşık 3.000&ndash;8.000 TL aralığında değişkenlik göstermektedir; bu bir piyasa gözlemidir, doğrulanmış bir ortalama değildir. Online seans bazı uygulamalarda daha alt bantta konumlanıyor, ancak bu bir kural değil.</p>

<p>Ücreti belirleyen başlıklar yüz yüze seansla aynı: uzmanın deneyimi ve ekol eğitimleri, seans süresi ve sıklığı, bireysel mi çift olarak mı katılım. Platformlarda ek olarak bir aracılık payı bulunuyor; paket satın almalarda seans başı maliyet düşebiliyor ama <strong>paket, kullanılmayan seansların iadesi konusunda dikkatle okunması gereken bir yapı.</strong></p>

<h2>Online terapi mi, yüz yüze mi?</h2>

<p>Karar verirken tek bir soru işinizi görür: <strong>hangisini sürdürebilirsiniz?</strong> Terapide sonucu belirleyen en güçlü etken, yöntemin inceliği değil devamlılıktır. Haftada bir gerçekleşen online seans, ayda bir yapılabilen yüz yüze seanstan iyidir.</p>

<p>Ulaşım süresi kırk beş dakikayı aşıyorsa, mesai düzeniniz sabit bir saati imkânsız kılıyorsa ya da şehir dışındaysanız cevap büyük olasılıkla online. Evde mahrem alan yoksa, tabloda akut bir risk varsa ya da süreç EMDR gibi bir çalışmayı gerektiriyorsa cevap yüz yüze. Emin değilseniz ücretsiz ön görüşmede bunu birlikte belirliyoruz; kararı baştan vermek zorunda değilsiniz.</p>

<p>İstanbul'da yaşıyorsanız kararı belirleyen şey çoğu zaman yol oluyor. Şehre özgü hesabı, hibrit seans düzenini ve evde uygun alan bulunamadığında ne yapıldığını İstanbul online terapi sayfasında ayrıca ele aldım.</p>

<h2>Nasıl başlanır?</h2>

<p>Ücretsiz ön görüşmede iki şeyi netleştiriyoruz: online çerçevenin size uygun olup olmadığı ve süreci hangi düzende kuracağımız. Ergen ve yetişkin danışanlarla bilişsel davranışçı terapi ve EMDR çerçevesinde çalışıyorum; görüşmeler görüntülü olarak, yüz yüze seansla aynı süre ve aynı gizlilik ilkesiyle yürüyor. Dilediğiniz aşamada Etiler'deki klinikte yüz yüze devam edebilirsiniz &mdash; aynı uzmanla, süreç kesintiye uğramadan. Süreç altında sıklıkla <a href="/depresyon-terapisi">depresyon</a> ya da <a href="/kaygi-bozukluklari">kaygı bozukluğu</a> çıkıyor; ikisini birlikte ele alıyoruz. İlk adımı psikolog randevusu nasıl alınır yazısında anlattım; <a href="/#contact">iletişim</a> bölümünden, doğrudan <a href="tel:+905012648484">+90 501 264 84 84</a> numarasından veya <a href="https://wa.me/905012648484" rel="nofollow noopener" target="_blank">WhatsApp</a> ile ulaşabilirsiniz.</p>
`;
