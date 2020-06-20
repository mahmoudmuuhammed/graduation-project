import { Directive, Renderer2, HostListener, ElementRef } from "@angular/core";

@Directive({
    selector: '[emergencyBtn]',
})

export class EmergenctBtnDirective {

    constructor(private render: Renderer2, private el: ElementRef) { }

    @HostListener('click') onClick() {
        this.el.nativeElement.style.right == '-250px' || this.el.nativeElement.style.right == '' ?
            this.render.setStyle(this.el.nativeElement, 'right', '0px') :
            this.render.setStyle(this.el.nativeElement, 'right', '-250px');
    }
}