import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { PostsListComponent } from './posts-list/posts-list.component';
import { PostListItemComponent } from './posts-list/posts-list-item/post-list-item.component';
import { CommentDashboardComponent } from './comment-dashboard/comment-dashboard.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentListItemComponent } from './comment-list/comment-list-item/comment-list-item.component';
import { UpvotesComponent } from './upvotes/upvotes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DoctorBookingComponent } from './doctor-booking/doctor-booking.component';
import { NgPaymentCardModule } from 'ng-payment-card';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        PostsListComponent,
        PostListItemComponent,
        CommentDashboardComponent,
        CommentListComponent,
        CommentListItemComponent,
        UpvotesComponent,
        DoctorBookingComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
        NgPaymentCardModule
    ],
    exports: [
        PostsListComponent,
        PostListItemComponent,
        CommentDashboardComponent,
        CommentListComponent,
        CommentListItemComponent,
        UpvotesComponent,
        DoctorBookingComponent
    ],
})

export class SharedCommunityModule { }