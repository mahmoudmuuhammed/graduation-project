import { Component ,Output} from "@angular/core";
import {NotificationComponent} from "../notification/notification.component";
import { EventEmitter } from 'protractor';

@Component({
    selector: 'c-topnav',
    templateUrl: './c-topnav.component.html',
    styleUrls: ['./c-topnav.component.scss']
})

export class TopnavComponent {
    //@Output() sideButtonClicked = new EventEmitter();

    navCollabseStatus: boolean = false;
    mainNavBtnClick(event) {
        this.navCollabseStatus = !this.navCollabseStatus;
        //this.sideButtonClicked.emit(event);
    }
}