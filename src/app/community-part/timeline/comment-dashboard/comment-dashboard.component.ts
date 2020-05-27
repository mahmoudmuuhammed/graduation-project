import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { FeedsService } from 'src/app/services/feeds.service';

@Component({
    selector: 'comment-dashboard',
    templateUrl: './comment-dashboard.component.html',
    styleUrls: ['./comment-dashboard.component.scss']
})

export class CommentDashboardComponent implements OnInit {
    commentForm: FormGroup;
    @Input() postId: string;
    constructor(private feedsService: FeedsService) { }

    ngOnInit() {
        this.commentFormController();
    }

    commentFormController() {
        this.commentForm = new FormGroup({
            'content': new FormControl(null)
        });
    }


    addComment() {
        const commentContent = this.commentForm.get('content').value;
            this.feedsService.setupComment(this.postId, commentContent);
            this.commentForm.reset();
    }

    handleEnterAction(event) {
        if (event.keyCode === 13) {
            this.addComment();
        }
    }
}