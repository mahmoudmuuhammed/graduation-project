import { Component, Input, OnInit } from "@angular/core";
import { Comment } from 'src/app/models/comment.model';
import { FeedsService } from 'src/app/services/feeds.service';

@Component({
    selector: 'comment-list-item',
    templateUrl: './comment-list-item.component.html',
    styleUrls: ['./comment-list-item.component.scss']
})

export class CommentListItemComponent implements OnInit {
    @Input() commentData: Comment;
    postId: string;
    commentId: string;
    clappingCounter: number = 0;

    constructor(private feedsService: FeedsService) { }

    ngOnInit() {
        this.postId = this.commentData.postId;
        this.commentId = this.commentData.commentId
        this.feedsService.getTotalClapping(this.postId, this.commentId).subscribe(res => {
            Object.values(res.clappings).forEach((value) => {
                this.clappingCounter += value
            })
        })
    }

    clapping() {
        this.feedsService.setupClapping(this.postId, this.commentId);
    }
}