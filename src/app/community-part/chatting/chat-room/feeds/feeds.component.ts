import { Component, Input } from "@angular/core";
import { ChattingService } from 'src/app/services/chatting.service';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message.model';

@Component({
    selector: 'chat-feeds',
    templateUrl: './feeds.component.html',
    styleUrls: ['./feeds.component.scss']
})

export class ChatFeedsComponent {
    @Input() messages: Observable<Message[]>;
    constructor(
        private fireDb: ChattingService
    ) {}
}
