import { Component } from "@angular/core";

import { SideBarToggler } from "../../services/sideBar.service"
@Component({
    selector: 'c-sidebar',
    templateUrl: './c-sidebar.component.html',
    styleUrls: ['./c-sidebar.component.scss']
})

export class SidebarComponent {
    sideBarStatus:boolean;
    constructor(private sidebarToggler: SideBarToggler) {
        this.sidebarToggler.topNavTogBtnClicked.subscribe(
            (status: boolean) => this.sideBarStatus=status
        )
    }

    hideSideBar(){
        this.sideBarStatus=false;
        this.sidebarToggler.sideBarNavItemClicked.emit(this.sideBarStatus);
        document.querySelector('.offcanvas-collapse').classList.remove('open')
    }

}