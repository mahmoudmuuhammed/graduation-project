import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core.module';
import { LandModule } from './land-part/land.module';
import { CommunityModule } from './community-part/community.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    LandModule,
    CommunityModule,
    SharedModule,
  ],
  bootstrap: [AppComponent,]
})
export class AppModule { }
