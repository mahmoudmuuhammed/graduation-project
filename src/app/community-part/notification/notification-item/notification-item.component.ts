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
  docImgUrl: string = ''
  notificationText: string = ''
  notificationLink: string = ''

  constructor(private authService: AuthService, private feedsService: FeedsService) { }

  ngOnInit() {
    this.isRead = this.notificationData.read;
    this.authService.getUserImgLink(this.notificationData.from).subscribe(imgUrl => {
      this.docImgUrl = imgUrl
    })

    if(this.notificationData.message=='has commented on your post'){
      this.notificationText = 'has commented on your post'
      this.notificationLink=`/community/Post/${this.notificationData.post_id}`
    }
    else if(this.notificationData.message=='was in danger contact him'){
      this.notificationText = 'was in danger click for more information'
      this.notificationLink=`/community/Emergency/${this.notificationData.emergencyId}`
    }
  }

  changeReadState() {
    const notificationId = this.notificationData.n_id;
    this.authService.currentUser.subscribe(user => {
      this.feedsService.changeNotificationReadState(notificationId, user.uid);
    })
  }
}
