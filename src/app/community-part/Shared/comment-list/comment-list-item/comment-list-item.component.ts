import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Comment } from 'src/app/models/comment.model';
import { FeedsService } from 'src/app/services/feeds.service';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
    selector: 'comment-list-item',
    templateUrl: './comment-list-item.component.html',
    styleUrls: ['./comment-list-item.component.scss'],
    animations: [
        trigger('commentAnimation', [
            state('void', style({
                transform: 'translateY(-20px)',
                opacity: 0
            })),
            state('exist', style({
                transform: 'translateY(0)',
                opacity: 1
            })),
            transition('void=>*', animate(200))
        ])
    ]
})

export class CommentListItemComponent implements OnInit {
    @Input() commentData: Comment;
    postId: string;
    commentId: string;
    clappingCounter: number = 0;
    isAuther: boolean = false;
    clapped: boolean = false;
    userImgUrl: string = '../../../../../assets/images/DeafultUser.svg';
    isVerfied: boolean = false;

    constructor(private feedsService: FeedsService,
        private authService: AuthService,
        private firestore: FirestoreService) { }

    ngOnInit() {
        this.postId = this.commentData.postId;
        this.commentId = this.commentData.commentId

        this.authService.currentUser.subscribe(user => {
            this.feedsService.getTotalClapping(this.postId, this.commentId).subscribe(commentData => {
                const clappings = Object.entries(commentData.clappings);
                for (let [key, value] of clappings) {
                    this.clappingCounter += value;
                    if (key == user.uid && value == 1) {
                        this.clapped = true
                    }
                    break;
                };
            })


            this.authService.getUserImgLink(this.commentData.userId).subscribe(imgUrl => {
                this.userImgUrl = imgUrl
            })

            const commentAuther = this.commentData.userId;
            user.uid == commentAuther ? this.isAuther = true : this.isAuther = false;
        })

        this.firestore.getUser(this.commentData.userId).subscribe(res => {
            this.isVerfied = res.userType.isVerfied
        })
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