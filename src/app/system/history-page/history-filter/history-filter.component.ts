import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from '../../shared/interface/interface';

@Component({
  selector: 'wfm-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {
  @Output() filterCancel = new EventEmitter<any>();
  @Output() filterApply = new EventEmitter<any>();

  @Input() categories: Category[] = [];
  selectedTypes = [];
  selectedPeriod = 'd';
  selectedCategories = [];
  timePeriods = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Неделя'},
    {type: 'M', label: 'Месяц'}
  ];
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'},
  ];

  closeFilter(): void {
    this.selectedTypes = [];
    this.selectedPeriod = 'd';
    this.selectedCategories = [];
    this.filterCancel.emit();
  }

  private calculateInputParams(field: string, event: Event): void {
    const value = event.target[`value`];
    const checked = event.target[`checked`];
    if (checked) {
      // tslint:disable-next-line:no-unused-expression
      !this[`${field}`].includes(value) ? this[`${field}`].push(value) : null;
    } else {
      this[`${field}`] = this[`${field}`].filter(i => i !== value);
    }
  }

  changeType(event: Event): void {
    this.calculateInputParams('selectedTypes', event);
  }

  changeCategory(event: Event): void {
    this.calculateInputParams('selectedCategories', event);
  }

  applyFilter(): void {
    this.filterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod,
    });
  }
}
