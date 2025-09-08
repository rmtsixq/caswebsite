// js/firebase-config.js
// CAS Website Firebase Configuration

// Display startup banner
console.log(`
    ____                       __ 
   / __ \\__  ______ ___  ___  / /_
  / /_/ / / / / __ \`__ \\/ _ \\/ __/
 / _, _/ /_/ / / / / / /  __/ /_  
/_/ |_|\\__,_/_/ /_/ /_/\\___/\\__/  
   /   |  _________ _____         
  / /| | / ___/ __ \`/ __ \\        
 / ___ |(__  ) /_/ / / / /        
/_/  |_/____/\\__,_/_/ /_/         
                                                 
                                                                 
                                                                        
                                                                 
`);
const firebaseConfig = {
  apiKey: "AIzaSyBuONRqmCCwc13NgHSn4LpByjrWnRVax6E",
  authDomain: "windgriff-6cbd7.firebaseapp.com",
  projectId: "windgriff-6cbd7",
  storageBucket: "windgriff-6cbd7.firebasestorage.app",
  messagingSenderId: "155157182521",
  appId: "1:155157182521:web:abe406bc36389cf8b1f5e8",
  measurementId: "G-XX32MM6ETK"
};

// Alternative Xtodaymedia Firebase config (comment out CAS config above and uncomment this if you want to use Xtodaymedia data)
/*
const firebaseConfig = {
  apiKey: "AIzaSyBujRcE0V1PtE65fFaZ6FO4O_PRdIz7_N0",
  authDomain: "bensende-e7507.firebaseapp.com",
  databaseURL: "https://bensende-e7507-default-rtdb.firebaseio.com",
  projectId: "bensende-e7507",
  storageBucket: "bensende-e7507.firebasestorage.app",
  messagingSenderId: "935368276799",
  appId: "1:935368276799:web:dbd0280301acdd2ddcb18a",
  measurementId: "G-5FE73R5JZC"
};
*/

// Initialize Firebase (check if already initialized)
let app;
try {
  app = firebase.initializeApp(firebaseConfig);
} catch (error) {
  if (error.code === 'app/duplicate-app') {
    app = firebase.app();
    console.log('Firebase app already initialized');
  } else {
    throw error;
  }
}

// Initialize Firestore with settings
const db = firebase.firestore();
db.settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
  merge: true
});

// Enable offline persistence with better error handling
db.enablePersistence({synchronizeTabs: false})
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support persistence.');
    } else {
      console.warn('Persistence disabled due to error:', err);
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
  const offlineMessage = document.createElement('div');
  offlineMessage.className = 'offline-message';
  offlineMessage.innerHTML = '<i class="fas fa-wifi"></i> You are offline. Changes will be saved when you reconnect.';
  document.body.appendChild(offlineMessage);
});

// Add connection state monitoring
db.enableNetwork().catch((err) => {
  console.error("Error enabling network:", err);
});

// Monitor connection state (simplified)
let connectionCheckInterval;
function checkConnection() {
  db.collection('_').limit(1).get()
    .then(() => {
      console.log('Connected to Firestore');
      clearInterval(connectionCheckInterval);
    })
    .catch((err) => {
      console.error('Firestore connection error:', err);
    });
}

// Check connection every 30 seconds
connectionCheckInterval = setInterval(checkConnection, 30000);
checkConnection(); // Initial check 