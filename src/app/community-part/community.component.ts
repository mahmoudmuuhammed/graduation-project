import { Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';

import { AgouraServic } from 'src/app/services/agora.service';
import { SharedService } from '../services/shared.service'

@Component({
  selector: 'community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})

export class CommunityContainerComponent {
  //currentDateClicked: Date;
  // @ViewChild('postingDiv') postingDiv: ElementRef;
  callerData: { callerName: string, callerImgSrc: string, channelName: string };
  currentChannelName: string;
  currentCallerName: string = '';
  callAccepted: boolean = false;
  callComming: boolean = false;
  @ViewChild('callingAlert') callingAlert: ElementRef;

  constructor(private sharedService: SharedService,
    private agoraService: AgouraServic,
    private changeDetector: ChangeDetectorRef) {

    // this.sharedService.showPostEmitter.subscribe(
    //   currentDate => {
    //     this.currentDateClicked = currentDate;
    //     this.postingDiv.nativeElement.style.display = 'block';
    //     document.querySelector('body').style.cssText = 'overflow-y:hidden;padding-right:10px';
    //     typeof window.orientation === 'undefined' ? document.getElementById('topNav').style.paddingRight = '20px' : ''
    //   });

    //sending Call
    this.sharedService.callingSubject.subscribe(
      val => {
        this.currentChannelName = val.channelName
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
      this.currentChannelName = notification.data["gcm.notification.channelName"]
      this.callComming = true
      this.changeDetector.detectChanges();
    })

  }

  // hidePostingDiv() {
  //   this.postingDiv.nativeElement.style.display = 'none'
  //   document.querySelector('body').style.cssText = 'overflow-y:scroll;padding-right:0px';
  //   if (typeof window.orientation === 'undefined')
  //     document.getElementById('topNav').style.paddingRight = '10px'
  // }
}
