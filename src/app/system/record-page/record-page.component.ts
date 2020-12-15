import {Component, OnInit} from '@angular/core';
import {Category} from '../shared/models/category';
import {CategoriesService} from '../shared/services/categories.service';

@Component({
  selector: 'wfm-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.scss']
})
export class RecordPageComponent implements OnInit {
  categories: Category[] = [];
  isLoaded = false;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.categoriesService.obtain().subscribe((categories) => {
      this.categories = categories;
      this.isLoaded = true;
    });
  }

  addCategory(category: Category): void {
    this.categories.push(category);
  }

  updateCategory(category: Category): void {
    const idx = this.categories.findIndex(c => c.id === +category.id);
    this.categories[idx] = category;
  }

  deleteCategory(id: number): void {
    const idx = this.categories.findIndex(c => c.id === +id);
    this.categories.splice(idx, 1);
  }
}
