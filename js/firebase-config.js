// js/firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyBuONRqmCCwc13NgHSn4LpByjrWnRVax6E",
  authDomain: "windgriff-6cbd7.firebaseapp.com",
  projectId: "windgriff-6cbd7",
  storageBucket: "windgriff-6cbd7.firebasestorage.app",
  messagingSenderId: "155157182521",
  appId: "1:155157182521:web:abe406bc36389cf8b1f5e8",
  measurementId: "G-XX32MM6ETK"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firestore with settings
const db = firebase.firestore();
db.settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
  merge: true,
  experimentalForceLongPolling: true
});

// Enable offline persistence with better error handling
db.enablePersistence({synchronizeTabs: true})
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support persistence.');
    }
  });

// Initialize Analytics if available
if (firebase.analytics) {
  firebase.analytics();
}

// Export the Firestore instance
window.db = db;

// Handle offline/online status with better UI feedback
window.addEventListener('online', () => {
  console.log('Application is online');
  const offlineMessage = document.querySelector('.offline-message');
  if (offlineMessage) {
    offlineMessage.remove();
  }
  // Show online message
  const onlineMessage = document.createElement('div');
  onlineMessage.className = 'online-message';
  onlineMessage.innerHTML = '<i class="fas fa-wifi"></i> You are back online!';
  document.body.appendChild(onlineMessage);
  setTimeout(() => onlineMessage.remove(), 3000);
});

window.addEventListener('offline', () => {
  console.log('Application is offline');
  const offlineMessage = document.createElement('div');
  offlineMessage.className = 'offline-message';
  offlineMessage.innerHTML = '<i class="fas fa-wifi"></i> You are offline. Changes will be saved when you reconnect.';
  document.body.appendChild(offlineMessage);
});

// Add connection state monitoring
db.enableNetwork().catch((err) => {
  console.error("Error enabling network:", err);
});

// Monitor connection state
db.collection('_').onSnapshot(
  () => {
    console.log('Connected to Firestore');
  },
  (err) => {
    console.error('Firestore connection error:', err);
    // Try to reconnect
    db.enableNetwork().catch((err) => {
      console.error("Error reconnecting:", err);
    });
  }
); 