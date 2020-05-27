import { NgModule } from "@angular/core";
import { AuthModule } from './auth/auth.module';
import { HomePageComponent } from './home/home.component';
import { LandRoutingModule } from './land-routing.module';
import { HomeTopNavComponent } from './home-top-nav/home-top-nav.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { DonationComponent } from './donation/donation.component';
import { NgPaymentCardModule } from 'ng-payment-card';

@NgModule({
    declarations: [
        HomePageComponent,
        HomeTopNavComponent,
        HomeFooterComponent,
        DonationComponent,
    ],
    imports: [
        AuthModule,
        LandRoutingModule,
        NgPaymentCardModule,
    ],
    exports: [
        AuthModule,
        HomePageComponent,
        HomeTopNavComponent,
        HomeFooterComponent,
        DonationComponent,
    ]
})

export class LandModule { }