/* eslint-disable no-console */
// yarn tsx scripts/normalize-firestore-documents.ts
import type { RoutineModel } from '@/db/entities/routines';
import { firestoreDataPoint } from '@/libs/firebase/firestore';
import { isEmpty } from '@/libs/helpers';
import { faker } from '@faker-js/faker';
import type {
  QueryDocumentSnapshot,
  QuerySnapshot,
  WriteResult,
} from 'firebase-admin/firestore';

(async (): Promise<void> => {
  const querySnapshot: QuerySnapshot<RoutineModel> =
    await firestoreDataPoint<RoutineModel>('routines').get();
  const updatedDocs: Promise<WriteResult>[] = [];

  querySnapshot.forEach((docSnapshot: QueryDocumentSnapshot<RoutineModel>) => {
    const originalDoc: RoutineModel = docSnapshot.data();
    const updatedDoc: RoutineModel = {
      name: isEmpty(originalDoc.name)
        ? faker.lorem.words({ min: 2, max: 3 })
        : originalDoc.name,
      isArchived: isEmpty(originalDoc.isArchived)
        ? false
        : originalDoc.isArchived,
      days: isEmpty(originalDoc.days)
        ? { type: 'weekly', values: [] }
        : originalDoc.days,
      createdAt: isEmpty(originalDoc.createdAt)
        ? new Date()
        : originalDoc.createdAt,
      updatedAt: isEmpty(originalDoc.updatedAt) ? null : originalDoc.updatedAt,
      deletedAt: isEmpty(originalDoc.deletedAt) ? null : originalDoc.deletedAt,
    };

    updatedDocs.push(docSnapshot.ref.set(updatedDoc));
  });

  await Promise.all(updatedDocs);
  console.log('Done!');
})();
