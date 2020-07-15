import { Component, OnInit, Input } from '@angular/core';
import { TraditionalNotification } from 'src/app/models/callNotification.model';

@Component({
  selector: 'notification-alert',
  templateUrl: './notification-alert.component.html',
  styleUrls: ['./notification-alert.component.scss']
})
export class NotificationAlertComponent implements OnInit {

  @Input() NotificationData: TraditionalNotification

  constructor() { }

  ngOnInit(): void {
  }

}
