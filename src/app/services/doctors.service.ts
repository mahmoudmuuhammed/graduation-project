import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { UserModel } from '../models/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  doctorCollection: AngularFirestoreCollection<UserModel>;
  doctorDocument: AngularFirestoreDocument<UserModel>;
  doctorDataSubjectOnBooking = new Subject<UserModel>();

  constructor(private db: AngularFirestore) { }

  getDoctors(speciality: string) {
    this.doctorCollection = this.db.collection('Users',
      ref => {
        return ref.where('userType.usertype', '==', 'Doctor')
      });
    return this.doctorCollection.valueChanges();
  }
}
