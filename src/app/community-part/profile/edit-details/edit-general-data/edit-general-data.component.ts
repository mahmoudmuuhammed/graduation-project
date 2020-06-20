import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { auth } from 'firebase';

@Component({
  selector: 'edit-general-data',
  templateUrl: './edit-general-data.component.html',
  styleUrls: ['./edit-general-data.component.scss']
})
export class EditGeneralDataComponent implements OnInit {

  userImgLink: string = '../../../../../assets/images/DeafultUser.svg'
  @Input() userData: UserModel

  @ViewChild('cancelNameBtn') cancelNameBtn;
  @ViewChild('cancelEmailBtn') cancelEmailBtn;
  @ViewChild('cancelPasswordBtn') cancelPasswordBtn;
  constructor(private authService: AuthService,
    private profileService: ProfileService,
    private router: Router) { }


  ngOnInit(): void {
    this.loadImg();
  }

  changePhoto(event) {
    this.profileService.changeUserPic(this.userData.uid, event.target.files[0])
      .percentageChanges().subscribe(res => {
        res == 100 ? this.loadImg() : "";
      })
  }

  loadImg() {
    this.authService.getUserImgLink(this.userData.uid).subscribe(res => this.userImgLink = res)
  }

  changeName(form: NgForm) {
    if (form.valid) {
      this.profileService.changeName(form.value.fullName)
        .then(() => {
          this.userData.fullName = form.value.fullName
          this.cancelNameBtn.nativeElement.click()
        })
    }
  }

  changeEmail(form: NgForm) {
    if (form.valid) {
      this.profileService.changeEmail(form.value.email,form.value.password)
      .then(()=>{
        this.userData.email = form.value.email
          this.cancelEmailBtn.nativeElement.click()
      })
    }
  }

  changePassword(form:NgForm){
    if (form.valid) {
      this.profileService.changePassword(form.value.oldPassword,form.value.newPassword)
      .then(()=>{
          this.cancelPasswordBtn.nativeElement.click()
      })
    }
  }

}
