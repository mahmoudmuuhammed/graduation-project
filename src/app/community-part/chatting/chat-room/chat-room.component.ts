import { Component, 
        OnInit, 
        ViewChild, 
        ElementRef, 
        AfterViewChecked} from "@angular/core";
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
    threadId: string;
    activeRoute: string;
    currentUser: firebase.User;
    userData: Observable<UserModel>;
    messages: Observable<Message[]>;
    subscribtion: Subscription;
    constructor(
        private route: ActivatedRoute,
        private fireDb: FirestoreService,
        private auth: AngularFireAuth,
        private chat: ChattingService,
        private authService:AuthService
    ) {}

    ngOnInit() {
        this.currentUser = this.auth.auth.currentUser;

        this.auth.authState.pipe(take(1)).subscribe(user=>{
            this.route.paramMap.subscribe(
                params => {
                    this.activeRoute = params.get('id');
                    this.threadId = this.activeRoute < user.uid 
                    ? `${this.activeRoute}_${user.uid}` 
                    : `${user.uid}_${this.activeRoute}`;
                    this.messages = this.chat.getMessages(this.threadId);
                    this.userData = this.fireDb.getUser(this.activeRoute);
                }
            );
        })
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        const scrollPane = this.scrollerSelector.nativeElement;
        scrollPane.scrollTop = scrollPane.scrollHeight;
    }

    logout(){
        this.authService.logout();
    }
}