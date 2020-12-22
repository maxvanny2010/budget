import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BillService} from '../../shared/services/bill.service';
import {Subscription} from 'rxjs';
import {Bill} from '../../shared/interface/interface';

@Component({
  selector: 'wfm-bill-fill-card',
  templateUrl: './bill-fill-card.component.html',
  styleUrls: ['./bill-fill-card.component.scss']
})
export class BillFillCardComponent implements OnInit, OnDestroy {
  @Output() addBalance: EventEmitter<number> = new EventEmitter<number>();
  @Input() bill: Bill;
  rub: number;
  submitted = false;
  rSub: Subscription;

  constructor(private bills: BillService) {
  }

  ngOnInit(): void {
    this.bills.obtain().subscribe((bill) => {
      this.rub = bill.value;
    });
  }

  submit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.submitted = true;
    this.addBalance.emit(form.value.capacity);
    this.rub += form.value.capacity;
    form.setValue({capacity: 1});
    this.submitted = false;
  }

  ngOnDestroy(): void {
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }
}
