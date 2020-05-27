import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserModel } from '../models/user.model';
import { Thread } from '../models/thread.model';


@Injectable({
    providedIn: 'root'
})

export class FirestoreService {
    users: AngularFirestoreCollection<UserModel>;
    user: AngularFirestoreDocument<UserModel>;
    channelsData: AngularFirestoreDocument<Thread>;

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

    getChannelsUsers(threadId: string) {
        this.channelsData = this.fireDb.doc<Thread>(`Chats/${threadId}`);
        return this.channelsData;
    }
    
}