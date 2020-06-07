import { NgModule } from "@angular/core";
import { PostDashboardComponent } from './post-dashboard/post-dashboard.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostListItemComponent } from './posts-list/posts-list-item/post-list-item.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentDashboardComponent } from './comment-dashboard/comment-dashboard.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentListItemComponent } from './comment-list/comment-list-item/comment-list-item.component';
import { UpvotesComponent } from './upvotes/upvotes.component';
import { TimelineComponent } from './timeline.component';
import { PostsFilterComponent } from './posts-filter/posts-filter.component';

@NgModule({
    declarations: [
        PostDashboardComponent,
        PostsListComponent,
        TimelineComponent,
        PostListItemComponent,
        CommentDashboardComponent,
        CommentListComponent,
        CommentListItemComponent,
        UpvotesComponent,
        PostsFilterComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule
    ],
    exports: [
        PostDashboardComponent,
        PostsListComponent,
        PostListItemComponent,
        CommentDashboardComponent,
        CommentListComponent,
        CommentListItemComponent,
        UpvotesComponent,
    ]
})

export class TimelineModule {}