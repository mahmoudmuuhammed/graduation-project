import { Injectable, NgZone, HostListener } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { FormsServices } from './forms.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserModel, AccountType } from '../models/user.model'
import { take } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AdminService {

    showUserSubject = new Subject<{ userData: UserModel, state: boolean }>();
    showImgSubject = new Subject<{ imgLink: string, state: boolean }>();

    constructor(
        private auth: AngularFireAuth,
        private forms: FormsServices,
        private fireDb: AngularFirestore,
        private storage: AngularFireStorage,
        private afs: AngularFirestore
    ) { }

    getUsers() {
        return this.afs.collection<UserModel>('Users', ref => {
            return ref.orderBy('createdTime', 'desc')
        }).valueChanges().pipe(take(1))
    }

    deletePost(postId: string) {
        this.afs.doc(`Posts/${postId}`).delete()
    }

    deleteUser(userId: string) {
        this.afs.doc(`Users/${userId}`).delete()
    }

    confirmUser(userId: string) {
        this.afs.doc(`Users/${userId}`).update({ 'userType.isVerfied': true })
    }

    getDocIdLink(docId: string) {
        return this.storage.ref(`doctorLicense/${docId}`).getDownloadURL().pipe(take(1))
    }
}