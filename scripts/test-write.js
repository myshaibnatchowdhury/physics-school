const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');

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

async function testWrite() {
  console.log('Testing write with 4s timeout...');
  const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT_AFTER_4S')), 4000));
  
  try {
    const docRef = await Promise.race([
      addDoc(collection(db, 'admissions'), { test: true, timestamp: serverTimestamp() }),
      timeoutPromise
    ]);
    console.log('SUCCESS: Written doc ID:', docRef.id);
  } catch (err) {
    console.log('WRITE FAILED OR TIMED OUT:', err.message);
  }
  process.exit(0);
}
testWrite();
