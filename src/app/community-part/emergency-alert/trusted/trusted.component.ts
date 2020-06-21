import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'trusted-people',
  templateUrl: './trusted.component.html',
  styleUrls: ['./trusted.component.scss']
})
export class TrustedComponent implements OnInit {

  deafultImgLink: string = '../../../../assets/images/DeafultUser.svg';
  userId: string;
  trustedUsers: UserModel[] = [];
  usersMap = new Map();

  constructor(private profileService: ProfileService, private authService: AuthService) { }

  ngOnInit() {
    this.loadTrusted();
    this.profileService.newTrustedUserSubject.subscribe(() => this.loadTrusted())
    this.profileService.removeTrustedUserSubject.subscribe(() => this.loadTrusted())
  }

  loadTrusted() {
    this.authService.currentUser.subscribe(currentUser => {
      this.userId = currentUser.uid

      this.profileService.getUser(currentUser.uid).pipe(take(1)).subscribe(currentUserData => {

        this.trustedUsers = [];
        currentUserData.trusted.forEach(userId => {
          this.profileService.getUser(userId).pipe(take(1)).subscribe((res: UserModel) => {
            this.trustedUsers.push(res)
          })
            .add(() => {
              this.trustedUsers.forEach(user => {
                this.authService.getUserImgLink(user.uid).subscribe(imgLink => {
                  this.usersMap.set(user.uid, imgLink)
                })
              });
            })
        })
      })
    })
  }

}
