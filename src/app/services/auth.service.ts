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
    userSubject = new BehaviorSubject<UserModel>(null);
    authState: any;

    constructor(
        private auth: AngularFireAuth,
        private forms: FormsServices,
        private fireDb: AngularFirestore,
        private router: Router,
        private fireMsg: AngularFireMessaging,
        private ngZone:NgZone
    ) {
        this.user = auth.authState;
    }

    get currentUser(): string {
        return this.authState !== null ? this.authState.uid : '';
    }

    userCheck() {
        firebase.auth().onAuthStateChanged(user => {
            user ? user : console.log("")
        })
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
        const userType: AccountType = this.forms.doctorForm.value;
        const path = `Users/${ this.currentUser }`;

        this.fireDb.doc<UserModel>(path).set({
            uid: this.currentUser,
            email: email,
            fullname: fullname,
            photoUrl: 'test',
            creationTime: creationTime,
            accountType: userType
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
                    const status = 'online';
                    this.updateUserStatus(status);
                    this.auth.auth.currentUser.getIdToken(true).then(Usertoken => {
                        const userData = new UserModel(email, authenticated.user.uid, Usertoken);
                        this.userSubject.next(userData);
                        localStorage.setItem('userData', JSON.stringify(userData))
                    })
                        .then(() => {
                            this.fireMsg.requestToken.subscribe((res) => {
                                //console.log(res)
                                const ref = this.fireDb.collection('ActiveUsers').doc(authenticated.user.uid);
                                ref.set({
                                    email: email,
                                    uid: authenticated.user.uid,
                                    msgToken: res
                                })
                            })
                        })
                        .then(() => { this.router.navigate(['/community/Timeline']) })
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )
    }

    autoLogin() {
        firebase.auth().onAuthStateChanged(user => {
            console
            if (!!user) {
                this.ngZone.run(()=>this.router.navigate(['/community/Timeline']))
            }
        })
    }

    login() {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(
                logReq => {
                    this.loginRequest();
                }
            )
    }

    logout() {
        const userData: { userEmail: string, userId: string, tokenID: string } = JSON.parse(localStorage.getItem('userData'))
        this.fireDb.collection('ActiveUsers').doc(userData.userId).delete().then(() => {
            localStorage.removeItem('userData');
            firebase.auth().signOut();
        }).then(() => {
            this.router.navigate(['']);
            const status = 'offline';
            this.updateUserStatus(status);
        });
    }

    updateUserStatus(status: string) {
        const path = `Users/${ this.currentUser }`;
        this.fireDb.doc<UserModel>(path)
        .update({ status: status });
    }

    updateStatusOnIdle() {
        document.onvisibilitychange = (e) => {
            if(document.visibilityState === 'hidden') {
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