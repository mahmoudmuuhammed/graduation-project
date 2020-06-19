import { Component, Input, OnInit } from "@angular/core";
import { FeedsService } from 'src/app/services/feeds.service';
import { Observable, Subscription } from 'rxjs';
import { Comment } from 'src/app/models/comment.model';
import { take } from 'rxjs/operators';

@Component({
    selector: 'comment-list',
    templateUrl: './comment-list.component.html',
    styleUrls: ['./comment-list.component.scss']
})

export class CommentListComponent implements OnInit {
    isMoreCommentExist: boolean = false;
    @Input() postId: string;
    comments: Observable<Comment[]>;
    limitedComments: Observable<Comment[]>;
    noOfComment: number = 5
    noOfAllComments: Comment[];

    constructor(private feedsService: FeedsService) { }

    ngOnInit() {
        this.comments = this.feedsService.getComments(this.postId);
        this.limitedComments = this.feedsService.getLimitedComment(this.postId, this.noOfComment);

        this.comments.pipe(take(1)).subscribe(all => {
            this.noOfAllComments = all
            this.limitedComments.pipe(take(1)).subscribe(limited => {
                this.isMoreCommentExist = all > limited ? true : false
            })
        })
    }

    loadMoreComment() {
        this.noOfComment += 5;
        this.isMoreCommentExist = this.noOfComment >= this.noOfAllComments.length ? false : true;
        this.limitedComments = this.feedsService.getLimitedComment(this.postId, this.noOfComment);
    }
}