import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
    providedIn: 'root'
})

export class FormsServices {
    // global validation for forms
    validationErrors: 
        { required: string, 
            notValidEmail: string, 
            matching: string, 
            emailExist: string, 
            minLength: string, 
            notFound: string,
            incorrectPass: string } = {
                required: 'required',
                notValidEmail: 'not valid email',
                matching: '',
                emailExist: '',
                minLength: 'password must be at least 6 characters',
                notFound: '',
                incorrectPass: ''
    };
        // initialize authintication firebase 
    constructor(public authService: AngularFireAuth) {}
        // email verfication
    onEmailVerification() {
        return this.authService.auth.currentUser.sendEmailVerification()
            .then(
                response => {
                    console.log('verify');
                }
            )
    }
        // sign up with email address
    onSignupWithEmail(emailValue: string, passwordValue: string) {
        this.authService.auth.createUserWithEmailAndPassword(emailValue, passwordValue)
            .then(
                response => {
                    this.onEmailVerification();
                    console.log(response);
                }
            ).catch(
                error => {
                    this.validationErrors.emailExist = 'this email is already exist'
                }
            );
    }
        // facebook authntication
    facebookAuth() {
        const provider = new auth.FacebookAuthProvider();
        this.authService.auth.signInWithPopup(provider).then(
            response => {  
                console.log(response);
            }
        )
    }
        // google authntication
    googleAuth() {
        const provider = new auth.GoogleAuthProvider();
        this.authService.auth.signInWithPopup(provider)
            .then(
                response => {
                    console.log(response);
                }
            )
    }
        // sign in method
    onSigninWithEmail(userEmail: string, userPassword: string) {
       this.authService.auth.signInWithEmailAndPassword(userEmail, userPassword)
            .then(
                response => { 
                    window.alert('success');
                    console.log(response);
                 }
            ).catch(
                error => {
                    if(error.code == 'auth/user-not-found') {
                        this.validationErrors.notFound = 'this email not found'
                    } else if(error.code == 'auth/wrong-password') {
                        this.validationErrors.incorrectPass = 'incorrect password'
                    }
                }
            )
    }
}