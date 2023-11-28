/* eslint-disable no-console */
// yarn tsx scripts/normalize-firestore-documents.ts
import { RoutineSchema, type RoutineModel } from '@/db/entities/routines';
import { firestore } from '@/libs/firebase/firestore';
import { firestoreDataPoint } from '@/libs/firebase/firestore/firestoreDataPoint';
import { isEmpty, isNil } from '@/libs/helpers';
import { faker } from '@faker-js/faker';
import type {
  QueryDocumentSnapshot,
  QuerySnapshot,
  WriteBatch,
} from 'firebase-admin/firestore';

(async (): Promise<void> => {
  const querySnapshot: QuerySnapshot<RoutineModel> =
    await firestoreDataPoint<RoutineModel>('routines').get();
  const writeBatch: WriteBatch = firestore().batch();

  querySnapshot.forEach((docSnapshot: QueryDocumentSnapshot<RoutineModel>) => {
    const originalDoc: Partial<RoutineModel> = docSnapshot.data();
    const updatedDoc: RoutineModel = {
      name: isEmpty(originalDoc.name)
        ? faker.lorem.words({ min: 2, max: 3 })
        : String(originalDoc.name),
      startTime: isEmpty(originalDoc.startTime)
        ? '07:00 AM'
        : String(originalDoc.startTime),
      reminder: isNil(originalDoc.reminder) ? true : originalDoc.reminder,
      isArchived: isNil(originalDoc.isArchived)
        ? false
        : originalDoc.isArchived,
      days:
        isNil(originalDoc.days) ||
        isEmpty(originalDoc.days.type) ||
        isEmpty(originalDoc.days.values)
          ? { type: 'Weekday', values: null }
          : originalDoc.days,
      createdAt: isNil(originalDoc.createdAt)
        ? new Date()
        : originalDoc.createdAt,
      updatedAt: isNil(originalDoc.updatedAt) ? null : originalDoc.updatedAt,
      deletedAt: isNil(originalDoc.deletedAt) ? null : originalDoc.deletedAt,
    };

    RoutineSchema.parse(updatedDoc);

    writeBatch.set(docSnapshot.ref, updatedDoc);
  });

  await writeBatch.commit();
})();
