import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UsersPreviewComponent } from './users/users.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { PostsPreviewComponent } from './posts/posts.component';
import { UserPreviewComponent } from './user-preview/user-preview.component';

@NgModule({
    declarations: [
        AdminComponent,
        UsersPreviewComponent,
        AddAdminComponent,
        PostsPreviewComponent,
        UserPreviewComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        AdminRoutingModule
    ]
})

export class AdminModule { }