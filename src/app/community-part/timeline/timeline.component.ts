import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  posts=[1,2,3,3,4,5] // under developing

  constructor() { }

  ngOnInit(): void {
  }

}
