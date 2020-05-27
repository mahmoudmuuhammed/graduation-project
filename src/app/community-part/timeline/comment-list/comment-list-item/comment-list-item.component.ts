import { Component, Input } from "@angular/core";
import { Comment } from 'src/app/models/comment.model';
import { FeedsService } from 'src/app/services/feeds.service';

@Component({
    selector: 'comment-list-item',
    templateUrl: './comment-list-item.component.html',
    styleUrls: ['./comment-list-item.component.scss']
})

export class CommentListItemComponent {
    @Input() commentData: Comment;

    constructor(private feedsService:FeedsService){}

    clapping(){
        const postId=this.commentData.postId;
        const commentId=this.commentData.commentId
        this.feedsService.setupClapping(postId,commentId);
    }
}