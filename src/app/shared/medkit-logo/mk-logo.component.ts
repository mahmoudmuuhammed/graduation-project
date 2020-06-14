import { Component, Input } from "@angular/core";

@Component({
    selector: 'medkit-logo',
    templateUrl: './mk-logo.component.html',
    styleUrls: ['./mk-logo.component.scss']
})

export class MedkitLogoComponent {
    @Input() textColor: string="#333333";
    @Input() sloganColor: string="#555555";
    @Input() iconStroke: string='#fff';
    @Input() iconFill: string='#258ACD';
}