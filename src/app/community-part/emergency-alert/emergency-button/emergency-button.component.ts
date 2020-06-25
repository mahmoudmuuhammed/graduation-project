import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmegencyService } from 'src/app/services/emergency.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'emergency-button',
  templateUrl: './emergency-button.component.html',
  styleUrls: ['./emergency-button.component.scss']
})
export class EmergencyButtonComponent implements OnInit {

  constructor(private emergencyAlert:EmegencyService) { }

  ngOnInit(): void {
  }

  onSendEmergencyAlert() {
    this.emergencyAlert.sendEmergencyAlert().pipe(take(1)).subscribe()
  }

}
