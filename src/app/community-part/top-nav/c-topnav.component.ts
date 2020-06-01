import { Component, OnInit } from "@angular/core";

import { SharedService } from "../../services/shared.service"
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'c-topnav',
    templateUrl: './c-topnav.component.html',
    styleUrls: ['./c-topnav.component.scss']
})

export class TopnavComponent implements OnInit {
    navCollabseStatus: boolean = false;
    userName: string = ""
    newNotification: boolean = false;

    constructor(private sharedService: SharedService,
        private authService: AuthService,
        private afAuth: AngularFireAuth) {
        this.sharedService.sideBarNavItemClicked.subscribe((navStatus: boolean) => this.navCollabseStatus = navStatus)
    }

    ngOnInit() {
        this.afAuth.authState.subscribe(user => {
            user ? this.authService.currentUser.subscribe(user => this.userName = user.displayName) : ''
        })
        this.sharedService.newNotification.subscribe(res => {
            this.newNotification = res;
        })
    }

    mainNavBtnClick(event) {
        this.navCollabseStatus = !this.navCollabseStatus;
        this.sharedService.topNavTogBtnClicked.emit(this.navCollabseStatus)
    }

    showNotification() {
        this.sharedService.newNotification.emit(false);
    }

    onLogout() {
        this.authService.logout();
    }
}