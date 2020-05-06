import { Component, Input, OnInit } from "@angular/core";
import { Thread, Members } from 'src/app/models/thread.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserModel } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, filter, retry } from 'rxjs/operators';

@Component({
    selector: 'chat-list-item',
    templateUrl: './chat-list-item.component.html',
    styleUrls: ['./chat-list-item.component.scss']
})

export class ChatListItemComponent implements OnInit {

    @Input() thread: Thread;
    user: firebase.User;
    userData: Observable<UserModel>;
    profilerId: string;
    constructor(private auth: AngularFireAuth, private db: FirestoreService, private fire: AngularFirestore) {}

    ngOnInit() {
        if(this.auth.auth.currentUser !== undefined && this.auth.auth.currentUser !== null) {
            this.user = this.auth.auth.currentUser;
        }

        if(this.thread.members.myuid === this.user.uid) {
            this.profilerId = this.thread.members.touid;
        } else {
            this.profilerId = this.thread.members.myuid;
        }

        this.userData = this.db.getUser(this.profilerId);
    }
}