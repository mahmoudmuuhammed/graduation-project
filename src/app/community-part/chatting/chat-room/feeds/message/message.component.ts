import { Component, Input, OnInit } from "@angular/core";
import { Message } from 'src/app/models/message.model';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})

export class MessageComponent implements OnInit {

    @Input() message: Message;
    incoming: boolean;
    authState: firebase.User;
    userImgSrc: string = ''

    constructor(private auth: AngularFireAuth,
        private authService: AuthService) { }

    ngOnInit() {
        if (this.auth.auth.currentUser !== undefined && this.auth.auth.currentUser !== null) {
            this.authState = this.auth.auth.currentUser;
        };
        this.checkingIncomingMessage();

        this.authService.getUserImgLink(this.message.uid).subscribe(res => {
            this.userImgSrc = res
        })
    }

    checkingIncomingMessage() {
        const user = this.authState.uid;
        if (this.message.uid && user) {
            this.incoming = this.message.uid !== user;
        }
    }
}