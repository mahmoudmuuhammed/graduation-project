import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { FormsServices } from './forms.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private authService: AngularFireAuth, 
            private firestore: AngularFirestore, private forms: FormsServices) {}
    
    get submitBody() {
        return {
            userAccount: this.forms.accountForm.value,
            generalInfo: this.forms.generalForm.value,
            
        }
    }
    signupWithEmail() {
        const emailValue = this.forms.emailControl.value;
        const passwordValue = this.forms.passwordControl.value;
        const username = this.forms.createUsername;
        this.authService.auth.createUserWithEmailAndPassword(emailValue, passwordValue)
            .then(
                userData => {
                    this.firestore.collection('Users').doc(username).set({
                        email: userData.user.email,
                        UserId: userData.user.uid
                    }).then(
                        docRef => {
                            console.log('success');
                        }
                    ).catch(
                        error => {
                            console.log(error);
                        }
                    )
                }
            ).catch(
                error => {
                    console.log(error);
                }
            )
    }
}