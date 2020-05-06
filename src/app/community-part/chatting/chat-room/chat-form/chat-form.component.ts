import { Component, Input, ViewChild, ElementRef, OnInit } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { ChattingService } from 'src/app/services/chatting.service';

@Component({
    selector: 'chat-form',
    templateUrl: './chat-form.component.html',
    styleUrls: ['./chat-form.component.scss']
})

export class ChatFormComponent implements OnInit {
    @Input() routeId: string;
    @Input() threadId: string;
    currentUser: firebase.User;
    @ViewChild('messageInput', { static: true }) messageValue: ElementRef;

    constructor(
        private auth: AngularFireAuth,
        private chat: ChattingService
    ) {
    }

    ngOnInit() {
        this.currentUser = this.auth.auth.currentUser;
    }

    sendingMessage() {
        const message = this.messageValue.nativeElement.value;
        this.chat.sendMessage(this.threadId, message, this.currentUser.uid, this.routeId);
        this.chat.saveLastMessage(this.threadId, message);
        this.messageValue.nativeElement.value = '';
    }

    handleSendMessage(event) {
        if(event.keyCode === 13) {
            this.sendingMessage();
        };
    }
}