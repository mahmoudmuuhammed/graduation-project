import { Component, OnChanges, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { take } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'edit-trusted',
  templateUrl: './edit-trusted.component.html',
  styleUrls: ['./edit-trusted.component.scss']
})
export class UserListComponent implements OnInit {

  filterdUsers: UserModel[] = []
  deafultImgSrc = '../../../../../../assets//images/DeafultUser.svg'
  usersMap = new Map();
  currentTrustedUsers: string[] = [];
  @ViewChild('userList') userList;

  constructor(private profileService: ProfileService,
    private authService: AuthService,
    private render: Renderer2) { }

  ngOnInit() {
    this.getAllUsers();
    this.profileService.removeTrustedUserSubject.subscribe(() => this.getAllUsers())
  }

  getAllUsers() {
    this.authService.currentUser.subscribe(currentUser => {

      //get all users
      this.profileService.getUsers().pipe(take(1)).subscribe(allUsers => {

        //get current user data
        this.profileService.getUser(currentUser.uid).pipe(take(1)).subscribe(userData => {
          this.currentTrustedUsers = userData.trusted

          this.filterdUsers = []

          //check for existance trusted
          if (typeof this.currentTrustedUsers == 'undefined') {
            this.filterdUsers = allUsers
            //disable adding new user after reach 3 for trusted
          }

          else {
            this.currentTrustedUsers.length == 3 ?
              this.render.addClass(this.userList.nativeElement, 'disabled') :
              this.render.removeClass(this.userList.nativeElement, 'disabled')

            //filter user (not exist in trusted or not the current user)
            allUsers.forEach((element) => {
              if (!this.currentTrustedUsers.includes(element.uid) && element.uid != currentUser.uid) {
                this.filterdUsers.push(element)
              }
            });
          }
          // add users into map to attach their img to them
          this.filterdUsers.forEach(user => {
            this.usersMap.set(user.uid, '')
          });

        })
          .add(() => {

            //attach imgs to users
            for (let user of this.usersMap) {
              this.authService.getUserImgLink(user[0]).subscribe(imgLink => {
                this.usersMap.set(user[0], imgLink)
              })
            }

          })
      })
    })
  }

  onSelectTrusted(event) {
    this.profileService.addToTrusted(event.target.value)
      .then(() => {
        this.getAllUsers();
        this.profileService.newTrustedUserSubject.next()
      })
  }

}
