import { Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';

import { AgouraServic } from 'src/app/services/agora.service';
import { SharedService } from '../services/shared.service'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})

export class CommunityContainerComponent {
  callerData: { callerName: string, callerImgSrc: string, channelName: string };
  channelName: string
  callAccepted: boolean = false;
  callComming: boolean = false;
  @ViewChild('callingAlert') callingAlert: ElementRef;

  constructor(private sharedService: SharedService,
    private agoraService: AgouraServic,
    private changeDetector: ChangeDetectorRef,
    private authService: AuthService) {

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

    //subscribe to call notification
    this.agoraService.requestPermission();
    this.agoraService.receiveMessage();
    this.agoraService.CallSubject.subscribe((notification) => {
      console.log(notification.data.channelName)
      this.channelName = notification.data.channelName
      this.callComming = true
      this.changeDetector.detectChanges();
    })

    this.authService.updateStatusOnIdle();

  }
}
