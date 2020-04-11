import { NgModule } from "@angular/core";
import { SidebarComponent } from './sidebar/c-sidebar.component';
import { TopnavComponent } from './top-nav/c-topnav.component';
import { NotificationComponent } from './notification/notification.component';
import { CommonModule } from '@angular/common';
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
import { SharedModule } from '../shared/shared.module';
import { SideBarToggler } from '../services/sideBar.service';
import { ShowPostingService } from '../services/showPosting.service';
import { ChatsComponent } from './chats/chats.component';
import { PostandFilterComponent } from './addPost-and-filter/PostAndFilter.component';
import { TimelineComponent } from './timeline/timeline.component';
import { MsgTimeDirective } from '../directives/msg-time.directive';

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
        GettingStartedComponent
        ChatsComponent,
        PostandFilterComponent,
        TimelineComponent,
        MsgTimeDirective,
    ],
    imports: [
        CommonModule,
        SharedModule
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
        DoctorCommunityController
    ],
    providers:[
        SideBarToggler,
        ShowPostingService,
    ]
})

export class CommunityModule { }