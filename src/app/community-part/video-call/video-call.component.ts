import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { AngularAgoraRtcService, Stream } from 'angular-agora-rtc';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'videoCall',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class VideoCallComponent implements OnInit {
  @Input() CallerName: string = 'Moemen Said';
  @Input() channelName: string;
  @Input() callStatus: boolean;
  localStream: Stream;
  remoteCalls: any = [];

  constructor(private agoraService: AngularAgoraRtcService,
    private detectChange: ChangeDetectorRef,
    private sharedService: SharedService) {
    this.agoraService.createClient();
  }

  ngOnInit() {
      this.startCall(null, this.channelName)
  }

  startCall(token: string, channelName: string) {
    this.agoraService.client.join(token, channelName, null, (uid) => {
      this.agoraService.client.setClientRole('host')
      this.localStream = this.agoraService.createStream(uid, true, null, null, true, false);
      this.localStream.setVideoProfile('720p_3');
      this.subscribeToStreams();
    });
  }

  endCall() {
    this.localStream.close();
    this.localStream.stop();
    this.agoraService.client.leave();
    this.agoraService.client.unpublish(this.localStream)
    this.sharedService.callingSubject.next({ channelName: '', state: false });
  }

  private subscribeToStreams() {
    this.localStream.on("accessAllowed", () => {
    });

    this.localStream.on("accessDenied", () => {
    });

    this.localStream.init(() => {
      this.localStream.play('agora_local');
      this.agoraService.client.publish(this.localStream, function (err) {
      });
      this.agoraService.client.on('stream-published', function (evt) {
      });
    }, function (err) {
    });

    this.agoraService.client.on('error', (err) => {
      if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.agoraService.client.renewChannelKey("", () => {
        }, (err) => { });
      }
    });

    this.agoraService.client.on('stream-added', (evt) => {
      const stream = evt.stream;
      this.agoraService.client.subscribe(stream, (err) => {
      });
    });

    this.agoraService.client.on('stream-subscribed', (evt) => {
      const stream = evt.stream;
      if (!this.remoteCalls.includes(`agora_remote${stream.getId()}`)) {
        this.remoteCalls.push(`agora_remote${stream.getId()}`);
        this.detectChange.detectChanges();
      }
      setTimeout(() => stream.play(`agora_remote${stream.getId()}`), 1000);
    });

    this.agoraService.client.on('stream-removed', (evt) => {
      const stream = evt.stream;
      stream.stop();
      this.remoteCalls = this.remoteCalls.filter(call => call !== `#agora_remote${stream.getId()}`);
    });

    //on host close the call
    this.agoraService.client.on('peer-leave', (evt) => {
      this.endCall();
      const stream = evt.stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call === `#agora_remote${stream.getId()}`);
      }
    });
  }

}
