import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { FeedsService } from 'src/app/services/feeds.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'upvotes',
    templateUrl: './upvotes.component.html',
    styleUrls: ['./upvotes.component.scss']
})

export class UpvotesComponent implements OnInit, OnDestroy {
    @Input() postId: string;
    votesCount: number = 0;
    userVote: number = 0;
    subscribtion: Subscription;
    constructor(private feedsService: FeedsService) {}

    ngOnInit() {
        // const userId = this.feedsService.currentUser.uid;
        this.subscribtion = this.feedsService.getTotalVotesOnPost(this.postId)
        .subscribe(
            postData => {
                this.userVote = postData.upvotes['test1'];
                const values = Object.values(postData.upvotes);
                for(const value of values) {
                    this.votesCount += value;
                };
            }
        )
    }

    upVote() {
        let vote = this.userVote == 1 ? 0 : 1;
        this.feedsService.updateVoteOnPost(this.postId, vote);
    }

    downVote() {
        let vote = this.userVote == -1 ? 0 : -1;
        this.feedsService.updateVoteOnPost(this.postId, vote);
    }

    ngOnDestroy() {
        this.subscribtion.unsubscribe();
    }
}