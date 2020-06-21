import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subject } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })

export class ProfileService {

    userDocument: AngularFirestoreDocument;
    usersCollection: AngularFirestoreCollection<UserModel>;
    user = firebase.auth().currentUser;
    photoChangedSubject = new Subject();
    nameChangedSubject = new Subject();
    newTrustedUserSubject = new Subject();
    removeTrustedUserSubject = new Subject();

    constructor(private storage: AngularFireStorage, private afs: AngularFirestore) { }

    changeUserPic(userId: string, file: File) {
        const storageRef = this.storage.ref(`userPhoto/${userId}`);
        return storageRef.put(file)
    }

    changeName(newName: string) {
        return this.user.updateProfile({
            displayName: newName
        }).then(() => {
            this.afs.doc(`Users/${this.user.uid}`).update({ fullName: newName })
        }).catch(err => console.log(err))
    }

    reauthenticate(password: string) {
        let cred = firebase.auth.EmailAuthProvider.credential(this.user.email, password)
        return this.user.reauthenticateWithCredential(cred);
    }

    changeEmail(newEmail: string, password: string) {
        return this.reauthenticate(password).then(() => {
            return this.user.updateEmail(newEmail).then(() => {
                this.afs.doc(`Users/${this.user.uid}`).update({ email: newEmail })
            });
        })
    }

    changePassword(oldPassword: string, newPassword: string) {
        return this.reauthenticate(oldPassword).then(() => {
            return this.user.updatePassword(newPassword)
        })
    }

    changeSpeciality(newSpecialty: string) {
        return this.afs.doc(`Users/${this.user.uid}`).update({ 'userType.specialty': newSpecialty })
    }

    changeLocation(newLocation: string) {
        return this.afs.doc(`Users/${this.user.uid}`).update({ 'userType.location': newLocation })
    }

    changeFees(newFees: number) {
        return this.afs.doc(`Users/${this.user.uid}`).update({ 'userType.fees': newFees })
    }

    removeTrustedUser(removedId: string) {
        this.userDocument = this.afs.doc(`Users/${this.user.uid}`)
        return this.userDocument.update({ trusted: firebase.firestore.FieldValue.arrayRemove(removedId) })
    }

    addToTrusted(userId: string) {
        this.userDocument = this.afs.doc(`Users/${this.user.uid}`)
        return this.userDocument.update({ trusted: firebase.firestore.FieldValue.arrayUnion(userId) })
    }

    getUsers() {
        this.usersCollection = this.afs.collection<UserModel>('Users')
        return this.usersCollection.valueChanges();
    }

    getUser(userId: string) {
        this.userDocument = this.afs.doc(`Users/${userId}`)
        return this.userDocument.valueChanges();
    }

}