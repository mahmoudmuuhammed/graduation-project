import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'signup-page',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})

export class SignupPageComponent implements OnInit {
    // form group object
    signupForm: FormGroup;
        // validation errors
    validationMessageError = {
        required: 'required',
        notValidEmail: 'notValidEmail',
        matching: 'two password not matching'
    };
    
    ngOnInit() {
        this.signupFormController();
    }

    signupFormSubmit() {
        
    }

        // Form controller 
    private signupFormController() {
        this.signupForm = new FormGroup({
            'firstname': new FormControl(null, Validators.required),
            'lastname': new FormControl(null, Validators.required),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, Validators.required),
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