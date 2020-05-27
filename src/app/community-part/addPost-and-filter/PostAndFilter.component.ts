import { Component } from '@angular/core';

import { SharedService } from '../../services/shared.service'

@Component({
  selector: 'postAndFilter',
  templateUrl: './PostAndFilter.component.html',
  styleUrls: ['./PostAndFilter.component.scss']
})
export class PostandFilterComponent {
  constructor(private sharedService: SharedService) { }

  currentDateWhenClicked: Date;
  postCategory: string = 'All post';

  showPostingDiv() {
    this.currentDateWhenClicked = new Date;
    this.sharedService.showPostEmitter.emit(this.currentDateWhenClicked);
  }


  CategorySelection(event) {
    this.postCategory = event.target.innerHTML;
  }

}
