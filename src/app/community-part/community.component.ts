import { Component, ElementRef, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';

import { NotificationService } from 'src/app/services/notification.service';
import { SharedService } from '../services/shared.service'
import { AuthService } from '../services/auth.service';
import { DoctorsService } from '../services/doctors.service';

@Component({
  selector: 'community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],

})

export class CommunityContainerComponent implements OnInit {

  //for video call
  callerId: string;
  channelName: string
  callAccepted: boolean = false;
  callComming: boolean = false;

  //for emergency alert
  userId: string
  longitude: number;
  latitude: number;
  isEmergencyComming: boolean = false;
  isCallingEmergency: boolean = false;

  //for doctor prescription input
  isPrescriptionDashboard: boolean = false;

  constructor(private sharedService: SharedService,
    private notificationService: NotificationService,
    private changeDetector: ChangeDetectorRef,
    private authService: AuthService,
    private doctorsService: DoctorsService) { }

  ngOnInit() {
    //Making Call
    this.sharedService.callingSubject.subscribe(
      val => {
        this.channelName = val.channelName
        this.callAccepted = val.state;
        this.changeDetector.detectChanges();
      }
    )

    //Accept call
    this.sharedService.callAcceptance.subscribe(
      val => {
        this.callComming = false
        this.callAccepted = val;
        this.changeDetector.detectChanges();
      }
    )

    //get permission for notification and get it 
    this.notificationService.requestPermission();
    this.notificationService.receiveNotifications();

    //subscribe to inccoming call
    this.notificationService.CallSubject.subscribe(notification => {
      this.callerId = notification.data.callerId
      this.channelName = notification.data.channelName
      this.callComming = true
      this.changeDetector.detectChanges();
    })

    //subscribe to incomming emergency
    this.notificationService.EmergencySubject.subscribe(notification => {
      this.userId = notification.data.userId;
      this.longitude = Number(notification.data.longitude)
      this.latitude = Number(notification.data.latitude)
      this.isEmergencyComming = true;
      this.changeDetector.detectChanges();
    })

    //confirm emergency alert
    this.sharedService.emergencyConfirmSubject.subscribe(() => {
      this.isEmergencyComming = false;
      this.notificationService.stopEmergencyRingtone();
    })

    //update user status on changing browser tabs
    this.authService.updateStatusOnIdle()

    //subscribe to preciption dashboard
    this.doctorsService.preciptionDashBoardSubject.subscribe(res => {
      this.isPrescriptionDashboard = res;
    })
  }

}
