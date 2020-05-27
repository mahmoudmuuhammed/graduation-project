import { Component, Input } from "@angular/core";
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
    selector: 'user-list-item',
    templateUrl: './users-list-item.component.html',
    styleUrls: ['./users-list-item.component.scss']
})

export class UsersListItemComponent {
    @Input() user: UserModel;
    constructor(private router: Router, private sharedService: SharedService) {}

    ngOnInit() {}

    navigate() {
        this.router.navigate(['community/Chat', this.user.uid])
        .then(
            navigated => {
                this.sharedService.closeUsersList();
            }
        )
    }
}