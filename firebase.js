import { initializeApp, getApps } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  collectionGroup,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCB9bH-0X1DFFS0hkHB5_4BbaTaopDys9k',
  authDomain: 'rn-linkedin-clone-a1b25.firebaseapp.com',
  projectId: 'rn-linkedin-clone-a1b25',
  storageBucket: 'rn-linkedin-clone-a1b25.appspot.com',
  messagingSenderId: '422040462494',
  appId: '1:422040462494:web:be3d8e5bd6d880e3ff078f',
}

if (!getApps().length) initializeApp(firebaseConfig)

export {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  collection,
  collectionGroup,
  addDoc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  getDoc,
  getDocs,
  setDoc,
  doc,
  arrayUnion,
  arrayRemove,
  updateDoc,
}
