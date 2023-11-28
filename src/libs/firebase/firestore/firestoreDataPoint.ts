import type {
  CollectionReference,
  DocumentData,
  QueryDocumentSnapshot,
} from '@google-cloud/firestore';
import { firestore } from '.';

/**
 * @param collectionName - Name of the collection
 * @returns Firestore Collection Reference
 */
export function firestoreDataPoint<TEntity extends DocumentData>(
  collectionName: string,
): CollectionReference<TEntity> {
  return firestore()
    .collection(collectionName)
    .withConverter({
      toFirestore: (data: TEntity): DocumentData => data,
      fromFirestore: (snap: QueryDocumentSnapshot<TEntity>): TEntity =>
        snap.data(),
    });
}
