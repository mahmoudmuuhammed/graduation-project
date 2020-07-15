import { Component, OnInit, destroyPlatform } from '@angular/core';
import { DoctorsService } from 'src/app/services/doctors.service';
import { take } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'doctor-booking',
  templateUrl: './doctor-booking.component.html',
  styleUrls: ['./doctor-booking.component.scss']
})
export class DoctorBookingComponent implements OnInit {
  doctorData: UserModel
  showbooking: boolean = false;
  docImgUrl: string = ''

  constructor(private doctorService: DoctorsService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.doctorService.doctorDataSubjectOnBooking.subscribe(docData => {
      this.doctorData = docData
      this.showbooking = true;
      this.authService.getUserImgLink(docData.uid).subscribe(imgUrl => {
        this.docImgUrl = imgUrl
      })
    })


  }

  onCloseBooking() {
    this.showbooking = false
  }

  booking(cardData) {
    console.log(cardData)
    
    const docId: string = this.doctorData.uid;
    this.router.navigate([`/community/Chat/${docId}`])
  }

  close(event) {
    event.target.className == 'doctorReservationOuter' ? this.showbooking = false : ''
  }
}
