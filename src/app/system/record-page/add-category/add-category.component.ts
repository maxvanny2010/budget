import {Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {Category} from '../../shared/models/category';

@Component({
  selector: 'wfm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  @Output() addCategory = new EventEmitter<Category>();

  constructor(private category: CategoriesService) {
  }


  submit(form: NgForm): void {
    const result: { name, capacity } = form.value;
    if (result.capacity < 0) {
      result.capacity *= -1;
    }
    this.category.add(result).subscribe((category) => {
      form.reset();
      form.form.patchValue({capacity: 1});
      this.addCategory.emit(category);
    });
  }
}
