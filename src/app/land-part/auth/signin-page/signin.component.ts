import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsServices } from 'src/app/services/forms.service';

@Component({
    selector: 'signin-page',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})

export class SigninPageComponent implements OnInit {
    signinForm: FormGroup;
    checkPassState: boolean = false;
    validationErrorMessage = this.forms.validationErrors;
    constructor(private forms: FormsServices) {}
    ngOnInit() {
        this.signinFormController();
    }

    signinFormSubmit() {

    }

    toggleShowPass() {
        this.checkPassState = !this.checkPassState;
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