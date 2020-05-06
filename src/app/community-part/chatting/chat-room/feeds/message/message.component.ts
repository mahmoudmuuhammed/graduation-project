import { Component, Input, OnInit } from "@angular/core";
import { Message } from 'src/app/models/message.model';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})

export class MessageComponent implements OnInit {
    @Input() message: Message;
    incoming: boolean;
    authState: firebase.User;
    constructor(private auth: AngularFireAuth) {}

    ngOnInit() {
        if(this.auth.auth.currentUser !== undefined && this.auth.auth.currentUser !== null) {
            this.authState = this.auth.auth.currentUser;
        };
        this.checkingIncomingMessage();
    }

    checkingIncomingMessage() {
        const user = this.authState.uid;
        if(this.message.senderId && user) {
            this.incoming = this.message.senderId !== user;
        }
    }
}