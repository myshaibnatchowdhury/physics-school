const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, limit, query } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyDHDRCtnLxLGKPot64mQsLzeiXjdhTIRYY',
  authDomain: 'physics-school.firebaseapp.com',
  projectId: 'physics-school',
  storageBucket: 'physics-school.firebasestorage.app',
  messagingSenderId: '849489311316',
  appId: '1:849489311316:web:3b2218a74acc7ac67fdfc1'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testConnection() {
  console.log('Testing connection to Firebase Firestore (physics-school)...');
  try {
    const q = query(collection(db, 'admissions'), limit(1));
    const snap = await getDocs(q);
    console.log('Firestore connection SUCCESS! Docs count in admissions:', snap.size);
    process.exit(0);
  } catch (err) {
    console.log('Firestore Status:', err.code, err.message);
    process.exit(0);
  }
}
testConnection();
