import { Component, OnInit, Input } from '@angular/core';

import { Notification } from '../../../models/notification.model'
import { AuthService } from 'src/app/services/auth.service';
import { FeedsService } from 'src/app/services/feeds.service';

@Component({
  selector: 'notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit {
  @Input() notificationData: Notification;
  isRead: boolean = false;
  constructor(private authService:AuthService,private feedsService:FeedsService) { }

  ngOnInit() {
    this.isRead = this.notificationData.read;
  }

  changeReadState() {
    const notificationId = this.notificationData.n_id;
    const userId=this.authService.currentUser.uid;
    this.feedsService.changeNotificationReadState(notificationId,userId);
  }
}
