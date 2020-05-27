import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { FormsServices } from './forms.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { UserModel, AccountType } from '../models/user.model'
import { AngularFireMessaging } from '@angular/fire/messaging';

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
        private fireMsg: AngularFireMessaging,
        private router: Router,
        private ngZone: NgZone
    ) {
        this.user = auth.authState;
    }

    // get currentUser(): string {
    //     return this.authState !== null ? this.authState.uid : '';
    // }

    get currentUser() {
        return firebase.auth().currentUser.uid
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
                    user.user.updateProfile({ displayName: displayName });
                    const creationTime = user.user.metadata.creationTime;
                    this.setUserData(email, creationTime);
                }
            )
            .catch(err => { console.log(err) })
    }

    setUserData(email: string, creationTime: string) {
        const fullname = this.forms.fullnameControl.value;
        const userType: AccountType = this.forms.doctorForm.value;
        const path = `Users/${ this.currentUser }`;

        this.fireDb.doc<UserModel>(path).set({
            uid: this.currentUser,
            email: email,
            photoUrl: 'dsadad',
            creationTime: creationTime,
            fullName: fullname,
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
            .then(() => {
                this.fireMsg.requestToken.subscribe((msgToken) => {
                    const path = `Users/${this.currentUser}`;
                    this.fireDb.doc(path).update({ notification_token_id: msgToken })
                    const status = 'online';
                    this.updateUserStatus(status);
                })
            })
            .then(() => {
                this.router.navigate(['/community/Timeline'])
            })
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
            )
    }

    autoLogin() {
        firebase.auth().onAuthStateChanged(user => {
            if (!!user) {
                this.ngZone.run(() => this.router.navigate(['/community/Timeline']))
            }
        })
    }

    logout() {
        const status = 'offline';
        this.updateUserStatus(status);
        firebase.auth().signOut();
        this.router.navigate(['']);
    }

    updateUserStatus(status: string) {
        const path = `Users/${this.currentUser}`;
        this.fireDb.doc<UserModel>(path)
            .update({ status: status });
    }

    updateStatusOnIdle() {
        document.onvisibilitychange = (e) => {
            if (document.visibilityState === 'hidden') {
                const status = 'away';
                this.updateUserStatus(status);
            } else {
                const status = 'online';
                this.updateUserStatus(status);
            };
        };
    }
}

// auth/network-request-failed 