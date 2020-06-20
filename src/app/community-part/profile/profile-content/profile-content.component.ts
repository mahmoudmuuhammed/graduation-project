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

export class ProfileContentComponent implements OnChanges {

    loaded: boolean = false;
    isPostExistance: boolean;
    @Input() userId
    posts: Post[]

    constructor(private feeds: FeedsService) { }

    ngOnChanges() {
        this.feeds.getPostsInUserProfile(this.userId).subscribe(res => {
            res.length == 0 ? this.isPostExistance = false : this.isPostExistance = true;
            this.posts = res
            this.loaded = true
        })
    }

}