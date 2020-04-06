import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDdCollabse]'
})
export class DdColabseDirective {
  constructor(private el: ElementRef) { }

  @HostBinding('class.show') isShown = false;
  @HostListener('click') toggleShow() {
    this.isShown = !this.isShown;
    var parent = this.el.nativeElement;
    var child = parent.querySelector("div.collapse");
    if (!child.classList.contains('show')) {
      child.classList.add('show');
    }
    else {
      child.classList.remove('show');
    }
  }

  // @HostListener('document:click', ['$event.target'])
  // public onClickOutside(event) {
  //   var parent = this.el.nativeElement;
  //   var child = parent.querySelector("div.collapse");
  //   const clickedInside = child.contains(event);
  //   if (!clickedInside) {
  //     parent.classList.remove('show');
  //     child.classList.remove('show');
  //     console.log("out")
  //   }
  // }

}