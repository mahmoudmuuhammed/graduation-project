import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging'
import { Subject } from 'rxjs';

import { callNotification,emergencyNotification } from '../models/callNotification.model'

@Injectable({ providedIn: 'root' })

export class NotificationService {
    CallSubject = new Subject<callNotification>();
    EmergencySubject = new Subject<emergencyNotification>();
    callAudio = new Audio("../../assets/ringtone/callSound.wav");
    emergencyAudio = new Audio("../../assets/ringtone/emergencySound.wav");

    constructor(private fireMsg: AngularFireMessaging) { }

    requestPermission() {
        this.fireMsg.requestToken.subscribe(() => { },
            (err) => {
                alert('Please allow notification to receive Call and Emergency notification');
            }
        );
    }

    receiveNotifications() {
        this.fireMsg.messaging.subscribe(
            msg => {
                if (msg) {
                    msg.onMessage((notificationAlert) => {
                        if (notificationAlert.notification.title == 'Incoming Video Call') {
                            this.CallSubject.next(notificationAlert)
                            this.playCallSound();
                        }
                        else if (notificationAlert.notification.title.indexOf('danger') > -1)
                            this.EmergencySubject.next(notificationAlert);
                            this.playEmergencySound();
                    })
                }
            }
        )
    }

    playCallSound() {
        this.callAudio.load();
        this.callAudio.play();
        this.callAudio.loop = true;
    }

    stopCallRingtone() {
        this.callAudio.pause();
    }

    playEmergencySound() {
        this.emergencyAudio.load();
        this.emergencyAudio.play();
        this.emergencyAudio.loop = true;
    }

    stopEmergencyRingtone() {
        this.emergencyAudio.pause();
    }
}