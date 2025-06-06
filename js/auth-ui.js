// Get auth functions from window.authApi
const authApi = window.authApi;

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

// Show/Hide modal
showLoginBtn.onclick = () => {
  authModal.classList.add('active');
  loginForm.style.display = '';
  signupForm.style.display = 'none';
};
showSignupBtn.onclick = () => {
  authModal.classList.add('active');
  loginForm.style.display = 'none';
  signupForm.style.display = '';
};
closeModal.onclick = () => {
  authModal.classList.remove('active');
  loginError.textContent = '';
  signupError.textContent = '';
};
showSignup.onclick = () => {
  loginForm.style.display = 'none';
  signupForm.style.display = '';
};
showLogin.onclick = () => {
  loginForm.style.display = '';
  signupForm.style.display = 'none';
};

// Login
loginFormElement.onsubmit = async (e) => {
  e.preventDefault();
  loginError.textContent = '';
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  try {
    await authApi.login(email, password);
    authModal.classList.remove('active');
    loginError.textContent = '';
    window.location.reload();
  } catch (err) {
    loginError.textContent = err.message;
  }
};

// Signup
signupFormElement.onsubmit = async (e) => {
  e.preventDefault();
  signupError.textContent = '';
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirm = document.getElementById('signupConfirmPassword').value;
  if (password !== confirm) {
    signupError.textContent = 'Şifreler eşleşmiyor.';
    return;
  }
  try {
    await authApi.register(email, password);
    authModal.classList.remove('active');
    signupError.textContent = '';
    window.location.reload();
  } catch (err) {
    signupError.textContent = err.message;
  }
};

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
    authButtons.innerHTML = '';
    authButtons.appendChild(createProfileButton());
    document.body.classList.add('admin-logged-in');
  } else {
    // Çıkış yapan kullanıcıya login/signup butonlarını göster
    authButtons.innerHTML = `
      <button class="auth-btn login-btn" id="showLoginBtn">Login</button>
      <button class="auth-btn signup-btn" id="showSignupBtn">Sign Up</button>
    `;
    // Butonlara event listener'ları tekrar ekle
    document.getElementById('showLoginBtn').onclick = () => {
      authModal.classList.add('active');
      loginForm.style.display = '';
      signupForm.style.display = 'none';
    };
    document.getElementById('showSignupBtn').onclick = () => {
      authModal.classList.add('active');
      loginForm.style.display = 'none';
      signupForm.style.display = '';
    };
    document.body.classList.remove('admin-logged-in');
  }
});

// Çıkış fonksiyonu eklemek isterseniz:
// logout().then(() => window.location.reload()); 