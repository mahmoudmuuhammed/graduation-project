import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTxHightAdjust]'
})
export class HeightAdjustDirective {

  constructor(private el: ElementRef) { }
  lines: string;

  @HostListener('input', ['$event']) editRows(event) {
    var currentRows = this.el.nativeElement.rows;
    if (event.inputType === "insertText" && event.data === null) { //Enter
      this.el.nativeElement.rows = currentRows + 1
    }

    else if (event.inputType === "deleteContentBackward") { //backspace
      this.lines = event.target.value.split("\n")
      if (!this.lines[this.lines.length - 1]) {
        var finalResult = this.el.nativeElement.value.slice(0, -1);
        this.el.nativeElement.value = finalResult
        if (currentRows === 1) return
        this.el.nativeElement.rows = currentRows - 1
      }
    }
  }

}
