import { NgModule } from "@angular/core";
import { SidebarComponent } from './sidebar/c-sidebar.component';
import { TopnavComponent } from './top-nav/c-topnav.component';
import { NotificationComponent } from './notification/notification.component';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';

@NgModule({
    declarations: [
        SidebarComponent,
        TopnavComponent,
        NotificationComponent,
        PostComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SidebarComponent,
        TopnavComponent,
        NotificationComponent,
        PostComponent
    ]
})

export class CommunityModule {}