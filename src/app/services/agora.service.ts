import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging'
import { Subject } from 'rxjs';

import { notificationStructure } from '../models/callNotification.model'
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })

export class AgouraServic {
    CallSubject = new Subject<notificationStructure>();
    audio = new Audio("../../assets/ringtone/ringtone.wav");

    constructor(private fireMsg: AngularFireMessaging,
        private firestore:AngularFirestore) {}

    requestPermission() {
        this.fireMsg.requestToken.subscribe(() => {},
            (err) => {
                console.error('Unable to get permission to notify.', err);
            }
        );
    }

    receiveMessage() {
        this.fireMsg.messaging.subscribe(
            msg => {
                if (msg) {
                    msg.onMessage((notificationAlert) => {
                        if (notificationAlert.notification.title == 'Incoming Video Call') {
                            this.CallSubject.next(notificationAlert)
                            this.playsound();
                        }
                        // console.log(notificationAlert)
                    })
                }
            }
        )
    }

    playsound() {
        this.audio.load();
        this.audio.play();
        this.audio.loop = true;
    }

    stopRingtone() {
        this.audio.pause();
    }

    setUserStatus(userId:string,status:string){
        const path = `Users/${userId}`;
        this.firestore.doc(path)
            .update({ status: status });
    }
}