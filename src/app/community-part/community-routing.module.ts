import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { CommunityContainerComponent } from './community.component'
import { TimelineComponent } from './timeline/timeline.component';
import { ProfileComponent } from './profile/profile.component';
import { ChattingComponent } from '../community-part/chatting/chatting.component';
import { ChatRoomComponent } from '../community-part/chatting/chat-room/chat-room.component';
import { DoctorPreviewComponent } from './doctor-preview/doctor-preview.component';
import { singlePostComponent } from './post/post.component';

const communityRoutes: Routes = [
    {
        path: '', component: CommunityContainerComponent, children: [
            { path: 'Timeline', component: TimelineComponent },
            { path: 'Post/:postId', component: singlePostComponent },
            {
                path: 'Chat', component: ChattingComponent, children: [
                    { path: ':id', component: ChatRoomComponent }
                ]
            },
            { path: 'Profile', component: ProfileComponent },
            { path: 'Doctors', component: DoctorPreviewComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(communityRoutes)],
    exports: [RouterModule]
})

export class communityRoutingModule { }