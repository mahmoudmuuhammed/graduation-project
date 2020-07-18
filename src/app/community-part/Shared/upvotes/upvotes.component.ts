import { Component, Input, OnInit } from "@angular/core";
import { FeedsService } from 'src/app/services/feeds.service';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'upvotes',
    templateUrl: './upvotes.component.html',
    styleUrls: ['./upvotes.component.scss']
})

export class UpvotesComponent implements OnInit {
    @Input() postId: string;
    votesCount: number = 0;
    userVote: number = 0;
    constructor(private feedsService: FeedsService,
        private authService: AuthService) { }

    ngOnInit() {
        this.getVotes();
    }

    getVotes() {
        this.authService.currentUser.subscribe(user => {
            this.feedsService.getTotalVotesOnPost(this.postId)
                .pipe(take(1))
                .subscribe(
                    postData => {
                        const votes = Object.entries(postData.upVotes);
                        for (let [key, value] of votes) {
                            this.votesCount += value;
                            if (key == user.uid) {
                                this.userVote = value
                            }
                        };
                    }
                )
        })
    }

    upVote() {
        this.feedsService.updateVoteOnPost(this.postId, 1);
    }

    downVote() {
        this.feedsService.updateVoteOnPost(this.postId, -1)
    }
}