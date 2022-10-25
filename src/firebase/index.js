import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection as firestoreCollection, doc as firestoreDoc } from 'firebase/firestore';

import { firebaseConfig } from './.config';
import Model from './Model';

function initialize() {
  initializeApp(firebaseConfig);
}

export function auth() {
  return getAuth();
}

export function firestore() {
  return getFirestore();
}

export function collection(collectionPath) {
  return firestoreCollection(firestore(), collectionPath)
}

export function doc(collectionPath, documentId) {
  return firestoreDoc(firestore(), collectionPath, documentId);
}

const Firebase = {
  initialize,
  auth,
  firestore,
  collection,
  doc,
  Model
};

export default Firebase;