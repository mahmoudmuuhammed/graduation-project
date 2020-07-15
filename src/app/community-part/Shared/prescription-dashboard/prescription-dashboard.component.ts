import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DoctorsService } from 'src/app/services/doctors.service';

@Component({
  selector: 'prescription-dashboard',
  templateUrl: './prescription-dashboard.component.html',
  styleUrls: ['./prescription-dashboard.component.scss']
})
export class PrescriptionDashboardComponent implements OnInit {

  @Input('patientId') patientId: string;
  prescriptionForm: FormGroup

  constructor(private doctorService: DoctorsService) { }


  ngOnInit(): void {
    this.FormController();
  }

  handdelAddpresciption() {
    const prescriptionData = this.prescriptionForm.get('prescriptionContent').value;
    this.doctorService.submitPrescription(this.patientId, prescriptionData)
  }

  FormController() {
    this.prescriptionForm = new FormGroup({
      'prescriptionContent': new FormControl(null, Validators.required)
    });
  }

  closePerCeptionDashboard() {
    this.doctorService.preciptionDashBoardSubject.next({ state: false, patientId: '' });
  }

}
