import { environment } from '../../../environments/environment';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { ShowPasswordDirective } from 'src/app/directives/show-pass.directive';
import { SigninPageComponent } from './signin-page/signin.component';
import { SignupPageComponent } from './signup-page/signup.component';
import { EmailVerificationComponent } from './email-verify/e-verify.component';
import { CollapseDirective } from 'src/app/directives/collapse.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandRoutingModule } from '../land-routing.module';

@NgModule({
    declarations: [
        SigninPageComponent,
        SignupPageComponent,
        ShowPasswordDirective,
        CollapseDirective,
        EmailVerificationComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        SharedModule,
        LandRoutingModule
    ],
    exports: [
        SigninPageComponent,
        SignupPageComponent,
        EmailVerificationComponent
    ]
})

export class AuthModule {}