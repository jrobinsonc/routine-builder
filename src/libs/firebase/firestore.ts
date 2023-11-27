import type {
  CollectionReference,
  DocumentData,
  QueryDocumentSnapshot,
} from '@google-cloud/firestore';
import {
  Filter,
  type Firestore,
  type QuerySnapshot,
} from 'firebase-admin/firestore';
import firebaseAdmin from './admin';

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

type DocumentID = string;
type DocumentsList<TDoc extends DocumentData> = Map<DocumentID, TDoc>;

export class Repository<TDoc extends DocumentData> {
  public entityName: string;

  constructor(entityName: string) {
    this.entityName = entityName;
  }

  protected get collection(): CollectionReference<TDoc> {
    return firestoreDataPoint<TDoc>(this.entityName);
  }

  public async get(): Promise<DocumentsList<TDoc>> {
    const repoClass: typeof Repository<TDoc> = this
      .constructor as unknown as typeof Repository;
    const querySnapshot: QuerySnapshot<TDoc> = await this.collection
      .where(repoClass.defaultFilter())
      .get();
    const list: DocumentsList<TDoc> = new Map<DocumentID, TDoc>();

    querySnapshot.forEach((documentSnapshot: QueryDocumentSnapshot<TDoc>) => {
      list.set(documentSnapshot.id, documentSnapshot.data());
    });

    return list;
  }

  public static defaultFilter(): Filter {
    return Filter.and(
      // Exclude deleted documents by default.
      Filter.where('deletedAt', '==', null),
    );
  }
}
