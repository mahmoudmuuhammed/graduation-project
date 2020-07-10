import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { UserModel } from '../models/user.model';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  doctorCollection: AngularFirestoreCollection<UserModel>;
  doctorDocument: AngularFirestoreDocument<UserModel>;
  doctorDataSubjectOnBooking = new Subject<UserModel>();
  preciptionDashBoardSubject = new Subject<boolean>();


  constructor(private db: AngularFirestore) { }

  getDoctors() {
    this.doctorCollection = this.db.collection('Users',
      ref => {
        return ref.where('userType.usertype', '==', 'Doctor')
      });
    return this.doctorCollection.valueChanges();
  }

  isUserDoctor(uid: string): boolean {
    console.log(uid)
    this.doctorCollection.doc(`Users/${uid}`).valueChanges().pipe(take(1)).subscribe((res: UserModel) => {
      if (res.userType.usertype == 'Doctor') {
        return true
      }
      else return false
    })
    return
  }
}
