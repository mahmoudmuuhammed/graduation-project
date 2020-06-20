import { Directive, Renderer2, HostListener, ElementRef } from "@angular/core";

@Directive({
    selector: '[editCollapse]',
})

export class EditCollapseDirective {


    constructor(private render: Renderer2, private el: ElementRef) { }

    @HostListener('click') collapseEditDiv() {

        if (this.el.nativeElement.classList.contains('cancelBtn')) {
            const parent = this.el.nativeElement.parentNode.parentNode.parentNode;
            this.render.removeClass(parent, 'fadeIn')
            setTimeout(() => this.render.setStyle(parent, 'display', 'none'), 200)
            this.render.addClass(parent, 'fadeOut')
        }
        else {
            const parent = this.el.nativeElement.parentNode.parentNode;
            const editArea = parent.querySelector("div.editDiv")
            this.render.removeClass(editArea, 'fadeOut')
            this.render.addClass(editArea, 'fadeIn')
            this.render.setStyle(editArea, 'display', 'block')
        }

    }
}