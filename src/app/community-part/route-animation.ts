import { trigger, transition, query, style, animate } from '@angular/animations';


export const fader =
    trigger('routeAnimation', [
        transition('*<=>*', [
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    left: 0,
                    width: '100px',
                    opacity: 0,
                    transform: 'translateX(-100%)'
                })
            ]),
            query(':enter', [
                animate('300ms ease-in-out',
                    style({
                        opacity: 1,
                        transform: 'translateX(0)'
                    })
                )
            ]),
        ])
    ])