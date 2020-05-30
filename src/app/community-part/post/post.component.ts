import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedsService } from 'src/app/services/feeds.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'singlePost',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class singlePostComponent implements OnInit {
  postData: Post
  view: boolean = false
  commentCounter: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
    private feedsService: FeedsService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.feedsService.getSinglePost(res.postId).subscribe(res => {
        this.postData = res[0];
        this.view = true
      })
      this.feedsService.getTotalCommentCount(res.postId).subscribe(res => {
        this.commentCounter = 0;
        Object.values(res).forEach(() => {
          this.commentCounter++
        })
      })
    })
  }
}
