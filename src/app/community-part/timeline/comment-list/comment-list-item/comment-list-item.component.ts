import { Component, Input } from "@angular/core";
import { Comment } from 'src/app/models/comment.model';

@Component({
    selector: 'comment-list-item',
    templateUrl: './comment-list-item.component.html',
    styleUrls: ['./comment-list-item.component.scss']
})

export class CommentListItemComponent {
    @Input() commentData: Comment;
}