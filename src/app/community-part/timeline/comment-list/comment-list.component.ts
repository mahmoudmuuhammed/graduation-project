import { Component, Input, OnInit } from "@angular/core";
import { FeedsService } from 'src/app/services/feeds.service';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/comment.model';

@Component({
    selector: 'comment-list',
    templateUrl: './comment-list.component.html',
    styleUrls: ['./comment-list.component.scss']
})

export class CommentListComponent implements OnInit {
    @Input() postId: string;
    comments: Observable<Comment[]>;
    constructor(private feedsService: FeedsService) {}

    ngOnInit() {
        this.comments = this.feedsService.getComments(this.postId);
    }
}