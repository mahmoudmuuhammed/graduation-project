import { environment } from '../../../environments/environment';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatStepperModule } from '@angular/material/stepper';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { ShowPasswordDirective } from 'src/app/directives/show-pass.directive';
import { SigninPageComponent } from './signin-page/signin.component';
import { CollapseDirective } from 'src/app/directives/collapse.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandRoutingModule } from '../land-routing.module';
import { SignupComponent } from './signup/signup.component';
import { AccountFormComponent } from './signup/account-form/account-form.component';
import { GeneralFormComponent } from './signup/general-info/general-info.component';
import { UploadPhotoComponent } from './signup/upload-photo/upload-photo.component';
import { DoctorInfoComponent } from './signup/doctor-info/doctor-info.component';
import { SocialLogComponent } from './social-log/social-log.component';
import { VerificationPageComponent } from './verification/verification.component';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { SocialComponent } from './social/social.component';
import { DoctorConfirmComponent } from './doctor-confirm/doctor-confirm.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        SigninPageComponent,
        ShowPasswordDirective,
        CollapseDirective,
        SignupComponent,
        AccountFormComponent,
        GeneralFormComponent,
        UploadPhotoComponent,
        DoctorInfoComponent,
        SocialLogComponent,
        VerificationPageComponent,
        SocialComponent,
        DoctorConfirmComponent
    ],
    imports: [
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        SharedModule,
        LandRoutingModule,
        MatStepperModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireMessagingModule
    ],
    exports: [
        SigninPageComponent,
        SignupComponent,
        AccountFormComponent,
        GeneralFormComponent,
        UploadPhotoComponent,
        DoctorInfoComponent,
        SocialLogComponent,
        VerificationPageComponent,
    ]
})

export class AuthModule {}