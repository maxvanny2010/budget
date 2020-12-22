import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {Category} from '../shared/interface/interface';
import {EventsService} from '../shared/services/events.service';

@Component({
  selector: 'wfm-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.scss']
})
export class RecordPageComponent implements OnInit {
  categories: Category[] = [];
  isLoaded = false;

  constructor(private categoriesService: CategoriesService, private eventService: EventsService) {
  }

  ngOnInit(): void {
    this.categoriesService.getAll().subscribe((categories) => {
      if (categories.length === 0) {
        this.categoriesService.create().subscribe((category) => {
          this.eventService.create().subscribe(() => {
            this.addCategory(category);
            this.isLoaded = true;
          });
        });
      } else {
        this.categories = categories;
        this.isLoaded = true;
      }
    });
  }

  addCategory(category: Category): void {
    this.categories.push(category);
  }

  updateCategory(category: Category): void {
    const idx = this.categories.findIndex((c) => c.id === category.id);
    this.categories[idx] = category;
  }

  deleteCategory(id: string): void {
    const idx = this.categories.findIndex((c) => String(c.id) === id);
    this.categories.splice(idx, 1);
  }
}
