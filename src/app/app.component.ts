import { Component, OnInit } from '@angular/core';
import { ChattingService } from './services/chatting.service';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Thread, Members } from './models/thread.model';
import { UserModel } from './models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'medkit-app';
  threads: Observable<Thread[]>;
  membersList: any[] = [];
  profileList: Members[] = [];
  constructor(private chat: ChattingService, private db: AngularFirestore) {
    
  }
  items;
  ngOnInit() {
    // this.threads = this.chat.getThreads();

    // this.threads.pipe(
    //   map(user => user.filter(u => this.membersList.push(u.members.touid)))
    // ).subscribe(
    //   re => {
    //     this.profileList = this.membersList;
    //     console.log(this.profileList);
    //   }
    // );
  }

}

