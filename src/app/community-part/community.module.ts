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
import { TopnavComponent } from './top-nav/c-topnav.component';
import { SidebarComponent } from './sidebar/c-sidebar.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationItemComponent } from './notification/notification-item/notification-item.component';
import { singlePostComponent } from './post/post.component';
import { EmergencyComponent } from './emergency/emergency.component';
import { sideNavDescribtionDirective } from '../directives/sideNavDescription.directive';
import { TrustedSelectionComponent } from './trusted-selection/trusted-selection.component';
import { CurrentTrustedComponent } from './trusted-selection/current-trusted/current-trusted.component';
import { UserListComponent } from './trusted-selection/edit-trusted/edit-trusted.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { PrescriptionItemComponent } from './prescriptions/prescription-item/prescription-item.component';
import { DocRatingComponent } from './doc-rating/doc-rating.component';
import { AdminModule } from './admin/admin.module';

@NgModule({
    declarations: [
        CommunityContainerComponent,
        TopnavComponent,
        SidebarComponent,
        VideoCallComponent,
        NotificationComponent,
        NotificationItemComponent,
        singlePostComponent,
        EmergencyComponent,
        sideNavDescribtionDirective,
        TrustedSelectionComponent,
        CurrentTrustedComponent,
        UserListComponent,
        PrescriptionsComponent,
        PrescriptionItemComponent,
        DocRatingComponent,
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
        AdminModule,
        AngularAgoraRtcModule.forRoot(environment.agoraConfig),
        AgmCoreModule.forRoot(environment.agmConfig)
    ],
    exports: [
        CommunityContainerComponent,
    ],
    providers: []
})

export class CommunityModule { }