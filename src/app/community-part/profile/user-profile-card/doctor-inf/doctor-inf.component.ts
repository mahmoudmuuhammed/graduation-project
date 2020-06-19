import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'doctor-inf',
  templateUrl: './doctor-inf.component.html',
  styleUrls: ['./doctor-inf.component.scss']
})
export class DoctorInfComponent implements OnInit {

  @Input() userData:UserModel

  constructor() { }

  ngOnInit(): void {
  }

}
