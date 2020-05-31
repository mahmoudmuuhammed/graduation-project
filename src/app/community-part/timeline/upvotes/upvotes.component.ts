import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { FeedsService } from 'src/app/services/feeds.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

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
    constructor(private feedsService: FeedsService,
        private authService:AuthService) { }

    ngOnInit() {
        this.subscribtion = this.feedsService.getTotalVotesOnPost(this.postId)
            .subscribe(
                postData => {
                    const votes = Object.entries(postData.upVotes);
                    for (let [key, value] of votes) {
                        this.votesCount += value;
                        if (key == this.authService.currentUser.uid) {
                            this.userVote = value
                        }
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