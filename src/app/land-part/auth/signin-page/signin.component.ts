import { Component, OnInit } from "@angular/core";
import { FormsServices } from 'src/app/services/forms.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'signin-page',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})

export class SigninPageComponent implements OnInit {
    constructor(public forms: FormsServices, public authService: AuthService) {}
    ngOnInit() {
        this.forms.signinFormController();
    }

    signinSubmit() {
        this.authService.loginRequest();
    }

    facebookProviderAuth() {
        // this.authService.facebookAuthentication();
    }

    googleProviderAuth() {
        // this.authService.googleAuthentication();
    }
}