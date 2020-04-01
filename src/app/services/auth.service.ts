import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
// import 'firebase/auth';
import { FormsServices } from './forms.service';
import { UploadingService } from './uploading.service';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    imgUrl: string;
    isLoading: boolean = false;

    constructor(private authService: AngularFireAuth, 
            private firestore: AngularFirestore, 
            private forms: FormsServices, 
            private storage: UploadingService,
            private router: Router) {}

            
    get userCred() {
        const cred: { email: string, password: string } = {
            email: this.forms.emailControl.value,
            password: this.forms.passwordControl.value
        }
        return cred;
    }

    get currentUser() {
        return this.authService.auth.currentUser;
    }
            
    get determineCurrentUser() {
        return this.authService.auth.currentUser;
    }
            
    onEmailVerification() {
        let verifyEmail = this.authService.auth.currentUser.sendEmailVerification();
        if(this.currentUser != null) {
            verifyEmail
            .then(
                onVerify => {
                    console.log('verification Sending!');
                }
            )
            .catch(
                verifyError => {
                    console.log(verifyError);
                }
            );
        }
    }

    createUser() {
        const userRef = this.authService.auth
        .createUserWithEmailAndPassword(this.userCred.email, this.userCred.password);
        return userRef;
    }

    createUserProfile() {
        const collectionRef = this.firestore.collection('Users').doc(this.currentUser.uid);
        const firestoreRef = collectionRef.set({
            userType: this.forms.doctorForm.value,
            createdTime: this.currentUser.metadata.creationTime,
        })
        .then(
            userProfile => {
                if(this.currentUser != null) {
                    this.isLoading = false;
                    console.log('Success Profile');
                }
            }
        )
        .catch(
            userProfileError => {
                this.isLoading = false;
            }
        )
        .finally(
            () => {
                console.log('Finally Profile');
                this.router.navigate(['/verify']);
            }
        )
    }

    onAuthentication(step: MatStepper) {
        this.isLoading = true;
        this.createUser()
        .then(
            user => {
                user.user.updateProfile({ 
                    displayName: this.forms.fullnameControl.value,
                    photoURL: this.storage.imgUrl
                });
                console.log('Auth Success', user);
                this.createUserProfile();
            }
        )
        .catch(
            userError => {
                this.isLoading = false;
                step.steps.first.select();
                this.forms.validationErrors.emailExist = 'email already exist'
            }
        )
        .finally(
            () => {
                console.log('Finally auth');
                this.onEmailVerification();
            }
        );
    }

    SignIn() {
        const email = this.forms.signinEmailControl.value;
        const password = this.forms.signinPasswordControl.value;
        this.isLoading = true;
        this.authService.auth
        .signInWithEmailAndPassword(email, password)
        .then(
            user => {
                this.isLoading = false;
                console.log('Success Signin', user);
                this.forms.validationErrors.notFound = '';
            }
        )
        .catch(
            err => {
                this.isLoading = false;
                if(err.code == 'auth/user-not-found') {
                    this.forms.validationErrors.notFound = 'this email not found';
                }
            }
        )
        .finally(
            () => {
                console.log('Finally');
            }
        );
    }

    facebookAuthentication() {
        const provider = new auth.FacebookAuthProvider();
        this.authService.auth.signInWithPopup(provider)
        .then(
            fbAuth => {
                if(fbAuth.additionalUserInfo.isNewUser) {
                    this.router.navigate(['/user-type']);
                    return;
                }

                console.log('success', fbAuth);
            }
        )
        .catch(
            fbAuthError => {
                console.log(fbAuthError);
            }
        )
        .finally(
            () => {
                console.log('Finally fb Authentication');
            }
        )
    }

    googleAuthentication() {
        const provider = new auth.GoogleAuthProvider();
        this.authService.auth.signInWithPopup(provider)
        .then(
            glAuth => {
                if(glAuth.additionalUserInfo.isNewUser) {
                    this.router.navigate(['/user-type']);
                    return;
                }
                console.log(glAuth);
            }
        )
        .catch(
            glAuthError => {
                console.log(glAuthError);
            }
        )
        .finally(
            () => {
                console.log('Finally Google Authentication');
            }
        )
    }

    userTypeAfterProvider() {
        this.createUserProfile();
    }
}