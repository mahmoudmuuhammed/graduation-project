import { Component, Input, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message.model';

@Component({
    selector: 'chat-feeds',
    templateUrl: './feeds.component.html',
    styleUrls: ['./feeds.component.scss']
})

export class ChatFeedsComponent implements OnInit {
    @Input() messages: Observable<Message[]>;
    constructor() { }

    ngOnInit() {
    }
}
