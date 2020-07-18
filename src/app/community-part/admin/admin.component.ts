import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  showingPost: boolean = false;
  postId: string;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.previewPostSubject.subscribe(res => {
      this.showingPost = res.state;
      this.postId = res.postId;
    })
  }

  closePreview() {

  }

}
