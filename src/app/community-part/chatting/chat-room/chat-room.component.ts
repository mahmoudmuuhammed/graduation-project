import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewChecked,
    Renderer2
} from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChattingService } from 'src/app/services/chatting.service';
import { Message } from 'src/app/models/message.model';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';


@Component({
    selector: 'chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss']
})

export class ChatRoomComponent implements OnInit, AfterViewChecked {

    @ViewChild('scroller', { static: true }) scrollerSelector: ElementRef;
    //threadId: string;
    roomId: string;
    activeRoute: string;
    currentUser: firebase.User;
    userData: Observable<UserModel>;
    messages: Observable<Message[]>;
    subscribtion: Subscription;
    imgSrc: string = '';
    @ViewChild('imgPreview') imgPreview: ElementRef;

    constructor(
        private route: ActivatedRoute,
        private fireDb: FirestoreService,
        private auth: AngularFireAuth,
        private chat: ChattingService,
        private authService: AuthService,
        private render: Renderer2
    ) { }

    ngOnInit() {
        this.auth.authState.subscribe(user => {
            this.route.params.subscribe(
                param => {
                    this.activeRoute = param.id
                    // this.threadId = this.activeRoute < user.uid 
                    // ? `${this.activeRoute}_${user.uid}` 
                    // : `${user.uid}_${this.activeRoute}`;
                    //this.messages = this.chat.getMessages(this.threadId);

                    this.chat.getRoomId(user.uid, this.activeRoute).pipe(take(1)).subscribe(res => {
                        this.roomId = res
                    }, err => console.log(err),
                        () => {
                            this.messages = this.chat.getMessages(this.roomId)
                            this.chat.updateUnreadToRead(this.roomId, user.uid, this.activeRoute)
                        })

                    this.userData = this.fireDb.getUser(this.activeRoute);
                }
            );
        })

        this.chat.showImgSubject.subscribe(res => {
            this.imgSrc = res;
            this.render.setStyle(this.imgPreview.nativeElement, 'display', 'flex')
            this.render.setAttribute(this.imgPreview.nativeElement.querySelector("img"), 'src', this.imgSrc)
        })
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        const scrollPane = this.scrollerSelector.nativeElement;
        scrollPane.scrollTop = scrollPane.scrollHeight;
    }

    logout() {
        this.authService.logout();
    }

    closeImgPreview() {
        this.render.setStyle(this.imgPreview.nativeElement, 'display', 'none')
        this.render.setAttribute(this.imgPreview.nativeElement.querySelector("img"), 'src', '')
        this.imgSrc=''
    }

    downloadUrl() {
        let a: any = document.createElement('a');
        a.href = this.imgSrc;
        a.download = 'img';
        document.body.appendChild(a);
        a.style = 'display: none';
        a.click();
        a.remove();
      };
}