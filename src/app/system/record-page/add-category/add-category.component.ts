import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {Category} from '../../shared/models/category';
import {Subscription} from 'rxjs';

@Component({
  selector: 'wfm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {
  @Output() addCategory = new EventEmitter<Category>();
  cSub: Subscription;

  constructor(private category: CategoriesService) {
  }


  submit(form: NgForm): void {
    const result: { name, capacity } = form.value;
    if (result.capacity < 0) {
      result.capacity *= -1;
    }
    this.cSub = this.category.add(result).subscribe((category) => {
      form.reset();
      form.form.patchValue({capacity: 1});
      this.addCategory.emit(category);
    });
  }

  ngOnDestroy(): void {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
  }

}
