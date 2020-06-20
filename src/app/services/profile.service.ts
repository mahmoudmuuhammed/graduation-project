import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })

export class ProfileService {

    user = firebase.auth().currentUser

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

}