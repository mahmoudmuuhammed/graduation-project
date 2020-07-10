import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment'

import { AgmCoreModule } from '@agm/core'
import { SharedModule } from 'src/app/shared/shared.module';
import { NgPaymentCardModule } from 'ng-payment-card';

import { PostsListComponent } from './posts-list/posts-list.component';
import { PostListItemComponent } from './posts-list/posts-list-item/post-list-item.component';
import { CommentDashboardComponent } from './comment-dashboard/comment-dashboard.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentListItemComponent } from './comment-list/comment-list-item/comment-list-item.component';
import { UpvotesComponent } from './upvotes/upvotes.component';
import { DoctorBookingComponent } from './doctor-booking/doctor-booking.component';
import { EmergencyAlertComponent } from './emergency-alert/emergency-alert.component';
import { CallingComponent } from './callingAlert/callingAlert.component';
import { PrescriptionDashboardComponent } from './prescription-dashboard/prescription-dashboard.component';


@NgModule({
    declarations: [
        PostsListComponent,
        PostListItemComponent,
        CommentDashboardComponent,
        CommentListComponent,
        CommentListItemComponent,
        UpvotesComponent,
        DoctorBookingComponent,
        EmergencyAlertComponent,
        CallingComponent,
        PrescriptionDashboardComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
        NgPaymentCardModule,
        AgmCoreModule.forRoot(environment.agmConfig)
    ],
    exports: [
        PostsListComponent,
        PostListItemComponent,
        CommentDashboardComponent,
        CommentListComponent,
        CommentListItemComponent,
        UpvotesComponent,
        DoctorBookingComponent,
        CallingComponent,
        EmergencyAlertComponent,
        PrescriptionDashboardComponent
    ],
})

export class SharedCommunityModule { }