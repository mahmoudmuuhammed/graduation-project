import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home/home.component';
//import { DonationPageComponent } from './donation/donation.component';
import { SigninPageComponent } from './auth/signin-page/signin.component';
import { SignupPageComponent } from './auth/signup-page/signup.component';

const landRoutes: Routes = [
    { path: '', component: HomePageComponent },
    //{ path: 'donation', component: DonationPageComponent },
    { path: 'signin', component: SigninPageComponent },
    { path: 'signup', component: SignupPageComponent }
];
@NgModule({
    imports: [RouterModule.forChild(landRoutes)],
    exports: [RouterModule]
})

export class LandRoutingModule {}