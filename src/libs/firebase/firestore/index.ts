import { type Firestore } from 'firebase-admin/firestore';
import firebaseAdmin from '../admin';

let firestoreInstance: Firestore | undefined;

/**
 * @returns Firestore instance.
 */
export function firestore(): Firestore {
  if (firestoreInstance === undefined) {
    firestoreInstance = firebaseAdmin().firestore();
  }

  return firestoreInstance;
}
