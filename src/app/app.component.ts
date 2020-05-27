import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ChattingService } from './services/chatting.service';
import { Observable } from 'rxjs';
import { Thread, Members } from './models/thread.model';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'medkit-app';
  // threads: Observable<Thread[]>;
  // membersList: any[] = [];
  // profileList: Members[] = [];
  // items;
  constructor(private authService:AuthService) {}
  ngOnInit() {

    this.authService.autoLogin()

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

