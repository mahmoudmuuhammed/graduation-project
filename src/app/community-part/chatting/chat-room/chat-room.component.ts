import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChattingService } from 'src/app/services/chatting.service';
import { Message } from 'src/app/models/message.model';


@Component({
    selector: 'chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss']
})

export class ChatRoomComponent implements OnInit {

    threadId: string;
    activeRoute: string;
    currentUser: firebase.User;
    userData: Observable<UserModel>;
    messages: Observable<Message[]>;
    constructor(
        private route: ActivatedRoute,
        private fireDb: FirestoreService,
        private auth: AngularFireAuth,
        private chat: ChattingService
    ) {}

    ngOnInit() {
        this.currentUser = this.auth.auth.currentUser;
        this.route.paramMap.subscribe(
            params => {
                this.activeRoute = params.get('id');
                this.threadId = this.activeRoute < this.currentUser.uid 
                ? `${this.activeRoute}_${this.currentUser.uid}` 
                : `${this.currentUser.uid}_${this.activeRoute}`;
                this.messages = this.chat.getMessages(this.threadId);
                this.userData = this.fireDb.getUser(this.activeRoute);
            }
        );
    }
}