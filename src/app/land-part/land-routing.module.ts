import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home/home.component';
import { DonationComponent } from './donation/donation.component';
import { SigninPageComponent } from './auth/signin-page/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SocialLogComponent } from './auth/social-log/social-log.component';
import { VerificationPageComponent } from './auth/verification/verification.component';
import { UserTypeComponent } from './auth/user-type/user-type.component';

const landRoutes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'donation', component: DonationComponent },
    { path: 'signin', component: SigninPageComponent },
    { path: 'auth', component: SocialLogComponent },
    { path: 'user-type', component: UserTypeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'verify', component: VerificationPageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(landRoutes)],
    exports: [RouterModule]
})

export class LandRoutingModule {}