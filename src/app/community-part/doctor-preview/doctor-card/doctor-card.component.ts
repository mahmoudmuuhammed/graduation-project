import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { DoctorsService } from 'src/app/services/doctors.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'doctorCard',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.scss']
})
export class DoctorCardComponent implements OnInit {

  @Input() DoctorData: UserModel
  docImgUrl: string = ''

  docRate: number[] = [];
  numOfOffStar: number[] = [];

  constructor(private doctorService: DoctorsService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserImgLink(this.DoctorData.uid).subscribe(imgUrl => {
      this.docImgUrl = imgUrl
    })

    for (let i = 0; i < this.DoctorData?.userType.rating; i++) {
      this.docRate.push(i)
    }
    for (let i = 0; i < 5 - this.docRate.length; i++) {
      this.numOfOffStar.push(i)
    }


  }

  bookDoctor() {
    this.doctorService.doctorDataSubjectOnBooking.next(this.DoctorData);
  }

}
