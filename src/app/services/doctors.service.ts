import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { UserModel } from '../models/user.model';
import { Subject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';
import { ReturnStatement } from '@angular/compiler';
import { Prescription } from '../models/prescriptions.mpdel';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  doctorCollection: AngularFirestoreCollection<UserModel>;
  doctorDocument: AngularFirestoreDocument<UserModel>;
  doctorDataSubjectOnBooking = new Subject<UserModel>();
  preciptionDashBoardSubject = new Subject<{ patientId: string, state: boolean }>();


  constructor(private db: AngularFirestore,
    private authService: AuthService,
    private firestore: FirestoreService,
    private afs: AngularFirestore) { }

  getDoctors() {
    this.doctorCollection = this.db.collection('Users',
      ref => {
        return ref.where('userType.usertype', '==', 'Doctor')
      });
    return this.doctorCollection.valueChanges();
  }

  submitPrescription(patientId, prescription: string) {
    this.authService.currentUser.subscribe(doc => {
      this.firestore.getUser(doc.uid).pipe(take(1)).subscribe((docData: UserModel) => {
        this.firestore.getUser(patientId).pipe(take(1)).subscribe((patientData: UserModel) => {
          this.afs.collection('Prescriptions').add({
            timestamp: Date.now(),
            docId: docData.uid,
            docName: docData.fullName,
            docSpeciality: docData.userType.speciality,
            patientId: patientData.uid,
            patientName: patientData.fullName,
            content: prescription
          })
        })
      })
    })
  }

  getPatientPrescriptions(userId: string) {
    return this.afs.collection<Prescription>(`Prescriptions`,
      ref => { return ref.where('patientId', '==', userId) }).valueChanges()
  }

  getDoctorPrescriptions(docId: string) {
    return this.afs.collection<Prescription>(`Prescriptions`,
      ref => { return ref.where('docId', '==', docId) }).valueChanges()
  }

}
