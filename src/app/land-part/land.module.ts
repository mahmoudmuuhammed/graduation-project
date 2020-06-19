import { NgModule } from "@angular/core";
import { AuthModule } from './auth/auth.module';
import { HomePageComponent } from './home/home.component';
import { LandRoutingModule } from './land-routing.module';
import { HomeTopNavComponent } from './home/home-top-nav/home-top-nav.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        HomePageComponent,
        HomeTopNavComponent,
    ],
    imports: [
        AuthModule,
        LandRoutingModule,
        SharedModule
    ],
    exports: [
        AuthModule
    ]
})

export class LandModule { }