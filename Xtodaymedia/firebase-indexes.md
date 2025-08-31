# Firebase Firestore Index'leri

## Gerekli Index'ler

Firebase Console'da aşağıdaki index'leri oluşturmanız gerekiyor:

### 1. Articles Collection Index'leri

**Collection ID:** `articles`

#### Index 1: Status + PublishedAt
- **Fields:**
  - `status` (Ascending)
  - `publishedAt` (Descending)

#### Index 2: Status + IsEditorsPick + PublishedAt
- **Fields:**
  - `status` (Ascending)
  - `isEditorsPick` (Ascending)
  - `publishedAt` (Descending)

### 2. Videos Collection Index'leri

**Collection ID:** `videos`

#### Index 1: Status + PublishedAt
- **Fields:**
  - `status` (Ascending)
  - `publishedAt` (Descending)

## Index Oluşturma Adımları

1. **Firebase Console'a git:** https://console.firebase.google.com
2. **Projenizi seçin:** `bensende-e707`
3. **Firestore Database'e git**
4. **Indexes sekmesine tıklayın**
5. **"Create Index" butonuna tıklayın**
6. **Collection ID:** `articles` yazın
7. **Fields ekleyin:**
   - `status` (Ascending)
   - `publishedAt` (Descending)
8. **"Create" butonuna tıklayın**

Aynı işlemi diğer index'ler için de tekrarlayın.

## Index Durumu

Index'ler oluşturulduktan sonra "Building" durumunda olacak. Bu işlem birkaç dakika sürebilir.

Index'ler hazır olduğunda, `lib/firestore.ts` dosyasındaki `orderBy` satırlarının yorumunu kaldırabilirsiniz.

## Geçici Çözüm

Şu anda `orderBy` satırları yorumlanmış durumda. Bu sayede index olmadan da veriler çekilebilir. Index'ler hazır olduğunda bu satırları aktif edebilirsiniz. 