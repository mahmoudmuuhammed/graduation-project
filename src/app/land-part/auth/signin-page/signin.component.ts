import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsServices } from 'src/app/services/forms.service';

@Component({
    selector: 'signin-page',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})

export class SigninPageComponent implements OnInit {
    constructor(public forms: FormsServices) {}
    ngOnInit() {
        this.forms.signinFormController();
    }
}