const auth = firebase.auth();

// Admin email - bu email'e sahip kullanıcı otomatik admin olur
const ADMIN_EMAIL = 'naslan7321@gmail.com';

async function register(email, password, displayName) {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Update user profile
    await user.updateProfile({ displayName });

    // Create user profile in Firestore
    const isAdmin = email === ADMIN_EMAIL;
    const userProfile = {
      uid: user.uid,
      email: user.email,
      displayName,
      isAdmin,
      createdAt: new Date().toISOString()
    };

    await db.collection('users').doc(user.uid).set(userProfile);

    return { user, profile: userProfile };
  } catch (error) {
    throw error;
  }
}

async function login(email, password) {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Get user profile from Firestore
    const userDoc = await db.collection('users').doc(user.uid).get();
    let profile;

    if (userDoc.exists) {
      profile = userDoc.data();
    } else {
      // Create profile if it doesn't exist (for existing users)
      const isAdmin = user.email === ADMIN_EMAIL;
      profile = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'User',
        isAdmin,
        createdAt: new Date().toISOString()
      };
      await db.collection('users').doc(user.uid).set(profile);
    }

    return { user, profile };
  } catch (error) {
    throw error;
  }
}

function logout() {
  return auth.signOut();
}

function onUserChanged(callback) {
  auth.onAuthStateChanged(callback);
}

function getCurrentUser() {
  return auth.currentUser;
}

async function getUserProfile(uid) {
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (userDoc.exists) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
}

async function updateUserProfile(uid, updates) {
  try {
    await db.collection('users').doc(uid).update(updates);
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

async function checkAdminStatus(user) {
  if (!user) return false;

  try {
    const profile = await getUserProfile(user.uid);
    return profile?.isAdmin || false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

// Enhanced Auth State Management
class AuthManager {
  constructor() {
    this.user = null;
    this.userProfile = null;
    this.isAdmin = false;
    this.callbacks = [];
    this.init();
  }

  init() {
    auth.onAuthStateChanged(async (user) => {
      this.user = user;

      if (user) {
        try {
          this.userProfile = await getUserProfile(user.uid);
          this.isAdmin = this.userProfile?.isAdmin || false;
        } catch (error) {
          console.error('Error loading user profile:', error);
          this.userProfile = null;
          this.isAdmin = false;
        }
      } else {
        this.userProfile = null;
        this.isAdmin = false;
      }

      // Update UI
      this.updateAuthUI();

      // Call registered callbacks
      this.callbacks.forEach(callback => {
        callback({
          user: this.user,
          userProfile: this.userProfile,
          isAdmin: this.isAdmin
        });
      });
    });
  }

  onAuthStateChange(callback) {
    this.callbacks.push(callback);
  }

  updateAuthUI() {
    const loginBtn = document.getElementById('showLoginBtn');
    const signupBtn = document.getElementById('showSignupBtn');
    const authButtons = document.querySelector('.auth-buttons');
    const adminLink = document.getElementById('adminLink');

    // Show/hide admin link in navigation
    if (adminLink) {
      adminLink.style.display = this.isAdmin ? 'block' : 'none';
    }

    if (this.user && authButtons) {
      // Replace auth buttons with user menu
      authButtons.innerHTML = `
        <div class="profile-btn-container" style="position: relative;">
          <button class="auth-btn profile-btn" id="profileBtn">
            <i class="fas fa-user"></i>
            <span>${this.userProfile?.displayName || 'User'}</span>
            ${this.isAdmin ? '<span style="margin-left: 0.5rem; background: var(--accent-color); padding: 2px 6px; border-radius: 10px; font-size: 0.7rem;">ADMIN</span>' : ''}
          </button>
          <div class="profile-menu" id="profileMenu" style="display: none;">
            ${this.isAdmin ? '<div class="profile-menu-item" onclick="window.location.href=\'admin.html\'"><i class="fas fa-cog"></i> Admin Panel</div>' : ''}
            <div class="profile-menu-item" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Çıkış Yap</div>
          </div>
        </div>
      `;

      // Setup profile menu
      this.setupProfileMenu();
    } else {
      // Hide admin link for non-logged users
      if (adminLink) {
        adminLink.style.display = 'none';
      }
    }
  }

  setupProfileMenu() {
    const profileBtn = document.getElementById('profileBtn');
    const profileMenu = document.getElementById('profileMenu');
    const logoutBtn = document.getElementById('logoutBtn');

    if (profileBtn && profileMenu) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileMenu.style.display = profileMenu.style.display === 'none' ? 'block' : 'none';
      });

      // Close menu when clicking outside
      document.addEventListener('click', () => {
        profileMenu.style.display = 'none';
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', async () => {
        try {
          await logout();
          window.location.href = 'index.html';
        } catch (error) {
          console.error('Logout error:', error);
        }
      });
    }
  }
}

// Initialize Auth Manager
window.authManager = new AuthManager();

window.authApi = {
  register,
  login,
  logout,
  onUserChanged,
  getCurrentUser,
  getUserProfile,
  updateUserProfile,
  checkAdminStatus
}; 