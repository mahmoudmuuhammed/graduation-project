import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { Observable } from 'rxjs';

import { Post } from 'src/app/models/post.model';
import { ActivatedRoute } from '@angular/router';
import { FeedsService } from 'src/app/services/feeds.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'profile-content',
    templateUrl: './profile-content.component.html',
    styleUrls: ['./profile-content.component.scss']
})

export class ProfileContentComponent implements  OnChanges {

    @Input() userId
    posts: Observable<Post[]>
    constructor(private activedRouted: ActivatedRoute,
        private feeds: FeedsService) { }

    ngOnChanges() {
        this.posts = this.feeds.getPostsInUserProfile(this.userId);
    }

}