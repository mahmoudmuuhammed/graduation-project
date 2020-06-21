import { Component, OnInit } from "@angular/core";

import { SharedService } from "../../services/shared.service"
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
    selector: 'c-topnav',
    templateUrl: './c-topnav.component.html',
    styleUrls: ['./c-topnav.component.scss']
})

export class TopnavComponent implements OnInit {
    navCollabseStatus: boolean = false;
    newNotification: boolean = false;
    userName: string = "";
    userImgUrl: string = '../../../assets/images/DeafultUser.svg';
    userId: string = '';

    constructor(private sharedService: SharedService,
        private authService: AuthService,
        private afAuth: AngularFireAuth,
        private profileService: ProfileService) {
    }

    ngOnInit() {
        this.afAuth.authState.pipe(take(1)).subscribe(user => {
            this.authService.currentUser.subscribe(user => {
                this.userName = user.displayName
                this.userId = user.uid
            });
            this.authService.getUserImgLink(user.uid).subscribe(imgUrl => {
                this.userImgUrl = imgUrl
            })
        })

        this.sharedService.newNotification.subscribe(res => {
            this.newNotification = res;
        })

        this.sharedService.sideBarNavItemClicked.subscribe((navStatus: boolean) => this.navCollabseStatus = navStatus)

        this.profileService.photoChangedSubject.subscribe(() => {
            this.afAuth.authState.pipe(take(1)).subscribe(user => {
                this.authService.getUserImgLink(user.uid).subscribe(res => this.userImgUrl = res)
            })
        })

        this.profileService.nameChangedSubject.subscribe(() => {
            this.afAuth.authState.pipe(take(1)).subscribe(user => {
                this.userName = user.displayName
            })
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