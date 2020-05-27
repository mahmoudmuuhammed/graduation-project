import { Component, Input, Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

import { UserModel } from 'src/app/models/user.model';
import { take } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import { SharedService } from 'src/app/services/shared.service';
import { AgouraServic } from 'src/app/services/agora.service';

@Component({
    selector: 'chat-head',
    templateUrl: './chat-head.component.html',
    styleUrls: ['./chat-head.component.scss']
})

export class ChatHeadComponent {
    @Input() userData: UserModel;
    constructor(private firestore: AngularFirestore,
        private activatedRoute: ActivatedRoute,
        private agoraService: AgouraServic,
        private fireAuth: AngularFireAuth,
        private sharedService: SharedService,
    ) { }

    call() {
        let userId = this.activatedRoute.snapshot.params.id
        this.firestore.collection('Users').doc(userId)
            .valueChanges()
            .pipe(take(1))
            .subscribe(
                (reciever: UserModel) => {
                    this.fireAuth.user.subscribe(Sender => {
                        this.agoraService.setUserStatus(Sender.uid, 'Busy')
                        if (reciever.status == 'offline' || reciever.status == 'away') {
                            alert('User is offline')
                        }
                        else if(reciever.status == 'Busy'){
                            alert('User have another Call')
                        }
                        else {
                            this.sharedService.callingSubject.next({ channelName: Sender.uid + reciever.uid, state: true });
                            this.firestore.collection('videoCallNotification').add({
                                CallerID: Sender.uid,
                                RecieverID: reciever.uid,
                                Caller: Sender.email,
                                Reciever: reciever.email,
                                RecieverMsgToken: reciever.notification_token_id,
                                channelName: Sender.uid + reciever.uid,
                            })
                        }
                    })
                }
            );
    }
}