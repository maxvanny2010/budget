import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {combineLatest, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {WFMEvent} from '../shared/models/event.model';
import {Bill} from '../shared/models/bill.model';
import {Category} from '../shared/models/category';

@Component({
  selector: 'wfm-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {
  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: WFMEvent[] = [];

  mSub: Subscription;

  constructor(private billService: BillService,
              private categoryService: CategoriesService,
              private eventService: EventsService) {
  }

  ngOnInit(): void {
    this.mSub = combineLatest([
      this.billService.get('bill'),
      this.categoryService.get('categories'),
      this.eventService.get('events')
    ]).pipe(
      map((data: [Bill, Category[], WFMEvent[]]) => {
        return data;
      })
    )
      .subscribe((data) => {
        this.bill = data[0];
        this.categories = data[1];
        this.events = data[2];
        this.isLoaded = true;
      });
  }

  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
    return catEvents.reduce((total, e) => {
      /*  debugger*/
      total += e.amount;
      return total;
    }, 0);
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCategoryPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 50 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy(): void {
    if (this.mSub) {
      this.mSub.unsubscribe();
    }
  }

}
