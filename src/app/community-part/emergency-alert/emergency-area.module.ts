import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmergencyAreaComponent } from './emergency-area.component';
import { EmergencyButtonComponent } from './emergency-button/emergency-button.component';
import { TrustedComponent } from './trusted/trusted.component'
import { EmergenctBtnDirective } from 'src/app/directives/emergency-btn.directive';

@NgModule({
  declarations: [
    EmergencyAreaComponent,
    EmergencyButtonComponent,
    TrustedComponent,
    EmergenctBtnDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[EmergencyAreaComponent]
})
export class EmergencyAreaModule { }
