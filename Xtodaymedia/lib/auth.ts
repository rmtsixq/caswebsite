import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  updateProfile
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  bio?: string;
  profileImage?: string;
  isAdmin: boolean;
  createdAt: string;
}

// Admin email - bu email'e sahip kullanıcı otomatik admin olur
const ADMIN_EMAIL = 'admin@xtimes.org';

export const signUp = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Kullanıcı profilini güncelle
    await updateProfile(user, { displayName });
    
    // Firestore'da kullanıcı profilini oluştur
    const isAdmin = email === ADMIN_EMAIL;
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName,
      isAdmin,
      createdAt: new Date().toISOString()
    };
    
    await setDoc(doc(db, 'users', user.uid), userProfile);
    
    return { user, profile: userProfile };
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Kullanıcı profilini Firestore'dan al
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    let profile: UserProfile;
    
    if (userDoc.exists()) {
      profile = userDoc.data() as UserProfile;
    } else {
      // Eğer profil yoksa oluştur (mevcut kullanıcılar için)
      const isAdmin = user.email === ADMIN_EMAIL;
      profile = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || 'User',
        isAdmin,
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'users', user.uid), profile);
    }
    
    return { user, profile };
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, updates);
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export { onAuthStateChanged, type User };