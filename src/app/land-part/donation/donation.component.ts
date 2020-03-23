import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  scroll() {
    let donate = <HTMLSelectElement>document.getElementById('DonationExplationCont');
    donate.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  activeAmountBtn() {

  }

}
