import { Component, Input } from "@angular/core";

@Component({
    selector: 'medkit-logo',
    templateUrl: './mk-logo.component.html',
    styleUrls: ['./mk-logo.component.scss']
})

export class MedkitLogoComponent {
    @Input() textColor: string;
    @Input() smIcon: string;
}