import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'danger-area',
  templateUrl: './danger-area.component.html',
  styleUrls: ['./danger-area.component.scss']
})
export class DangerAreaComponent {

  @ViewChild('dangerDiv') dangerDiv;

  showDangerDiv() {
    console.log(this.dangerDiv.nativeElement.style.right)
    if (this.dangerDiv.nativeElement.style.right == '' || this.dangerDiv.nativeElement.style.right == '-250px' ) {
      this.dangerDiv.nativeElement.style.right='0px'
    }
    else{
      this.dangerDiv.nativeElement.style.right='-250px'
    }


  }

}
