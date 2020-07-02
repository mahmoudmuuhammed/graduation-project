import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Params, ActivatedRoute } from '@angular/router';
import { EmegencyService } from 'src/app/services/emergency.service';
import { Emergency } from 'src/app/models/emergency.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.scss']
})
export class EmergencyComponent implements OnInit {

  userData: UserModel;
  userImgLink = '../../../assets/images/DeafultUser.svg';
  emergencyData: Emergency;
  longitude: number;
  latitude: number;

  constructor(private acitivatedRoute: ActivatedRoute,
    private emergencyService: EmegencyService,
    private fireStoreService: FirestoreService,
    private authService: AuthService) { }

  ngOnInit() {

    this.acitivatedRoute.params.subscribe(url => {
      this.emergencyService.getEmegencyData(url.emergencyId).subscribe((emergencyData: Emergency) => {
        this.emergencyData = emergencyData
        this.longitude = Number(emergencyData.userLongitude)
        this.latitude = Number(emergencyData.userLatitude)
        this.fireStoreService.getUser(emergencyData.userId).subscribe(userData => {
          this.userData = userData;
          this.authService.getUserImgLink(userData.uid).subscribe(res => this.userImgLink = res)
        })
      })
    })
  }

}
