import { Component, OnInit } from "@angular/core";
import { SharedService } from 'src/app/services/shared.service';
import { Observable } from 'rxjs';
import { Thread } from 'src/app/models/thread.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChattingService } from 'src/app/services/chatting.service';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Room } from 'src/app/models/Room.model';

@Component({
    selector: 'chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss']
})

export class ChatListComponent implements OnInit {
    // threads: Observable<Thread[]>;
    rooms: Observable<Room[]>;
    constructor(
        public sharedService: SharedService,
        private authService: AuthService,
        private chat: ChattingService
    ) {}

    ngOnInit() {
        this.authService.currentUser.subscribe(user=>{
           this.rooms = this.chat.getRooms(user.uid);
        })
    }

    searchPreviusChat(event){

    }
}