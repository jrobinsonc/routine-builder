import type {
  CollectionReference,
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from '@google-cloud/firestore';
import type { Query } from 'firebase-admin/firestore';
import { firestoreDataPoint } from './firestoreDataPoint';

export type DocumentID = string;
export type DocumentsList<TDoc extends DocumentData> = Map<DocumentID, TDoc>;

export interface DefaultModelProps {
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

interface RepositoryGetProps {
  page?: number;
  perPage?: number;
  withTrashed?: boolean;
}

// const repositoryGetProps: RepositoryGetProps = {
//   page: 1,
//   perPage: 10,
//   withTrashed: false,
// };

export class Repository<TDoc extends DocumentData> {
  public entityName: string;

  constructor(entityName: string) {
    this.entityName = entityName;
  }

  /**
   * @see https://firebase.google.com/docs/reference/js/v8/firebase.firestore.CollectionReference
   * @returns The collection reference
   */
  protected collection(): CollectionReference<TDoc> {
    return firestoreDataPoint<TDoc>(this.entityName);
  }

  /**
   * @see https://cloud.google.com/firestore/docs/query-data/get-data
   * @param queryArgs - Query arguments
   * @param queryArgs.page - Page number
   * @param queryArgs.perPage - Number of items per page
   * @param queryArgs.withTrashed - Returns deleted documents by checking the `deletedAt` field.
   * @returns Documents in the collection
   */
  public async get({
    page,
    perPage,
    withTrashed,
  }: RepositoryGetProps): Promise<DocumentsList<TDoc>> {
    const collectionRef: CollectionReference<TDoc> = this.collection();
    let query: Query<TDoc> = collectionRef.orderBy('createdAt', 'desc');

    if (withTrashed !== true) {
      query = query.where('deletedAt', '==', null);
    }

    if (perPage !== undefined) {
      query = query.limit(perPage);
    }

    // if (page !== undefined && perPage !== undefined) {
    //   const startAt: number = (page - 1) * perPage;
    query = query.startAt(1);
    // }

    const querySnapshot: QuerySnapshot<TDoc> = await query.get();
    const list: DocumentsList<TDoc> = new Map<DocumentID, TDoc>();

    querySnapshot.forEach((documentSnapshot: QueryDocumentSnapshot<TDoc>) => {
      list.set(documentSnapshot.id, documentSnapshot.data());
    });

    return list;
  }
}
