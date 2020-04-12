import { Directive, Renderer2, HostListener } from "@angular/core";

@Directive({
    selector: '[collapse]',
})

export class CollapseDirective {

    isCollapsed: boolean = false;
    constructor(private usage: Renderer2) {}

    @HostListener('click') onCollapse() {
        this.isCollapsed = !this.isCollapsed;
        let elementRef = document.querySelector('.collapsed');
        if(this.isCollapsed) {
            this.usage.removeClass(elementRef, 'hidden');
            return;
        }
        this.usage.addClass(elementRef, 'hidden');
    }
}