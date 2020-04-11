import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDdCollabse]'
})
export class DdColabseDirective {
  constructor(private el: ElementRef) { }

  @HostBinding('class.show') isShown = false;
  @HostListener('click',['$event.target']) toggleShow() {
    this.isShown = !this.isShown;
    var parent = this.el.nativeElement;
    var child = parent.querySelector("div.collapse");
    if (!parent.classList.contains('show')) {
      parent.classList.add('show');
      child.classList.add('show','animated','fadeIn');
      child.classList.remove('fadeOut');
    }
    else{
      parent.classList.remove('show');
      child.classList.remove('fadeIn');
      child.classList.add('fadeOut');
      setTimeout(function(){child.classList.remove('show')},200)
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