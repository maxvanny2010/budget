import {animate, style, transition, trigger} from '@angular/animations';

export const fadeStateTrigger = trigger('fade', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(800)
  ]),
  transition(':leave', animate(800, style({opacity: 0})))
]);
