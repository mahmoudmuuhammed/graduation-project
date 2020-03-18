import { Directive, Input, ElementRef, Renderer2, HostListener } from "@angular/core";

@Directive({
    selector: '[showPassword]',
})

export class ShowPasswordDirective {
    @Input('showPassword') passState: boolean;
    constructor(private usage: Renderer2) {}

    @HostListener('click') changePassState() {
        this.passState = !this.passState;
        let element = document.querySelector('.input-ref');
        if(this.passState) {
            this.usage.setAttribute(element, 'type', 'text');
        }
        else
        {
            this.usage.setAttribute(element, 'type', 'password');
        }
    }
}