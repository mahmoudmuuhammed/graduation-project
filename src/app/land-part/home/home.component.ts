import { Component ,HostListener , Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomePageComponent {

    constructor(@Inject(DOCUMENT) private document: Document) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 70 ||  document.documentElement.scrollTop > 70) {
      document.getElementById('navContainer').classList.add('white');
      (document.getElementById('logo') as HTMLImageElement).src = '../assets/images/logo.svg';
      (document.getElementById('miniLogo') as HTMLImageElement).src = '../assets/images/miniLogo.svg';
    }
    else{
        document.getElementById('navContainer').classList.remove('white');
        (document.getElementById('logo') as HTMLImageElement).src = '../assets/images/logoWhite.svg';
        (document.getElementById('miniLogo') as HTMLImageElement).src = '../assets/images/miniLogoWhite.svg';
    }
  }
  name = 'Angular';
}