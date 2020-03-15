import { Component } from "@angular/core";
import {NotificationComponent} from "../notification/notification.component";

@Component({
    selector: 'c-topnav',
    templateUrl: './c-topnav.component.html',
    styleUrls: ['./c-topnav.component.scss']
})

export class TopnavComponent {
    showNotification: boolean = false;


    onShowNotificationToggle() {
        this.showNotification = !this.showNotification;
    }


    navCollabseStatus: boolean = false;
    mainNavBtnClick() {
        this.navCollabseStatus = !this.navCollabseStatus;
    }
}