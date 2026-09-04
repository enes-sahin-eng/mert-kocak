// GEÇİCİ: /psikolog ve /istanbul-psikolog sayfalarıyla aynı sebepten
// (blog CMS'i ile uyumsuz) elle oluşturuldu. Panelden yönetilmiyor.
// Kaynakça ve altındaki bölümler (yazar hakkında, sorumluluk reddi)
// kullanıcı isteğiyle dahil edilmedi.

export const metaTitle = "Etiler Psikolog ve Terapi Merkezi";
export const metaDescription =
  "Etiler psikolog kliniği Nisbetiye Caddesi hattında. Metroyla ulaşım, seans saatleri, ücret aralığı ve çalışılan konular. Klinik Psk. Mert Koçak.";

export const heroEyebrow = "Rehber";
export const heroTitle = "Etiler Psikolog: Terapi Merkezi, Ulaşım ve Randevu Planlaması";
export const breadcrumbLabel = "Etiler Psikolog";

export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: FaqItem[] = [
  {
    question: "Etiler'deki psikolog kliniğine metroyla nasıl gelinir?",
    answer:
      "Semte M6 Levent-Boğaziçi Üniversitesi/Hisarüstü metro hattı hizmet veriyor. Hat dört duraktan oluşuyor: Levent, Nispetiye, Etiler ve Boğaziçi Üniversitesi/Hisarüstü. Kliniğe en yakın duraklar Nispetiye ve Etiler. Şehrin diğer bölgelerinden gelenler M2 Yenikapı-Hacıosman hattıyla Levent'e gelip M6'ya aktarma yapabilir; Levent ile Hisarüstü arası yaklaşık sekiz dakika sürüyor.",
  },
  {
    question: "Etiler'de otopark bulmak zor mu?",
    answer:
      "Nisbetiye Caddesi hattı iş merkezleri ve restoranlarla çevrili olduğu için sokak parkı sınırlıdır ve gün içinde doludur. Araçla gelecekseniz seans saatinden en az on beş dakika önce yola çıkmanızı, mümkünse metroyu tercih etmenizi öneririm. Otopark durumunu randevu alırken sorabilirsiniz.",
  },
  {
    question: "Etiler'de psikolog ücretleri ne kadar?",
    answer:
      "2026 yılında İstanbul'da bireysel seans ücretleri genel olarak yaklaşık 3.000-8.000 TL aralığında değişkenlik göstermektedir ve Etiler gibi merkezi bölgelerdeki klinikler bandın üst tarafına yakın seyreder. Bu bir bant bilgisidir, doğrulanmış bir ortalama değildir. Çift ve aile seansları süre farkı nedeniyle daha yüksek konumlanır. Ücretsiz ön görüşme sunuyorum.",
  },
  {
    question: "Etiler dışından gelmek mantıklı mı?",
    answer:
      "Levent, Akatlar, Nisbetiye, Bebek, Ortaköy, Rumeli Hisarı ve Nişantaşı gibi yakın semtlerden gelmek pratiktir. Ulaşımı yarım saati aşan bölgelerden geliyorsanız kararı mesafeye değil, o yolu üç ay boyunca her hafta yapıp yapamayacağınıza göre verin; terapide sonucu belirleyen en güçlü değişken devamlılıktır. Bu durumda karma düzen yaygın çözümdür.",
  },
  {
    question: "Akşam veya cumartesi seans bulunur mu?",
    answer:
      "Hafta içi 09.00-20.00, cumartesi 10.00-16.00 arasında çalışıyorum. Çevredeki iş merkezlerinden gelen danışanlar nedeniyle akşam saatleri en hızlı dolan aralıktır. Nisbetiye Caddesi hattında trafik sabah 08.00-10.00 ve akşam 18.00-20.00 arasında belirgin biçimde yoğunlaşır; bu yüzden öğle arası ve erken öğleden sonra saatleri çoğu danışan için daha rahat oluyor.",
  },
];

// GEÇİCİ NOT — "Etiler psikolog olarak hangi konularda çalışıyorum?" tablosu:
// kullanıcı isteğiyle tüm satırlar düz metne çevrildi (sitede var olanlar
// dahil). Diğer bölümlerdeki paragraf linkleri (bireysel-terapi,
// evlilik-iliski-terapisi, depresyon-terapisi, kaygi-bozukluklari, psikolog,
// istanbul-psikolog) sitede var, dokunulmadı. Sitede olmayan diğer paragraf
// linkleri (aile-terapisi, panik-atak-tedavisi, cocuk-psikologu, psikoterapi,
// klinik-psikolog, online-terapi, psikolog-randevu) düz metne çevrildi —
// sayfalar eklenince tekrar linklenecek. "KATMAN LİNKLERİ" olarak
// yorumlanmış gelecekteki sayfalara hiç yer verilmedi.
export const articleHtml = `
<p class="lead"><strong>Etiler psikolog arayanlar için klinik, İstanbul Beşiktaş Etiler'de Nisbetiye Caddesi hattında bulunuyor. Kliniğe en yakın metro durakları M6 hattındaki Nispetiye ve Etiler; şehrin diğer bölgelerinden gelenler Levent'te M2 hattından aktarma yapıyor. Hafta içi 09.00-20.00, cumartesi 10.00-16.00 arasında yüz yüze seans veriliyor.</strong></p>

<p>Bu sayfa terapi sürecini anlatmıyor — onu <a href="/psikolog">psikolog nedir, ne iş yapar</a> rehberinde, İstanbul geneline dair planlamayı ise <a href="/istanbul-psikolog">İstanbul psikolog</a> sayfasında yazdım. Burada yalnızca <strong>semt düzeyinde işinize yarayacak şeyler</strong> var: klinik tam olarak nerede, nasıl gelinir, hangi saat daha rahat, çevre semtlerden gelmek mantıklı mı.</p>

<h2>Etiler psikolog arayanlar için klinik nerede?</h2>

<p>Klinik <strong>Nisbetiye Mahallesi, Ahmet Adnan Saygun Caddesi, Menekşe 1 Blok No:2 D:3, 34337 Beşiktaş / İstanbul</strong> adresinde. Semt olarak Etiler, idari olarak Beşiktaş sınırları içinde.</p>

<p>Bir yazım notu: caddenin adı hem <em>Nisbetiye</em> hem <em>Nispetiye</em> biçiminde kullanılıyor; metro durağı resmî olarak <em>Nispetiye</em> adını taşırken adreslerde çoğunlukla <em>Nisbetiye</em> geçiyor. Arama yaparken ikisi de aynı yeri gösteriyor.</p>

<table>
  <caption>Klinik bilgileri</caption>
  <thead>
    <tr><th>Bilgi</th><th>Ayrıntı</th></tr>
  </thead>
  <tbody>
    <tr><td>Adres</td><td>Nisbetiye, Ahmet Adnan Saygun Cd. Menekşe 1 Blok No:2 D:3, 34337 Beşiktaş/İstanbul</td></tr>
    <tr><td>Semt</td><td>Etiler (Beşiktaş)</td></tr>
    <tr><td>En yakın metro</td><td>M6 hattı — Nispetiye ve Etiler durakları</td></tr>
    <tr><td>Çalışma saatleri</td><td>Pazartesi-Cuma 09.00-20.00 · Cumartesi 10.00-16.00 · Pazar kapalı</td></tr>
    <tr><td>Seans biçimi</td><td>Yüz yüze ve online</td></tr>
    <tr><td>İletişim</td><td>+90 501 264 84 84 · bilgi@mertkocak.com · WhatsApp</td></tr>
  </tbody>
</table>

<h2>Etiler psikolog kliniğine nasıl gelinir?</h2>

<p><strong>Metroyla.</strong> Semte <em>M6 Levent-Boğaziçi Üniversitesi/Hisarüstü</em> hattı hizmet veriyor. Hat kısa: dört duraktan oluşuyor ve toplam 3,3 kilometre. Duraklar sırasıyla <strong>Levent, Nispetiye, Etiler ve Boğaziçi Üniversitesi/Hisarüstü</strong>. Kliniğe en yakın duraklar Nispetiye ve Etiler.</p>

<p>Şehrin başka bir yerinden geliyorsanız yol şu: <em>M2 Yenikapı-Hacıosman</em> hattıyla Levent'e gelin, orada M6'ya aktarın. Levent ile Hisarüstü arası tam parkur yaklaşık <strong>sekiz dakika</strong> sürüyor, yani aktarma sonrası mesafe kısa. İlk sefer 06.00, son sefer 00.00.</p>

<p>Küçük ama işe yarar bir ayrıntı: <strong>Etiler istasyonunda turnike ile peron arası geçiş yalnızca asansörle sağlanıyor</strong>, yürüyen merdiven yok. Yoğun saatlerde asansör kuyruğu oluşabiliyor; bebek arabası, tekerlekli sandalye veya hareket kısıtı olan danışanlar için bunu baştan bilmek planlamayı kolaylaştırıyor. Nispetiye durağında yürüyen merdiven mevcut.</p>

<p><strong>Araçla.</strong> Nisbetiye Caddesi hattı iş merkezleri ve restoranlarla çevrili; bu da sokak parkının gün içinde sınırlı olması anlamına geliyor. Araçla gelecekseniz seans saatinden en az on beş dakika önce yola çıkmanızı öneririm. Otopark durumunu randevu alırken sorabilirsiniz.</p>

<h2>Randevu saatini semtin trafiğine göre seçmek</h2>

<p>Nisbetiye Caddesi, Büyükdere Caddesi'nden başlayıp Levent, Nisbetiye, Akatlar, Kültür ve Etiler mahallelerini geçerek Rumelihisarı'na uzanıyor. Bu güzergâh aynı zamanda Levent iş bölgesinin çıkış hattı — ve trafiği bu belirliyor.</p>

<p>Pratik sonuç: bu hatta trafik <strong>sabah 08.00-10.00</strong> ve <strong>akşam 18.00-20.00</strong> arasında belirgin biçimde yoğunlaşıyor. Danışma odasında yıllar içinde gördüğüm örüntü şu: bu iki aralığa denk gelen seanslar en sık gecikilen ve en sık iptal edilen seanslar oluyor.</p>

<table>
  <caption>Saat aralıklarının semtteki karşılığı</caption>
  <thead>
    <tr><th>Aralık</th><th>Kimin için işler</th><th>Not</th></tr>
  </thead>
  <tbody>
    <tr><td>09.00-11.00</td><td>Esnek çalışanlar, semtte oturanlar</td><td>Sabah yoğunluğunun sonuna denk gelebilir</td></tr>
    <tr><td>12.00-14.00</td><td>Levent, Akatlar ve Nisbetiye hattında çalışanlar</td><td>Öğle arası; yürüme mesafesi avantajı burada devreye giriyor</td></tr>
    <tr><td>14.00-17.00</td><td>Serbest çalışanlar, öğrenciler, ev düzeni uygun olanlar</td><td>Semtin en rahat aralığı</td></tr>
    <tr><td>18.00-20.00</td><td>Standart mesai düzeni</td><td>En çok talep gören aralık; trafik de en yoğun</td></tr>
    <tr><td>Cumartesi 10.00-16.00</td><td>Hafta içi hiç uygun olmayanlar, çiftler</td><td>Sınırlı slot; sabit saat önerilir</td></tr>
  </tbody>
</table>

<h2>Semtin ritmi: Etiler'de kimler başvuruyor?</h2>

<p>Etiler'in kendine özgü bir karışımı var: Nisbetiye Caddesi'nin ana arter kısmı iş merkezleriyle, iç kısımları konutlarla dolu. Hemen yanı başında Levent iş bölgesi, yukarısında Boğaziçi Üniversitesi kampüsü var. Bu üçlü, başvuru profilini de belirliyor.</p>

<ul>
  <li><strong>Öğle arası gelen çalışanlar.</strong> Levent, Akatlar ve Nisbetiye hattındaki ofislerden yürüyerek ya da tek durak metroyla gelenler. Bu grup için seans, güne eklenen bir yolculuk değil güne sığan bir ara.</li>
  <li><strong>Mesai sonrası gelen çiftler.</strong> İki kişinin aynı saatte buluşması gereken çift seanslarında akşam ve cumartesi slotları belirleyici oluyor.</li>
  <li><strong>Semt sakinleri.</strong> Etiler, Akatlar, Nisbetiye ve Levent'te oturanlar için ulaşım süresi neredeyse sıfır — bu, terapinin en çok ihtiyaç duyulan haftalarda bile devam etmesini kolaylaştıran en somut avantaj.</li>
  <li><strong>Üniversite çevresinden gelen genç yetişkinler.</strong> Hisarüstü hattı M6 ile iki durak; sınav dönemleri, kaygı ve uyum konularında başvurular bu profilde yoğunlaşıyor.</li>
</ul>

<blockquote>
  <p>İlçe düzeyinde çalışmanın tek avantajı yakınlık değil. Danışanla aynı sokakları, aynı trafiği ve aynı ritmi paylaşmak, seans içinde kurulan örneklerin gerçek olmasını sağlıyor.</p>
</blockquote>

<h2>Etiler psikolog olarak hangi konularda çalışıyorum?</h2>

<p>Çalışma alanlarının her biri kendi sayfasında ayrıntılı anlatılıyor; buradaki tablo hangisinin size denk düştüğünü bulmanız için:</p>

<table>
  <caption>Konu başlıkları</caption>
  <thead>
    <tr><th>Konu</th><th>Ne zaman bu başlıkla başlanır</th></tr>
  </thead>
  <tbody>
    <tr><td>Bireysel terapi</td><td>Zorlanma ağırlıkla kişinin kendi iç dünyasındaysa</td></tr>
    <tr><td>Çift terapisi</td><td>Sorun iki yetişkin arasındaki ilişkideyse</td></tr>
    <tr><td>Aile terapisi</td><td>Hane düzeni, ebeveynlik veya kuşaklar arası çatışma varsa</td></tr>
    <tr><td>Depresyon tedavisi</td><td>Enerji, ilgi ve işlevsellik belirgin biçimde düştüyse</td></tr>
    <tr><td>Anksiyete tedavisi</td><td>Kaygı hayat alanını daraltmaya başladıysa</td></tr>
    <tr><td>Panik atak tedavisi</td><td>Ataklar tekrarlıyor ve yeni atak korkusu yerleştiyse</td></tr>
    <tr><td>Çocuk psikoloğu</td><td>Çocuk veya ergende süreklilik gösteren bir zorlanma varsa</td></tr>
  </tbody>
</table>

<p>Süreçlerde bilişsel davranışçı terapi ve EMDR çerçevesinde çalışıyorum. Ekoller arasındaki farkları terapi nedir, nasıl işler rehberinde, unvan ve yetki ayrımını klinik psikolog ve psikoterapist farkı yazısında ele aldım.</p>

<h2>Levent, Akatlar ve Bebek'ten gelenler</h2>

<p>Klinik Etiler'de ama hizmet semtle sınırlı değil. Nisbetiye Caddesi'nin bağladığı hat üzerindeki semtlerden ulaşım pratik:</p>

<table>
  <caption>Yakın semtlerden erişim</caption>
  <thead>
    <tr><th>Semt</th><th>Pratikte</th></tr>
  </thead>
  <tbody>
    <tr><td>Etiler, Nisbetiye, Akatlar</td><td>Yürüme veya çok kısa mesafe</td></tr>
    <tr><td>Levent, Kültür, Ulus</td><td>M6 ile tek-iki durak; öğle arası seans için elverişli</td></tr>
    <tr><td>Bebek, Rumeli Hisarı, Arnavutköy, Kuruçeşme</td><td>Kısa araç mesafesi; sahil hattından yukarı çıkış</td></tr>
    <tr><td>Beşiktaş, Ortaköy, Balmumcu, Zincirlikuyu</td><td>Otobüs ve araçla pratik; yoğun saatler dışında rahat</td></tr>
    <tr><td>Nişantaşı, Şişli, Mecidiyeköy, Gayrettepe</td><td>M2 + M6 aktarmasıyla ya da araçla</td></tr>
    <tr><td>Sarıyer, Maslak, Hisarüstü</td><td>M6 hattı ve Büyükdere Caddesi bağlantısı</td></tr>
  </tbody>
</table>

<p>Bunların dışındaki ilçelerden geliyorsanız kararı mesafeye değil şu soruya göre verin: <em>bu yolu, kendimi en kötü hissettiğim hafta da yapabilir miyim?</em> Cevap hayırsa karma düzen — seansların bir kısmı online — daha sürdürülebilir oluyor. İlçe bazlı ayrıntıları <a href="/istanbul-psikolog">İstanbul psikolog</a> sayfasında yazdım.</p>

<h2>Etiler psikolog ücretleri neye göre değişir?</h2>

<p>2026 yılında İstanbul'da bireysel seans ücretleri genel olarak yaklaşık <strong>3.000-8.000 TL</strong> aralığında değişkenlik göstermektedir. Etiler gibi merkezi ve yüksek kiralı bölgelerdeki klinikler bu bandın üst tarafına yakın seyreder; bu bir kalite göstergesi değil, maliyet yansımasıdır. Bant bilgisidir, doğrulanmış bir ortalama değildir.</p>

<p>Seans tipine göre değişen kısım: bireysel görüşmeler 50 dakika, çift seansları 80-90 dakika, aile seansları 60-90 dakika planlanır ve süre farkı ücrete yansır. <strong>Ücretsiz ön görüşme</strong> sunuyorum; bu görüşme ücretli bir sürece girmeden önce uyum olup olmadığını anlamanızı sağlar. Ücreti etkileyen faktörlerin tamamını <a href="/psikolog">psikolog ücretleri</a> bölümünde ele aldım.</p>

<h2>Etiler psikolog seansı: yüz yüze mi, online mı?</h2>

<p>Etiler ve çevresinde oturuyor ya da çalışıyorsanız yüz yüze seans en pratik seçenek; zaten bu sayfayı okumanızın sebebi büyük ihtimalle yakınlık. Ulaşım süresinin kısa olması, terapinin en kritik değişkeni olan devamlılığı doğrudan kolaylaştırıyor.</p>

<p>Online seçenek şu durumlarda devreye giriyor: yoğun iş dönemleri, hastalık, şehir dışı seyahat ve semt dışından gelen danışanlar. Uygulamada sık kullanılan düzen, süreci yüz yüze yürütüp gerektiğinde tek tek seansları online yapmak — böylece hiçbir hafta boş geçmiyor. Online sürecin nasıl işlediğini online terapi yazısında anlattım.</p>

<h2>Nasıl başlanır?</h2>

<p>İlk adım karmaşık değil: ücretsiz ön görüşmede konunuzu, uygun saat aralığınızı ve yüz yüze mi online mı ilerleyeceğimizi birlikte netleştiriyoruz. Klinik Etiler'de, Nisbetiye Caddesi hattında; hafta içi 09.00-20.00, cumartesi 10.00-16.00 arasındayım. <a href="/#contact">İletişim</a> bölümünden telefon veya WhatsApp ile ulaşabilirsiniz.</p>
`;
