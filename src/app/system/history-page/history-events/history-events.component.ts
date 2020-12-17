import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category';
import {WFMEvent} from '../../shared/models/event.model';

@Component({
  selector: 'wfm-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() events: WFMEvent[] = [];
  searchValue = '';
  searchPlaceholder = 'сумма';
  searchField = 'amount';

  constructor() {
  }

  ngOnInit(): void {
    this.events.forEach((e) => {
      e.catName = this.categories.find(c => c.id === e.category).name;
    });
  }

  getEventClass(e: WFMEvent): any {
    return {
      label: true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income',
    };
  }

  changeCriteria(field: string): void {
    const nameMap = {
      type: 'тип',
      date: 'дата',
      amount: 'сумма',
      category: 'категория',
    };
    this.searchPlaceholder = nameMap[field];
    this.searchField = field;
  }

}
