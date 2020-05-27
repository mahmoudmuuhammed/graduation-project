import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'emoji',
    templateUrl: './emoji.component.html',
    styleUrls: ['./emoji.component.scss']
})

export class EmojiComponent implements OnInit {
    emojis: Observable<any>;
    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.emojis = this.http
        .get('https://emoji-api.com/categories/smileys-emotion?access_key=c423bb9f0b030a4bc074342905b92a9b168889a1');
    }
}