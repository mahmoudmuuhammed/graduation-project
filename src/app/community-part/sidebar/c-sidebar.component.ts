import { Component } from "@angular/core";

import { SharedService } from "../../services/shared.service"
@Component({
    selector: 'c-sidebar',
    templateUrl: './c-sidebar.component.html',
    styleUrls: ['./c-sidebar.component.scss']
})

export class SidebarComponent {
    sideBarStatus:boolean;
    constructor(private sharedService: SharedService) {
        this.sharedService.topNavTogBtnClicked.subscribe(
            (status: boolean) => this.sideBarStatus=status
        )
    }

    hideSideBar(){
        this.sideBarStatus=false;
        this.sharedService.sideBarNavItemClicked.emit(this.sideBarStatus);
        document.querySelector('.offcanvas-collapse').classList.remove('open')
    }

}