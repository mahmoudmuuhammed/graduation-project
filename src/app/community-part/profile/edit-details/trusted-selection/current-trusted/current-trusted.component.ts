import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserModel } from 'src/app/models/user.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'current-trusted',
  templateUrl: './current-trusted.component.html',
  styleUrls: ['./current-trusted.component.scss']
})
export class CurrentTrustedComponent implements OnInit {

  trustedUsers: UserModel[] = []
  usersMap = new Map();
  deafultImgLink: string = '../../../../../../assets/images/DeafultUser.svg'

  constructor(private authService: AuthService,
    private firestore: FirestoreService,
    private profileService: ProfileService,
    private render: Renderer2,) { }

  ngOnInit() {
    this.getTrustedUsersData();
    this.profileService.newTrustedUserSubject.subscribe(() => {
      this.getTrustedUsersData();
    })
  }

  getTrustedUsersData() {

    this.trustedUsers = []
    this.authService.currentUser.subscribe(currentUser => {
      this.firestore.getUser(currentUser.uid).pipe(take(1)).subscribe(currentUserData => {

        currentUserData.trusted.forEach(userId => {
          this.firestore.getUser(userId).pipe(take(1)).subscribe(res => {
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

  onRemoveFromTrusted(event) {
    this.profileService.removeTrustedUser(event.target.value).then(() => {
      this.render.setStyle(event.target.parentElement.parentElement, 'display', 'none')
    })
      .then(() => this.profileService.removeTrustedUserSubject.next())
      .then(() => this.trustedUsers.length--)
  }
}
