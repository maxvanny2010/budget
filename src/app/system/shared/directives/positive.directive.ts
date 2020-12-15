import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validators} from '@angular/forms';

@Directive({
  selector: '[wfmPositive]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PositiveDirective,
    multi: true
  }]
})
export class PositiveDirective implements Validators {
  @Input('wfmPositive') positive: number;

  constructor() {
  }

  validate(control: AbstractControl): { [key: string]: boolean } | null {
    return control.value < 1 ? {positive: true} : null;
  }
}
