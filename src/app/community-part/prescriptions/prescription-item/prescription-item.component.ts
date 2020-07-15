import { Component, OnInit, Input } from '@angular/core';
import { Prescription } from 'src/app/models/prescriptions.mpdel';

@Component({
  selector: 'prescription-item',
  templateUrl: './prescription-item.component.html',
  styleUrls: ['./prescription-item.component.scss']
})
export class PrescriptionItemComponent implements OnInit {

  userImgLink = "../../../assets/images/DeafultUser.svg"
  @Input() prescription: Prescription;
  @Input() userType: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.userType)

  }

}
