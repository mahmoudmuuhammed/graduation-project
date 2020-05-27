import { Component, Input, OnInit } from "@angular/core";
import { Post } from 'src/app/models/post.model';
import { FeedsService } from 'src/app/services/feeds.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
    selector: 'post-list-item',
    templateUrl: './post-list-item.component.html',
    styleUrls: ['./post-list-item.component.scss']
})

export class PostListItemComponent implements OnInit {
    @Input() postData: Post;
    postOwner: string;

    constructor(private feedsService: FeedsService) { }

    ngOnInit() {
        const userID = this.postData.userID
        this.feedsService.getPostOwnerName(userID).subscribe((res: UserModel) => {
            this.postOwner = res.fullName
        })
        //this.feedsService.getCommentsCounts(this.postData.postKey);
    }
}