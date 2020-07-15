import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { AngularAgoraRtcService, Stream } from 'angular-agora-rtc';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { take } from 'rxjs/operators';
import { DoctorsService } from 'src/app/services/doctors.service';
import { UserModel } from 'src/app/models/user.model';
import { MessageChannel } from 'worker_threads';

@Component({
  selector: 'videoCall',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class VideoCallComponent implements OnInit {
  @Input() CallerId: string;
  @Input() channelName: string;
  callerName: string = ''
  localStream: Stream;
  remoteCalls: any = [];

  constructor(private agoraService: AngularAgoraRtcService,
    private detectChange: ChangeDetectorRef,
    private sharedService: SharedService,
    private authService: AuthService,
    private firestore: FirestoreService,
    private doctorService: DoctorsService) {
    this.agoraService.createClient();
  }

  ngOnInit() {
    this.startCall(null, this.channelName)
    this.firestore.getUser(this.CallerId).pipe(take(1)).subscribe(res => {
      this.callerName = res.fullName
    })
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
    this.authService.updateUserStatus('online')
    this.localStream.close();
    this.localStream.stop();
    this.agoraService.client.leave();
    this.agoraService.client.unpublish(this.localStream)
    this.sharedService.callingSubject.next({ channelName: '', state: false });

    this.authService.currentUser.subscribe(user => {
      this.firestore.getUser(user.uid).pipe(take(1)).subscribe((userData: UserModel) => {
        if (userData.userType.usertype == 'Doctor') {
          const channelNameArr = this.channelName.split('_')
          let patient: string = ''
          for (let i = 0; i < 2; i++) {
            channelNameArr[i] != user.uid ? patient = channelNameArr[i] : ''
          }
          this.doctorService.preciptionDashBoardSubject.next({ patientId: patient, state: true })
        }
      })
    })
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
