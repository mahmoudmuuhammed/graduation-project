import { Component, OnInit ,Output, EventEmitter} from "@angular/core";
import { FeedsService } from 'src/app/services/feeds.service';
import { Observable } from 'rxjs';
import { Notification } from '../../models/notification.model'
import { AngularFireAuth } from '@angular/fire/auth';
import { SharedService } from 'src/app/services/shared.service';

@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements OnInit {
    notifications: Observable<Notification[]>;
    noNotification: boolean = true;

    constructor(private feedsService: FeedsService,
         private afAuth: AngularFireAuth,
         private sharedService:SharedService) { }

    ngOnInit() {
        this.afAuth.auth.onAuthStateChanged(user => {
            if (user) {
                this.notifications = this.feedsService.getNotifications(user.uid);
                this.notifications.subscribe(notificationList => {
                    notificationList.length > 0 ? this.noNotification = false : ''
                    for(var i =0;i<notificationList.length;i++){}
                    notificationList.forEach((item) => {
                        if(item.read==false){
                            this.sharedService.newNotification.emit(true);
                        }
                    })
                })
            }
        })
    };
}