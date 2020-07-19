import { Component, OnInit } from '@angular/core';
import { FeedsService } from 'src/app/services/feeds.service';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { take } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsPreviewComponent implements OnInit {

  Posts: Observable<Post[]>

  constructor(private feedsService: FeedsService, private adminService: AdminService) { }

  ngOnInit() {
    this.loadPosts()
  }

  loadPosts() {
    this.Posts = this.feedsService.getPostsInTimeline('All').pipe(take(1))
  }

  onDeletePost(postId: string) {
    if (confirm('Are you sure')) {
      this.adminService.deletePost(postId); this.loadPosts()
    }
  }

  onViewPost(postId: string) {

  }
}
