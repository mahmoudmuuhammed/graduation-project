import { Component, Input, ViewChild, ElementRef, OnInit } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { ChattingService } from 'src/app/services/chatting.service';
import { FormsServices } from 'src/app/services/forms.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
        private chat: ChattingService,
        public forms: FormsServices
    ) { }


    ngOnInit() {
        this.currentUser = this.auth.auth.currentUser;
        this.messageValue.nativeElement.value = '';
    }

    sendingMessage() {
        const message = this.messageValue.nativeElement.value;
        this.chat.sendMessage(this.threadId, message, this.currentUser.uid, this.routeId, '0', null);
        this.messageValue.nativeElement.value = '';
    }

    handleSendMessage(event) {
        if (event.keyCode === 13) {
            this.sendingMessage();
        };
    }

    onSelectedFile(event) {
        this.chat.sendFile(this.threadId, this.currentUser.uid, this.routeId, event.target.files[0])
    }
    onSelectedImg(event) {
        this.chat.sendImg(this.threadId, this.currentUser.uid, this.routeId, event.target.files[0])

    }
}