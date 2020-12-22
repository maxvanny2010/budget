import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {CategoriesService} from '../shared/services/categories.service';
import * as moment from 'moment';
import {Category, WFMEvent} from '../shared/interface/interface';
import {EventsService} from '../shared/services/events.service';

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
              private eventService: EventsService) {
  }

  ngOnInit(): void {
    let count = 0;
    this.cSub = combineLatest([
      this.categoryService.get('categories.json')
        .pipe(map((response: { [key: string]: any }) => {
          return Object.keys(response).map(key => ({...response[key], id: count++}));
        })),
      this.eventService.get('events.json')
        .pipe(map((response: { [key: string]: any }) => {
          return Object.keys(response).map(key => ({...response[key], id: key}));
        })),
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
      const catEvent = this.filterEvents.filter(e => e.category === +cat.id && e.type === 'outcome');
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
