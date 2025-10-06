import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './config';

export interface EnsureUserPayload {
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
  major?: string;
}

export const ensureUserDocument = async (payload?: EnsureUserPayload) => {
  const currentUser = auth.currentUser;
  if (!currentUser) return;

  const userRef = doc(db, 'users', currentUser.uid);
  const snap = await getDoc(userRef);

  const now = new Date();
  const baseData: any = {
    uid: currentUser.uid,
    updatedAt: now,
    ...(payload?.email ?? currentUser.email ? { email: payload?.email ?? currentUser.email } : {}),
    ...(payload?.displayName ?? currentUser.displayName ? { displayName: payload?.displayName ?? currentUser.displayName } : {}),
    ...(payload?.photoURL ?? currentUser.photoURL ? { photoURL: payload?.photoURL ?? currentUser.photoURL } : {}),
    ...(payload?.major ? { major: payload.major } : {}),
  };

  if (!snap.exists()) {
    await setDoc(userRef, { ...baseData, createdAt: now }, { merge: true });
  } else {
    await setDoc(userRef, baseData, { merge: true });
  }
};


