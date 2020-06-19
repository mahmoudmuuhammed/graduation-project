import { Component, OnInit } from "@angular/core";

import { SharedService } from "../../services/shared.service"
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
    selector: 'c-topnav',
    templateUrl: './c-topnav.component.html',
    styleUrls: ['./c-topnav.component.scss']
})

export class TopnavComponent implements OnInit {
    navCollabseStatus: boolean = false;
    userName: string = ""
    newNotification: boolean = false;
    userImgUrl: string = '../../../assets/images/DeafultUser.svg'

    constructor(private sharedService: SharedService,
        private authService: AuthService,
        private afAuth: AngularFireAuth,
        private storage: AngularFireStorage) {
        this.sharedService.sideBarNavItemClicked.subscribe((navStatus: boolean) => this.navCollabseStatus = navStatus)
    }

    ngOnInit() {
        this.afAuth.authState.pipe(take(1)).subscribe(user => {
            user ? this.authService.currentUser.subscribe(user => this.userName = user.displayName) : '';
            this.authService.getUserImgLink(user.uid).subscribe(imgUrl => {
                this.userImgUrl = imgUrl
            })
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