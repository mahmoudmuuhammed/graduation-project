import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedsService } from 'src/app/services/feeds.service';
import { Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'singlePost',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class singlePostComponent implements OnInit {

  userImgUrl: string = ''
  postImgUrl: string = ''
  postData: Post
  isPostExistance: boolean = false

  constructor(private activatedRoute: ActivatedRoute,
    private feedsService: FeedsService,
    private authService: AuthService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(url => {
      this.feedsService.getSinglePost(url.postId).subscribe(post => {
        post.length == 0 ? this.isPostExistance = false : this.isPostExistance = true;
        this.postData = post[0];

        if (this.postData.postPhoto) {
          this.feedsService.getPostImgSrc(this.postData.postKey).subscribe(imgSrc => {
            this.postImgUrl = imgSrc;
          })
        }

        this.authService.getUserImgLink(this.postData.userID).subscribe(imgUrl => {
          this.userImgUrl = imgUrl
        })
      })
    })


  }
}
