import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';

import { SigninPageComponent } from './signin-page/signin.component';
import { SignupPageComponent } from './signup-page/signup.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        SigninPageComponent,
        SignupPageComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [
        SigninPageComponent,
        SignupPageComponent
    ]
})

export class AuthModule {}