import {Component, Input} from '@angular/core';
import {Bill, Currency} from '../../shared/interface/interface';

@Component({
  selector: 'wfm-bill-balance-card',
  templateUrl: './bill-balance-card.component.html',
  styleUrls: ['./bill-balance-card.component.scss']
})
export class BillBalanceCardComponent {
  @Input() bill: Bill;
  coinsRef: Currency[] = [];
  rub: number;

  constructor() {
  }

  @Input()
  set coins(coins: Currency[]) {
    coins[0].symbol = 'dollar';
    coins[1].symbol = 'euro';
    this.coinsRef = coins;
  }

  get coins(): Currency[] {
    this.coinsRef[0].value = this.bill === null ? 0 : this.bill.value / this.coinsRef[0].rates.RUB;
    this.coinsRef[1].value = this.bill === null ? 0 : this.bill.value / this.coinsRef[1].rates.RUB;
    return this.coinsRef;
  }
}
