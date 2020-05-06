import { FormsServices } from './services/forms.service';
import { NgModule } from "@angular/core";
import { AuthService } from './services/auth.service';
import { UploadingService } from './services/uploading.service';
import { FirestoreService } from './services/firestore.service';
import { ChattingService } from './services/chatting.service';
import { SharedService } from './services/shared.service';

@NgModule({
    providers: [
        FormsServices,
        AuthService,
        UploadingService,
        FirestoreService,
        ChattingService,
        SharedService
    ]
})

export class CoreModule {}