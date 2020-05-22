import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { communityRoutingModule } from './community-routing.module';
import { environment } from '../../environments/environment'
import { AngularAgoraRtcModule } from 'angular-agora-rtc';

import { SidebarComponent } from './sidebar/c-sidebar.component';
import { TopnavComponent } from './top-nav/c-topnav.component';
import { NotificationComponent } from './notification/notification.component';
import { PostComponent } from './post/post.component';
import { DangerAreaComponent } from './danger-area/danger-area.component';
import { CommunityContainerComponent } from './community.component';
import { AddPostComponent } from './add-post/add-post.component';
import { DdColabseDirective } from '../directives/dd-colabse.directive';
import { HeightAdjustDirective } from '../directives/height-adjust.directive';
import { DoctorCommunityController } from './doctor-comm-controller/doc-community.component';
import { DocTopNavComponent } from './doctor-comm-controller/d-top-nav/d-topnav.component';
import { DocSideNavComponent } from './doctor-comm-controller/d-side-nav/d-sidenav.component';
import { GettingStartedComponent } from './getting-started/g-started.component';
import { Chats } from './chats/chats.component';
import { PostandFilterComponent } from './addPost-and-filter/PostAndFilter.component';
//import { TimelineComponent } from './timeline/timeline.component';
import { MsgTimeDirective } from '../directives/msg-time.directive';
import { Profile } from './profile/profile.component';
import { DoctorPreviewComponent } from './doctor-preview/doctor-preview.component';
import { DoctorCardComponent } from './doctor-card/doctor-card.component';
import { CallingComponent } from './callingAlert/callingAlert.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { TimelineModule } from './timeline/timeline.module'


@NgModule({
    declarations: [
        SidebarComponent,
        TopnavComponent,
        NotificationComponent,
        PostComponent,
        DangerAreaComponent,
        CommunityContainerComponent,
        AddPostComponent,
        DdColabseDirective,
        HeightAdjustDirective,
        DoctorCommunityController,
        DocTopNavComponent,
        DocSideNavComponent,
        GettingStartedComponent,
        Chats,
        PostandFilterComponent,
        // TimelineComponent,
        MsgTimeDirective,
        Profile,
        DoctorPreviewComponent,
        DoctorCardComponent,
        CallingComponent,
        VideoCallComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        communityRoutingModule,
        AngularAgoraRtcModule.forRoot(environment.agoraConfig),
        TimelineModule,
    ],
    exports: [
        SidebarComponent,
        TopnavComponent,
        NotificationComponent,
        PostComponent,
        DangerAreaComponent,
        CommunityContainerComponent,
        AddPostComponent,
        DdColabseDirective,
        DoctorCommunityController,
        Profile,
    ],
    providers: [
    ]
})

export class CommunityModule { }