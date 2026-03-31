# CAS Website Article & Video System

Bu sistem, Private Ruzgar Anatolian Lisesi CAS websitesine Xtodaymedia'dan esinlenerek geliştirilmiş kapsamlı bir makale ve video yönetim sistemi ekler.

## 🚀 Özellikler

### 📚 Article Sistemi
- **Article Listing**: Ana sayfada "Latest Articles" bölümü
- **All Articles Page**: Filtreleme, arama, sıralama özellikleri
- **Article Detail**: Tam makale görüntüleme sayfası
- **Admin Panel**: Article oluşturma, düzenleme, silme
- **Categories**: STEM, Politics, Philosophy, vb.
- **Editor's Pick**: Özel makale seçimi
- **Tags System**: Makale etiketleme sistemi

### 🎥 Video Sistemi
- **Video Listing**: Ana sayfada "Latest Videos" bölümü
- **All Videos Page**: Video filtreleme ve arama
- **Video Detail**: YouTube embed ile video görüntüleme
- **Admin Panel**: YouTube video ekleme ve yönetimi
- **YouTube Integration**: Otomatik thumbnail alma

### 🔐 Auth Sistemi
- **Firebase Authentication**: Email/password ile giriş
- **Admin Yetkilendirme**: `admin@ruzgaranatolian.edu.tr` otomatik admin
- **User Profiles**: Firestore'da kullanıcı profilleri
- **Protected Routes**: Admin sayfaları korumalı

### 🎨 Tasarım
- **CAS Tarzı**: Mevcut dark theme'e uygun
- **Glassmorphism**: Modern cam efekti
- **Responsive**: Mobil uyumlu
- **Smooth Animations**: Geçiş efektleri

## 📁 Dosya Yapısı

### Ana Sayfalar
- `index.html` - Ana sayfa (articles ve videos bölümleri eklendi)
- `articles.html` - Tüm makaleler sayfası
- `videos.html` - Tüm videolar sayfası
- `article-detail.html` - Makale detay sayfası
- `video-detail.html` - Video detay sayfası

### Admin Sayfaları
- `admin.html` - Admin dashboard
- `admin-new-article.html` - Yeni makale oluşturma
- `admin-new-video.html` - Yeni video ekleme
- `admin-articles.html` - Makale yönetimi
- `admin-videos.html` - Video yönetimi

### JavaScript Dosyaları
- `js/articles.js` - Article ve video sistemi
- `js/auth.js` - Geliştirilmiş auth sistemi
- `js/auth-ui.js` - Auth UI güncellemeleri
- `js/firebase-config.js` - Firebase yapılandırması

### CSS
- `styles.css` - CAS tarzında article/video stilleri eklendi

## 🛠️ Kurulum

### 1. Firebase Kurulumu
Firebase config dosyasında iki seçenek mevcut:
- **CAS Firebase**: Mevcut CAS projesi (varsayılan)
- **Xtodaymedia Firebase**: Mevcut veri ile test için

### 2. Admin Hesabı
Admin hesabı oluşturmak için:
```
Email: admin@ruzgaranatolian.edu.tr
Password: [istediğiniz şifre]
```

Bu email ile kayıt olan kullanıcı otomatik admin yetkisi alır.

### 3. Database Collections
Sistem şu Firestore collections'ları kullanır:

#### Articles Collection
```javascript
{
  title: "Makale Başlığı",
  slug: "makale-basligi",
  excerpt: "Makale özeti",
  content: "HTML içerik",
  author: "Yazar Adı",
  category: "STEM",
  tags: ["etiket1", "etiket2"],
  publishedAt: "2024-01-01T00:00:00.000Z",
  readTime: 5,
  featuredImage: "https://...",
  isEditorsPick: false,
  views: 0,
  status: "published", // veya "draft"
  createdBy: "userId",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Videos Collection
```javascript
{
  title: "Video Başlığı",
  description: "Video açıklaması",
  youtubeUrl: "https://youtube.com/watch?v=...",
  youtubeId: "extractedId",
  category: "STEM",
  duration: "10:30",
  views: 0,
  publishedAt: "2024-01-01T00:00:00.000Z",
  thumbnail: "https://img.youtube.com/vi/.../maxresdefault.jpg",
  status: "published", // veya "draft"
  createdBy: "userId",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Users Collection
```javascript
{
  uid: "userId",
  email: "user@example.com",
  displayName: "Kullanıcı Adı",
  isAdmin: false,
  createdAt: "2024-01-01T00:00:00.000Z"
}
```

## 🎯 Kullanım

### Kullanıcılar İçin
1. **Ana Sayfa**: Latest articles ve videos bölümlerini görüntüle
2. **Articles Page**: Tüm makaleleri filtrele, ara, oku
3. **Videos Page**: Tüm videoları filtrele, ara, izle
4. **Kayıt/Giriş**: Auth sistemi ile hesap oluştur

### Adminler İçin
1. **Admin Panel**: `admin.html` - istatistikler ve hızlı erişim
2. **Makale Oluştur**: Yeni makale ekle
3. **Video Ekle**: YouTube URL ile video ekle
4. **Yönetim**: Makaleleri ve videoları düzenle/sil

## 🎨 Tasarım Detayları

### Renk Paleti
- **Primary**: `#1a1a1a` (Koyu siyah)
- **Secondary**: `#e63946` (Kırmızı)
- **Accent**: `#ff4d4d` (Parlak kırmızı)
- **Text**: `#ffffff` (Beyaz)
- **Text Light**: `#cccccc` (Açık gri)

### Efektler
- **Glassmorphism**: `backdrop-filter: blur(10px)`
- **Hover Animations**: `translateY(-10px)` kartlar için
- **Smooth Transitions**: `all 0.3s ease`
- **Box Shadows**: Modern gölge efektleri

## 🔧 Teknik Detaylar

### Bağımlılıklar
- **Firebase v8**: Authentication, Firestore, Storage
- **Font Awesome 6**: İkonlar
- **Google Fonts**: Inter font ailesi

### Browser Desteği
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Responsive**: Tüm cihazlar
- **Progressive Enhancement**: JavaScript olmadan da temel işlevsellik

## 🚀 Deployment

1. Tüm dosyaları web sunucusuna yükleyin
2. Firebase project'i yapılandırın
3. Firestore rules'ları ayarlayın
4. Admin hesabını oluşturun
5. İlk makale ve videoları ekleyin

## 📞 Destek

Herhangi bir sorun durumunda:
- **Email**: cas@ruzgaranatolian.edu.tr
- **Tel**: (0412) 123 45 67

---

**Private Ruzgar Anatolian Lisesi** tarafından geliştirilmiştir.
IB World School - CAS Program