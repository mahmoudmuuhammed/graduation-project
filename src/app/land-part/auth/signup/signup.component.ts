import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormsServices } from 'src/app/services/forms.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})

export class SignupComponent implements OnInit {
    constructor(public forms: FormsServices, 
        public authService: AuthService) {}
    ngOnInit() {
        this.forms.accountFormController();
        this.forms.generalFormController();
        this.forms.doctorFormController();
    }
    
    submiting(stepper) {
        this.authService.onAuthentication(stepper);
    }
}