import type { ServiceAccount } from 'firebase-admin';
import admin from 'firebase-admin';
import { isPlainObject, raise } from '@/libs/helpers';
import type { Firestore } from 'firebase-admin/firestore';

/**
 * @param value - Value to check.
 * @returns True if value is a service account, false otherwise.
 */
function isServiceAccount(value: unknown): value is ServiceAccount {
  return isPlainObject(value) && typeof value.private_key_id === 'string';
}

/**
 * @returns The firebase admin service account.
 */
function firebaseAdminFactory(): typeof admin {
  if (!admin.apps.length) {
    try {
      const key: string =
        process.env.FIREBASE_SERVICE_ACCOUNT_KEY ??
        raise(new Error('Firebase service account key is not defined'));
      const serviceAccount: ServiceAccount | unknown = JSON.parse(key);

      if (!isServiceAccount(serviceAccount)) {
        throw new Error('Firebase service account key is not valid');
      }

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } catch (error: unknown) {
      throw new Error(`Firebase admin initialization error: ${String(error)}`);
    }
  }

  return admin;
}

export default firebaseAdminFactory;
export type { Firestore };
