import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormsServices } from 'src/app/services/forms.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'verification-page',
    templateUrl: './verification.component.html',
    styleUrls: ['./verification.component.scss']
})

export class VerificationPageComponent implements OnInit {
    constructor(public forms: FormsServices, public authService: AuthService) {}

    ngOnInit() {
        this.forms.updateEmailFormController();
    }

    
}