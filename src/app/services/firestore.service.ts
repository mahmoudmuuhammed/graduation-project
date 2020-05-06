import { Injectable, EventEmitter } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserModel } from '../models/user.model';
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class FirestoreService {
    userEventData = new Subject<string>();
    users: AngularFirestoreCollection<UserModel>;
    user: AngularFirestoreDocument<UserModel>;

    constructor(
        private fireDb: AngularFirestore
    ) {}

    getUsers() {
        this.users = this.fireDb.collection('Users');
        return this.users.valueChanges();
    }
    
    getUser(profileId: string) {
        const path = `Users/${ profileId }`;
        this.user = this.fireDb.doc(path);
        return this.user.valueChanges();
    }
}