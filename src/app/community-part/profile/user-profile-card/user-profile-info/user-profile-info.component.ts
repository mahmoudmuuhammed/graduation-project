import { Component, Input, OnInit, OnChanges, AfterViewChecked } from "@angular/core";
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'user-profile-info',
    templateUrl: './user-profile-info.component.html',
    styleUrls: ['./user-profile-info.component.scss']
})

export class UserProfileInfoComponent implements OnInit, OnChanges {

    @Input() userData: UserModel
    imgSrc = "../../../../../assets/images//DeafultUser.svg"
    docRate: number[] = [];
    numOfOffStar: number[] = [];

    constructor(private authService: AuthService) { }

    ngOnInit() {
        if (this.userData.userType.usertype == 'Doctor') {
            for (let i = 0; i < this.userData?.userType.rating; i++) {
                this.docRate.push(i)
            }
            for (let i = 0; i < 5 - this.docRate.length; i++) {
                this.numOfOffStar.push(i)
            }
        }
    }

    ngOnChanges() {
        this.authService.getUserImgLink(this.userData.uid).subscribe(res => {
            this.imgSrc = res;
        })
    }
}