import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { communityRoutingModule } from './community-routing.module';
import { ProfileModule } from './profile/profile.module';
import { ChattingModule } from './chatting/chatting.module';
import { SharedModule } from '../shared/shared.module';
import { TimelineModule } from './timeline/timeline.module';

import { CommunityContainerComponent } from './community.component';
import { CommunitySidebarComponent } from './community-sidebar/community-sidebar.component';
import { CommunityTopnavComponent } from './community-topnav/community-topnav.component';
import { DoctorPreviewModule } from './doctor-preview/doctor-preview.module';
import { TopnavComponent } from './top-nav/c-topnav.component';
import { SidebarComponent } from './sidebar/c-sidebar.component';
import { CallingComponent } from './callingAlert/callingAlert.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationItemComponent } from './notification/notification-item/notification-item.component';


@NgModule({
    declarations: [
        CommunityContainerComponent,
        CommunitySidebarComponent,
        CommunityTopnavComponent,
        TopnavComponent,
        SidebarComponent,
        CallingComponent,
        VideoCallComponent,
        NotificationComponent,
        NotificationItemComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        communityRoutingModule,
        TimelineModule,
        ProfileModule,
        ChattingModule,
        DoctorPreviewModule
    ],
    exports: [
        CommunityContainerComponent
    ],
    providers:[]
})

export class CommunityModule { }