import { NgModule } from "@angular/core";
import { FormsValidationComponent } from './forms-validation/forms-validation.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
    declarations: [
        FormsValidationComponent,
        LoadingSpinnerComponent
    ],
    exports: [
        FormsValidationComponent,
        LoadingSpinnerComponent
    ]
})

export class SharedModule {}