const auth = firebase.auth();

function register(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
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

window.authApi = { register, login, logout, onUserChanged, getCurrentUser }; 