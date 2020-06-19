import { Component, Input } from "@angular/core";
import { UserModel } from 'src/app/models/user.model';

@Component({
    selector: 'user-profile-data',
    templateUrl: './user-profile-data.component.html',
    styleUrls: ['./user-profile-data.component.scss']
})

export class UserProfileDataComponent {

    @Input() userData: UserModel

    constructor() { }

    ngOnInit(): void {
    }

}