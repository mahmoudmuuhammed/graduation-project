import { Component } from "@angular/core";
import { SharedService } from 'src/app/services/shared.service';
@Component({
    selector: 'chatting-container',
    templateUrl: './chatting.component.html',
    styleUrls: ['./chatting.component.scss']
})

export class ChattingComponent {

    constructor(public sharedService: SharedService) { }
}