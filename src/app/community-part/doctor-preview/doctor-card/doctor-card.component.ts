import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { DoctorsService } from 'src/app/services/doctors.service';

@Component({
  selector: 'doctorCard',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.scss']
})
export class DoctorCardComponent implements OnInit {

  @Output() onBookDoctor: EventEmitter<boolean>;
  @Input() DoctorData: UserModel

  constructor(private doctorService: DoctorsService) { }

  ngOnInit(): void {
  }

  bookDoctor() {
    this.doctorService.doctorDataSubjectOnBooking.next(this.DoctorData);
  }

}
