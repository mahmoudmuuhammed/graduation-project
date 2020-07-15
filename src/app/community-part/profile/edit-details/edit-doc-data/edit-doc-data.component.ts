import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'edit-doc-data',
  templateUrl: './edit-doc-data.component.html',
  styleUrls: ['./edit-doc-data.component.scss']
})
export class EditDocDataComponent implements OnInit {

  @Input() userData: UserModel
  @ViewChild('cancelSpecialtyBtn') cancelSpecialtyBtn;
  @ViewChild('cancelLocationBtn') cancelLocationBtn;
  @ViewChild('cancelFeesBtn') cancelFeesBtn;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
  }

  changeSpeciality(form: NgForm) {
    if (form.valid) {
      this.profileService.changeSpeciality(form.value.specialty).then(() => {
        this.userData.userType.speciality = form.value.specialty
        this.cancelSpecialtyBtn.nativeElement.click()
      })
    }
  }

  changeLocation(form: NgForm) {
    if (form.valid) {
      this.profileService.changeLocation(form.value.location).then(() => {
        this.userData.userType.location = form.value.location
        this.cancelLocationBtn.nativeElement.click()
      })
    }
  }

  changeFees(form: NgForm) {
    if (form.valid) {
      this.profileService.changeFees(form.value.fees).then((res) => {
        console.log(res)
        this.userData.userType.fees = form.value.fees
        this.cancelFeesBtn.nativeElement.click()
      })
    }
  }

}
