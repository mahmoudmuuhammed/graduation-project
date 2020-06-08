import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormsServices } from 'src/app/services/forms.service';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UploadingService } from 'src/app/services/uploading.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})

export class SignupComponent implements OnInit {

    Img: File;

    constructor(public forms: FormsServices,
        public authService: AuthService,
        private uploadingService: UploadingService) { }
    ngOnInit() {
        this.forms.accountFormController();
        this.forms.generalFormController();
        this.forms.doctorFormController();
        this.uploadingService.onPhotoselect.pipe(take(1)).subscribe(userImg => {
            this.Img = userImg
        })
    }

    submiting(stepper) {
        // this.authService.onAuthentication(stepper);
        // this.fire.sendingRequest();
        this.authService.sendingAuthRequest(this.Img);
    }
}