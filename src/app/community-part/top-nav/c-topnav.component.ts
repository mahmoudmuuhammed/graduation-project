import { Component ,Output} from "@angular/core";

import { SideBarToggler } from "../../services/sideBar.service"

@Component({
    selector: 'c-topnav',
    templateUrl: './c-topnav.component.html',
    styleUrls: ['./c-topnav.component.scss']
})

export class TopnavComponent {
    
    constructor(private sidebarToggler:SideBarToggler){}


    navCollabseStatus: boolean = false;
    mainNavBtnClick(event) {
        this.navCollabseStatus = !this.navCollabseStatus;
        this.sidebarToggler.topNavTogBtnClicked.emit(this.navCollabseStatus)
    }
}