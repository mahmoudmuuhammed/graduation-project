import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
    selector: 'user-profile-card',
    templateUrl: './user-profile-card.component.html',
    styleUrls: ['./user-profile-card.component.scss']
})

export class UserProfileCardComponent implements  OnChanges {

    userData: UserModel
    @Input() userId;

    constructor(private authService: AuthService,
        private firestore: FirestoreService,
        private activeRoute: ActivatedRoute) { }

    ngOnChanges() {
        this.firestore.getUser(this.userId).pipe(take(1)).subscribe(res => {
            this.userData = res
        })
    }

}