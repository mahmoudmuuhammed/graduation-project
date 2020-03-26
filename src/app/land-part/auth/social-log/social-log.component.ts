import { Component, Input, Output, EventEmitter } from "@angular/core";
import { trigger, transition, animate, style } from "@angular/animations";

@Component({
    selector: 'social-log',
    templateUrl: './social-log.component.html',
    styleUrls: ['./social-log.component.scss'],
    animations: [
        trigger('socialPopup', [
            transition('void => *', [
                style({ transform: 'scale3d(.3, .3, .3)' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(200, style({ transform: 'scale3d(.0, .0, .0)' }))
            ])
        ])
    ]
})

export class SocialLogComponent {
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    close() {
        this.visibleChange.emit();
    }
}