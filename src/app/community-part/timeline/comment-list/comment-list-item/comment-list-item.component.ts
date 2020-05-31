import { Component, Input, OnInit } from "@angular/core";
import { Comment } from 'src/app/models/comment.model';
import { FeedsService } from 'src/app/services/feeds.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'comment-list-item',
    templateUrl: './comment-list-item.component.html',
    styleUrls: ['./comment-list-item.component.scss']
})

export class CommentListItemComponent implements OnInit {
    @Input() commentData: Comment;
    postId: string;
    commentId: string;
    userId = this.authService.currentUser.uid
    clappingCounter: number = 0;
    isAuther: boolean = false;
    clapped: boolean = false;

    constructor(private feedsService: FeedsService, private authService: AuthService) { }

    ngOnInit() {
        this.postId = this.commentData.postId;
        this.commentId = this.commentData.commentId
        this.feedsService.getTotalClapping(this.postId, this.commentId).subscribe(commentData => {
            const clappings = Object.entries(commentData.clappings);
            for (let [key, value] of clappings) {
                this.clappingCounter += value;
                if (key == this.userId && value == 1) {
                    this.clapped = true
                }
            };
        })

        const currentUserId = this.authService.currentUser.uid;
        const commentAuther = this.commentData.userId;
        currentUserId == commentAuther ? this.isAuther = true : this.isAuther = false;
    }

    clapping() {
        let clappingValue;
        this.clapped ? clappingValue = 0 : clappingValue = 1
        this.feedsService.setupClapping(this.postId, this.commentId, clappingValue);
    }

    deleteComment() {
        this.feedsService.deleteComment(this.postId, this.commentId);
    }
}