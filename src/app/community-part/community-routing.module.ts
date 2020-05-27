import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { CommunityContainerComponent } from './community.component'
import { TimelineComponent } from './timeline/timeline.component';
import { DoctorPreviewComponent } from './doctor-preview/doctor-preview.component';

const communityRoutes: Routes = [
    {
        path: '', component: CommunityContainerComponent, children: [
            { path: '', component: TimelineComponent },
            { path: 'Timeline', component: TimelineComponent },
            // { path: 'Chats', component: ChattingComponent },
            { path: 'Doctors', component: DoctorPreviewComponent },
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(communityRoutes)],
    exports: [RouterModule]
})

export class communityRoutingModule { }