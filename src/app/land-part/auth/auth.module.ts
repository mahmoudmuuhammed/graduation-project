import { environment } from '../../../environments/environment';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';


import { ShowPasswordDirective } from 'src/app/directives/show-pass.directive';
import { SigninPageComponent } from './signin-page/signin.component';
import { SignupPageComponent } from './signup-page/signup.component';

@NgModule({
    declarations: [
        SigninPageComponent,
        SignupPageComponent,
        ShowPasswordDirective
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule
    ],
    exports: [
        SigninPageComponent,
        SignupPageComponent
    ]
})

export class AuthModule {}