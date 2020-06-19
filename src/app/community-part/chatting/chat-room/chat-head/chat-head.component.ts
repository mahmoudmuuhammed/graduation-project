import { Component, Input, OnChanges, OnInit, AfterViewInit } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

import { UserModel } from 'src/app/models/user.model';
import { take } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'chat-head',
    templateUrl: './chat-head.component.html',
    styleUrls: ['./chat-head.component.scss']
})

export class ChatHeadComponent implements OnChanges {
    @Input() userData: UserModel;
    userImgSrc;

    constructor(private firestore: AngularFirestore,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private fireAuth: AngularFireAuth,
        private sharedService: SharedService,
    ) { }

    ngOnChanges() {
        if (this.userData)
            this.authService.getUserImgLink(this.userData.uid).subscribe(res => {
                this.userImgSrc = res
            })
    }

    onShowUserList() {
        this.sharedService.userListShowing.next(true)
    }

    call() {
        let userId = this.activatedRoute.snapshot.params.id
        this.firestore.collection('Users').doc(userId)
            .valueChanges()
            .pipe(take(1))
            .subscribe(
                (reciever: UserModel) => {
                    this.fireAuth.user.subscribe(Sender => {
                        this.authService.updateUserStatus('busy')
                        if (reciever.status == 'offline' || reciever.status == 'away') {
                            alert('User is offline')
                        }
                        else if (reciever.status == 'busy') {
                            alert('User have another Call')
                        }
                        else {
                            this.sharedService.callingSubject.next({ channelName: Sender.uid + '_' + reciever.uid, state: true });
                            this.firestore.collection('videoCallNotification').add({
                                caller: Sender.email,
                                callerID: Sender.uid,
                                channelName: Sender.uid +'_'+ reciever.uid,
                                receiver: reciever.email,
                                receiverID: reciever.uid,
                                receiverMsgToken: reciever.notification_token_id,
                            })
                        }
                    })
                }
            );
    }
}