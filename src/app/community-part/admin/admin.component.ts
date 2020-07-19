import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  showingUser: boolean = false;
  userData: UserModel;
  showingImg: boolean = false;
  imgLink: string;

  constructor(private adminService: AdminService) { }

  ngOnInit() {

    this.adminService.showUserSubject.subscribe(res => {
      this.userData = res.userData
      this.showingUser = res.state
    })

    this.adminService.showImgSubject.subscribe(res => {
      this.imgLink = res.imgLink;
      this.showingImg = res.state
    })

  }


}
