import { Component, OnInit } from "@angular/core";

import { SharedService } from "../../services/shared.service"
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserModel } from 'src/app/models/user.model';
@Component({
    selector: 'c-sidebar',
    templateUrl: './c-sidebar.component.html',
    styleUrls: ['./c-sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

    sideBarStatus: boolean;
    userId: string;
    userData: UserModel;

    constructor(private sharedService: SharedService,
        private auth: AuthService,
        private firestoreService: FirestoreService) { }

    ngOnInit() {
        this.sharedService.topNavTogBtnClicked.subscribe(
            (status: boolean) => this.sideBarStatus = status
        )

        this.auth.currentUser.subscribe(user => {
            this.userId = user.uid;
            this.firestoreService.getUser(user.uid).subscribe(res => {
                this.userData = res
            })
        })


    }

    hideSideBar() {
        this.sideBarStatus = false;
        this.sharedService.sideBarNavItemClicked.emit(this.sideBarStatus);
        document.querySelector('.offcanvas-collapse').classList.remove('open')
    }

}