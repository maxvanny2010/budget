import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';
import {EventsService} from '../../shared/services/events.service';
import {BillService} from '../../shared/services/bill.service';
import {mergeMap} from 'rxjs/operators';
import {Message} from '../../../shared/models/message.model';
import {Subscription} from 'rxjs';
import {Category} from '../../shared/interface/interface';
import {WFMEvent} from '../../../shared/models/event.modelt';

@Component({
  selector: 'wfm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {
  @Input() categories: Category[] = [];
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];
  message: Message;
  bSub: Subscription;
  currentCategoryId: string;
  currentCategory: number;

  constructor(private eventsService: EventsService, private bills: BillService) {
  }

  ngOnInit(): void {
    this.message = new Message('', 'danger');
    this.currentCategoryId = String(this.categories[0].id);
  }

  private showMessage(text: string): void {
    this.message.text = text;
    setTimeout(() => this.message.text = '', 5000);
  }

  getCategory(): number {
    this.currentCategory = this.categories.findIndex(c => c.id === this.currentCategoryId);
    return +this.currentCategory;
  }

  submit(form: NgForm): void {
    const pattern = 'DD.MM.YYYY HH:mm:ss';
    const text = `На счету недостаточно средств. Вам не хватает`;
    const {amount, description, type} = form.value;
    const category = this.getCategory();
    const event = new WFMEvent(type, amount, category, moment().format(pattern), description);
    this.bSub = this.bills.obtain().subscribe((bill) => {
      let value = 0;
      if (type === 'outcome') {
        if (amount > bill.value) {
          this.showMessage(`${text} ${amount - bill.value}`);
          return;
        } else {
          value = bill.value - amount;
        }
      } else {
        value = bill.value + amount;
      }
      this.bSub = this.bills.update({value, currency: bill.currency})
        .pipe(
          mergeMap(() => {
            return this.eventsService.add(event);
          })
        ).subscribe(() => {
          form.setValue({
            amount: 1,
            description: '      ',
            category: this.currentCategoryId,
            type: 'outcome'
          });
        });
    });
  }

  ngOnDestroy(): void {
    if (this.bSub) {
      this.bSub.unsubscribe();
    }
  }
}
