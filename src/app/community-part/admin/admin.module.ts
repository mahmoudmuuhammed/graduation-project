import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UsersPreviewComponent } from './users/users.component';
import { PostsPreviewComponent } from './posts/posts.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { PostPreviewComponent } from './post-preview/post-preview.component';

@NgModule({
    declarations: [
        AdminComponent,
        UsersPreviewComponent,
        PostsPreviewComponent,
        AddAdminComponent,
        PostPreviewComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        AdminRoutingModule
    ]
})

export class AdminModule { }