import { Component, OnInit } from '@angular/core';
import { DoctorsService } from 'src/app/services/doctors.service';

@Component({
  selector: 'prescription-dashboard',
  templateUrl: './prescription-dashboard.component.html',
  styleUrls: ['./prescription-dashboard.component.scss']
})
export class PrescriptionDashboardComponent implements OnInit {

  constructor(private doctorService: DoctorsService) { }

  ngOnInit(): void {
  }

  submitPrescription() {

  }

  closePerCeptionDashboard() {
    this.doctorService.preciptionDashBoardSubject.next(false);
  }

}
