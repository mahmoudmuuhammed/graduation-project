import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Prescription } from 'src/app/models/prescriptions.mpdel';
import { DoctorsService } from 'src/app/services/doctors.service';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnInit {

  prescriptions: Observable<Prescription[]>;
  userType: string;

  constructor(private doctorService: DoctorsService,
    private authService: AuthService,
    private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.firestore.getUser(user.uid).pipe(take(1)).subscribe(userData => {
        if (userData.userType.usertype === 'Doctor') {
          this.prescriptions = this.doctorService.getDoctorPrescriptions(user.uid);
           this.userType = 'Doctor'
        }
        else{
          this.prescriptions = this.doctorService.getPatientPrescriptions(user.uid)
          this.userType = 'Patient'
        }
      })
    })
  }

}
