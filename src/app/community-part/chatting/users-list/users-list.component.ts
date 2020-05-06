import { Component, OnInit } from "@angular/core";
import { SharedService } from 'src/app/services/shared.service';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
    selector: 'users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit {
    users: Observable<UserModel[]>;
    currentUser: firebase.User;
    constructor(
        public sharedService: SharedService,
        private fireDb: FirestoreService
    ) {}

    ngOnInit() {
        this.users = this.fireDb.getUsers();
    }    
}