import { NgModule } from "@angular/core";
import { FormsValidationComponent } from './forms-validation/forms-validation.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MedkitLogoComponent } from './medkit-logo/mk-logo.component';
import { LandRoutingModule } from '../land-part/land-routing.module';
import { EmojiComponent } from './emoji-component/emoji.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UploadingComponent } from './uploading-component/uploading.component';
import { DdColabseDirective } from '../directives/dd-colabse.directive';

@NgModule({
    declarations: [
        FormsValidationComponent,
        LoadingSpinnerComponent,
        NotFoundComponent,
        MedkitLogoComponent,
        EmojiComponent,
        UploadingComponent,
        DdColabseDirective
    ],
    imports: [ LandRoutingModule, HttpClientModule, CommonModule ],
    exports: [
        FormsValidationComponent,
        LoadingSpinnerComponent,
        NotFoundComponent,
        MedkitLogoComponent,
        EmojiComponent,
        UploadingComponent,
        DdColabseDirective
    ]
})

export class SharedModule {}