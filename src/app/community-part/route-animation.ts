import { trigger, transition, query, style, animate } from '@angular/animations';


export const fader =
    trigger('routeAnimation', [
        transition('*<=>*', [
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    width: '100%',
                    opacity: 0,
                })
            ]),
            query(':enter', [
                animate('300ms ease-in-out',
                    style({
                        opacity: 1,
                    })
                )
            ]),
        ])
    ])