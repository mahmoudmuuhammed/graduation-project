import { Component, OnInit } from "@angular/core";

import { SharedService } from "../../services/shared.service"
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';
@Component({
    selector: 'c-sidebar',
    templateUrl: './c-sidebar.component.html',
    styleUrls: ['./c-sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

    sideBarStatus: boolean;
    userId: string

    constructor(private sharedService: SharedService,
        private auth: AuthService) { }

    ngOnInit() {
        this.sharedService.topNavTogBtnClicked.subscribe(
            (status: boolean) => this.sideBarStatus = status
        )

        this.auth.currentUser.subscribe(user => {
            this.userId = user.uid;
        })
    }

    hideSideBar() {
        this.sideBarStatus = false;
        this.sharedService.sideBarNavItemClicked.emit(this.sideBarStatus);
        document.querySelector('.offcanvas-collapse').classList.remove('open')
    }

}