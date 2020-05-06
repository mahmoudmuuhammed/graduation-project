import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SharedService {
    showingUsersList: boolean = false;
    constructor() {}

    closeUsersList() {
        this.showingUsersList = false;
    }

    showUsersList() {
        this.showingUsersList = true;
    }
}