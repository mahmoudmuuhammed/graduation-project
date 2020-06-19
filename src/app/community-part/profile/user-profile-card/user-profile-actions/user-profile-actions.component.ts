import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'user-profile-actions',
  templateUrl: './user-profile-actions.component.html',
  styleUrls: ['./user-profile-actions.component.scss']
})

export class UserProfileActionsComponent implements OnChanges {

  @Input() userData: UserModel

  isCurrentUser: boolean = false
  isDoctor: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnChanges() {
    this.authService.currentUser.subscribe(user => {
      this.isCurrentUser = user.uid == this.userData.uid ? true : false;
    })

    this.isDoctor = this.userData.userType.usertype == "Doctor" ? true : false;
  }

}