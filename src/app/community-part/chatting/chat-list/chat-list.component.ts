import { Component, OnInit } from "@angular/core";
import { SharedService } from 'src/app/services/shared.service';
import { Observable } from 'rxjs';
import { ChattingService } from 'src/app/services/chatting.service';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Room } from 'src/app/models/Room.model';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
    selector: 'chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss']
})

export class ChatListComponent implements OnInit {

    rooms: Observable<Room[]>;
    userListStatus: boolean = true;

    constructor(
        public sharedService: SharedService,
        private authService: AuthService,
        private chat: ChattingService
    ) { }

    ngOnInit() {
        this.authService.currentUser.subscribe(user => {
            this.rooms = this.chat.getRooms(user.uid);
        })


        this.sharedService.userListShowing.subscribe((status: boolean) => {
            this.userListStatus = status
        })
    }

    // searchPreviusChat(event) {
    //     console.log(this.roomsSnapshot)
    //     this.authService.currentUser.subscribe(user => {
    //         this.isSearching = true
    //         let searchedRoom = [];
    //         let UsersList:string[]=[];
    //         for (let i = 0; i < this.roomsSnapshot.length; i++) {
    //             let users = Object.keys(this.roomsSnapshot[i].users);
    //             for (const key of users) {
    //                 if (key === user.uid) {
    //                     continue;
    //                 }
    //                 UsersList.push(key)
    //             }
    //         }
    //         this.getNamesOfDoctor(UsersList)
    //         this.filteredRooms = searchedRoom;
    //     })
    // }

    // getNamesOfDoctor(DocsId:string[]){
    //     let DocsName
    //     DocsId.forEach(docId=>{
    //         this.db.getUser(docId).subscribe(res=>console.log(res.fullName))
    //     })
    // }
}