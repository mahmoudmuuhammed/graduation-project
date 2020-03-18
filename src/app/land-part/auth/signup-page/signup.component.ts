import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsServices } from 'src/app/services/forms.service';

@Component({
    selector: 'signup-page',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})

export class SignupPageComponent implements OnInit {
    // form group object
    signupForm: FormGroup;
    // pass state checking...
    checkPassState: boolean = false;
        // validation errors
    validationMessageError = this.forms.validationErrors;
        // dependency injections for external services
    constructor(private forms: FormsServices) {}
    // when component initialize the component
    ngOnInit() {
        this.signupFormController();
    }
    // toggling the password state
    toggleShowPass() {
        this.checkPassState = !this.checkPassState;
    }
        // submitting form
    signupFormSubmit() {
        let emailValue = this.signupForm.get('email').value;
        let passwordValue = this.signupForm.get('password').value;
        let confirmPassValue = this.signupForm.get('cpassword').value;
        if(this.signupForm.status == 'VALID') {
            if(confirmPassValue != passwordValue) {
                this.validationMessageError.matching = 'two password must be matching'
                confirmPassValue = '';
                return;
            }
            this.validationMessageError.matching = '';
            this.forms.onSignupWithEmail(emailValue, passwordValue);
            this.signupForm.reset();
        } 
        else {
            this.signupForm.markAllAsTouched();
        }
        


    }
    // when user sign in with facebook
    onSignupWithFacebookProvider() {
        this.forms.facebookAuth();
    }
        // when user sign up with google
    onSignupWithGoogleProvider() {
        this.forms.googleAuth();
    }

        // Form controller 
    private signupFormController() {
        this.signupForm = new FormGroup({
            'firstname': new FormControl(null, Validators.required),
            'lastname': new FormControl(null, Validators.required),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
            'cpassword': new FormControl(null, [Validators.required])
        });
    }

        // shortcuts for forms validation 
    get fnameControl() {
        return this.signupForm.get('firstname');
    }

    get lnameControl() {
        return this.signupForm.get('lastname');
    }

    get emailControl() {
        return this.signupForm.get('email');
    }

    get passControl() {
        return this.signupForm.get('password');
    }

    get cpassControl() {
        return this.signupForm.get('cpassword');
    }
}