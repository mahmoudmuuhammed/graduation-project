import { Component, } from "@angular/core";
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'social-log',
    templateUrl: './social-log.component.html',
    styleUrls: ['./social-log.component.scss']
})

export class SocialLogComponent {
    
    constructor(public authService: AuthService) {}

    onFacebookAuthentication() {
        this.authService.facebookAuthentication();
    }

    ongoogleAuthentication() {
        this.authService.googleAuthentication();
    }
}