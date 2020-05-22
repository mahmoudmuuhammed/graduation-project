import { Component ,Output} from "@angular/core";

import { SharedService } from "../../services/shared.service"
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'c-topnav',
    templateUrl: './c-topnav.component.html',
    styleUrls: ['./c-topnav.component.scss']
})

export class TopnavComponent {
    navCollabseStatus: boolean = false;
    
    constructor(private sharedService:SharedService,private authService:AuthService){
        this.sharedService.sideBarNavItemClicked.subscribe((navStatus:boolean) => this.navCollabseStatus=navStatus)
    }


    mainNavBtnClick(event) {
        this.navCollabseStatus = !this.navCollabseStatus;
        this.sharedService.topNavTogBtnClicked.emit(this.navCollabseStatus)
    }

    onLogout(){
        this.authService.logout();
    }
}