import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, getDoc, query, where, orderBy, limit, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from './firebase';

// Firebase için güncellenmiş Article interface
export interface FirebaseArticle {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  customCategory?: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  featuredImage: string;
  isEditorsPick: boolean;
  views?: number;
  status: 'draft' | 'published' | 'archived';
  createdBy: string;
  createdAt?: any;
  updatedAt?: any;
}

// Firebase için güncellenmiş Video interface
export interface FirebaseVideo {
  id?: string;
  title: string;
  description: string;
  youtubeUrl: string;
  youtubeId?: string;
  category: string;
  customCategory?: string;
  duration?: string;
  views?: number;
  publishedAt: string;
  thumbnail?: string;
  status: 'draft' | 'published' | 'archived';
  createdBy: string;
  createdAt?: any;
  updatedAt?: any;
}

// YouTube URL'sinden ID çıkarma
export const extractYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Slug oluşturma
export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// ARTICLES
export const createArticle = async (articleData: Omit<FirebaseArticle, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    console.log('Firestore createArticle başladı...');
    console.log('DB instance:', db);
    console.log('Article data:', articleData);
    
    const docRef = await addDoc(collection(db, 'articles'), {
      ...articleData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    console.log('Makale Firestore\'a eklendi! ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Firestore createArticle hatası:', error);
    throw error;
  }
};

export const getPublishedArticles = async (): Promise<FirebaseArticle[]> => {
  try {
    console.log('getPublishedArticles başladı...');
    
    // Geçici olarak orderBy'ı kaldırıyoruz (index sorunu için)
    const q = query(
      collection(db, 'articles'), 
      where('status', '==', 'published')
      // orderBy('publishedAt', 'desc') // Index sorunu için geçici olarak kaldırıldı
    );
    
    console.log('Query oluşturuldu, veriler çekiliyor...');
    const querySnapshot = await getDocs(q);
    console.log('QuerySnapshot alındı, doc sayısı:', querySnapshot.size);
    
    const articles = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log('Makale verisi:', {
        id: doc.id,
        title: data.title,
        status: data.status,
        publishedAt: data.publishedAt
      });
      return {
        id: doc.id,
        ...data
      } as FirebaseArticle;
    });
    
    // Client-side sorting ekleyelim
    articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    console.log('İşlenmiş makaleler:', articles);
    return articles;
  } catch (error) {
    console.error('getPublishedArticles hatası:', error);
    return [];
  }
};

export const getAllArticles = async (): Promise<FirebaseArticle[]> => {
  try {
    const q = query(
      collection(db, 'articles'), 
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as FirebaseArticle));
  } catch (error) {
    console.error('getAllArticles hatası:', error);
    return [];
  }
};

export const updateArticle = async (articleId: string, updates: Partial<FirebaseArticle>): Promise<void> => {
  try {
    console.log('updateArticle başladı...');
    console.log('Article ID:', articleId);
    console.log('Updates:', updates);
    
    const articleRef = doc(db, 'articles', articleId);
    await updateDoc(articleRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    
    console.log('Makale başarıyla güncellendi!');
  } catch (error: any) {
    console.error('updateArticle hatası:', error);
    throw error;
  }
};

export const deleteArticle = async (articleId: string): Promise<void> => {
  try {
    console.log('deleteArticle başladı...');
    console.log('Article ID:', articleId);
    
    const articleRef = doc(db, 'articles', articleId);
    await deleteDoc(articleRef);
    
    console.log('Makale başarıyla silindi!');
  } catch (error: any) {
    console.error('deleteArticle hatası:', error);
    throw error;
  }
};

export const getEditorsPicks = async (): Promise<FirebaseArticle[]> => {
  try {
    console.log('getEditorsPicks başladı...');
    
    // Geçici olarak orderBy'ı kaldırıyoruz (index sorunu için)
    const q = query(
      collection(db, 'articles'), 
      where('status', '==', 'published'),
      where('isEditorsPick', '==', true)
      // orderBy('publishedAt', 'desc') // Index sorunu için geçici olarak kaldırıldı
    );
    
    console.log('Editor Picks query oluşturuldu...');
    const querySnapshot = await getDocs(q);
    console.log('Editor Picks QuerySnapshot alındı, doc sayısı:', querySnapshot.size);
    
    const articles = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log('Editor Pick verisi:', {
        id: doc.id,
        title: data.title,
        status: data.status,
        isEditorsPick: data.isEditorsPick
      });
      return {
        id: doc.id,
        ...data
      } as FirebaseArticle;
    });
    
    // Client-side sorting ekleyelim
    articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    console.log('İşlenmiş editor picks:', articles);
    return articles;
  } catch (error) {
    console.error('getEditorsPicks hatası:', error);
    return [];
  }
};

export const getArticleById = async (articleId: string): Promise<FirebaseArticle | null> => {
  try {
    console.log('getArticleById başladı...');
    console.log('Article ID:', articleId);
    
    const articleRef = doc(db, 'articles', articleId);
    const articleDoc = await getDoc(articleRef);
    
    if (!articleDoc.exists()) {
      console.log('Makale bulunamadı');
      return null;
    }
    
    const data = articleDoc.data();
    console.log('Bulunan makale verisi:', {
      id: articleDoc.id,
      title: data.title,
      status: data.status
    });
    
    return {
      id: articleDoc.id,
      ...data
    } as FirebaseArticle;
  } catch (error) {
    console.error('getArticleById hatası:', error);
    return null;
  }
};

export const getArticleBySlug = async (slug: string): Promise<FirebaseArticle | null> => {
  try {
    console.log('getArticleBySlug başladı, slug:', slug);
    
    const q = query(
      collection(db, 'articles'), 
      where('slug', '==', slug),
      where('status', '==', 'published')
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const articleData = doc.data() as FirebaseArticle;
      const article: FirebaseArticle = {
        ...articleData,
        id: doc.id
      };
      
      console.log('Article bulundu:', article);
      return article;
    }
    
    console.log('Article bulunamadı, slug:', slug);
    return null;
  } catch (error) {
    console.error('getArticleBySlug hatası:', error);
    throw error;
  }
};

// VIDEOS
export const createVideo = async (videoData: Omit<FirebaseVideo, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const youtubeId = extractYouTubeId(videoData.youtubeUrl);
    if (!youtubeId) {
      throw new Error('Geçersiz YouTube URL');
    }

    const videoWithMetadata = {
      ...videoData,
      youtubeId,
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'videos'), videoWithMetadata);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getPublishedVideos = async (): Promise<FirebaseVideo[]> => {
  try {
    console.log('getPublishedVideos başladı...');
    
    // Geçici olarak orderBy'ı kaldırıyoruz (index sorunu için)
    const q = query(
      collection(db, 'videos'), 
      where('status', '==', 'published')
      // orderBy('publishedAt', 'desc') // Index sorunu için geçici olarak kaldırıldı
    );
    
    console.log('Videos query oluşturuldu...');
    const querySnapshot = await getDocs(q);
    console.log('Videos QuerySnapshot alındı, doc sayısı:', querySnapshot.size);
    
    const videos = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log('Video verisi:', {
        id: doc.id,
        title: data.title,
        status: data.status,
        publishedAt: data.publishedAt
      });
      return {
        id: doc.id,
        ...data
      } as FirebaseVideo;
    });
    
    // Client-side sorting ekleyelim
    videos.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    console.log('İşlenmiş videolar:', videos);
    return videos;
  } catch (error) {
    console.error('getPublishedVideos hatası:', error);
    return [];
  }
};

export const getAllVideos = async (): Promise<FirebaseVideo[]> => {
  try {
    const q = query(
      collection(db, 'videos'), 
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as FirebaseVideo));
  } catch (error) {
    console.error('getAllVideos hatası:', error);
    return [];
  }
};

export const updateVideo = async (videoId: string, updates: Partial<FirebaseVideo>): Promise<void> => {
  try {
    console.log('updateVideo başladı...');
    console.log('Video ID:', videoId);
    console.log('Updates:', updates);
    
    const videoRef = doc(db, 'videos', videoId);
    await updateDoc(videoRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    
    console.log('Video başarıyla güncellendi!');
  } catch (error: any) {
    console.error('updateVideo hatası:', error);
    throw error;
  }
};

export const deleteVideo = async (videoId: string): Promise<void> => {
  try {
    console.log('deleteVideo başladı...');
    console.log('Video ID:', videoId);
    
    const videoRef = doc(db, 'videos', videoId);
    await deleteDoc(videoRef);
    
    console.log('Video başarıyla silindi!');
  } catch (error: any) {
    console.error('deleteVideo hatası:', error);
    throw error;
  }
};

// Firebase Storage fonksiyonları
export const uploadImage = async (file: File): Promise<string> => {
  try {
    console.log('Dosya yükleniyor:', file.name);
    
    const storage = getStorage();
    const storageRef = ref(storage, `articles/${Date.now()}_${file.name}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    console.log('Dosya yüklendi:', snapshot.metadata.name);
    
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('Download URL:', downloadURL);
    
    return downloadURL;
  } catch (error) {
    console.error('Dosya yükleme hatası:', error);
    throw error;
  }
};



export const uploadProfileImage = async (file: File, userId: string): Promise<string> => {
  try {
    const storageRef = ref(getStorage(), `profile-images/${userId}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};

// Firebase'den tüm kullanıcıları çekme
export const getAllUsers = async (): Promise<{ uid: string; displayName: string; email: string }[]> => {
  try {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    
    const users = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        uid: doc.id,
        displayName: data.displayName || 'Unknown User',
        email: data.email || 'unknown@email.com'
      };
    });
    
    return users;
  } catch (error) {
    console.error('Kullanıcılar çekilirken hata:', error);
    return [];
  }
};
