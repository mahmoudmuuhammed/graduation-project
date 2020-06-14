import { Component, Input, OnInit } from "@angular/core";
import { Post } from 'src/app/models/post.model';
import { FeedsService } from 'src/app/services/feeds.service';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'post-list-item',
    templateUrl: './post-list-item.component.html',
    styleUrls: ['./post-list-item.component.scss']
})

export class PostListItemComponent implements OnInit {
    @Input() postData: Post;
    postId: string;
    isAuther: boolean = false;
    postImgSrc: string = null;
    userImgUrl: string = '';

    constructor(private feedsService: FeedsService, private authService: AuthService) { }

    ngOnInit() {
        this.postId = this.postData.postKey;
        this.authService.currentUser.subscribe(user => {
            const postAuther = this.postData.userID;
            this.isAuther = user.uid == postAuther ? true : false;
        })

        this.authService.getUserImgLink(this.postData.userID).subscribe(imgUrl => {
            this.userImgUrl = imgUrl
        })

        if (this.postData.postPhoto) {
            this.feedsService.getPostImgSrc(this.postId).subscribe(imgSrc => {
                if (imgSrc != null) {
                    this.postImgSrc = imgSrc;
                }
            })
        }
    }

    deletePost() {
        this.feedsService.deletePost(this.postId)
    }
}