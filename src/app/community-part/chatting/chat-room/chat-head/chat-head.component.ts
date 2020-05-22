import { Component, Input, Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/models/user.model';
import { take, takeWhile } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import { SharedService } from 'src/app/services/shared.service';

interface activeUser {
    email: string;
    msgToken: string;
    uid: string;
}


@Component({
    selector: 'chat-head',
    templateUrl: './chat-head.component.html',
    styleUrls: ['./chat-head.component.scss']
})

export class ChatHeadComponent {
    @Input() userData: UserModel;
    constructor(private firestore: AngularFirestore,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private fireAuth: AngularFireAuth,
        private sharedService:SharedService,
        ) { }

    call() {
        let userId = this.activatedRoute.snapshot.params.id
        this.firestore.collection<activeUser>('ActiveUsers').doc(userId)
            .valueChanges()
            .pipe(take(1))
            .subscribe(
                (reciever: activeUser) => {
                    this.fireAuth.user.subscribe(Sender => {
                        if (!reciever) {
                            console.log('User is not online')
                        }
                        else {
                            this.sharedService.callingSubject.next({channelName:Sender.uid,state:true});
                            this.firestore.collection('videoCallNotification').add({
                                CallerID: Sender.uid,
                                RecieverID: reciever.uid,
                                Caller: Sender.email,
                                Reciever: reciever.email,
                                RecieverMsgToken: reciever.msgToken,
                                channelName: Sender.uid,
                            })
                        }
                    })
                }
            );
    }
}