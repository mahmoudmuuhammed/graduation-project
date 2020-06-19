import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { DoctorPreviewComponent } from './doctor-preview.component';
import { DoctorCardComponent } from './doctor-card/doctor-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedCommunityModule } from '../Shared/sharedCommunity.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        DoctorPreviewComponent,
        DoctorCardComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        SharedCommunityModule,
        RouterModule
    ],
    exports: [
        DoctorCardComponent
    ]
})

export class DoctorPreviewModule { }