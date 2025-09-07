# Firebase Kurulum Rehberi

## 🔥 Firebase Console'da Yapılacaklar

### 1. Firestore Security Rules

Firebase Console → Firestore Database → Rules sekmesine git ve aşağıdaki kuralları yapıştır:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // USERS COLLECTION
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
      allow create: if request.auth != null && request.auth.uid == userId;
    }
    
    // ARTICLES COLLECTION
    match /articles/{articleId} {
      allow read: if resource.data.status == 'published';
      allow create: if request.auth != null;
      allow update: if request.auth != null && (
        resource.data.createdBy == request.auth.uid ||
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true
      );
      allow delete: if request.auth != null && (
        resource.data.createdBy == request.auth.uid ||
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true
      );
    }
    
    // VIDEOS COLLECTION
    match /videos/{videoId} {
      allow read: if resource.data.status == 'published';
      allow create: if request.auth != null;
      allow update: if request.auth != null && (
        resource.data.createdBy == request.auth.uid ||
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true
      );
      allow delete: if request.auth != null && (
        resource.data.createdBy == request.auth.uid ||
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true
      );
    }
    
    // CATEGORIES COLLECTION
    match /categories/{categoryId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
  }
}
```

### 2. Firestore Index'leri Oluştur

Firebase Console → Firestore Database → Indexes sekmesine git ve aşağıdaki index'leri oluştur:

#### Articles Collection Index'leri:

**Index 1: Status + PublishedAt**
- Collection ID: `articles`
- Fields:
  - `status` (Ascending)
  - `publishedAt` (Descending)

**Index 2: Status + IsEditorsPick + PublishedAt**
- Collection ID: `articles`
- Fields:
  - `status` (Ascending)
  - `isEditorsPick` (Ascending)
  - `publishedAt` (Descending)

**Index 3: Status + Category + PublishedAt**
- Collection ID: `articles`
- Fields:
  - `status` (Ascending)
  - `category` (Ascending)
  - `publishedAt` (Descending)

#### Videos Collection Index'leri:

**Index 1: Status + PublishedAt**
- Collection ID: `videos`
- Fields:
  - `status` (Ascending)
  - `publishedAt` (Descending)

**Index 2: Status + Category + PublishedAt**
- Collection ID: `videos`
- Fields:
  - `status` (Ascending)
  - `category` (Ascending)
  - `publishedAt` (Descending)

### 3. Storage Security Rules

Firebase Console → Storage → Rules sekmesine git ve aşağıdaki kuralları yapıştır:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.resource.size < 10 * 1024 * 1024 && // 10MB limit
        (request.resource.contentType.matches('image/.*') || 
         request.resource.contentType.matches('video/.*') ||
         request.resource.contentType.matches('audio/.*'));
    }
    
    match /profile-images/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.uid == userId &&
        request.resource.size < 5 * 1024 * 1024 && // 5MB limit
        request.resource.contentType.matches('image/.*');
    }
    
    match /admin/{allPaths=**} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
  }
}
```

## 📊 Collection Yapıları

### Users Collection
```javascript
{
  uid: string,
  email: string,
  displayName: string,
  isAdmin: boolean,
  createdAt: string,
  lastLoginAt: string,
  profileImage: string
}
```

### Articles Collection
```javascript
{
  title: string,
  excerpt: string,
  content: string,
  author: string,
  category: string,
  status: 'draft' | 'published',
  featuredImage: string,
  publishedAt: string,
  createdAt: string,
  updatedAt: string,
  views: number,
  isEditorsPick: boolean,
  tags: string[],
  createdBy: string,
  slug: string
}
```

### Videos Collection
```javascript
{
  title: string,
  description: string,
  youtubeUrl: string,
  youtubeId: string,
  category: string,
  status: 'draft' | 'published',
  publishedAt: string,
  createdAt: string,
  updatedAt: string,
  views: number,
  createdBy: string,
  thumbnail: string
}
```

### Categories Collection
```javascript
{
  name: string,
  slug: string,
  description: string,
  color: string,
  icon: string,
  createdAt: string,
  createdBy: string
}
```

## 🔧 Admin Kullanıcı Oluşturma

İlk admin kullanıcıyı oluşturmak için:

1. Uygulamada normal kayıt ol
2. Firebase Console → Firestore → users collection
3. Kullanıcının document'ini bul
4. `isAdmin` field'ını `true` yap

Veya kod ile:
```javascript
// Admin email'i firebase-config.js'de tanımlı
const ADMIN_EMAIL = 'admin@ruzgaranatolian.edu.tr';
```

## 🚨 Önemli Notlar

1. **Index'ler oluşturulana kadar** sorgular çalışmayabilir
2. **Rules değişiklikleri** birkaç dakika sürebilir
3. **Test modunda** tüm erişimler açık, production'da rules aktif olur
4. **Admin yetkisi** sadece `isAdmin: true` olan kullanıcılarda

## ✅ Test Etme

1. Rules ve index'ler aktif olduktan sonra
2. Uygulamada login/signup test et
3. Admin paneli test et
4. Makale/video oluşturma test et
5. Public erişim test et

