import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.scss']
})

export class UserPreviewComponent implements OnInit {

  showingImg: boolean = false;
  @Input() userData: UserModel;
  userImgLink = '../../../../assets/images/DeafultUser.svg'
  userIdLink = '../../../../assets/images/license.svg'

  constructor(private adminService: AdminService,
    private authService: AuthService,
    private render: Renderer2) { }

  ngOnInit(): void {

    this.authService.getUserImgLink(this.userData.uid).subscribe(res => this.userImgLink = res)
    this.adminService.getDocIdLink(this.userData.uid).subscribe(res => this.userIdLink = res)

  }

  onCloseUserPreview() {
    this.adminService.showUserSubject.next({ state: false, userData: null });
  }

  onConfirmUser() {
    this.adminService.confirmUser(this.userData.uid);
  }

  onDeleteUser() {
    this.adminService.deleteUser(this.userData.uid);
  }

  showIDImg() {
    this.showingImg = true;
    console.log('dddd')
  }


  closeImgPreview() {
    this.showingImg = false;
    this.userIdLink = ''
  }

  closeImg(event) {
    event.target.className == 'outerImgPreviewDiv' ? this.closeImgPreview() : ''
  }

}
