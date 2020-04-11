import { Component, ElementRef, ViewChild } from '@angular/core';

import { ShowPostingService } from '../services/showPosting.service'

@Component({
  selector: 'community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityContainerComponent {
  
  @ViewChild('postingDiv') postingDiv: ElementRef
  currentDateClicked: Date;

  constructor(private showPostingService: ShowPostingService) {
    this.showPostingService.showPostEmitter.subscribe((currentDate) => {
      this.currentDateClicked = currentDate;
      this.postingDiv.nativeElement.style.display = 'block';
      document.querySelector('body').style.cssText = 'overflow-y:hidden;padding-right:10px';
      if (typeof window.orientation === 'undefined') //check for computer view only
        document.getElementById('topNav').style.paddingRight = '20px' //old padding + new
    });
  }

  hidePostingDiv() {
    this.postingDiv.nativeElement.style.display = 'none'
    document.querySelector('body').style.cssText = 'overflow-y:scroll;padding-right:0px';
    if (typeof window.orientation === 'undefined') //check for computer view only
      document.getElementById('topNav').style.paddingRight = '10px' //old padding
  }

}
