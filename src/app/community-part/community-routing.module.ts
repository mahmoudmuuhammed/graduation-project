import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { TimelineComponent } from './timeline/timeline.component';
import { ChatsComponent } from './chats/chats.component';

const communityRoutes: Routes = [
    { path: 'timeline', component: TimelineComponent },
    { path: 'ChatsComponent', component: ChatsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(communityRoutes)],
    exports: [RouterModule]
})

export class LandRoutingModule { }