import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormsServices } from 'src/app/services/forms.service';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})

export class SignupComponent implements OnInit {
    constructor(public forms: FormsServices, 
        public authService: AuthService,
        private fire: FirestoreService) {}
    ngOnInit() {
        this.forms.accountFormController();
        this.forms.generalFormController();
        this.forms.doctorFormController();
    }
    
    submiting(stepper) {
        // this.authService.onAuthentication(stepper);
        // this.fire.sendingRequest();
        this.authService.sendingAuthRequest();
    }
}