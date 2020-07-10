import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { CommunityContainerComponent } from './community.component'
import { TimelineComponent } from './timeline/timeline.component';
import { ProfileComponent } from './profile/profile.component';
import { ChattingComponent } from '../community-part/chatting/chatting.component';
import { ChatRoomComponent } from '../community-part/chatting/chat-room/chat-room.component';
import { DoctorPreviewComponent } from './doctor-preview/doctor-preview.component';
import { singlePostComponent } from './post/post.component';
import { EditDetailsComponent } from './profile/edit-details/edit-details.component';
import { EditGuard } from './profile/edit-details/edit.guard'
import { EmergencyComponent } from './emergency/emergency.component';
import { TrustedSelectionComponent } from './trusted-selection/trusted-selection.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';

const communityRoutes: Routes = [
    {
        path: '', component: CommunityContainerComponent, children: [
            { path: '', component: TimelineComponent },
            { path: 'Timeline', component: TimelineComponent },
            { path: 'Post/:postId', component: singlePostComponent },
            { path: 'Emergency/:emergencyId', component: EmergencyComponent },
            {
                path: 'Chat', component: ChattingComponent, children: [
                    { path: ':id', component: ChatRoomComponent }
                ]
            },
            { path: 'Profile/:id', component: ProfileComponent },
            {
                path: 'Profile/:id/edit',
                component: EditDetailsComponent,
                canActivate: [EditGuard]
            },
            { path: 'Doctors', component: DoctorPreviewComponent },
            { path: 'Trusted', component: TrustedSelectionComponent },
            { path: 'Prescription', component: PrescriptionsComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(communityRoutes)],
    exports: [RouterModule]
})

export class communityRoutingModule { }