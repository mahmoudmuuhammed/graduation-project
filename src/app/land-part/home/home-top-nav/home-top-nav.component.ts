import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-home-top-nav',
  templateUrl: './home-top-nav.component.html',
  styleUrls: ['./home-top-nav.component.scss']
})

export class HomeTopNavComponent {

  text: string = '#fff';
  slogan: string = "#fff";
  iconFill: string = "#fff";
  iconStroke: string = "#258ACD";

  constructor(@Inject(DOCUMENT) private document: Document) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
      document.getElementById('navContainer').classList.add('white');
      this.text = '#333';
      this.slogan = "#555";
      this.iconFill = "#258ACD";
      this.iconStroke = "#fff";
    }
    else {
      document.getElementById('navContainer').classList.remove('white');
      this.text = '#fff';
      this.slogan = "#fff";
      this.iconFill = "#fff";
      this.iconStroke = "#258ACD";
    }
  }
  name = 'Angular';
}
