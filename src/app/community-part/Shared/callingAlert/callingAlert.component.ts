import { Component, OnInit, Input, Renderer2, ElementRef, ViewEncapsulation } from '@angular/core';

import { NotificationService } from 'src/app/services/notification.service';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/models/user.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'callingAlert',
  templateUrl: './callingAlert.component.html',
  styleUrls: ['./callingAlert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CallingComponent implements OnInit {

  @Input() callerID: string;
  callerData: UserModel
  userImgSrc: string = '../../../assets/images/DeafultUser.svg'

  constructor(private sharedServices: SharedService,
    private notificationService: NotificationService,
    private firestore: FirestoreService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.firestore.getUser(this.callerID).pipe(take(1)).subscribe(res => {
      this.callerData = res;
      this.authService.getUserImgLink(res.uid).subscribe(link=>this.userImgSrc=link)
    })
  }

  onAccept() {
    this.sharedServices.callAcceptance.next(true)
    this.notificationService.stopCallRingtone();
  }

  onDecline() {
    this.sharedServices.callAcceptance.next(false)
    this.notificationService.stopCallRingtone();
  }

}
