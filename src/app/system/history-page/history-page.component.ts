import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Category} from '../shared/models/category';
import {WFMEvent} from '../shared/models/event.model';
import {CategoriesService} from '../shared/services/categories.service';
import * as moment from 'moment';

@Component({
  selector: 'wfm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  events: WFMEvent[] = [];
  filterEvents: WFMEvent[] = [];
  chartData = [];
  isLoaded = false;

  cSub: Subscription;

  isFilterView = false;

  constructor(private categoryService: CategoriesService,
              private eventService: CategoriesService) {
  }

  ngOnInit(): void {
    this.cSub = combineLatest([
      this.categoryService.get('categories'),
      this.eventService.get('events')
    ]).pipe(
      map((resp: [Category[], WFMEvent[]]) => {
        return resp;
      }))
      .subscribe((data) => {
        this.categories = data[0];
        this.events = data[1];
        this.setOriginalEvents();
        this.calculateChartData();
        this.isLoaded = true;
      });
  }

  private setOriginalEvents(): void {
    this.filterEvents = this.events.slice();
  }

  private calculateChartData(): void {
    this.chartData = [];
    this.categories.forEach((cat) => {
      const catEvent = this.filterEvents.filter(e => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  ngOnDestroy(): void {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
  }

  private toggleViewFilter(dir: boolean): void {
    this.isFilterView = dir;
  }

  openFilter(): void {
    this.toggleViewFilter(true);
  }

  filterApply(filterData: any): void {
    this.setOriginalEvents();
    this.toggleViewFilter(false);

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');
    this.filterEvents = this.filterEvents
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });
    this.calculateChartData();
  }

  filterCancel(): void {
    this.toggleViewFilter(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  resetFilters(): void {
    this.setOriginalEvents();
    this.calculateChartData();
  }
}
