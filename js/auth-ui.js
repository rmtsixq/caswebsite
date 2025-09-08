// Wait for authApi to be available
function waitForAuthApi() {
  return new Promise((resolve) => {
    if (window.authApi) {
      resolve(window.authApi);
    } else {
      const checkAuthApi = () => {
        if (window.authApi) {
          resolve(window.authApi);
        } else {
          setTimeout(checkAuthApi, 10);
        }
      };
      checkAuthApi();
    }
  });
}

// Initialize auth functionality when authApi is available
async function initializeAuth() {
  const authApi = await waitForAuthApi();

  // Modal ve butonlar
  const authModal = document.getElementById('authModal');
  const showLoginBtn = document.getElementById('showLoginBtn');
  const showSignupBtn = document.getElementById('showSignupBtn');
  const closeModal = document.getElementById('closeModal');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const showSignup = document.getElementById('showSignup');
  const showLogin = document.getElementById('showLogin');
  const loginFormElement = document.getElementById('loginFormElement');
  const signupFormElement = document.getElementById('signupFormElement');
  const loginError = document.getElementById('loginError');
  const signupError = document.getElementById('signupError');
  const authButtons = document.querySelector('.auth-buttons');
  const mobileAuthButtons = document.querySelector('.mobile-menu .auth-buttons');

  // Show/Hide modal
  if (showLoginBtn) {
    showLoginBtn.onclick = () => {
      // Get fresh references to modal elements
      const authModalEl = document.getElementById('authModal');
      const loginFormEl = document.getElementById('loginForm');
      const signupFormEl = document.getElementById('signupForm');
      if (authModalEl) {
        authModalEl.classList.add('active');
        if (loginFormEl) loginFormEl.style.display = '';
        if (signupFormEl) signupFormEl.style.display = 'none';
      }
    };
  }
  
  if (showSignupBtn) {
    showSignupBtn.onclick = () => {
      // Get fresh references to modal elements
      const authModalEl = document.getElementById('authModal');
      const loginFormEl = document.getElementById('loginForm');
      const signupFormEl = document.getElementById('signupForm');
      if (authModalEl) {
        authModalEl.classList.add('active');
        if (loginFormEl) loginFormEl.style.display = 'none';
        if (signupFormEl) signupFormEl.style.display = '';
      }
    };
  }
  
  if (closeModal) {
    closeModal.onclick = () => {
      // Get fresh reference to modal element
      const authModalEl = document.getElementById('authModal');
      if (authModalEl) {
        authModalEl.classList.remove('active');
        if (loginError) loginError.textContent = '';
        if (signupError) signupError.textContent = '';
      }
    };
  }
  
  if (showSignup) {
    showSignup.onclick = () => {
      // Get fresh references to form elements
      const loginFormEl = document.getElementById('loginForm');
      const signupFormEl = document.getElementById('signupForm');
      if (loginFormEl) loginFormEl.style.display = 'none';
      if (signupFormEl) signupFormEl.style.display = '';
    };
  }
  
  if (showLogin) {
    showLogin.onclick = () => {
      // Get fresh references to form elements
      const loginFormEl = document.getElementById('loginForm');
      const signupFormEl = document.getElementById('signupForm');
      if (loginFormEl) loginFormEl.style.display = '';
      if (signupFormEl) signupFormEl.style.display = 'none';
    };
  }

  // Login
  if (loginFormElement) {
    loginFormElement.onsubmit = async (e) => {
      e.preventDefault();
      if (loginError) loginError.textContent = '';
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      try {
        await authApi.login(email, password);
        // Get fresh reference to modal element
        const authModalEl = document.getElementById('authModal');
        if (authModalEl) authModalEl.classList.remove('active');
        if (loginError) loginError.textContent = '';
        window.location.reload();
      } catch (err) {
        if (loginError) loginError.textContent = err.message;
      }
    };
  }

  // Signup
  if (signupFormElement) {
    signupFormElement.onsubmit = async (e) => {
      e.preventDefault();
      if (signupError) signupError.textContent = '';
      const name = document.getElementById('signupName').value;
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;
      const confirm = document.getElementById('signupConfirmPassword').value;
      if (password !== confirm) {
        if (signupError) signupError.textContent = 'Şifreler eşleşmiyor.';
        return;
      }
      try {
        await authApi.register(email, password, name);
        // Get fresh reference to modal element
        const authModalEl = document.getElementById('authModal');
        if (authModalEl) authModalEl.classList.remove('active');
        if (signupError) signupError.textContent = '';
        window.location.reload();
      } catch (err) {
        if (signupError) signupError.textContent = err.message;
      }
    };
  }

  // Profil butonu oluştur
  function createProfileButton() {
    const profileBtn = document.createElement('button');
    profileBtn.className = 'auth-btn profile-btn';
    profileBtn.innerHTML = '<i class="fas fa-user"></i> Profil';
    profileBtn.onclick = () => {
      // Profil menüsünü göster
      const profileMenu = document.createElement('div');
      profileMenu.className = 'profile-menu';
      profileMenu.innerHTML = `
        <div class="profile-menu-item" id="logoutBtn">
          <i class="fas fa-sign-out-alt"></i> Çıkış Yap
        </div>
      `;
      
      // Eğer zaten bir menü varsa kaldır
      const existingMenu = document.querySelector('.profile-menu');
      if (existingMenu) {
        existingMenu.remove();
        return;
      }
      
      // Menüyü ekle
      profileBtn.appendChild(profileMenu);
      
      // Çıkış yapma işlemi
      document.getElementById('logoutBtn').onclick = async () => {
        try {
          await authApi.logout();
          window.location.reload();
        } catch (err) {
          console.error('Çıkış yapılırken hata:', err);
        }
      };
    };
    return profileBtn;
  }

  // Kullanıcı durumuna göre arayüzü güncelle
  authApi.onUserChanged(user => {
    if (user) {
      // Giriş yapan kullanıcıya profil butonunu göster
      if (authButtons) {
        authButtons.innerHTML = '';
        authButtons.appendChild(createProfileButton());
      }
      if (mobileAuthButtons) {
        mobileAuthButtons.innerHTML = '';
        mobileAuthButtons.appendChild(createProfileButton());
      }
      document.body.classList.add('admin-logged-in');
    } else {
      // Çıkış yapan kullanıcıya login/signup butonlarını göster
      if (authButtons) {
        authButtons.innerHTML = `
          <button class="auth-btn login-btn" id="showLoginBtn">Login</button>
          <button class="auth-btn signup-btn" id="showSignupBtn">Sign Up</button>
        `;
        // Desktop butonlara event listener'ları tekrar ekle
        const newShowLoginBtn = document.getElementById('showLoginBtn');
        const newShowSignupBtn = document.getElementById('showSignupBtn');
        
        if (newShowLoginBtn) {
          newShowLoginBtn.onclick = () => {
            // Get fresh references to modal elements
            const authModalEl = document.getElementById('authModal');
            const loginFormEl = document.getElementById('loginForm');
            const signupFormEl = document.getElementById('signupForm');
            if (authModalEl) {
              authModalEl.classList.add('active');
              if (loginFormEl) loginFormEl.style.display = '';
              if (signupFormEl) signupFormEl.style.display = 'none';
            }
          };
        }
        
        if (newShowSignupBtn) {
          newShowSignupBtn.onclick = () => {
            // Get fresh references to modal elements
            const authModalEl = document.getElementById('authModal');
            const loginFormEl = document.getElementById('loginForm');
            const signupFormEl = document.getElementById('signupForm');
            if (authModalEl) {
              authModalEl.classList.add('active');
              if (loginFormEl) loginFormEl.style.display = 'none';
              if (signupFormEl) signupFormEl.style.display = '';
            }
          };
        }
      }
      
      if (mobileAuthButtons) {
        mobileAuthButtons.innerHTML = `
          <button class="auth-btn login-btn" id="mobileShowLoginBtn">Login</button>
          <button class="auth-btn signup-btn" id="mobileShowSignupBtn">Sign Up</button>
        `;
        // Mobile butonlara event listener'ları tekrar ekle
        const mobileLoginBtn = document.getElementById('mobileShowLoginBtn');
        const mobileSignupBtn = document.getElementById('mobileShowSignupBtn');
        
        if (mobileLoginBtn) {
          mobileLoginBtn.onclick = () => {
            // Close mobile menu
            const mobileMenu = document.querySelector('.mobile-menu');
            const hamburger = document.querySelector('.hamburger');
            if (mobileMenu && hamburger) {
              mobileMenu.classList.remove('active');
              hamburger.classList.remove('active');
              document.body.style.overflow = '';
            }
            // Get fresh references to modal elements
            const authModalEl = document.getElementById('authModal');
            const loginFormEl = document.getElementById('loginForm');
            const signupFormEl = document.getElementById('signupForm');
            if (authModalEl) {
              authModalEl.classList.add('active');
              if (loginFormEl) loginFormEl.style.display = '';
              if (signupFormEl) signupFormEl.style.display = 'none';
            }
          };
        }
        
        if (mobileSignupBtn) {
          mobileSignupBtn.onclick = () => {
            // Close mobile menu
            const mobileMenu = document.querySelector('.mobile-menu');
            const hamburger = document.querySelector('.hamburger');
            if (mobileMenu && hamburger) {
              mobileMenu.classList.remove('active');
              hamburger.classList.remove('active');
              document.body.style.overflow = '';
            }
            // Get fresh references to modal elements
            const authModalEl = document.getElementById('authModal');
            const loginFormEl = document.getElementById('loginForm');
            const signupFormEl = document.getElementById('signupForm');
            if (authModalEl) {
              authModalEl.classList.add('active');
              if (loginFormEl) loginFormEl.style.display = 'none';
              if (signupFormEl) signupFormEl.style.display = '';
            }
          };
        }
      }
      document.body.classList.remove('admin-logged-in');
    }
  });
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAuth);
} else {
  initializeAuth();
} 