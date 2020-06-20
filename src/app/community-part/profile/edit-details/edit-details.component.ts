import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditDetailsComponent implements OnInit {

  userData: UserModel
  constructor(private activeRoute: ActivatedRoute, private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.activeRoute.params.pipe(take(1)).subscribe(param => {
      this.firestore.getUser(param.id).pipe(take(1)).subscribe(res => {
        this.userData = res;
      })
    })
  }

}
