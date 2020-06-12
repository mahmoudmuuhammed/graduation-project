import { Component, Input, OnInit } from "@angular/core";
import { Message } from 'src/app/models/message.model';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { ChattingService } from 'src/app/services/chatting.service';

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
    msgTime;
    msgImg;
    msgFileLink: string;

    constructor(private authService: AuthService, private chat: ChattingService) { }

    ngOnInit() {

        this.authService.getUserImgLink(this.message.uid).subscribe(res => {
            this.userImgSrc = res
        })

        this.msgTime = this.message.timestamp;
        this.msgTime = this.msgTime.seconds * 1000 //convert to milleseconds

        if (this.message.msgtype == '1')
            this.chat.getMessageImg(this.message.msg).subscribe(url => this.msgImg = url)

        if (this.message.msgtype == '2')
            this.chat.getFileLink(this.message.msg).subscribe(url => this.msgFileLink = url)
    }

    showImg(event) {
        this.chat.showImgSubject.next(event.target.src)
    }
}