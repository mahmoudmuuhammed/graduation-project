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
        ChatsComponent,
        PostandFilterComponent,
        TimelineComponent,
        MsgTimeDirective,
    ],
    imports: [
        CommonModule
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
    ],
    providers:[
        SideBarToggler,
        ShowPostingService,
    ]
})

export class CommunityModule { }