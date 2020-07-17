import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewChecked,
    Renderer2,
    OnChanges,
    ViewEncapsulation
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
import { Room } from 'src/app/models/Room.model';


@Component({
    selector: 'chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss']
})

export class ChatRoomComponent implements OnInit, AfterViewChecked, OnChanges {

    @ViewChild('scroller', { static: true }) scrollerSelector: ElementRef;
    //threadId: string;
    roomId: string;
    roomData: Room;
    activeRoute: string;
    currentUser: firebase.User;
    userData: Observable<UserModel>;
    messages: Observable<Message[]>;
    subscribtion: Subscription;
    imgSrc: string = '';
    @ViewChild('imgPreview') imgPreview: ElementRef;
    isPaymentExceeded: boolean;
    isChatDisabled: boolean;
    isBooking: boolean;

    constructor(
        private route: ActivatedRoute,
        private fireDb: FirestoreService,
        private auth: AngularFireAuth,
        private chat: ChattingService,
        private authService: AuthService,
        private render: Renderer2
    ) { }

    ngOnInit() {

        this.getRoomAndCheckPayment();

        this.chat.showImgSubject.subscribe(res => {
            this.imgSrc = res;
            this.render.setStyle(this.imgPreview.nativeElement, 'display', 'flex')
            this.render.setAttribute(this.imgPreview.nativeElement.querySelector("img"), 'src', this.imgSrc)
        })
    }

    ngOnChanges() {
        this.getRoomAndCheckPayment();
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        const scrollPane = this.scrollerSelector.nativeElement;
        scrollPane.scrollTop = scrollPane.scrollHeight;
    }

    getRoomAndCheckPayment() {
        this.auth.authState.pipe(take(1)).subscribe(user => {
            this.route.params.subscribe(
                param => {
                    this.activeRoute = param.id
                    // this.threadId = this.activeRoute < user.uid 
                    // ? `${this.activeRoute}_${user.uid}` 
                    // : `${user.uid}_${this.activeRoute}`;
                    //this.messages = this.chat.getMessages(this.threadId);

                    this.chat.getRoomId(user.uid, this.activeRoute).pipe(take(1)).subscribe(res => {
                        this.roomId = res
                        this.messages = this.chat.getMessages(this.roomId)
                        this.chat.updateUnreadToRead(this.roomId, user.uid, this.activeRoute)
                        this.chat.getRoomData(this.roomId).subscribe(res => {
                            if (res.paymentTime + 604800000 >= Date.now()) {
                                this.isChatDisabled = false;
                                this.isPaymentExceeded = false
                            } else {
                                this.isChatDisabled = true;
                                this.isPaymentExceeded = true
                            }
                        })
                    },
                        err => console.log(err))

                    this.userData = this.fireDb.getUser(this.activeRoute);
                }
            );
        })
    }

    showMessages() {
        this.isPaymentExceeded = false
    }

    PayAnotherConsultaion(event){
        if (event.target[0].form.classList.contains('ng-valid')) {
            this.chat.updatePaymentTime(this.roomId).then(()=>{
                this.isChatDisabled=false
                this.isPaymentExceeded = false
                this.isBooking = false;
            })
        }
        else {
            alert('Check your card data')
        }
    }

    Pay() {
        this.isPaymentExceeded = false
        this.isBooking = true;
    }

    closeImgPreview() {
        this.render.setStyle(this.imgPreview.nativeElement, 'display', 'none')
        this.render.setAttribute(this.imgPreview.nativeElement.querySelector("img"), 'src', '')
        this.imgSrc = ''
    }

    closeImg(event) {
        event.target.className == 'outerImgPreviewDiv' ? this.closeImgPreview() : ''
    }

    onRoomClick() {
        this.authService.currentUser.subscribe(user => {
            this.chat.updateUnreadToRead(this.roomId, user.uid, this.activeRoute)
        })
    }

    closeBooking() {
        this.isBooking = false;
    }
}