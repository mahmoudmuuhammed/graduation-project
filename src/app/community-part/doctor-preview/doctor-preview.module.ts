import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { DoctorPreviewComponent } from './doctor-preview.component';
import { DoctorCardComponent } from './doctor-card/doctor-card.component';

@NgModule({
    declarations: [
        DoctorPreviewComponent,
        DoctorCardComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DoctorCardComponent
    ]
})

export class DoctorPreviewModule {}