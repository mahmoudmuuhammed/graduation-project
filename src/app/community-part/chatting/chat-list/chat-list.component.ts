import { Component, OnInit } from "@angular/core";
import { SharedService } from 'src/app/services/shared.service';
import { Observable } from 'rxjs';
import { Thread } from 'src/app/models/thread.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChattingService } from 'src/app/services/chatting.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss']
})

export class ChatListComponent implements OnInit {
    threads: Observable<Thread[]>;
    profilerId: string;
    currentUser: firebase.User;
    constructor(
        public sharedService: SharedService,
        private auth: AngularFireAuth,
        private chat: ChattingService
    ) {}

    ngOnInit() {
        this.currentUser = this.auth.auth.currentUser;
        this.threads = this.chat.getThreads(this.currentUser.uid);
    }
}