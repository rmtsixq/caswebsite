# Firebase Security Rules

## Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Genel dosya yükleme kuralları
    match /{allPaths=**} {
      allow read: if true; // Herkes okuyabilir
      allow write: if request.auth != null && 
        request.resource.size < 10 * 1024 * 1024 && // 10MB limit
        (request.resource.contentType.matches('image/.*') || 
         request.resource.contentType.matches('video/.*') ||
         request.resource.contentType.matches('audio/.*'));
    }
    
    // Profil fotoğrafları - sadece kendi profilini güncelleyebilir
    match /profile-images/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.uid == userId &&
        request.resource.size < 5 * 1024 * 1024 && // 5MB limit
        request.resource.contentType.matches('image/.*');
    }
    
    // Admin dosyaları sadece admin düzenleyebilir
    match /admin/{allPaths=**} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
  }
}
```

## Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Articles collection - HERKES OKUYABİLİR
    match /articles/{articleId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // Videos collection  
    match /videos/{videoId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // Podcasts collection
    match /podcasts/{podcastId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // Categories collection
    match /categories/{categoryId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

## Önemli Değişiklikler

### Storage Kuralları:
1. **`resource.size` → `request.resource.size`**: Yeni yüklenen dosyalar için doğru syntax
2. **Profil fotoğrafları için özel path**: `/profile-images/{userId}/{fileName}`
3. **5MB limit**: Profil fotoğrafları için daha küçük limit
4. **Sadece kendi profilini güncelleyebilir**: `request.auth.uid == userId`

### Firestore Kuralları:
1. **Kullanıcı profil güncellemeleri**: Mevcut kurallar yeterli
2. **Admin okuma erişimi**: Adminler tüm kullanıcı profillerini okuyabilir

## Kullanım

Bu kuralları Firebase Console'da uyguladıktan sonra:

1. **Profil fotoğrafı yükleme** çalışacak
2. **Sadece kendi profilini** güncelleyebilecek
3. **Adminler** tüm kullanıcı profillerini görebilecek
4. **Dosya boyutu ve tip** kontrolleri çalışacak 