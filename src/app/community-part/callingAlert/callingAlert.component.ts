import { Component, OnInit, Input, Renderer2, ElementRef, ViewEncapsulation } from '@angular/core';

import { AgouraServic } from 'src/app/services/agora.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'callingAlert',
  templateUrl: './callingAlert.component.html',
  styleUrls: ['./callingAlert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CallingComponent implements OnInit {
  @Input() CallerData: { callerName: string, callerImgSrc: string, channelName: string };

  constructor(private sharedServices: SharedService,
    private agoraService: AgouraServic,
    private render: Renderer2,
    private el: ElementRef) { }

  ngOnInit(): void {
  }

  onAccept() {
    this.sharedServices.callAcceptance.next(true)
    this.agoraService.stopRingtone();
  }

  onDecline() {
    this.sharedServices.callAcceptance.next(false)
    this.agoraService.stopRingtone();
  }

}
