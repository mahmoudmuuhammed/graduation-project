import { Component, Input, OnInit, OnDestroy, Renderer2, ViewChild, ElementRef } from "@angular/core";
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserModel } from 'src/app/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { Room } from 'src/app/models/Room.model';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
    selector: 'chat-list-item',
    templateUrl: './chat-list-item.component.html',
    styleUrls: ['./chat-list-item.component.scss']
})

export class ChatListItemComponent implements OnInit, OnDestroy {
    @Input() roomData: Room;
    profilerId: string;
    userData: Observable<UserModel> = null;
    subscribtion: Subscription;
    msgTime;
    noOfMsg: number;
    userImgLink: string = '../../../../../assets/images/DeafultUser.svg'

    constructor(private db: FirestoreService,
        private authService: AuthService,
        private sharedService: SharedService) { }

    ngOnInit() {
        this.authService.currentUser.subscribe(user => {
            this.subscribtion = this.db.getChannelsUsers(this.roomData.roomID)
                .snapshotChanges()
                .subscribe(
                    re => {
                        const users = Object.entries(re.payload.data().users);
                        for (const [key, value] of users) {
                            if (key === user.uid) {
                                this.noOfMsg = Number(value)
                                continue;
                            }
                            this.userData = this.db.getUser(key)
                            this.authService.getUserImgLink(key).subscribe(res => { this.userImgLink = res })
                        }
                    }
                );
        })

        this.msgTime = this.roomData.timestamp;
        this.msgTime = this.msgTime.seconds * 1000 //convert to milleseconds
    }

    showChats() {
        this.sharedService.userListShowing.next(false)
    }
    ngOnDestroy() {
        this.subscribtion.unsubscribe();
    }
}