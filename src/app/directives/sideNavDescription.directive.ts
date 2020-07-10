import { Directive, HostListener, Renderer2 } from '@angular/core';
import { element } from 'protractor';

@Directive({
    selector: '[toggleDescribtion]'
})
export class sideNavDescribtionDirective {
    constructor(private renderer: Renderer2) { }

    @HostListener('mouseover', ['$event']) showMsgtime(event) {
        if (window.innerWidth > 768 && window.innerWidth < 991.9) {
            let parent = event.target.closest('.navLinkContainer');
            let child = parent.querySelector('.sideNavItemSpan')
            setTimeout(() => this.renderer.setStyle(child, 'display', 'block'), 100)
            child.classList.add('animated', 'fadeIn');
        }
    }

    @HostListener('mouseleave', ['$event']) hideMsgtime(event) {
        if (window.innerWidth > 768 && window.innerWidth < 991.9) {
            let parent = event.target.closest('.navLinkContainer');
            let child = parent.querySelector('.sideNavItemSpan')
            child.classList.remove('fadeIn');
            setTimeout(() => this.renderer.setStyle(child, 'display', 'none'), 100)
        }
    }

    @HostListener('window:resize', ['$event']) onResize(event) {
        if (window.innerWidth < 767.9 || window.innerWidth > 991.9) {
            let descDiv = document.querySelectorAll('.sideNavItemSpan');
            descDiv.forEach(element=>{
                this.renderer.setStyle(element, 'display', 'block')
            })
        }
        else{
            let descDiv = document.querySelectorAll('.sideNavItemSpan');
            descDiv.forEach(element=>{
                this.renderer.setStyle(element, 'display', 'none')
            })
        }
    }
}
