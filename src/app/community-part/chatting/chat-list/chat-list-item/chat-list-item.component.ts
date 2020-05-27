import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Thread } from 'src/app/models/thread.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserModel } from 'src/app/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'chat-list-item',
    templateUrl: './chat-list-item.component.html',
    styleUrls: ['./chat-list-item.component.scss']
})

export class ChatListItemComponent implements OnInit, OnDestroy {

    @Input() thread: Thread;
    profilerId: string;
    cuurentUser: firebase.User;
    userData: Observable<UserModel>;
    subscribtion: Subscription;
    constructor(private db: FirestoreService, private auth: AngularFireAuth) {}

    ngOnInit() {
        if(this.auth.auth.currentUser !== undefined && this.auth.auth.currentUser !== null) {
            this.cuurentUser = this.auth.auth.currentUser;
        }

        this.subscribtion = this.db.getChannelsUsers(this.thread.threadId)
        .snapshotChanges()
        .subscribe(
            re => {
                const userIds = Object.keys(re.payload.data().members);
                for(const id of userIds) {
                    if(id === this.cuurentUser.uid) continue;
                    this.userData = this.db.getUser(id);
                }
            }
        );
    }

    ngOnDestroy() {
        this.subscribtion.unsubscribe();
    }
}