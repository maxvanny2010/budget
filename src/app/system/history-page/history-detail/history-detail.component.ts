import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoriesService} from '../../shared/services/categories.service';
import {EventsService} from '../../shared/services/events.service';
import {WFMEvent} from '../../shared/models/event.model';

@Component({
  selector: 'wfm-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit {
  event: WFMEvent;
  category = '';
  isLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService,
    private categoryService: CategoriesService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.eventService.getById(params.id)
        .subscribe((event) => {
          this.event = event;
          this.categoryService.get(`categories/${event.category}`)
            .subscribe((category) => {
              this.category = category.name;
              this.isLoaded = true;
            });
        });

    });
  }
}
