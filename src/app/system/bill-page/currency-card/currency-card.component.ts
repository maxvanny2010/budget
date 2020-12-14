import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'wfm-currency',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {
  @Input() currency: any;
  @Input() coin: any[];
  date = new Date();
  cross = '';
  symbol = '';
  dollar = '';
  euro = '';
  rub = '';

  constructor() {
  }

  ngOnInit(): void {
    const current = {...this.currency};

    this.rub = current.rates.USD;
    const coins = {...this.coin};
    this.date = coins[0].date;
    this.dollar = coins[0].rates.RUB;
    this.euro = coins[1].rates.RUB;
  }

}
