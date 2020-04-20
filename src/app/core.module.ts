import { FormsServices } from './services/forms.service';
import { NgModule } from "@angular/core";
import { AuthService } from './services/auth.service';
import { UploadingService } from './services/uploading.service';
import { FirestoreService } from './services/firestore.service';

@NgModule({
    providers: [
        FormsServices,
        AuthService,
        UploadingService,
        FirestoreService
    ]
})

export class CoreModule {}