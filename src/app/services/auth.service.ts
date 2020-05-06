import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { FormsServices } from './forms.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    user: Observable<firebase.User>;
    authState: any;
    constructor(
        private auth: AngularFireAuth,
        private forms: FormsServices,
        private fireDb: AngularFirestore,
        private router: Router
    ) {
        this.user = auth.authState;
    }

    get currentUser(): string {
        return this.authState !== null ? this.authState.uid : '';
    }

    sendingAuthRequest() {
        const emailValue = this.forms.emailControl.value;
        const password = this.forms.passwordControl.value;
        const displayName = this.forms.fullnameControl.value;

        this.auth.auth.createUserWithEmailAndPassword(emailValue, password)
        .then(
            user => {
                this.authState = user.user;
                const email = user.user.email;
                user.user.updateProfile({
                    displayName: displayName,
                    
                });
                const creationTime = user.user.metadata.creationTime;
                this.setUserData(email, creationTime);
            }
        )
        .catch(
            err => {
                console.log(err);
            }
        );
    }

    setUserData(email: string, creationTime: string) {
        const fullname = this.forms.fullnameControl.value;
        const userType = this.forms.doctorForm.value;

        this.fireDb.collection('Users').doc(this.currentUser).set({
            uid: this.currentUser,
            email: email,
            photoUrl: 'dsadad',
            creationTime: creationTime,
            fullname: fullname,
            userType: userType
        })
        .then(
            userData => {
                console.log('Success firestore');
                this.router.navigate(['/login']);
            }
        )
        .catch(
            err => {
                console.log(err);
            }
        );
    }

    loginRequest() {
        const email = this.forms.signinEmailControl.value;
        const password = this.forms.signinPasswordControl.value;

        this.auth.auth.signInWithEmailAndPassword(email, password)
        .then(
            authenticated => {
                this.router.navigate(['/chat']);
            }
        )
        .catch(
            err => {
                console.log(err);
            }
        )
    }

    login() {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(
            logReq => {
                this.loginRequest();
            }
        );
    }
}

// auth/network-request-failed 