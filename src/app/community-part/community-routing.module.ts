import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { CommunityContainerComponent } from './community.component'
import { TimelineComponent } from './timeline/timeline.component';
import { Profile } from './profile/profile.component';
import { Chats } from './chats/chats.component';
import { ChattingComponent } from './chatting/chatting.component';
import { ChatRoomComponent } from './chatting/chat-room/chat-room.component';

const communityRoutes: Routes = [
    {
        path: '', component: CommunityContainerComponent, children: [
            { path: '', component: TimelineComponent },
            { path: 'Timeline', component: TimelineComponent },
            // { path: 'Chats', component: ChattingComponent },
            { path: 'Profile', component: Profile },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(communityRoutes)],
    exports: [RouterModule]
})

export class communityRoutingModule { }