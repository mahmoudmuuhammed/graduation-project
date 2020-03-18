import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
        CommonModule
    ],
    exports: [
        SigninPageComponent,
        SignupPageComponent
    ]
})

export class AuthModule {}