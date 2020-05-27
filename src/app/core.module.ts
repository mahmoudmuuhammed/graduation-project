import { FormsServices } from './services/forms.service';
import { NgModule } from "@angular/core";
import { AuthService } from './services/auth.service';
import { UploadingService } from './services/uploading.service';
import { FirestoreService } from './services/firestore.service';
import { ChattingService } from './services/chatting.service';
import { SharedService } from './services/shared.service';
import { FeedsService } from './services/feeds.service';
import { SideBarToggler } from './services/sideBar.service';
import { ShowPostingService } from './services/showPosting.service';
import { AngularFireMessaging } from '@angular/fire/messaging'


@NgModule({
    providers: [
        FormsServices,
        AuthService,
        UploadingService,
        FirestoreService,
        ChattingService,
        SharedService,
        FeedsService,
        SideBarToggler,
        ShowPostingService,
        AngularFireMessaging
    ]
})

export class CoreModule {}