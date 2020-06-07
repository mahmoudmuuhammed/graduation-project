import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { DoctorPreviewComponent } from './doctor-preview.component';
import { DoctorCardComponent } from './doctor-card/doctor-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgPaymentCardModule } from 'ng-payment-card';
import { DoctorBookingComponent } from './doctor-booking/doctor-booking.component';

@NgModule({
    declarations: [
        DoctorPreviewComponent,
        DoctorCardComponent,
        DoctorBookingComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        NgPaymentCardModule
    ],
    exports: [
        DoctorCardComponent
    ]
})

export class DoctorPreviewModule { }