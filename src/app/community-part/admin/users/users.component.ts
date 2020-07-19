import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersPreviewComponent implements OnInit {

  Users: Observable<UserModel[]>


  constructor(private firestoreService: FirestoreService, private adminService: AdminService) { }

  ngOnInit() {
    this.loadUsers()
  }

  loadUsers() {
    this.Users = this.adminService.getUsers()
  }

  onDeleteUser(userId: string) {
    if (confirm('Are you sure')) {
      this.adminService.deleteUser(userId);
      this.loadUsers()
    }
  }

  onViewUser(user: UserModel) {
    this.adminService.showUserSubject.next({ userData: user, state: true });
  }
  
}