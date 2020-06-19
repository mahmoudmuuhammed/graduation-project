import { NgModule } from "@angular/core";
import { PostDashboardComponent } from './post-dashboard/post-dashboard.component';

import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { TimelineComponent } from './timeline.component';
import { PostsFilterComponent } from './posts-filter/posts-filter.component';
import { SharedCommunityModule } from '../Shared/sharedCommunity.module';

@NgModule({
    declarations: [
        PostDashboardComponent,
        TimelineComponent,
        PostsFilterComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        SharedCommunityModule
    ],
    exports: [
        PostDashboardComponent,
    ]
})

export class TimelineModule {}