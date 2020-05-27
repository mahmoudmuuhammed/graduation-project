import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FeedsService } from 'src/app/services/feeds.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'singlePost',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class singlePostComponent implements OnInit {
  postData;
  postOwner: string;

  constructor(private activatedRoute: ActivatedRoute,
    private feedsService: FeedsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      let postId = res.postId
      this.feedsService.getSinglePost(postId).subscribe(res => {
        this.postData = res[0];
        const userID = this.postData.userID
        this.feedsService.getPostOwnerName(userID).subscribe((res: UserModel) => {
          this.postOwner = res.fullName
        })
      })
    })
  }
}
