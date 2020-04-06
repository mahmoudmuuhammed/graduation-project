import { Component,ElementRef,ViewChild, Output } from '@angular/core';

@Component({
  selector: 'community-container',
  templateUrl: './community-container.component.html',
  styleUrls: ['./community-container.component.scss']
})
export class CommunityContainerComponent {
  constructor() { }
  @ViewChild('postingDiv') postingDiv:ElementRef
  currentDateClicked:Date;

  postCategory:string='all post';

  showPostingDiv() {
    this.postingDiv.nativeElement.style.display='block'
    this.currentDateClicked = new Date;
  }
  hidePostingDiv(){
    this.postingDiv.nativeElement.style.display='none'
  }
  
}
