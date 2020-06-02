import { Component, OnInit } from "@angular/core";
import { FeedsService } from 'src/app/services/feeds.service';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';

@Component({
    selector: 'posts-list',
    templateUrl: './posts-list.component.html',
    styleUrls: ['./posts-list.component.scss']
})

export class PostsListComponent implements OnInit {
    posts: Observable<Post[]>;
    constructor(private feedsService: FeedsService) { }

    ngOnInit() {
        this.posts = this.feedsService.getPostsInTimeline('All');
        this.feedsService.filteredPostCategory.subscribe(categoryName => {
            this.posts = this.feedsService.getPostsInTimeline(categoryName);
        })
    }
}