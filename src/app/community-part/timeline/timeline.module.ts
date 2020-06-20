import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { SharedCommunityModule } from '../Shared/sharedCommunity.module';
import { PostDashboardComponent } from './post-dashboard/post-dashboard.component';
import { TimelineComponent } from './timeline.component';
import { PostsFilterComponent } from './posts-filter/posts-filter.component';

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
    ]
})

export class TimelineModule {}