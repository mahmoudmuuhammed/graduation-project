import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prescription-item',
  templateUrl: './prescription-item.component.html',
  styleUrls: ['./prescription-item.component.scss']
})
export class PrescriptionItemComponent implements OnInit {

  userImgLink= "../../../assets/images/DeafultUser.svg"
  constructor() { }

  ngOnInit(): void {
  }

}
