import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home/home.component';
import { SigninPageComponent } from './auth/signin-page/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

const landRoutes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'signin', component: SigninPageComponent },
    { path: 'signup', component: SignupComponent },
];

@NgModule({
    imports: [RouterModule.forChild(landRoutes)],
    exports: [RouterModule]
})

export class LandRoutingModule {}