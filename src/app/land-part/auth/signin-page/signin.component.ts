import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'signin-page',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})

export class SigninPageComponent implements OnInit {
    signinForm: FormGroup;
    checkPassState: boolean = false;
    validationErrorMessage = {
        requiredError: 'required',
        validEmail: 'not valid email'
    };

    ngOnInit() {
        this.signinFormController();
    }

    signinFormSubmit() {

    }

    showPasswordToggle(passValue: HTMLInputElement) {
        this.checkPassState = !this.checkPassState;

        if(this.checkPassState) {
            passValue.setAttribute('type', 'text');
        }

        else {
            passValue.setAttribute('type', 'password');
        }
    }

    private signinFormController() {
        this.signinForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, Validators.required)
        });
    }

    get emailControl() {
        return this.signinForm.get('email');
    }
    get passwordControl() {
        return this.signinForm.get('password');
    }
}