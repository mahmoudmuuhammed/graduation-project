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

    previewPostSubject = new Subject<{ postId: string, state: boolean }>();


    constructor(
        private auth: AngularFireAuth,
        private forms: FormsServices,
        private fireDb: AngularFirestore,
        private ngZone: NgZone,
        private storage: AngularFireStorage,
        private afs: AngularFirestore
    ) { }

    deletePost(postId: string) {
        this.afs.doc(`Posts/${postId}`).delete()
    }
}