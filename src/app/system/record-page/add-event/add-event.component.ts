import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category';
import {NgForm} from '@angular/forms';
import {WFMEvent} from '../../shared/models/event.model';
import * as moment from 'moment';
import {EventsService} from '../../shared/services/events.service';
import {BillService} from '../../shared/services/bill.service';
import {mergeMap} from 'rxjs/operators';
import {Message} from '../../../shared/models/message.model';
import {Subscription} from 'rxjs';

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

  constructor(private eventsService: EventsService, private billService: BillService) {
  }

  ngOnInit(): void {
    this.message = new Message('', 'danger');
  }

  private showMessage(text: string): void {
    this.message.text = text;
    setTimeout(() => this.message.text = '', 5000);
  }

  submit(form: NgForm): void {
    const pattern = 'DD.MM.YYY HH:mm:ss';
    const text = `На счету недостаточно средств. Вам не хватает`;
    const {amount, description, category, type} = form.value;
    const event = new WFMEvent(type, amount, +category, moment().format(pattern), description);
    this.bSub = this.billService.obtain().subscribe((bill) => {
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
      this.bSub = this.billService.update({value, currency: bill.currency})
        .pipe(
          mergeMap(() => {
            return this.eventsService.add(event);
          })
        ).subscribe(() => {
          form.setValue({
            amount: 1,
            description: '      ',
            category: 1,
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
