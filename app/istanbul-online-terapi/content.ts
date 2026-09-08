// /psikolog, /istanbul-psikolog, /etiler-psikolog ve /online-terapi
// sayfalarıyla aynı sebepten (blog CMS'i ile uyumsuz) elle oluşturuldu.
// Buradaki değerler `page.tsx`'te backend "SEO Sayfaları" panelinden
// (slug: istanbul-online-terapi) çekilen içerik yoksa kullanılan YEDEK
// (fallback) içeriktir — panelde bu slug'a kayıt eklenirse orası önceliklidir.
// Kaynakça ve altındaki bölümler (yazar hakkında, sorumluluk reddi)
// kullanıcı isteğiyle dahil edilmedi.

export const metaTitle = "İstanbul Online Terapi ve Online Psikolog | Mert Koçak";
export const metaDescription =
  "İstanbul online terapi kimler için daha iyi işler, hibrit düzen nasıl kurulur ve evde mahremiyet nasıl sağlanır? Klinik Psk. Mert Koçak";

export const heroEyebrow = "Rehber";
export const heroTitle = "İstanbul Online Terapi: Yol Terapiyi Bitirmesin";
export const breadcrumbLabel = "İstanbul Online Terapi";

export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: FaqItem[] = [
  {
    question: "İstanbul'da online terapi mi yüz yüze mi daha iyi işler?",
    answer:
      "Online ile yüz yüze arasındaki seçim bir üstünlük sorusu değil, devamlılık sorusudur. Haftalık seansa düzenli gelebiliyorsanız yüz yüze başlamak avantajlıdır. Yol süresi seansın kendisine yaklaşıyorsa ya da programınız düzensizse, İstanbul'da online seans süreci ayakta tutan seçenektir. Çoğu danışan için en iyi çözüm ikisinin karışımı olan hibrit düzendir.",
  },
  {
    question: "Hibrit düzen nedir, nasıl kurulur?",
    answer:
      "Hibrit düzen, seansların bir kısmının yüz yüze bir kısmının görüntülü yapılmasıdır. Yaygın kurgu ayda bir yüz yüze, kalan seansların online olmasıdır. İlk birkaç seansın yüz yüze yapılması tanışmayı kolaylaştırır; süreç yerleştikten sonra online seanslar devamlılığı korur.",
  },
  {
    question: "Evde sessiz bir oda yoksa online terapi olur mu?",
    answer:
      "Olur, ama planlanması gerekir. Kulaklık mahremiyetin yarısını çözer; kalanı için ev dışı bir alan bulunabilir: park, araç, sessiz bir çalışma alanı. Kalabalık hanede yaşayanlar için saat seçimi belirleyicidir. Uygun bir alan hiç bulunamıyorsa yüz yüze seans daha doğru seçimdir.",
  },
  {
    question: "İstanbul online terapi ücretleri yüz yüzeden farklı mı?",
    answer:
      "Bazı kliniklerde online ve yüz yüze ücretler farklı, bazılarında aynıdır. 2026 yılında İstanbul'da bireysel seans ücretleri genel olarak yaklaşık 3.000-8.000 TL aralığında değişkenlik göstermektedir. Ücretin yanında yol ve otopark maliyetini de hesaba katmak gerçekçi bir karşılaştırma sağlar.",
  },
  {
    question: "Online danışmanlık ile başlayıp sonra yüz yüzeye geçebilir miyim?",
    answer:
      "Evet, geçiş iki yönlü çalışır. Bazı danışanlar online başlayıp süreç yerleştikten sonra yüz yüzeye geçer; bazıları yüz yüze başlayıp iş yoğunluğu arttığında online devam eder. Bu kararın seans içinde açıkça konuşulması, sürecin kendisini de ilerletir.",
  },
];

// GEÇİCİ NOT — link durumu: /online-terapi, /etiler-psikolog ve
// /istanbul-psikolog sitede gerçekten var olduğu için link olarak kaldı.
// /psikolog-randevu henüz yok, düz metne çevrildi — sayfa eklenince tekrar
// linklenecek. Header'daki yazar/tarih satırı (byline) atlandı — sitedeki
// diğer SEO sayfalarının page.tsx şablonu böyle bir UI göstermiyor;
// #hakkimda anchor'ı bu yüzden ayrıca taşınmadı (gerekseydi #about
// olacaktı, sitedeki gerçek id budur). Kaynakça/Yazar hakkında/Sorumluluk
// reddi bölümleri kullanıcı isteğiyle dahil edilmedi. SSS ayrı bir bölüm
// olarak (TherapyFaq bileşeniyle) gösterildiği için makale gövdesine
// tekrar eklenmedi.
export const articleHtml = `
<p>İstanbul'da online terapi bir ödün değil, devamlılık kararıdır. Bu şehirde terapi süreçleri çoğunlukla motivasyon bittiği için değil, yol bittiği için yarım kalıyor. Aşağıda kimin için online seansın daha iyi işlediğini, hibrit düzenin nasıl kurulduğunu ve evde uygun alan yoksa ne yapılacağını anlatıyorum.</p>

<!-- TODO: görsel yüklendikten sonra açın
<figure>
  <img src="/gorseller/istanbul-online-terapi.jpg" width="1200" height="675"
       alt="İstanbul'da online ve yüz yüze seansın birlikte kurgulandığı hibrit terapi düzeni şeması">
  <figcaption>Hibrit düzen, İstanbul'da devamlılığı koruyan en pratik kurgudur.</figcaption>
</figure>
-->

<h2>Acil bir durumdaysanız</h2>

<p>Kendinize ya da bir başkasına zarar verme düşünceniz varsa <strong>112</strong> acil yardım hattını arayın ya da en yakın hastanenin acil servisine gidin. Şiddet, istismar veya psikososyal destek gereken durumlarda <strong>183 ALO Sosyal Destek Hattı</strong>'nı arayabilirsiniz; hat ücretsizdir. Doğrudan bir tehlike varsa <strong>155</strong>. Online seans acil müdahalenin yerine geçmez.</p>

<h2>İstanbul online terapi kimler için daha iyi işler?</h2>

<p>Online seans, İstanbul'da şu dört profil için belirgin biçimde daha iyi işliyor: yol süresi seans süresine yaklaşan danışanlar, mesai saatleri öngörülemeyen çalışanlar, küçük çocuğu olan ve bakım düzeni kuramayan ebeveynler, bir de karşı yakada oturanlar.</p>

<p>Buna karşılık bazı durumlarda yüz yüze başlamak daha doğru. Akut kriz, ciddi intihar riski, yakın takip gerektiren tablolar ve ilk kez terapiye gelen bazı danışanlar için fiziksel ortam süreci kolaylaştırıyor. İlk görüşmede bunu birlikte değerlendiriyoruz.</p>

<p>Bu dört profilin ortak noktası şu: hiçbiri terapiden vazgeçmiş değil ve hiçbiri online psikolog arayışına ilk seçenek olarak girmiş değil; hepsi haftalık ritmi kurmakta zorlanıyor. İstanbul online terapi ve online danışmanlık arayışına giren danışanların çoğu, yüz yüze seansı denedikten ve sürdüremediklerini gördükten sonra geliyor.</p>

<p>Online terapinin etkililiğine dair veriyi ve kimler için uygun olmadığını ayrı bir sayfada, kaynaklarıyla ele aldım: <a href="/online-terapi">online terapi</a>. Bu sayfanın konusu farklı — İstanbul'da yolun terapiye ne yaptığı.</p>

<h2>İstanbul'da yüz yüze terapi neden yarım kalıyor?</h2>

<p>Danışma odasında yıllar içinde gördüğüm örüntü şu: süreçler nadiren "artık gerek yok" diye biter. Çoğunlukla önce bir seans ertelenir, sonra iki hafta atlanır, ardından geri dönüş zorlaşır. Bu zincirin başındaki halka neredeyse her zaman aynı: o gün yola çıkamamak.</p>

<p>Terapinin işe yaraması düzenli devama bağlıdır. Haftalık ritim bozulduğunda kazanılan ivme kayboluyor ve süreç baştan ısınmak zorunda kalıyor. İstanbul'da bu ritmi bozan şey genellikle isteksizlik değil; trafiğe takılmak, mesainin uzaması, çocuğu bırakacak birinin bulunamaması gibi sıradan engeller.</p>

<p>Bir başka örüntü de şu: danışanlar ilk atlanan seansı telafi etmeye çalışırken haftalık düzen büsbütün kayıyor. Ertelenen seans bir sonraki haftaya bindiğinde iki seans arası aralık iki katına çıkıyor ve o aralıkta konuşulacak malzeme birikirken sürecin yönü dağılıyor.</p>

<p>Online seçenek burada devreye giriyor. Amacı yüz yüze seansın yerini almak değil, <strong>sürecin durmasını engellemek</strong>. Zor bir haftada seansı iptal etmek yerine online yapmak, terapiyi ayakta tutan en pratik karardır.</p>

<h2>Yol hesabını kendiniz yapın</h2>

<p>İlçeler arası süre tahmini vermiyorum; İstanbul'da bu süre saate göre değişir ve yazılan her rakam yanıltıcı olur. Onun yerine kendi hesabınızı yapmanız için basit bir yöntem:</p>

<ol>
  <li><strong>Gidiş süresini yazın.</strong> Seans saatinde, o güzergâhta, gerçekçi olarak.</li>
  <li><strong>Dönüş süresini ekleyin.</strong> Genellikle daha uzundur, çünkü akşam saatine denk gelir.</li>
  <li><strong>Hazırlık payını ekleyin.</strong> Yola çıkma, park yeri arama, erken varma payı.</li>
  <li><strong>Toplamı seans süresiyle karşılaştırın.</strong> Seans 50 dakika.</li>
  <li><strong>Dörtle çarpın.</strong> Ayda dört seans eder.</li>
</ol>

<p>Sonuç seans süresinin iki katını geçiyorsa, haftalık düzeni sürdürmek zamanla zorlaşır. Bu bir başarısızlık değil, aritmetiktir. Böyle bir tabloda tamamen online ya da hibrit düzen daha gerçekçi.</p>

<p>Hesaba yol maliyetini de katmakta fayda var: yakıt ya da toplu taşıma, otopark, bazı danışanlar için o saatte çalışamamaktan doğan kayıp.</p>

<h2>Hibrit düzende ayda kaç online terapi seansı yapılır?</h2>

<p>Uygulamada en çok işleyen kurgu, online ve yüz yüze seansın karışımıdır: hibrit düzen. Seansların bir kısmı klinikte, bir kısmı görüntülü yapılır. Tek bir doğru oran yok; tabloya ve programa göre değişiyor.</p>

<table>
  <caption>İstanbul'da sık kurulan hibrit düzenler</caption>
  <thead>
    <tr><th scope="col">Düzen</th><th scope="col">Kimin için</th><th scope="col">Neden işler</th></tr>
  </thead>
  <tbody>
    <tr><td>İlk 2-3 seans yüz yüze, sonrası online</td><td>İlk kez terapiye gelenler</td><td>Tanışma ve güven fiziksel ortamda daha hızlı kuruluyor</td></tr>
    <tr><td>Ayda 1 yüz yüze, kalanı online</td><td>Uzak yakada oturanlar, yoğun çalışanlar</td><td>Bağ korunuyor, yol yükü dörtte bire iniyor</td></tr>
    <tr><td>Kural yok, haftaya göre karar</td><td>Programı öngörülemeyen danışanlar</td><td>Seans iptal edilmiyor, biçim değişiyor</td></tr>
    <tr><td>Yoğun dönemde online, sakin dönemde yüz yüze</td><td>Mevsimlik iş temposu olanlar</td><td>Süreç yılın tamamına yayılabiliyor</td></tr>
  </tbody>
</table>

<p>Sık karşılaştığım tabloyu birleştirerek kurgulanmış bir örnek şöyle görünüyor: Anadolu yakasında oturan, Avrupa yakasında çalışan bir danışan yüz yüze başlıyor, ilk ay düzenli geliyor, ikinci ayda iş temposu artıyor ve iki seans üst üste atlanıyor. Düzen ayda bir yüz yüze, kalanı online olacak şekilde değiştirildiğinde süreç kaldığı yerden devam ediyor. Değişen şey danışanın isteği değil, taahhüdün büyüklüğü.</p>

<p>Hibrit düzende önemli olan biçimin değişmesi değil, <strong>seansın atlanmaması</strong>. Danışanlarımla bunu baştan konuşuyoruz: zorlanacağınız bir hafta geldiğinde iptal etmek yerine online yapalım.</p>

<h2>Online terapi için evde uygun alan yoksa ne yapılır?</h2>

<p>Online terapi anlatılırken hep "evinizin rahatlığı" deniyor, ama İstanbul'da bu her zaman geçerli değil. Kalabalık hane, ince duvar, küçük daire, evden çalışan bir eş — mahremiyet çoğu danışan için gerçek bir engel ve konuşulması gereken bir konu.</p>

<p>Pratikte işe yarayan çözümler:</p>

<ul>
  <li><strong>Kulaklık.</strong> Sorunun yarısını çözer; en azından karşı tarafın sesi duyulmaz.</li>
  <li><strong>Saat seçimi.</strong> Hanenin boş olduğu bir aralık çoğu zaman bulunabiliyor.</li>
  <li><strong>Araç içi.</strong> Park halindeki araç, sürüş halinde değil. Bazı danışanlar için en sessiz seçenek.</li>
  <li><strong>Ev dışı sessiz alan.</strong> Sakin bir park, kütüphane çalışma odası, rezerve edilebilen bir toplantı alanı.</li>
  <li><strong>Yazılı ön bilgi.</strong> Konuşmakta zorlanacağınız bir konu varsa seans öncesi mesajla iletebilirsiniz.</li>
</ul>

<p>Hiçbiri mümkün değilse yüz yüze seans daha doğru seçimdir. Yarım kulakla, kapı açılır korkusuyla yapılan bir seanstan verim alınmıyor; bunu zorlamak yerine düzeni değiştirmek gerekiyor.</p>

<h2>Online seans, saat seçimini trafikten nasıl kurtarır?</h2>

<p>Yüz yüze seansta akşam saatleri hem en çok talep gören hem de yolun en kötü olduğu aralık; bu ikisi çakıştığı için uygun slot bulmak zorlaşıyor. Görüntülü görüşmede kısıt ortadan kalkıyor ve gün içindeki ölü zamanlar kullanılabilir hale geliyor.</p>

<p>Pratikte iki aralık iyi işliyor. Öğle arası, ofiste ya da yakınında sessiz bir alan bulunabiliyorsa; ve mesai bitimi, ama yola çıkmadan — işyerinden ya da eve varır varmaz. İkincisinde önemli olan seansı yolculuk sonrasına bırakmamak; yorgun ve gecikmiş başlayan seanslar verimsiz geçiyor.</p>

<p>Sabit bir gün ve saat belirlemek, biçim değişse bile ritmi koruyor. Her hafta yeniden saat aramak, İstanbul'da terapiyi bırakmanın en sessiz yollarından biri.</p>

<h2>Çift seansında online terapi neden daha da belirleyici?</h2>

<p>Çift terapisinde İstanbul'un yarattığı zorluk ikiye katlanıyor: bir kişinin değil, iki kişinin aynı saatte aynı yerde olması gerekiyor. Farklı yakalarda çalışan, mesai saatleri örtüşmeyen çiftlerde yüz yüze seans için ortak bir slot bulmak çoğu zaman en zor adım oluyor.</p>

<p>Online seans burada iki pratik çözüm sunuyor. Birincisi, iki tarafın da bulundukları yerden katılabilmesi; seans için buluşma zorunluluğu kalkıyor. İkincisi, ayrı ayrı yapılan bireysel görüşmelerin çok daha kolay planlanabilmesi.</p>

<p>Bir uyarı gerekiyor: çiftin aynı evde yaşadığı durumlarda iki kişinin ayrı ayrı, birbirini duymayacak biçimde katılması ayrı bir planlama işi. Ortak seansta ise ikisinin aynı ekranda olması, kameranın ikisini birden görecek şekilde konumlanması gerekiyor. Bunları ilk görüşmede konuşuyoruz.</p>

<h2>İstanbul online psikolog seçmenin başka şehirdeki uzmandan farkı ne?</h2>

<p>İstanbul online psikolog aramasının en sık atlanan tarafı bu. Görüntülü görüşmede mesafenin teknik bir önemi yok; fark seansın dışında kalan üç noktada ortaya çıkıyor. İstanbul online danışmanlık arayan biri için bunlar pratikte şu anlama geliyor.</p>

<ul>
  <li><strong>Yüz yüzeye geçiş bir randevu meselesine dönüşüyor.</strong> Süreç ilerlediğinde ya da EMDR gibi bir çalışmaya geçildiğinde klinikte buluşmak, aynı şehirdeyseniz bir haftalık iş. Başka şehirdeki bir uzmanla bu seçenek büyük ölçüde kapalı kalıyor.</li>
  <li><strong>Yönlendirme ağı yerel.</strong> Gerektiğinde psikiyatri değerlendirmesi ya da farklı bir uzmanlık için yönlendirme yapılıyorsa, İstanbul'daki kurumları ve bekleme sürelerini bilen bir uzmanla çalışmak süreci kısaltıyor.</li>
  <li><strong>Şehir zaten seansın konusu.</strong> Trafik, mesai düzeni, ilçeler arası mesafe ve kalabalık, burada yaşayan danışanın anlattığı hikâyenin içinde geçiyor. Bunları ayrıca anlatmak zorunda kalmamak zaman kazandırıyor.</li>
</ul>

<p>Buna karşılık aynı şehirde olmak tek başına bir yeterlilik ölçütü değil. Online danışmanlık başlığı altında İstanbul'da birbirinden çok farklı hizmetler sunuluyor — psikoterapiden koçluğa kadar. Bu yüzden önce bakılacak şey konum değil unvan: karşınızdaki kişi psikolog mu, klinik psikolog mu, psikiyatrist mi? Üç ifadenin farkını ve unvan ayrımını <a href="/online-terapi">online terapi, online psikolog ve online danışmanlık farkı</a> sayfasında ayrıntılı yazdım.</p>

<p>Bir sınır: bu üç madde, bulunduğunuz yerde uygun bir uzman varken İstanbul'a yönelmeniz gerektiği anlamına gelmiyor. Sürekliliği kurabildiğiniz online psikolog, konumu doğru olandan daha önemli.</p>

<h2>İstanbul online psikolog ile başlayıp yüz yüzeye geçilebilir mi?</h2>

<p>Online seanstan yüz yüzeye geçiş iki yönlü çalışıyor ve bunu baştan söylemekte fayda var. Online başlayan bazı danışanlar süreç yerleştikten sonra klinikte görüşmek istiyor; yüz yüze başlayan bazıları iş yoğunluğu arttığında online devam ediyor. İkisi de olağan.</p>

<p>Biçim değişikliği talebinin kendisi bazen konuşmaya değer bir malzeme oluyor: kaçınma mı, gerçek bir kısıt mı, yoksa süreçte bir rahatsızlığın dolaylı ifadesi mi? Bunu açıkça konuşmak süreci ilerletiyor.</p>

<h2>İstanbul'dan taşınırsanız online danışmanlık süreci ne oluyor?</h2>

<p>Şehir değiştirmek, yüz yüze yürüyen bir terapi sürecinin en sık bitiş sebeplerinden biri. Oysa terapist değiştirmek her zaman gerekmiyor. Kurulmuş bir çalışma ilişkisi varsa, süreci online devam ettirmek çoğu danışan için yeni bir uzmanla baştan başlamaktan daha pratik oluyor.</p>

<p>Bu, İstanbul'da düşündüğümden sık karşılaştığım bir durum: iş nedeniyle başka bir şehre giden, yurt dışına taşınan ya da eğitim için ayrılan danışanlar. Süreç ortasında bir kopuş yaşamak yerine biçim değiştirmek, kazanılanı korumanın en pratik yolu.</p>

<p>Karar tabloya göre değişiyor. Yakın takip gerektiren ya da yerel bir yönlendirme ağına ihtiyaç duyulan durumlarda bulunduğunuz şehirde bir uzmana geçmek daha doğru olabilir; böyle bir durumda yönlendirme yapıyorum. Yurt dışından katılımın nasıl işlediğini <a href="/online-terapi">online terapi</a> sayfasında ayrıca ele aldım.</p>

<h2>Online terapi yüz yüzeden ucuza mı geliyor?</h2>

<p>Seans ücreti tek başına bakıldığında çoğu zaman aynı; fark toplam maliyette ortaya çıkıyor. 2026 yılında İstanbul'da bireysel seans ücretleri genel olarak yaklaşık 3.000–8.000 TL aralığında değişkenlik göstermektedir ve online ile yüz yüze arasındaki fark klinikten kliniğe değişir. Asıl kalemler seansın dışında. İstanbul online danışmanlık ücretlerini karşılaştırırken de bakılması gereken şey seans başı rakam değil, aylık toplam.</p>

<ul>
  <li><strong>Terapistin unvanı ve deneyimi.</strong> Klinik psikolog, uzman psikolog ve psikiyatrist ücretleri farklı seyreder.</li>
  <li><strong>Seans süresi ve katılımcı sayısı.</strong> Çift seansları daha uzun ve ayrı fiyatlıdır.</li>
  <li><strong>Ekol ve ek eğitim gerektiren yöntemler.</strong> EMDR gibi yaklaşımlar ayrı fiyatlanabilir.</li>
  <li><strong>Platform üzerinden mi, doğrudan terapistle mi.</strong> Aracılı düzenlerde komisyon fiyata yansıyabilir.</li>
</ul>

<table>
  <caption>Aylık toplam maliyet: hangi kalemler değişiyor?</caption>
  <thead>
    <tr><th scope="col">Kalem</th><th scope="col">Yüz yüze</th><th scope="col">Online</th></tr>
  </thead>
  <tbody>
    <tr><td>Seans ücreti</td><td>Klinik tarifesi</td><td>Çoğu klinikte aynı, bazılarında daha düşük</td></tr>
    <tr><td>Ulaşım</td><td>Gidiş-dönüş, ayda dört kez</td><td>Yok</td></tr>
    <tr><td>Otopark</td><td>Semte göre değişir</td><td>Yok</td></tr>
    <tr><td>Ayrılan süre</td><td>Seans + yol + hazırlık</td><td>Seans süresi kadar</td></tr>
    <tr><td>Çalışılamayan zaman</td><td>Serbest çalışanlar için gerçek bir kalem</td><td>Çoğunlukla yok</td></tr>
  </tbody>
</table>

<p>Karşılaştırmayı yalnızca seans ücreti üzerinden yapmak yanıltıcı oluyor; asıl fark alt üç satırda ortaya çıkıyor. Ücretsiz ön görüşme bu hesabı birlikte yapmak için de kullanılabilir.</p>

<h2>Klinik ve iletişim</h2>

<p>Online seanslar Türkiye'nin her yerinden ve yurt dışından katılabilecek şekilde yürütülüyor; yüz yüze seanslar ise Beşiktaş'a bağlı Etiler'de, Nisbetiye Caddesi hattındaki klinikte yapılıyor. Açık adres: Nisbetiye, Ahmet Adnan Saygun Cd. Menekşe 1 Blok No:2 D:3, 34337 Beşiktaş/İstanbul (<a href="https://www.google.com/maps/search/?api=1&query=Ahmet+Adnan+Saygun+Cd.+Menek%C5%9Fe+1+Blok+No%3A2+D%3A3%2C+34337+Be%C5%9Fikta%C5%9F%2C+%C4%B0stanbul" target="_blank" rel="noopener noreferrer">haritada aç</a>). Çalışma saatleri Pazartesi–Cuma 09.00–20.00, Cumartesi 10.00–16.00. Randevu için <a href="tel:+905012648484">+90 501 264 84 84</a>, <a href="https://wa.me/905012648484" rel="nofollow noopener" target="_blank">WhatsApp</a> ya da <a href="mailto:bilgi@mertkocak.com">bilgi@mertkocak.com</a>. Semtin kendi bağlamını ve kliniğe ulaşımı <a href="/etiler-psikolog">Etiler psikolog</a> sayfasında ayrıntılı anlattım.</p>

<h2>Nasıl başlanır?</h2>

<p>Ücretsiz ön görüşme, online danışmanlık arayışının en pratik ilk adımı. Burada önce şunu netleştiriyoruz: sizin durumunuzda online mı, yüz yüze mi, yoksa hibrit bir düzen mi daha iyi işler. Yol hesabını birlikte yapıyoruz ve gerçekçi bir ritim kuruyoruz. Klinik psikolog olarak bilişsel davranışçı terapi ve EMDR çerçevesinde çalışıyorum. Şehir genelindeki diğer başlıklar için <a href="/istanbul-psikolog">İstanbul psikolog</a> sayfasına, randevunun nasıl alındığı için randevu süreci yazısına bakabilirsiniz.</p>
`;
