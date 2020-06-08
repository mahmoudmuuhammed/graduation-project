import { Component, OnInit } from '@angular/core';
import { DoctorsService } from 'src/app/services/doctors.service';
import { take } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'doctor-booking',
  templateUrl: './doctor-booking.component.html',
  styleUrls: ['./doctor-booking.component.scss']
})
export class DoctorBookingComponent implements OnInit {
  doctorData: UserModel
  showbooking: boolean = false;
  constructor(private doctorService: DoctorsService) { }

  ngOnInit(): void {
    this.doctorService.doctorDataSubjectOnBooking.subscribe(docData => {
      this.doctorData = docData
      this.showbooking = true;
    })
  }

  onCloseBooking() {
    this.showbooking = false
  }

  booking() {
  }

}
