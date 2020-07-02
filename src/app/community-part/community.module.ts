import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { AngularAgoraRtcModule, AgoraConfig } from 'angular-agora-rtc';

import { communityRoutingModule } from './community-routing.module';
import { ProfileModule } from './profile/profile.module';
import { ChattingModule } from './chatting/chatting.module';
import { SharedModule } from '../shared/shared.module';
import { TimelineModule } from './timeline/timeline.module';
import { EmergencyAreaModule } from './emergency-alert/emergency-area.module';
import { SharedCommunityModule } from './Shared/sharedCommunity.module';
import { EditDetailsModule } from './profile/edit-details/edit-details.module';
import { environment } from 'src/environments/environment';
import { DoctorPreviewModule } from './doctor-preview/doctor-preview.module';
import { AgmCoreModule } from '@agm/core'

import { CommunityContainerComponent } from './community.component';
import { CommunitySidebarComponent } from './community-sidebar/community-sidebar.component';
import { CommunityTopnavComponent } from './community-topnav/community-topnav.component';
import { TopnavComponent } from './top-nav/c-topnav.component';
import { SidebarComponent } from './sidebar/c-sidebar.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationItemComponent } from './notification/notification-item/notification-item.component';
import { singlePostComponent } from './post/post.component';
import { EmergencyComponent } from './emergency/emergency.component';

@NgModule({
    declarations: [
        CommunityContainerComponent,
        CommunitySidebarComponent,
        CommunityTopnavComponent,
        TopnavComponent,
        SidebarComponent,
        VideoCallComponent,
        NotificationComponent,
        NotificationItemComponent,
        singlePostComponent,
        EmergencyComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        communityRoutingModule,
        TimelineModule,
        ProfileModule,
        ChattingModule,
        DoctorPreviewModule,
        SharedCommunityModule,
        EmergencyAreaModule,
        EditDetailsModule,
        AngularAgoraRtcModule.forRoot(environment.agoraConfig),
        AgmCoreModule.forRoot(environment.agmConfig)
    ],
    exports: [
        CommunityContainerComponent,
    ],
    providers:[]
})

export class CommunityModule { }