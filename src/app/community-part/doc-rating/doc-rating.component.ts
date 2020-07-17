import { Component, OnInit, ViewChild, Renderer2, Input, ElementRef } from '@angular/core';
import { DoctorsService } from 'src/app/services/doctors.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { take } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'doc-rating',
  templateUrl: './doc-rating.component.html',
  styleUrls: ['./doc-rating.component.scss']
})
export class DocRatingComponent implements OnInit {

  rateValue: number = 1;
  @ViewChild('startsDiv') startsDiv;
  @Input('docId') docId;
  docData: UserModel;

  constructor(private render: Renderer2,
    private doctorsService: DoctorsService,
    private firestoreService: FirestoreService,
    private el: ElementRef) { }

  ngOnInit(): void {
    this.firestoreService.getUser(this.docId).pipe(take(1)).subscribe(res=>{
      this.docData = res;
    })
  }

  starSRate(value: number) {
    this.rateValue = value;

    let starsList = this.startsDiv.nativeElement.querySelectorAll('.fa-star')

    for (let i = 0; i < 5; i++) {
      this.render.removeClass(starsList[i], 'active')
    }

    for (let i = 0; i < value; i++) {
      this.render.addClass(starsList[i], 'active')
    }
  }

  submitRate() {
    this.doctorsService.ratingDoctor(this.docId, this.rateValue)
    this.doctorsService.docRateSubject.next({docId:'',state:false})
  }

}
