import { Component, Input, ViewChild, ElementRef, OnInit, Renderer2, OnChanges } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { ChattingService } from 'src/app/services/chatting.service';
import { FormsServices } from 'src/app/services/forms.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'chat-form',
    templateUrl: './chat-form.component.html',
    styleUrls: ['./chat-form.component.scss']
})

export class ChatFormComponent implements OnInit, OnChanges {
    @Input() routeId: string;
    @Input() threadId: string;
    @Input() isDisabled: boolean;
    currentUser: firebase.User;
    @ViewChild('messageInput', { static: true }) messageValue: ElementRef;
    @ViewChild('chatForm') chatForm: ElementRef;

    constructor(
        private auth: AngularFireAuth,
        private chat: ChattingService,
        private render: Renderer2,
    ) { }


    ngOnInit() {
        this.currentUser = this.auth.auth.currentUser;
        this.messageValue.nativeElement.value = '';
    }

    ngOnChanges() {
        setTimeout(() => {
            this.isDisabled ?
                this.render.addClass(this.chatForm.nativeElement, 'disabled') :
                this.render.removeClass(this.chatForm.nativeElement, 'disabled')
        }, 300);
    }

    sendingMessage() {
        const message = this.messageValue.nativeElement.value;
        if (String(message) != '') {
            this.chat.sendMessage(this.threadId, message, this.currentUser.uid, this.routeId, '0', null);
            this.messageValue.nativeElement.value = '';
        }
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