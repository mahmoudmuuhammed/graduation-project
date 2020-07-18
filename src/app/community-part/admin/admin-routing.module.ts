import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersPreviewComponent } from './users/users.component';
import { PostsPreviewComponent } from './posts/posts.component';
import { AddAdminComponent } from './add-admin/add-admin.component';

const adminRoutes: Routes = [
    {
        path: '', component: AdminComponent, children: [
            { path: '', component: UsersPreviewComponent },
            { path: 'Users', component: UsersPreviewComponent },
            { path: 'Posts', component: PostsPreviewComponent },
            { path: 'Add', component: AddAdminComponent },
           
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }