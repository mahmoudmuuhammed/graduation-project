import { Component, OnInit, Input } from '@angular/core';

import { Notification } from '../../../models/notification.model'

@Component({
  selector: 'notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit {
  @Input() notificationData: Notification;
  constructor() { }

  ngOnInit(): void {
  }

}
