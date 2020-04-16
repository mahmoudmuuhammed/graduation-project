import { Component ,Output} from "@angular/core";

import { SideBarToggler } from "../../services/sideBar.service"

@Component({
    selector: 'c-topnav',
    templateUrl: './c-topnav.component.html',
    styleUrls: ['./c-topnav.component.scss']
})

export class TopnavComponent {
    navCollabseStatus: boolean = false;
    
    constructor(private sidebarToggler:SideBarToggler){
        this.sidebarToggler.sideBarNavItemClicked.subscribe((navStatus:boolean) => this.navCollabseStatus=navStatus)
    }


    mainNavBtnClick(event) {
        this.navCollabseStatus = !this.navCollabseStatus;
        this.sidebarToggler.topNavTogBtnClicked.emit(this.navCollabseStatus)
    }
}