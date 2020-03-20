import { NgModule } from "@angular/core";
import { FormsValidationComponent } from './forms-validation/forms-validation.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MedkitLogoComponent } from './medkit-logo/mk-logo.component';

@NgModule({
    declarations: [
        FormsValidationComponent,
        LoadingSpinnerComponent,
        NotFoundComponent,
        MedkitLogoComponent
    ],
    exports: [
        FormsValidationComponent,
        LoadingSpinnerComponent,
        NotFoundComponent,
        MedkitLogoComponent
    ]
})

export class SharedModule {}