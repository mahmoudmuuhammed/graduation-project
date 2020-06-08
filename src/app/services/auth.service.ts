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
import { AngularFireStorage } from '@angular/fire/storage';

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
        private ngZone: NgZone,
        private storage: AngularFireStorage
    ) { }

    get currentUser() {
        return this.auth.authState.pipe(take(1))
    }

    sendingAuthRequest(userImg: File) {
        const emailValue = this.forms.emailControl.value;
        const password = this.forms.passwordControl.value;
        const displayName = this.forms.fullnameControl.value;

        this.auth.auth.createUserWithEmailAndPassword(emailValue, password)
            .then(
                user => {
                    this.authState = user.user;
                    const email = user.user.email;
                    user.user.updateProfile({ displayName: displayName });
                    const creationTime = Date.now();
                    this.setUserData(email, creationTime, userImg);
                }
            )
            .catch(err => { console.log(err) })
    }

    setUserData(email: string, creationTime: number, userImg) {
        this.currentUser.subscribe(user => {
            const fullname = this.forms.fullnameControl.value;
            const userType: AccountType = this.forms.doctorForm.value;
            const path = `Users/${user.uid}`;

            this.fireDb.doc<UserModel>(path).set({
                uid: user.uid,
                email: email,
                createdTime: creationTime,
                fullName: fullname,
                userType: userType
            }).then(() => {
                const filePath = `userPhoto/${user.uid}`;
                const storageRef = this.storage.ref(filePath);
                if (userImg) {
                    storageRef.put(userImg)
                }
                else{
                    if(userType.usertype=='Doctor'){
                        storageRef.putString(this.getDefaultDoctorImg(),'base64', {contentType:'image/svg+xml'})
                    }
                    else{
                        storageRef.putString(this.getDefaultUserImg(),'base64', {contentType:'image/svg+xml'})
                    }
                }
            })
                .then(
                    userData => {
                        console.log('Success firestore');
                        this.router.navigate(['/signin'])
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

    getUserImgLink(userId: string) {
        return this.storage.ref(`userPhoto/${userId}`).getDownloadURL().pipe(take(1))
    }

    getDefaultDoctorImg(): string {
        const imgBase64 = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOnVybCgjcmFkaWFsLWdyYWRpZW50KTt9LmNscy0ye2ZpbGw6I2I0YjRiNDt9LmNscy0ze2ZpbGw6I2YwYmE3Yzt9LmNscy00e2ZpbGw6I2ZlZDI5OTt9LmNscy01e2ZpbGw6IzI0YmJiMTt9LmNscy02e2ZpbGw6IzQ4YzFiYTt9LmNscy03e2ZpbGw6I2ZmZjt9LmNscy04e2ZpbGw6I2VmZjNmNzt9LmNscy05e2ZpbGw6I2Q5ZGFkYTt9LmNscy0xMHtmaWxsOiM2NzY3Njc7fS5jbHMtMTF7ZmlsbDojMTQ3YTg2O30uY2xzLTEye2ZpbGw6I2ViZWNlYjt9LmNscy0xM3tmaWxsOiM0ZTRlNGU7fS5jbHMtMTR7ZmlsbDojMGM2NjczO308L3N0eWxlPjxyYWRpYWxHcmFkaWVudCBpZD0icmFkaWFsLWdyYWRpZW50IiBjeD0iMjU2IiBjeT0iMjU2IiByPSIyNTYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMyODhhY2EiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxZTZjOTciLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48dGl0bGU+bWFsZURvY3RvcjwvdGl0bGU+PGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgaWQ9IkxheWVyXzEtMiIgZGF0YS1uYW1lPSJMYXllciAxIj48Y2lyY2xlIGNsYXNzPSJjbHMtMSIgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjU2Ii8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMjIwLjMyLDI0OS40M2g3MS4zNWwuMzksNC44OC0zNC44Nyw1Mi44Ni0zNy40Ni01My4zOS41OS00LjM1WiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTIyMC43OCwyMzYuMTcsMjIwLjE2LDI2NmwtNTAuNTksMjcuNjZWMzk1LjA2SDMzOS44OVYyOTMuNjVsLTQ3LTI5LjIyLTIuNTgtMjkuODItNjkuNTEsMS41NloiLz48cGF0aCBjbGFzcz0iY2xzLTQiIGQ9Ik0xOTcuNCwxNDkuMjFzLTIuOS02LjM3LTEwLjY5LTMuMjEuMzUsMzQuNjUsMy4zMywzOSw3Ljc2LDEuNjEsOS41MSwxLjQzYzIuNDgsMTguNzgsMi43LDMxLjcyLDEwLjIxLDM5LjY0LDcuMTIsNy40OSwyMy40MiwyMi43NywzMiwyOC4xQTkxLjQ5LDkxLjQ5LDAsMCwwLDI1NiwyNTYuMzdhOTIuNzEsOTIuNzEsMCwwLDAsMTQuMjMtMi4xNmM4LjU5LTUuMzMsMjQuODktMjAuNjEsMzItMjguMSw3LjUxLTcuOTIsNy43My0yMC44NiwxMC4yMS0zOS42NCwxLjc1LjE4LDYuNTQsMyw5LjUxLTEuNDNzMTEuMTItMzUuODksMy4zMy0zOS0xMC42OSwzLjIxLTEwLjY5LDMuMjEsNy43LTI0LjczLTYtNDkuMDhjLTkuMzctMTYuNjgtMzAuNzYtMjUuMzQtNTIuNjEtMjYtMjEuODQuNjMtNDMuMjMsOS4yOS01Mi42MSwyNi0xMy42OCwyNC4zNS02LDQ5LjA4LTYsNDkuMDhaIi8+PHBhdGggY2xhc3M9ImNscy01IiBkPSJNMTk1LjM1LDI3NC43NiwyMDcuNDcsMjcwbDkuNzYtOC43NywzNC40NywyNi4xNGg4LjU5bDM0LjQ4LTI2LjE4LDIxLjg3LDEzLjU4LDM4LDY0LjYxTDMyNC41NSw1MDIuN2EyNTcuNDksMjU3LjQ5LDAsMCwxLTEyNC45MiwzLjA2bC01NC0xNjEuMjIsNDkuNjgtNjkuNzhaIi8+PHBhdGggY2xhc3M9ImNscy02IiBkPSJNMzA1LjU5LDI2Ni41OWwtMTMuOTItMTcuMTYtMzEuMzgsMzcuOTMsMjYuOTMsMjkuOTNaIi8+PHBhdGggY2xhc3M9ImNscy02IiBkPSJNMjA2LjM4LDI2Ni4yOWwxMy45NC0xNi44NiwzMS4zOCwzNy45My0yOCwyOS42MloiLz48cGF0aCBjbGFzcz0iY2xzLTciIGQ9Ik0yMDYuMzgsMjY2LjI5bC05Mi4yNCwzMGExMC4zOCwxMC4zOCwwLDAsMC02Ljg3LDguMjdMODAuMTQsNDQyQTI1Ni41NCwyNTYuNTQsMCwwLDAsMTQyLDQ4NS4yM2wxMy40OC00NGExLjA3LDEuMDcsMCwwLDEsMS4xNi0uNzUsMS4wNSwxLjA1LDAsMCwxLDEsMWwxLjk1LDUxLjY5QTI1NS4yNSwyNTUuMjUsMCwwLDAsMjU2LDUxMlY0OTQuODNMMjA2LjM5LDI2Ni4yOVoiLz48cGF0aCBjbGFzcz0iY2xzLTgiIGQ9Ik0yMDYuMzgsMjY2LjI5bC0xMC41NiwzLjI0LTI4LDQ3Ljc2LDM1LjMzLDEuMTEtMjEuNjksMTIuMzVMMjU2LDQ5NC44NCwyMDYuMzksMjY2LjI5WiIvPjxwYXRoIGNsYXNzPSJjbHMtOCIgZD0iTTMwNS41OSwyNjYuNTlsOTIuMjcsMjkuN2MzLjc2LDEuMiw2LjEsNC40LDYuODcsOC4yN0w0MzEuODUsNDQyQTI1NywyNTcsMCwwLDEsMzcwLDQ4NS4yNGwtMTMuNDktNDRhMS4wOCwxLjA4LDAsMCwwLTIuMTEuMjVsLTEuOTQsNTEuNjlBMjU1LjI1LDI1NS4yNSwwLDAsMSwyNTYsNTEyaDBWNDk0Ljg0bDQ5LjU4LTIyOC4yNVoiLz48cGF0aCBjbGFzcz0iY2xzLTciIGQ9Ik0zMDUuNTksMjY2LjU5bDUuODYsMS43OCwzMi42OSw0OS4yMy0zNS4zMywxLjEsMjEuNjksMTIuMzZMMjU2LDQ5NC44NGw0OS41OS0yMjguMjVaIi8+PHBhdGggY2xhc3M9ImNscy05IiBkPSJNMjY2LjQ1LDQ5My43NmE1LjYyLDUuNjIsMCwxLDAsNS42NCw1LjYyQTUuNjMsNS42MywwLDAsMCwyNjYuNDUsNDkzLjc2WiIvPjxwYXRoIGNsYXNzPSJjbHMtMTAiIGQ9Ik0zMDcuODgsMTU2LjU4bDUuNDItLjE5LDEuNzUtNi4yLDUuMTEtNS4xYzMuMzgtMjUuNDMsNC4zOC02NS0yMC44Ni02My44NiwwLDAtMi4yOC0yOC44Ni00Ny44MS0yMy4yUzE4NS40LDkzLjA4LDE4Ny44NSwxMTcuNnMxLjQ2LDI3LjQ5LDEuNDYsMjcuNDlsNS4xMSw1LjEuNzcsNy4wNSw0LjQ3LS4yOHMxLjQtOS40MywyLjgtMTMuNTgsMS0xMi41NSwxLTEyLjU1LDUzLjc4LDMuNDMsNjguMzEtMTUuMDZjOS0xMS40MSwyOS41OS0zMS4xOSwzMC42Mi0zLjguMzEsOC4xMy0yLjcxLDIwLjMsMy4wNywyOS4xNnMyLjQ1LDE1LjQ0LDIuNDUsMTUuNDRoMFoiLz48cGF0aCBjbGFzcz0iY2xzLTExIiBkPSJNMjU2LDQ5NC44M2wxNC41My02Ni45LTkuODctMTMxLjg4LDUuMzgtMi4zLTUuNzUtNi4zOUgyNTEuN2wtNS45LDYuMjQsNS41NCwyLjQ1LTkuNjMsMTMzTDI1Niw0OTQuODNaIi8+PHBhdGggY2xhc3M9ImNscy03IiBkPSJNMjY2LDQ5My43NmE1LjEyLDUuMTIsMCwxLDAsNS4xNCw1LjEyQTUuMTMsNS4xMywwLDAsMCwyNjYsNDkzLjc2WiIvPjxwYXRoIGNsYXNzPSJjbHMtNyIgZD0iTTM0Ni4zOSw0MDkuMDdhMTguMzYsMTguMzYsMCwxLDEsMjEuMjEtMTUsMTguMzUsMTguMzUsMCwwLDEtMjEuMjEsMTVaIi8+PHBhdGggY2xhc3M9ImNscy0xMSIgZD0iTTM0Ni41Nyw0MDhhMTcuMjksMTcuMjksMCwxLDEsMjAtMTQuMDksMTcuMjgsMTcuMjgsMCwwLDEtMjAsMTQuMDlaIi8+PHBhdGggY2xhc3M9ImNscy0xMiIgZD0iTTM0Ny44OSw0MDAuNGE5LjU2LDkuNTYsMCwxLDEsMTEuMDUtNy44LDkuNTYsOS41NiwwLDAsMS0xMS4wNSw3LjhaIi8+PHBhdGggY2xhc3M9ImNscy03IiBkPSJNMzQ5LDM4Mi41OGw0LjIxLjcyLDIuMjYtMTMuMDktNC4yMS0uNzJaIi8+PHBhdGggY2xhc3M9ImNscy02IiBkPSJNMjA4LjI0LDQxMi43bDcuODctMS41N2ExMi40MywxMi40MywwLDAsMCw5Ljc2LTE0LjU4bC05LjI3LTQ2LjY3Yy0zLjQ5LTE3LjYxLTE3LjI3LTI2LjU5LTMzLTI4LjU4YTU4LjM5LDU4LjM5LDAsMCwwLTE4LjQ4LjczLDU3Ljc4LDU3Ljc4LDAsMCwwLTE3LjM2LDYuMzhjLTEzLjc2LDcuODMtMjMsMjEuMzctMTkuNTIsMzlsOS4yNiw0Ni42N2ExMi40MSwxMi40MSwwLDAsMCw1LjI4LDcuODloMGExMi4zMiwxMi4zMiwwLDAsMCw5LjMsMS44N2w3Ljg3LTEuNTZMMTU5LjMsNDE5bC03Ljg3LDEuNTdhOS4xMyw5LjEzLDAsMCwxLTYuODItMS4zN2gwYTkuMDksOS4wOSwwLDAsMS0zLjg3LTUuNzhsLTkuMjctNDYuNjdjLTMuMTctMTYsNS4zMi0yOC4zNCwxNy45MS0zNS41MWE1Ni4wOCw1Ni4wOCwwLDAsMSwzMy44LTYuN2MxNC40MSwxLjgyLDI3LDEwLDMwLjE4LDI1Ljk1bDkuMjYsNDYuNjdhOS4xMiw5LjEyLDAsMCwxLTcuMTUsMTAuNjlsLTcuODgsMS41Ny42NSwzLjI0WiIvPjxwYXRoIGNsYXNzPSJjbHMtMTMiIGQ9Ik0yMTkuMSwzNTYuOGwtMS40MS03LjEzYy0zLjYxLTE4LjE2LTE3Ljc4LTI3LjQxLTM0LTI5LjQ2YTYwLjQ1LDYwLjQ1LDAsMCwwLTM2LjUyLDcuMjRjLTE0LjE0LDguMDYtMjMuNjcsMjItMjAuMDYsNDAuMTlsMS40Miw3LjEzLDUuNC0xLjA4LTEuNDEtNy4xM2MtMy4wNy0xNS40NSw1LjE2LTI3LjM5LDE3LjM2LTM0LjMzYTU1LDU1LDAsMCwxLDMzLjEzLTYuNTdjMTQsMS43NiwyNi4xNyw5LjY1LDI5LjIzLDI1LjA4bDEuNDIsNy4xMyw1LjQxLTEuMDdaIi8+PHBhdGggY2xhc3M9ImNscy0xNCIgZD0iTTE1My43LDQyNC4yNGw0LjIyLS44NGE0LjYzLDQuNjMsMCwxLDAtLjkxLTQuNTlsLTQuMjEuODMuOTEsNC41OVoiLz48cGF0aCBjbGFzcz0iY2xzLTE0IiBkPSJNMjExLjU5LDQxMi43NWwtNC4yMS44M2E0LjYyLDQuNjIsMCwxLDEtLjkxLTQuNTlsNC4yMS0uODNaIi8+PHBhdGggY2xhc3M9ImNscy0xMCIgZD0iTTE2Ny40NiwzMjAuNTNsLTEuNjEtOC4wOS0zLjE5LjYzLTMuMi42MywxLjYzLDguMThxMS44My0uNTQsMy42OS0uOUMxNjUuNjcsMzIwLjgsMTY2LjU2LDMyMC42NSwxNjcuNDYsMzIwLjUzWiIvPjxwYXRoIGNsYXNzPSJjbHMtMTEiIGQ9Ik0xNjAuNTYsNDE5LjczYTEuNCwxLjQsMCwxLDAtMS42NC0xLjEsMS40LDEuNCwwLDAsMCwxLjY0LDEuMVoiLz48cGF0aCBjbGFzcz0iY2xzLTExIiBkPSJNMjAyLjIyLDQxMS40NWExLjQsMS40LDAsMSwwLTEuNjUtMS4xQTEuNDEsMS40MSwwLDAsMCwyMDIuMjIsNDExLjQ1WiIvPjxwYXRoIGNsYXNzPSJjbHMtNyIgZD0iTTM0Ny4zOCw0MDAuMzJhOSw5LDAsMSwxLDEwLjQ1LTcuMzgsOSw5LDAsMCwxLTEwLjQ1LDcuMzhaIi8+PHBhdGggY2xhc3M9ImNscy0xMyIgZD0iTTIwNi40MywyNjguNzJjLS4xNCwwLTQ5Ljg2LjQxLTQxLjQ2LDQzLjkxbC00LjYzLjg4Yy05LjQ2LTQ5LDQ1Ljg4LTQ5LjQ5LDQ2LTQ5LjQ5WiIvPjxwYXRoIGNsYXNzPSJjbHMtMTMiIGQ9Ik0zMDUuNjQsMjY0LjI0YzguMTEuMjIsMjMuNzksMi40MywzNS44NiwxNy4xMSwxMS44MSwxNC4zNywyMC4wOSw0MC43NiwxMy45LDg5LjEzbC00LjY2LS41OWM2LTQ2LjgyLTEuNzUtNzItMTIuODYtODUuNTUtMTAuODYtMTMuMjEtMjUtMTUuMi0zMi4zNS0xNS40bC4xMS00LjdaIi8+PC9nPjwvZz48L3N2Zz4='
        return imgBase64;
    }
    getDefaultUserImg(): string {
        const imgBase64 = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODQgMzg0Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzI1OGFjZDt9LmNscy0ye2ZpbGw6IzIzNjE4NDt9LmNscy0ze2ZpbGw6I2ZmYmI3ZDt9LmNscy00e2ZpbGw6I2VmYTM2YTt9LmNscy01e2ZpbGw6I2VmZWJkYzt9LmNscy02e2ZpbGw6I2Q2Y2ZiZDt9LmNscy03e2ZpbGw6I2ZmZDRhNjt9LmNscy04e2ZpbGw6IzJiMmIyYjt9LmNscy05e2ZpbGw6IzlkOTdhNTt9LmNscy0xMHtmaWxsOiM3YjcyODQ7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5Bc3NldCAxXzE8L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMCwxOTJDMCw4Niw4NiwwLDE5MiwwUzM4NCw4NiwzODQsMTkyYTE5MS4xMywxOTEuMTMsMCwwLDEtMzcsMTEzLjNjLTM0LjkzLDQ3LjcyLTkxLjM2LDExLjMxLTE1NSwxMS4zMVM3MS45MSwzNTMsMzcsMzA1LjNBMTkxLjEzLDE5MS4xMywwLDAsMSwwLDE5MloiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xOTIsMzE2LjYxYzYzLjY2LDAsMTIwLjA5LDM2LjQxLDE1NS0xMS4zMUExOTIuNDEsMTkyLjQxLDAsMCwwLDM3OC4xLDE0NC42TDI4MS43NSw0OC4yNUgxMDIuMjVsNDcuNDYsNDYuNTQtMzMuNTUsNjkuMSwyMi42MiwyMS45YzMuMTUsMTIuMTIsMjEuNDgsMzQuNDIsMzAuMzgsNDIuNDZsLTQ1LjQxLDM2Ljg4TDM3LDMwNS4zbC4wNS4wN0M3MiwzNTMsMTI4LjM3LDMxNi42MSwxOTIsMzE2LjYxWiIvPjxyZWN0IGNsYXNzPSJjbHMtMyIgeD0iMTQ5Ljk4IiB5PSIxOTUuMzciIHdpZHRoPSI4NC4wNSIgaGVpZ2h0PSI4OS4xMyIvPjxyZWN0IGNsYXNzPSJjbHMtNCIgeD0iMTkyIiB5PSIxOTUuMzciIHdpZHRoPSI0Mi4wMiIgaGVpZ2h0PSI4OS4xMyIvPjxwYXRoIGNsYXNzPSJjbHMtNSIgZD0iTTI4OS4xNiwyNDkuMjJIMjM0bC00MiwzMC4xNi00Mi0zMC4xNkg5NC44NUE1Ny45LDU3LjksMCwwLDAsMzcsMzA1LjNhMTkyLDE5MiwwLDAsMCwzMTAsMCw1Ny44OCw1Ny44OCwwLDAsMC01Ny44Ni01Ni4wOFoiLz48cGF0aCBjbGFzcz0iY2xzLTYiIGQ9Ik0zNDcsMzA1LjNBMTkxLjc0LDE5MS43NCwwLDAsMSwxOTIsMzg0VjI3OS4zOGw0Mi0zMC4xNmg1NS4xNEE1Ny44OCw1Ny44OCwwLDAsMSwzNDcsMzA1LjNaIi8+PHBhdGggY2xhc3M9ImNscy03IiBkPSJNMjYyLjIxLDExMy4zNmMtMy00NS0zOS4zOS02MS42Ny03MC4yMS02MS42N3MtNjcuMjUsMTYuNjQtNzAuMjIsNjEuNjdjLTgsMS41NC0xMy42MywxMi0xMi43NCwyMC40NWwxLjM3LDE5LjI0YTE1LjkyLDE1LjkyLDAsMCwwLDE3LjM0LDE0LjM5bDEuNDgtLjE2YzE3LjYxLDQ3LjI5LDQ1LjIzLDUyLjIzLDYyLjc3LDU1LDE3LjU0LTIuNzcsNDUuMTYtNy43MSw2Mi43Ny01NWwxLjQ4LjE2YTE1LjkyLDE1LjkyLDAsMCwwLDE3LjM0LTE0LjM5TDI3NSwxMzMuODFjLjg5LTguNDUtNC43Ny0xOC45MS0xMi43NS0yMC40NVoiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik0yNzUsMTMzLjgxbC0xLjM3LDE5LjI0YTE1LjkyLDE1LjkyLDAsMCwxLTE3LjM0LDE0LjM5bC0xLjQ4LS4xNmMtNiwxNi4xNS0xMy4yLDI3LjM2LTIwLjc1LDM1LjIzLTE0LjU1LDE1LjE4LTMwLjQ3LDE3Ljk0LTQyLDE5Ljc3VjUxLjY5YzMwLjgyLDAsNjcuMjUsMTYuNjQsNzAuMjEsNjEuNjcsOCwxLjU0LDEzLjY0LDEyLDEyLjc1LDIwLjQ1WiIvPjxwYXRoIGNsYXNzPSJjbHMtOCIgZD0iTTI4MS43NSw0OC4yNXMtMTAtMy0zNC0yMC01NS43NS02LTU1Ljc1LTYtMzEuNzUtMTEtNTUuNzUsNi0zNCwyMC0zNCwyMCwxMi41LDguNSwyMC41LDYuNWMwLDAtMjAuMzgsMjAuNDgtNi44Niw2MS42MkwxMzQuMjUsMTM3bDkuMjQtNDQuMTNhMzAuOTEsMzAuOTEsMCwwLDEsMzMuNjctMjMuMzdMMTkyLDcxLjI1bDE0Ljg0LTEuNzdhMzAuOTIsMzAuOTIsMCwwLDEsMzMuNjcsMjMuMzdMMjQ5Ljc1LDEzN2wxOC4zNS0yMC42MWMxMy41My00MS4xNC02Ljg1LTYxLjYyLTYuODUtNjEuNjIsOCwyLDIwLjUtNi41LDIwLjUtNi41WiIvPjxwYXRoIGQ9Ik0yNjEuMjUsNTQuNzVzMTEuNDksMTEuNTQsMTEuNDksMzQuNzFhODYsODYsMCwwLDEtNC42NCwyNi45MUwyNDkuNzUsMTM3bC05LjI0LTQ0LjEzYTMwLjksMzAuOSwwLDAsMC0zMy42Ny0yMy4zNkwxOTIsNzEuMjV2LTQ5czMxLjc1LTExLDU1Ljc1LDYsMzQsMjAsMzQsMjAtMTIuNSw4LjUtMjAuNSw2LjVaIi8+PHBhdGggY2xhc3M9ImNscy05IiBkPSJNMTUwLDIyOS4yNWwtMjYuMjMsMjAsMzUuOSw2MS42M0wxOTIsMjc5LjM4WiIvPjxwYXRoIGNsYXNzPSJjbHMtMTAiIGQ9Ik0yMzQsMjI5LjI1bDI2LjIzLDIwLTM1LjksNjEuNjNMMTkyLDI3OS4zOFoiLz48L2c+PC9nPjwvc3ZnPg=='
        return imgBase64;
    }
}