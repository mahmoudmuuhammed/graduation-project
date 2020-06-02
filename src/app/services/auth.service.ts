import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { FormsServices } from './forms.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { UserModel, AccountType } from '../models/user.model'
import { AngularFireMessaging } from '@angular/fire/messaging';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    authState: any;

    constructor(
        private auth: AngularFireAuth,
        private forms: FormsServices,
        private fireDb: AngularFirestore,
        private fireMsg: AngularFireMessaging,
        private router: Router,
        private ngZone: NgZone
    ) {}

    get currentUser() {
        return this.auth.authState.pipe(take(1))
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
        this.currentUser.subscribe(user => {
            const fullname = this.forms.fullnameControl.value;
            const userType: AccountType = this.forms.doctorForm.value;
            const path = `Users/${user.uid}`;

            this.fireDb.doc<UserModel>(path).set({
                uid: user.uid,
                email: email,
                photoUrl: 'dsadad',
                createdTime: creationTime,
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
        })
    }

    loginRequest() {
        const email = this.forms.signinEmailControl.value;
        const password = this.forms.signinPasswordControl.value;
        this.auth.auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                this.currentUser.subscribe(user => {
                    this.fireMsg.requestToken.subscribe((msgToken) => {
                        const path = `Users/${user.uid}`;
                        this.fireDb.doc(path).update({ notification_token_id: msgToken })
                        this.updateUserStatus('online');
                    })
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
        this.updateUserStatus('offline');
        firebase.auth().signOut();
        this.router.navigate(['']);
    }

    updateUserStatus(status: string) {
        this.auth.authState.pipe(take(1)).subscribe(user => {
            const path = `Users/${user.uid}`;
            this.fireDb.doc<UserModel>(path)
                .update({ status: status });
        })
    }

    updateStatusOnIdle() {
        document.onvisibilitychange = (e) => {
            if (document.visibilityState === 'hidden') {
                this.updateUserStatus('away');
            } else {
                this.updateUserStatus('online');
            };
        };
    }
}