import { Component } from '@angular/core';

import { ShowPostingService } from '../../services/showPosting.service'

@Component({
  selector: 'postAndFilter',
  templateUrl: './PostAndFilter.component.html',
  styleUrls: ['./PostAndFilter.component.scss']
})
export class PostandFilterComponent {
  constructor(private showPostingService: ShowPostingService) { }

  currentDateWhenClicked: Date;
  postCategory: string = 'All post';

  showPostingDiv() {
    this.currentDateWhenClicked = new Date;
    this.showPostingService.showPostEmitter.emit(this.currentDateWhenClicked);
  }


  CategorySelection(event) {
    this.postCategory = event.target.innerHTML;
  }

}
