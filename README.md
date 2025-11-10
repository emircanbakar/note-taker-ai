# Stood - AI Destekli Not Alma ve PDF Yönetimi Platformu

Stood, öğrenciler için tasarlanmış dijital not alma ve PDF yönetimi platformudur. AI destekli özellikler ile not alma deneyiminizi geliştirir.

## 🚀 Özellikler

### 📄 PDF Yönetimi
- **PDF Yükleme**: Güvenli dosya yükleme ve depolama
- **PDF Görüntüleme**: Yerleşik PDF görüntüleyici
- **PDF Birleştirme**: Birden fazla PDF'i tek dosyada birleştirme
- **PDF Bölme**: Büyük PDF'leri istediğiniz parça sayısında bölme

### 🤖 AI Destekli Not Alma
- **Akıllı Not Editörü**: Tiptap editör ile zengin metin düzenleme
- **AI Soru-Cevap**: PDF içeriğinden otomatik cevap üretme
- **Vektör Arama**: Langchain ve Convex Vector Store ile semantik arama
- **Google Gemini AI**: Gelişmiş dil modeli entegrasyonu

### 👥 Kullanıcı Yönetimi
- **Clerk Kimlik Doğrulama**: Güvenli giriş ve kayıt
- **Kişisel Çalışma Alanı**: Kullanıcıya özel dosya yönetimi
- **Responsive Tasarım**: Tüm cihazlarda uyumlu arayüz

## 🛠️ Teknoloji Stack'i

### Frontend
- **Next.js 15** - React framework
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern UI bileşenleri
- **Tiptap** - Zengin metin editörü

### Backend & Database
- **Convex** - Gerçek zamanlı database ve backend
- **Convex Vector Store** - Vektör tabanlı arama
- **Clerk** - Kimlik doğrulama servisi

### AI & ML
- **Langchain** - AI uygulamaları için framework
- **Google Gemini AI** - Dil modeli
- **PDF-lib** - PDF işleme kütüphanesi

## 🔧 Kurulum

### Gereksinimler
- Node.js (v18 veya üzeri)
- npm veya yarn
- Convex hesabı
- Clerk hesabı
- Google AI API anahtarı

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone <repository-url>
cd note-taker
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Environment variables ayarlayın**
`.env.local` dosyası oluşturun:
```env
NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
GOOGLE_API_KEY=your_google_api_key
```

4. **Convex'i başlatın**
```bash
npx convex dev
```

5. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

6. **Uygulamayı açın**
Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin.

## 📁 Proje Yapısı

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Kimlik doğrulama sayfaları
│   ├── dashboard/         # Ana dashboard
│   ├── workspace/         # PDF görüntüleme ve not editörü
│   ├── merger/            # PDF birleştirme
│   ├── splitter/          # PDF bölme
│   └── api/               # API endpoints
├── components/            # Yeniden kullanılabilir bileşenler
│   └── ui/               # Shadcn UI bileşenleri
├── convex/               # Convex backend fonksiyonları
│   ├── schema.js         # Veritabanı şeması
│   ├── fileStorage.js    # Dosya işlemleri
│   ├── myActions.js      # AI işlemleri
│   └── notes.js          # Not işlemleri
├── configs/              # Yapılandırma dosyaları
└── lib/                  # Yardımcı fonksiyonlar
```

## 🔌 API Endpoints

### PDF İşleme
- `GET /api/pdf` - PDF içeriğini çıkarma
- `POST /api/merge` - PDF birleştirme
- `POST /api/split` - PDF bölme

### Convex Functions
- `fileStorage.*` - Dosya yükleme/indirme
- `notes.*` - Not kaydetme/getirme
- `myActions.*` - AI işlemleri
- `user.*` - Kullanıcı yönetimi

## 🎯 Kullanım

### PDF Yükleme
1. Dashboard'a gidin
2. "PDF ekle" butonuna tıklayın
3. Dosyanızı seçin ve isim verin
4. Yükleme tamamlandığında çalışma alanına gidin

### AI Destekli Not Alma
1. Yüklenen PDF'i açın
2. Sağ panelde notlarınızı yazın
3. Metin seçip AI butonuna tıklayarak soru sorun
4. AI, PDF içeriğinden cevap üretecek

### PDF Birleştirme
1. "PDF Birleştir" bölümüne gidin
2. Birleştirmek istediğiniz PDF'leri seçin
3. Sıralamayı ayarlayın
4. "Birleştir" butonuna tıklayın

### PDF Bölme
1. "PDF Böl" bölümüne gidin
2. Bölmek istediğiniz PDF'i yükleyin
3. Kaç parçaya bölmek istediğinizi seçin
4. "Böl" butonuna tıklayın

## 🔒 Güvenlik

- Clerk ile güvenli kimlik doğrulama
- Convex ile şifrelenmiş veri depolama
- Dosya yükleme güvenlik kontrolleri
- Kullanıcıya özel erişim kontrolü

## 📝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 İletişim

Proje Sahibi: ejb (ecbakar)

Sorularınız için issue açabilir veya pull request gönderebilirsiniz.

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) - React framework
- [Convex](https://www.convex.dev/) - Backend platform
- [Clerk](https://clerk.com/) - Authentication
- [Shadcn/ui](https://ui.shadcn.com/) - UI components
- [Langchain](https://langchain.com/) - AI framework
- [Google AI](https://ai.google/) - Language model

---

**Not**: Bu proje öğrenciler için geliştirilmiş bir not alma platformudur. Sürekli geliştirme aşamasındadır.