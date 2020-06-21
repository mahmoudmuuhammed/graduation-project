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

  users: UserModel[] = []
  deafultImgSrc = '../../../../../../assets//images/DeafultUser.svg'
  usersMap = new Map();
  currentTrustedUsers: string[];
  @ViewChild('userList') userList;

  constructor(private profileService: ProfileService,
    private authService: AuthService,
    private render:Renderer2) { }

  ngOnInit() {
    this.getAllUsers();
    this.profileService.removeTrustedUserSubject.subscribe(()=>this.getAllUsers())
  }

  getAllUsers() {
    this.authService.currentUser.subscribe(currentUser => {

      //get all users
      this.profileService.getUsers().pipe(take(1)).subscribe(allUsers => {

        //get current user data
        this.profileService.getUser(currentUser.uid).pipe(take(1)).subscribe(userData => {
          this.currentTrustedUsers = userData.trusted

          this.currentTrustedUsers.length == 3? 
            this.render.addClass(this.userList.nativeElement,'disabled'):
            this.render.removeClass(this.userList.nativeElement,'disabled')
          

          //filter user (not exist in trusted or not the current user)
          this.users = []
          allUsers.forEach((element) => {
            if (!this.currentTrustedUsers.includes(element.uid) && element.uid != currentUser.uid) {
              this.users.push(element)
            }
          });

          // add users into map to attach their img to them
          this.users.forEach(user => {
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
    this.profileService.addToTrusted(event.target.value);
    this.getAllUsers();
    this.profileService.newTrustedUserSubject.next()
  }

}
