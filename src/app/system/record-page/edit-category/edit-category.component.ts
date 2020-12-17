import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Category} from '../../shared/models/category';
import {CategoriesService} from '../../shared/services/categories.service';
import {Message} from '../../../shared/models/message.model';
import {Subscription} from 'rxjs';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';

@Component({
  selector: 'wfm-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
  animations: [fadeStateTrigger]
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  @Input() categories: Category[] = [];
  @Output() editCategory = new EventEmitter<Category>();
  @Output() deleteCategory = new EventEmitter<number>();
  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;
  cSub: Subscription;

  constructor(private categoryService: CategoriesService) {
  }

  ngOnInit(): void {
    this.message = new Message('', 'success');
    this.categoryChange();
  }

  categoryChange(): void {
    /*this.currentCategory = this.categories[this.currentCategoryId - 1];*/
    this.currentCategory = this.categories.find(c => c.id === +this.currentCategoryId);
  }

  submit(forms: NgForm): void {
    const form: { name, capacity } = forms.value;
    if (form.capacity < 1) {
      form.capacity *= -1;
    }
    this.cSub = this.categoryService.update(form, this.currentCategoryId)
      .subscribe((category) => {
        this.editCategory.emit(category);
        this.setMessage('Категория отредактирована.', 'success');
        setTimeout(() => {
          this.message.text = '';
        }, 5000);
      });
  }

  categoryDelete(id: number): void {
    if (id > 0) {
      this.cSub = this.categoryService.erase(id).subscribe(() => {
        this.deleteCategory.emit(id);
        this.setCurrentId(1);
        this.categoryChange();
        this.setMessage('Категория удалена.', 'success');
        setTimeout(() => {
          this.message.text = '';
        }, 5000);
      });
    } else {
      this.setCurrentId(1);
      this.categoryChange();
      this.setMessage('Категория не существует.', 'danger');
      setTimeout(() => {
        this.message.text = '';
      }, 5000);
    }
  }

  private setMessage(text: string, type: string = 'success'): void {
    this.message.text = text;
    this.message.type = type;
  }

  private setCurrentId(id: number): void {
    this.currentCategoryId = id;
  }

  ngOnDestroy(): void {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
  }
}
