import { Component, OnInit } from "@angular/core";
import { FormsServices } from 'src/app/services/forms.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
    constructor(public forms: FormsServices, private authService: AuthService) {}
    ngOnInit() {
        this.forms.accountFormController();
        this.forms.generalFormController();
        this.forms.doctorFormController();
    }
    
    submitingForms() {
    }
}