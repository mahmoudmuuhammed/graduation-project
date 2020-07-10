import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EditDetailsComponent } from './edit-details.component';
import { EditGeneralDataComponent } from './edit-general-data/edit-general-data.component';
import { EditDocDataComponent } from './edit-doc-data/edit-doc-data.component';
import { EditCollapseDirective } from 'src/app/directives/edit-collapse.directive';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    EditDetailsComponent,
    EditGeneralDataComponent,
    EditDocDataComponent,
    EditCollapseDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [EditDetailsComponent]
})
export class EditDetailsModule { }
