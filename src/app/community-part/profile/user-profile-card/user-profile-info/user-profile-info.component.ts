import { Component, Input, OnInit, OnChanges, AfterViewChecked } from "@angular/core";
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'user-profile-info',
    templateUrl: './user-profile-info.component.html',
    styleUrls: ['./user-profile-info.component.scss']
})

export class UserProfileInfoComponent implements OnChanges {

    @Input() userData: UserModel
    imgSrc = "../../../../../assets/images//DeafultUser.svg"

    constructor(private authService: AuthService) { }
    
    ngOnChanges(){
        this.authService.getUserImgLink(this.userData.uid).subscribe(res => {
            this.imgSrc = res;
        })
    }
}