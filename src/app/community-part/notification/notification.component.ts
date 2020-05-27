import { Component, OnInit } from "@angular/core";
import { FeedsService } from 'src/app/services/feeds.service';
import { Observable } from 'rxjs';
import { Notification } from '../../models/notification.model'
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements OnInit {
    notifications: Observable<Notification[]>;
    constructor(private feedsService: FeedsService,
        private afAuth:AngularFireAuth) { }

    ngOnInit() {
        this.afAuth.auth.onAuthStateChanged(user=>{
            if(user){
                this.notifications = this.feedsService.getNotifications(user.uid);
            }
        })
    };
}