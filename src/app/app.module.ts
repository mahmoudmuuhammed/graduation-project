import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core.module';
import { LandModule } from './land-part/land.module';
import { CommunityModule } from './community-part/community.module';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChattingModule } from './community-part/chatting/chatting.module';
import { HttpClientModule } from '@angular/common/http';

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
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ChattingModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent,]
})
export class AppModule { }
