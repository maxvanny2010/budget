import {Component, Input, OnInit} from '@angular/core';
import {Bill} from '../../shared/models/bill.model';

@Component({
  selector: 'wfm-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {
  @Input() bill: Bill;
  @Input() currency: any;
  dollar: number;
  euro: number;

  constructor() {
  }

  ngOnInit(): void {
    const currency = {...this.currency};
    this.dollar = currency.rates.USD * this.bill.value;
    this.euro = currency.rates.EUR * this.bill.value;
  }

}
