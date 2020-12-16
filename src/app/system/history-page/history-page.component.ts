import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Category} from '../shared/models/category';
import {WFMEvent} from '../shared/models/event.model';
import {CategoriesService} from '../shared/services/categories.service';

@Component({
  selector: 'wfm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  events: WFMEvent[] = [];
  chartData = [];
  isLoaded = false;

  cSub: Subscription;

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
        this.calculateChartData();
        this.isLoaded = true;
      });
  }

  private calculateChartData(): void {
    this.chartData = [];
    this.categories.forEach((cat) => {
      const catEvent = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
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
}
