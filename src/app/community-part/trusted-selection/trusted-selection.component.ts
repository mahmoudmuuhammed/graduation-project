import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'trusted-selection',
  templateUrl: './trusted-selection.component.html',
  styleUrls: ['./trusted-selection.component.scss']
})
export class TrustedSelectionComponent implements OnInit {

  @Input() userId: string;

  constructor() { }

  ngOnInit(): void {
  }

  scrollDown() {
    window.scrollBy(0, 500)
  }

}
