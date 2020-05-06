import { Component, Input } from "@angular/core";
import { UserModel } from 'src/app/models/user.model';

@Component({
    selector: 'chat-head',
    templateUrl: './chat-head.component.html',
    styleUrls: ['./chat-head.component.scss']
})

export class ChatHeadComponent {
    @Input() userData: UserModel;
    constructor() {}
}