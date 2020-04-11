import { Directive, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[MsgTime]'
})
export class MsgTimeDirective {
  constructor(private renderer: Renderer2) { }

  @HostListener('mouseover', ['$event']) showMsgtime(event) {
    var parent = event.target;
    if (event.target.classList.contains('otherUserChat') || event.target.classList.contains('currentUserChat')) {
      var messageTimeDiv = parent.querySelector("span.msgTime");
      this.renderer.setStyle(messageTimeDiv, 'display', 'block');
    }
  }
  @HostListener('mouseleave', ['$event']) hideMsgtime(event) {
    var messageTimeDiv = event.target.querySelectorAll("span.msgTime");
    messageTimeDiv.forEach(element => {this.renderer.setStyle(element, 'display', 'none');});
  }
}
