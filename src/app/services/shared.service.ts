import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})

export class SharedService {
    topNavTogBtnClicked = new EventEmitter<boolean>();
    sideBarNavItemClicked = new EventEmitter<boolean>();
    newNotification = new EventEmitter<boolean>();
    callAcceptance = new Subject<boolean>();
    callingSubject = new Subject<{ channelName: string, state: boolean }>();
    userListShowing = new Subject<boolean>();

    constructor() { }
}