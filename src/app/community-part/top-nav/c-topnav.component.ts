import { Component } from "@angular/core";

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
}