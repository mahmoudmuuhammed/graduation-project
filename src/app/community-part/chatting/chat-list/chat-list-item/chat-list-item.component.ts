import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Thread } from 'src/app/models/thread.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserModel } from 'src/app/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    selector: 'chat-list-item',
    templateUrl: './chat-list-item.component.html',
    styleUrls: ['./chat-list-item.component.scss']
})

export class ChatListItemComponent implements OnInit, OnDestroy {

    @Input() thread: Thread;
    profilerId: string;
    user: firebase.User;
    userData: Observable<UserModel>;
    subscribtion: Subscription;
    constructor(private auth: AngularFireAuth, private db: FirestoreService, private fire: AngularFirestore) {}

    ngOnInit() {
        console.log('init list chat');
        if(this.auth.auth.currentUser !== null && this.auth.auth.currentUser !== undefined) {
            this.user = this.auth.auth.currentUser;
        }
        this.checkingChannelsUsers();
        console.log('end of init list chat');
    }
    
    checkingChannelsUsers() {
        this.subscribtion = this.db.getChannelsUsers(this.thread.threadId)
        .get()
        .subscribe(
            re => {
                const userIds = re.data().members;
                this.profilerId = userIds.myuid === this.user.uid ? userIds.touid : userIds.myuid;
                console.log(this.profilerId);
                this.userData = this.db.getUser(this.profilerId);
                console.log('after')
            }
        )
    }

    ngOnDestroy() {
        this.subscribtion.unsubscribe();
    }
}