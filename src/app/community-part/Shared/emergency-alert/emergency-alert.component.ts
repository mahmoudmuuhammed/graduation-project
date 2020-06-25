import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/models/user.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'emergency-alert',
  templateUrl: './emergency-alert.component.html',
  styleUrls: ['./emergency-alert.component.scss']
})
export class EmergencyAlertComponent implements OnInit {

  @Input('userId') userId;
  @Input('longitude') longitude;
  @Input('latitude') latitude;
  userLinkImg: string = '../../../../assets/images/DeafultUser.svg'
  userData: UserModel = null;


  constructor(private authService: AuthService,
    private firestore: FirestoreService,
    private shareService: SharedService) { }

  ngOnInit(): void {

    this.authService.getUserImgLink(this.userId).subscribe(res => this.userLinkImg = res)
    this.firestore.getUser(this.userId).subscribe(res => this.userData = res)

  }

  onConfiremAlert() {
    this.shareService.emergencyConfirmSubject.next();
  }

}
