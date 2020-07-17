import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DoctorsService } from 'src/app/services/doctors.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'prescription-dashboard',
  templateUrl: './prescription-dashboard.component.html',
  styleUrls: ['./prescription-dashboard.component.scss']
})
export class PrescriptionDashboardComponent implements OnInit {

  @Input('patientId') patientId: string;
  prescriptionForm: FormGroup
  user: UserModel

  constructor(private doctorService: DoctorsService,
    private firestoreService: FirestoreService) { }


  ngOnInit(): void {
    this.FormController();
    this.firestoreService.getUser(this.patientId).pipe(take(1)).subscribe(userData => {
      this.user = userData
    })
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
