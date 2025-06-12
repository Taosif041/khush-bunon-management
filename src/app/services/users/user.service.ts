import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  deleteDoc,
  setDoc,
  CollectionReference,
  DocumentData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/users/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private firestore = inject(Firestore);
  private usersRef: CollectionReference<DocumentData> = collection(
    this.firestore,
    'users'
  );

  getUsers(): Observable<User[]> {
    return collectionData(this.usersRef, { idField: 'id' }) as Observable<
      User[]
    >;
  }

  getUserById(id: string): Observable<User> {
    const userDoc = doc(this.firestore, `users/${id}`);
    return docData(userDoc, { idField: 'id' }) as Observable<User>;
  }

  addUser(user: User) {
    return addDoc(this.usersRef, user);
  }

  updateUser(user: User) {
    const userDoc = doc(this.firestore, `users/${user.id}`);
    return setDoc(userDoc, user, { merge: true }); // merge ensures partial updates
  }

  deleteUser(user: User) {
    user.isRemoved = true;
    user.isActive = false;
    return this.updateUser(user);
  }
}
