import { environment } from '../../../environments/environment';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatStepperModule } from '@angular/material/stepper';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { ShowPasswordDirective } from 'src/app/directives/show-pass.directive';
import { SigninPageComponent } from './signin-page/signin.component';
import { EmailVerificationComponent } from './email-verify/e-verify.component';
import { CollapseDirective } from 'src/app/directives/collapse.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandRoutingModule } from '../land-routing.module';
import { SignupComponent } from './signup/signup.component';
import { AccountFormComponent } from './signup/account-form/account-form.component';
import { GeneralFormComponent } from './signup/general-info/general-info.component';
import { UploadPhotoComponent } from './signup/upload-photo/upload-photo.component';
import { DoctorInfoComponent } from './signup/doctor-info/doctor-info.component';
import { SocialLogComponent } from './social-log/social-log.component';

@NgModule({
    declarations: [
        SigninPageComponent,
        ShowPasswordDirective,
        CollapseDirective,
        EmailVerificationComponent,
        SignupComponent,
        AccountFormComponent,
        GeneralFormComponent,
        UploadPhotoComponent,
        DoctorInfoComponent,
        SocialLogComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        SharedModule,
        LandRoutingModule,
        MatStepperModule,
        AngularFirestoreModule
    ],
    exports: [
        SigninPageComponent,
        EmailVerificationComponent,
        SignupComponent,
        AccountFormComponent,
        GeneralFormComponent,
        UploadPhotoComponent,
        DoctorInfoComponent,
        SocialLogComponent
    ]
})

export class AuthModule {}