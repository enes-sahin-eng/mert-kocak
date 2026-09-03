// GEÇİCİ: Bu sayfa blog CMS'i (Post modeli) ile uyumlu olmadığı için ayrı,
// bağımsız bir sayfa olarak elle oluşturuldu. Panelden yönetilmiyor.
// Kaynakça ve altındaki bölümler (yazar hakkında, sorumluluk reddi)
// kullanıcı isteğiyle dahil edilmedi.

export const metaTitle = "Psikolog Nedir, Ne İş Yapar? | Klinik Psk. Mert Koçak";
export const metaDescription =
  "Psikolog kimdir, ne iş yapar, ne zaman gidilir ve nasıl seçilir? Terapi düşünenler için sade bir rehber. Klinik Psikolog Mert Koçak.";

export const heroEyebrow = "Rehber";
export const heroTitle = "Psikolog Nedir, Ne İş Yapar ve Ne Zaman Gidilir?";

export interface PsikologFaqItem {
  question: string;
  answer: string;
}

export const faq: PsikologFaqItem[] = [
  {
    question: "Psikoloğa gitmek için mutlaka bir hastalığım mı olmalı?",
    answer:
      "Hayır. Psikoloğa başvuran kişilerin önemli bir bölümünde tanı konulmuş bir ruhsal bozukluk yoktur. Karar verememek, ilişki zorlukları, iş stresi, kayıp sonrası toparlanamamak veya kendini tanıma isteği de geçerli başvuru nedenleridir.",
  },
  {
    question: "Psikolog ilaç yazabilir mi?",
    answer:
      "Hayır. Türkiye'de ilaç yazma yetkisi yalnızca hekimlerdedir; ruh sağlığı alanında bu hekim psikiyatristtir. Psikologlar konuşmaya dayalı psikoterapi yürütür, gerektiğinde psikiyatriste yönlendirir ve süreci hekimle iş birliği içinde sürdürür.",
  },
  {
    question: "Bir psikologla ilk görüşmede ne olur?",
    answer:
      "İlk görüşme bir tanışmadır. Terapist yaklaşımını ve çerçeveyi anlatır, sizi buraya getiren zorluğu, ne zaman başladığını ve günlük hayatınızı nasıl etkilediğini anlamaya çalışır. Ne kadar anlatacağınıza siz karar verirsiniz.",
  },
  {
    question: "Psikolog seans ücretleri ne kadar?",
    answer:
      "2026 yılında İstanbul'da bireysel seans ücretleri genel olarak yaklaşık 3.000-8.000 TL aralığında değişkenlik göstermektedir. Ücreti terapistin deneyimi, seans süresi, çalışılan ekol, online veya yüz yüze olması ve kurum tipi belirler. Kesin rakam için ilgili uzmandan bilgi alınmalıdır.",
  },
  {
    question: "Kaç seans sonra kendimi iyi hissetmeye başlarım?",
    answer:
      "Bu kişiye, konuya ve sürecin işleyişine göre değişir; garanti verilebilecek bir süre yoktur. Bazı kişiler ilk birkaç görüşmede rahatlama tarif eder, bazılarında değişim aylar içinde belirginleşir. Terapist genellikle birkaç seans sonunda süreci sizinle birlikte gözden geçirir.",
  },
  {
    question: "Psikoloğa anlattıklarım gizli kalır mı?",
    answer:
      "Evet, gizlilik psikoterapinin temel ilkesidir. Sınırlı istisnaları vardır: kişinin kendisi veya bir başkası için ciddi ve yakın bir tehlike söz konusuysa ya da yasal bir zorunluluk varsa. Bu istisnalar ilk görüşmede açıkça konuşulur.",
  },
  {
    question: "Terapistimi değiştirmek istersem ne olur?",
    answer:
      "Bu hakkınızdır ve düşündüğünüzden yaygındır. Uyum sağlanamayan bir eşleşmede ısrar etmek süreci verimsizleştirir. Değiştirme kararınızı terapistinizle konuşmanız, hem kapanış hem de yönlendirme açısından yararlı olur.",
  },
];

// GEÇİCİ NOT — "Hangi konuda destek arıyorsunuz?" tablosundaki linkler:
// - bireysel-terapi, evlilik-iliski-terapisi, depresyon-terapisi,
//   kaygi-bozukluklari, ofke-stres-terapisi, olum-yas-terapisi: sitede var,
//   link olarak bırakıldı (cift-terapisi/anksiyete-tedavisi/depresyon-tedavisi
//   sitedeki gerçek adreslere düzeltildi).
// - istanbul-psikolog: sayfa henüz yok ama kullanıcı isteğiyle bilerek link
//   olarak bırakıldı.
// - Şu an sitede hiç olmayan diğerleri (terapi nedir/psikoterapi, klinik
//   psikolog, aile terapisi, panik atak, çocuk psikoloğu, bağımlılık terapisi,
//   cinsel terapi, online terapi) düz metne çevrildi — bu sayfalar ileride
//   eklenince buraya tekrar link olarak bağlanacak.
export const articleHtml = `
<p class="lead"><strong>Psikolog, insan davranışını, düşünceyi ve duyguyu bilimsel yöntemlerle inceleyen ve psikoloji lisans eğitimini tamamlamış ruh sağlığı uzmanıdır. Terapi yetkinliği için lisansüstü klinik eğitim gerekir. Psikolog ilaç yazmaz; konuşmaya dayalı psikoterapi yürütür ve gerektiğinde psikiyatriste yönlendirir.</strong></p>

<p>Bu rehberi, danışma odasında en sık duyduğum sorular üzerine kurdum: "Psikolog tam olarak ne yapıyor?", "Benim durumum yeterince ciddi mi?", "Nasıl doğru kişiyi bulacağım?" Aşağıda bunların hepsine sırayla, süsleme yapmadan cevap vereceğim.</p>

<h2>Psikolog kimdir ve ne iş yapar?</h2>

<p>Psikolog, dört yıllık psikoloji lisans eğitimini tamamlamış kişidir. Bu eğitim insan zihnini, gelişimi, öğrenmeyi, kişilik yapılarını ve ruhsal bozuklukları bilimsel yöntemlerle incelemeyi kapsar. Ancak lisans diploması tek başına psikoterapi yürütme yetkinliği vermez — terapi yapmak için klinik alanda lisansüstü eğitim ve süpervizyonlu uygulama gerekir.</p>

<p>Bir psikoloğun günlük işi genellikle şu başlıklarda toplanır:</p>

<ul>
  <li><strong>Değerlendirme.</strong> Görüşme, gözlem ve gerekiyorsa standart ölçüm araçlarıyla kişinin durumunu anlamak.</li>
  <li><strong>Psikoterapi.</strong> Belirli bir ekol çerçevesinde, düzenli seanslarla yürütülen konuşmaya dayalı çalışma.</li>
  <li><strong>Psikoeğitim.</strong> Kişinin yaşadığı zorluğun nasıl işlediğini anlaması için bilgi aktarımı — kaygının bedende neden bu kadar güçlü hissedildiğini anlatmak gibi.</li>
  <li><strong>Yönlendirme ve iş birliği.</strong> Tablo ilaç değerlendirmesi gerektiriyorsa psikiyatriste, bedensel bir neden şüphesi varsa hekime yönlendirmek.</li>
</ul>

<p>Psikoloğun yapmadığı şeyler de en az yaptıkları kadar önemlidir: hayatınızla ilgili kararları sizin yerinize vermez, "şunu yapmalısınız" diye reçete sunmaz ve iyileşme garantisi vermez. Terapi, birlikte yürünen bir süreçtir.</p>

<h2>Unvanlar ve yetki sınırları: kim ne yapabilir?</h2>

<p>Türkiye'de en çok karışan konu bu. Aşağıdaki tablo yetki ve rol sınırlarını özetliyor.</p>

<table>
  <caption>Ruh sağlığı alanındaki roller ve yetkileri</caption>
  <thead>
    <tr><th>Unvan</th><th>Eğitim temeli</th><th>İlaç yazabilir mi?</th><th>Tipik çalışma alanı</th></tr>
  </thead>
  <tbody>
    <tr><td>Psikolog</td><td>Psikoloji lisansı</td><td>Hayır</td><td>Değerlendirme, psikoeğitim; klinik lisansüstü eğitimi varsa psikoterapi</td></tr>
    <tr><td>Klinik psikolog</td><td>Psikoloji lisansı + klinik psikoloji yüksek lisansı/doktorası</td><td>Hayır</td><td>Psikoterapi, klinik değerlendirme, test uygulama</td></tr>
    <tr><td>Psikiyatrist</td><td>Tıp fakültesi + psikiyatri uzmanlığı</td><td>Evet</td><td>Tanı, ilaç tedavisi; psikoterapi eğitimi aldıysa terapi</td></tr>
    <tr><td>Psikolojik danışman (PDR)</td><td>Rehberlik ve psikolojik danışmanlık lisansı</td><td>Hayır</td><td>Okul rehberliği, gelişimsel ve eğitsel danışmanlık</td></tr>
    <tr><td>Aile danışmanı</td><td>Sertifika programı (temel meslek değişir)</td><td>Hayır</td><td>Aile içi iletişim ve ilişki danışmanlığı</td></tr>
  </tbody>
</table>

<p>Pratik ayrım şudur: <strong>ilaç kararı hekimin, konuşmaya dayalı süreç terapistin alanıdır.</strong> İkisi rakip değil; orta ve ağır tablolarda çoğu zaman birlikte yürür.</p>

<h2>Psikoloğa ne zaman gidilir?</h2>

<p>En yaygın yanlış inanış, "yeterince kötü olmadan gidilmez" fikri. Oysa terapiye başvurmak için bir eşiği aşmayı beklemek, çoğu zaman süreci uzatır. Aşağıdaki tablo, gündelik zorlanma ile destek almanın anlamlı hale geldiği nokta arasındaki farkı gösteriyor.</p>

<table>
  <caption>Gündelik zorlanma ile profesyonel destek eşiği</caption>
  <thead>
    <tr><th>Alan</th><th>Gündelik dalgalanma</th><th>Destek almanın anlamlı olduğu nokta</th></tr>
  </thead>
  <tbody>
    <tr><td>Süre</td><td>Birkaç gün, en fazla birkaç hafta</td><td>İki haftadan uzun süren, kendiliğinden geçmeyen hâl</td></tr>
    <tr><td>İşlevsellik</td><td>İşe, okula, ilişkilere devam edebiliyorsunuz</td><td>Uyku, iş performansı veya ilişkiler belirgin biçimde bozuluyor</td></tr>
    <tr><td>Kontrol</td><td>Duyguyu fark ediyor, yönetebiliyorsunuz</td><td>Duygu sizi yönetiyor; kaçınma davranışları hayatı daraltıyor</td></tr>
    <tr><td>Tekrar</td><td>Belirli bir olaya bağlı tek seferlik tepki</td><td>Aynı örüntü farklı ilişkilerde, farklı işlerde tekrar ediyor</td></tr>
    <tr><td>Baş etme</td><td>Dinlenmek, konuşmak, ara vermek işe yarıyor</td><td>Denediğiniz hiçbir şey artık işe yaramıyor</td></tr>
  </tbody>
</table>

<p>Sağ sütundaki maddelerden biri sizin için geçerliyse, bir psikologla görüşmek makul bir adımdır. Bu bir tanı değildir; yalnızca bir eşik değerlendirmesidir.</p>

<blockquote>
  <p><strong>Acil durumda beklemeyin.</strong> Kendinize veya bir başkasına zarar verme düşünceleriniz varsa bu bir aciliyettir ve randevu sırası beklemez. <strong>112 Acil Çağrı Merkezi</strong>'ni arayın veya en yakın acil servise başvurun. Ruhsal destek için <strong>182</strong> üzerinden hastane randevusu alınabilir; şiddet, istismar ve ihmal durumlarında <strong>183 Sosyal Destek Hattı</strong> yedi gün yirmi dört saat hizmet verir. Yanınızda güvendiğiniz birinin bulunmasını isteyin.</p>
</blockquote>

<h2>Seansta ne olur, süreç nasıl ilerler?</h2>

<p>Seans genellikle 45-50 dakikadır ve haftada bir görüşmeyle başlar. İlk görüşme bir sorgulama değil, karşılıklı tanışmadır: terapist yaklaşımını ve çerçeveyi anlatır, siz de sizi getiren zorluğu kendi cümlelerinizle aktarırsınız. Ne kadar anlatacağınıza her seansta siz karar verirsiniz.</p>

<p>Tipik bir sürecin ilerleyişi şöyledir:</p>

<ol>
  <li><strong>Tanışma ve çerçeve (1. seans).</strong> Gizlilik ilkesi, seans süresi, ücret, iptal koşulları netleşir.</li>
  <li><strong>Değerlendirme (yaklaşık 1-3 seans).</strong> Zorluğun ne zaman başladığı, neyi etkilediği, geçmişte neyin işe yaradığı anlaşılır.</li>
  <li><strong>Hedef belirleme.</strong> "Daha az kaygılı olmak" ile "kararımı verebilmek" birbirinden çok farklı iki yol haritası çizer; bu yüzden hedef birlikte somutlaştırılır.</li>
  <li><strong>Çalışma dönemi.</strong> Seçilen ekolün araçlarıyla düzenli çalışma. Bilişsel davranışçı terapide bu genellikle seans arası uygulamaları da içerir.</li>
  <li><strong>Gözden geçirme ve sonlandırma.</strong> Nereden nereye gelindiği değerlendirilir, kazanımların kalıcılığı için plan yapılır.</li>
</ol>


<h2>İyi bir psikolog nasıl seçilir?</h2>

<p>Doğru uzmanı seçmek, sürecin en belirleyici adımlarından biri. Psikoterapi literatüründe <em>terapötik ittifak</em> olarak adlandırılan danışan–terapist iş birliğinin, sonuçla tutarlı biçimde ilişkili bulunduğu bildirilmektedir. Kısacası kendinizi o kişiyle güvende hissetmeniz, seçilen teknik kadar önemlidir. Karar verirken bakılacak sekiz kriter:</p>

<ol>
  <li><strong>Unvan ve eğitim.</strong> Terapi yürüten kişinin klinik alanda lisansüstü eğitimi var mı? Sormaktan çekinmeyin; bu bilgi paylaşılması gereken bir bilgidir.</li>
  <li><strong>Ekol.</strong> Hangi yaklaşımla çalışıyor? Bilişsel davranışçı terapi, EMDR, şema terapi ve psikodinamik yaklaşım farklı sorunlarda farklı biçimde işler.</li>
  <li><strong>Konu deneyimi.</strong> Sizinkine benzer konularda çalışma deneyimi var mı? Panik bozukluk, yas ve çift ilişkisi birbirinden farklı uzmanlıklardır.</li>
  <li><strong>Şeffaflık.</strong> Ücret, seans süresi ve iptal koşulları baştan net konuşuluyor mu?</li>
  <li><strong>Sınırlar.</strong> Seans dışında sizinle arkadaşlık kuran, sosyal medyadan yakınlaşan, hediye kabul eden bir çerçeve sağlıklı değildir.</li>
  <li><strong>Vaat dili.</strong> "Kesin çözüm", "beş seansta kurtulun" gibi ifadeler kullanan bir uzmandan uzak durun. Meslek etiği garanti vermeye izin vermez.</li>
  <li><strong>Erişilebilirlik.</strong> Ulaşım süresi ve saat uyumu, düzenli devam edebilmenizin en somut belirleyicisidir.</li>
  <li><strong>İlk görüşmedeki hissiniz.</strong> İki üç görüşme sonunda hâlâ anlaşılmadığınızı hissediyorsanız bunu söyleyin. Terapist değiştirmek başarısızlık değildir.</li>
</ol>

<blockquote>
  <p>Danışanlarımın çoğu ilk görüşmeye "doğru soruları sorabilecek miyim" endişesiyle geliyor. Oysa iyi bir eşleşmenin en sağlam işareti, hiçbir soru hazırlamadan da konuşabildiğinizi fark ettiğiniz andır.</p>
</blockquote>

<h2>Psikolog ücretleri neye göre değişir?</h2>

<p>Seans ücreti tek bir rakamla ifade edilemez; birden fazla değişkene bağlıdır. 2026 yılında İstanbul'da bireysel seans ücretleri genel olarak yaklaşık <strong>3.000-8.000 TL</strong> aralığında değişkenlik göstermektedir. Bu aralık bir piyasa gözlemidir, doğrulanmış bir istatistik değildir; çift ve aile seansları süre farkı nedeniyle genellikle daha yüksek konumlanır.</p>

<p>Ücreti belirleyen başlıca faktörler:</p>

<ul>
  <li><strong>Terapistin deneyimi ve aldığı ek eğitimler</strong> — EMDR, şema terapi gibi sertifikalı eğitimler maliyetlidir ve ücrete yansır.</li>
  <li><strong>Seans süresi</strong> — 50 dakikalık bireysel seans ile 80-90 dakikalık çift seansı aynı fiyatlanmaz.</li>
  <li><strong>Çalışılan ekol</strong> — bazı yaklaşımlar seans dışı hazırlık ve raporlama gerektirir.</li>
  <li><strong>Online veya yüz yüze</strong> — online seanslar bazı uygulamalarda daha erişilebilir konumlanır.</li>
  <li><strong>Kurum tipi ve konum</strong> — merkezi ilçelerdeki kliniklerde işletme maliyeti daha yüksektir.</li>
  <li><strong>Seans sıklığı</strong> — haftada bir yerine iki haftada bir görüşme toplam maliyeti değiştirir.</li>
</ul>

<p>Bütçe bir engel oluşturuyorsa üniversitelerin psikoloji bölümlerine bağlı uygulama merkezleri, belediyelerin ücretsiz danışmanlık birimleri ve devlet hastanelerinin psikiyatri poliklinikleri erişilebilir seçeneklerdir. Ayrıca birçok uzman gibi ben de <strong>ücretsiz ön görüşme</strong> sunuyorum; bu görüşme, ücretli bir sürece girmeden önce uyum olup olmadığını anlamanızı sağlar.</p>

<h2>Online psikolog mu, yüz yüze mi?</h2>

<p>İkisi arasında bir hiyerarşi yok; soru hangisinin size uyduğu. Yüz yüze görüşme, beden dilinin bütününü ve ortak fiziksel alanın verdiği güveni sunar. Online görüşme ise ulaşım süresini ortadan kaldırır ve düzenliliği kolaylaştırır — İstanbul gibi bir şehirde bu küçük bir avantaj değildir.</p>

<p>Beşiktaş, Etiler, Levent, Nişantaşı ve Şişli gibi kliniğe yakın bölgelerde yüz yüze seans imkânı sunuluyor; Kadıköy, Ataşehir, Bakırköy gibi ulaşımın uzun sürdüğü ilçelerden gelen danışanlar ile yurt dışında yaşayan Türkçe konuşan danışanlar için online seans seçeneği de mevcut. İlçe bazlı erişim ayrıntılarını <a href="/istanbul-psikolog">İstanbul psikolog rehberi</a> sayfasında bulabilirsiniz.</p>

<h2>Hangi konuda destek arıyorsunuz?</h2>

<p>Psikolojik destek tek bir yaklaşımdan ibaret değildir; getirdiğiniz konuya göre süreç ve yöntem de farklılık gösterir. Aşağıdaki tablo, ihtiyaç duyduğunuz alana daha net bir bakış sunarak ilk adımı atmanıza yardımcı olmak için hazırlanmıştır:</p>

<table>
  <caption>Destek alanlarına göre yönlendirme</caption>
  <thead>
    <tr><th>Destek alanı</th><th>Ne zaman bu alana bakılır</th></tr>
  </thead>
  <tbody>
    <tr><td>Terapi nedir, nasıl işler</td><td>Süreci hiç bilmiyorsunuz, nereden başlayacağınıza karar veremiyorsunuz</td></tr>
    <tr><td>Klinik psikolog ve psikoterapist farkı</td><td>Unvanlar karışıyor, kimin yetkili olduğunu bilmek istiyorsunuz</td></tr>
    <tr><td><a href="/bireysel-terapi">Bireysel terapi</a></td><td>Tek başınıza, kendi örüntüleriniz üzerine çalışmak istiyorsunuz</td></tr>
    <tr><td><a href="/evlilik-iliski-terapisi">Çift terapisi ve evlilik terapisi</a></td><td>Aynı tartışma tekrar ediyor, iletişim tıkanmış durumda</td></tr>
    <tr><td>Aile terapisi</td><td>Sorun iki kişiden fazlasını kapsıyor, aile içi denge bozulmuş</td></tr>
    <tr><td><a href="/depresyon-terapisi">Depresyon tedavisi</a></td><td>İsteksizlik, yorgunluk ve keyifsizlik haftalardır sürüyor</td></tr>
    <tr><td><a href="/kaygi-bozukluklari">Kaygı bozukluğu ve anksiyete tedavisi</a></td><td>Sürekli endişe hayatınızı daraltıyor</td></tr>
    <tr><td>Panik atak tedavisi</td><td>Ani gelen yoğun korku nöbetleri yaşıyorsunuz</td></tr>
    <tr><td><a href="/ofke-stres-terapisi">Öfke ve stres terapisi</a></td><td>Tepkileriniz kontrolünüzden çıkıyor ya da tükenmiş hissediyorsunuz</td></tr>
    <tr><td><a href="/olum-yas-terapisi">Ölüm ve yas terapisi</a></td><td>Bir kayıptan sonra toparlanamıyorsunuz</td></tr>
    <tr><td>Çocuk psikoloğu</td><td>Çocuğunuzun davranışlarında sizi endişelendiren bir değişim var</td></tr>
    <tr><td>Bağımlılık terapisi</td><td>Bir madde veya davranış üzerindeki kontrolünüzü kaybettiğinizi düşünüyorsunuz</td></tr>
    <tr><td>Cinsel terapi</td><td>Cinsel yaşamınızda sizi zorlayan bir sorun var</td></tr>
    <tr><td>Online terapi</td><td>Ulaşım, saat veya mahremiyet nedeniyle uzaktan görüşmeyi tercih ediyorsunuz</td></tr>
    <tr><td><a href="/istanbul-psikolog">İstanbul psikolog</a></td><td>İstanbul'da ulaşabileceğiniz bir uzman arıyorsunuz</td></tr>
  </tbody>
</table>

<p>Hangi alanda ihtiyacınız olduğundan emin değilseniz sorun değil — bu ayrımı yapmak sizin işiniz değil. Ücretsiz ön görüşme için <a href="/#contact">iletişim</a> bölümünden bize ulaşabilirsiniz.</p>

<h2>Terapiye başlamayı erteleten dört düşünce</h2>

<p>Danışma odasında en sık duyduğum dört cümle var. Dördü de tanıdık, dördü de süreci geciktiriyor.</p>

<ol>
  <li><strong>"Benimki o kadar da ciddi değil."</strong> Terapiye başvurmak için bir eşiği aşmayı beklemek, çoğu zaman zorluğun yerleşmesine zaman tanır. Erken dönemde çalışılan bir örüntü, yıllar sonra çalışılandan daha kısa sürede değişir.</li>
  <li><strong>"Kendim halledebilirim."</strong> Çoğu zaman haklısınız — ve zaten bir süredir hallediyorsunuz. Soru şu: bunun size kaça mal olduğu. Tek başına taşınan yük, taşınamaz olduğu için değil, gereksiz yere ağır olduğu için bırakılabilir.</li>
  <li><strong>"Konuşmakla ne değişecek?"</strong> Terapi yalnızca konuşmak değildir; konuşulanın belirli bir çerçeveyle işlenmesidir. Fark, bir arkadaşınıza anlatmakla bir haritanın üzerinde çalışmak arasındaki farktır.</li>
  <li><strong>"Ya bana bir şey olduğu ortaya çıkarsa?"</strong> Terapist etiket koymaz. Amacı sizi bir kategoriye yerleştirmek değil, yaşadığınızın nasıl işlediğini anlaşılır kılmaktır.</li>
</ol>

<p>Bu düşüncelerden birini tanıdıysanız yalnız değilsiniz. İlk adımı atmak için bunların geçmesini beklemek gerekmiyor — çoğu kişi tam da bu düşüncelerle birlikte geliyor.</p>

<h2>Nasıl başlanır?</h2>

<p>Terapiye başlamak için hazır hissetmeniz gerekmiyor; başlamak zaten hazır hissetmenin yoluna girmenin bir parçası. Yetişkin ve ergen danışanlarla yürüttüğüm <a href="/bireysel-terapi">bireysel terapi</a> sürecinde bilişsel davranışçı terapi ve EMDR ile çalışıyorum. Ücretsiz ön görüşme için <a href="/#contact">iletişim</a> bölümünden bana ulaşabilirsiniz.</p>
`;
