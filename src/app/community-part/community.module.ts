import { NgModule } from "@angular/core";
import { SidebarComponent } from './sidebar/c-sidebar.component';
import { TopnavComponent } from './top-nav/c-topnav.component';
import { NotificationComponent } from './notification/notification.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        SidebarComponent,
        TopnavComponent,
        NotificationComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SidebarComponent,
        TopnavComponent,
        NotificationComponent
    ]
})

export class CommunityModule {}