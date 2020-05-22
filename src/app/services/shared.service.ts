import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})

export class SharedService {
    showingUsersList: boolean = false;
    showPostEmitter = new EventEmitter<Date>();
    topNavTogBtnClicked = new EventEmitter<boolean>();
    sideBarNavItemClicked = new EventEmitter<boolean>();
    callAcceptance = new Subject<boolean>();
    callingSubject = new Subject<{channelName:string,state:boolean}>();

    constructor() { }

    closeUsersList() {
        this.showingUsersList = false;
    }

    showUsersList() {
        this.showingUsersList = true;
    }
}