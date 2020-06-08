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

  constructor(private doctorService: DoctorsService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserImgLink(this.DoctorData.uid).subscribe(imgUrl => {
      this.docImgUrl = imgUrl
    })
  }

  bookDoctor() {
    this.doctorService.doctorDataSubjectOnBooking.next(this.DoctorData);
  }

}
