import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {combineLatest, Subscription} from 'rxjs';
import {Bill, Currency} from '../shared/interface/interface';
import {map} from 'rxjs/operators';

@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
  bSub: Subscription;
  rSub: Subscription;

  currency: any;
  bill: Bill;
  coins: Currency[] = [];
  isLoaded = false;

  constructor(private bills: BillService) {
  }

  ngOnInit(): void {
    combineLatest([
      this.bills.obtain(),
      this.bills.getCurrency('RUB', 'USD', 'EUR', 'RUB'),
      this.bills.getCurrency('USD', 'RUB'),
      this.bills.getCurrency('EUR', 'RUB'),
    ]).pipe(
      map((data: [Bill, any, any, any]) => {
        return data;
      })
    ).subscribe((data) => {
      this.bill = data[0];
      this.currency = data[1];
      this.coins[0] = {...data[2]};
      this.coins[1] = {...data[3]};
      this.isLoaded = true;
    });
  }

  refresh(): void {
    this.isLoaded = false;
    this.rSub = this.bills.getCurrency('RUB', 'USD', 'EUR', 'RUB')
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
      });
  }


  addBalance(balance: number): void {
    if (balance !== 0) {
      this.bill.value += balance;
      this.bills.update(this.bill).subscribe(() => {
      });
    }
  }

  ngOnDestroy(): void {
    if (this.bSub) {
      this.bSub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }
}
