import { NgModule } from "@angular/core";
import { AuthModule } from './auth/auth.module';
import { HomePageComponent } from './home/home.component';
import { BlogPageComponent } from './blog/blog.component';
import { DonationPageComponent } from './donation/donation.component';
import { BlogNavComponent } from './blog/blog-nav/blog-nav.component';
import { LandRoutingModule } from './land-routing.module';

@NgModule({
    declarations: [
        HomePageComponent,
        BlogPageComponent,
        BlogNavComponent,
        DonationPageComponent
    ],
    imports: [
        AuthModule,
        LandRoutingModule
    ],
    exports: [
        AuthModule,
        HomePageComponent,
        BlogPageComponent,
        BlogNavComponent,
        DonationPageComponent,
    ]
})

export class LandModule {}