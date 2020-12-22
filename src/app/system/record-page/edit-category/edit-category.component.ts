import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {Message} from '../../../shared/models/message.model';
import {Subscription} from 'rxjs';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';
import {Category} from '../../shared/interface/interface';

@Component({
  selector: 'wfm-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
  animations: [fadeStateTrigger]
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  @Input() categories: Category[] = [];
  @Output() editCategory = new EventEmitter<Category>();
  @Output() deleteCategory = new EventEmitter<string>();
  currentCategoryId: string;
  currentCategory: Category;
  message: Message;
  cSub: Subscription;

  constructor(private categoryService: CategoriesService) {
  }

  ngOnInit(): void {
    this.message = new Message('', 'success');
    this.currentCategoryId = String(this.categories[0].id);
    this.categoryChange();
  }

  categoryChange(): void {
    this.currentCategory = this.categories.find(c => String(c.id) === this.currentCategoryId);
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

  categoryDelete(id: string): void {
    if (id.length !== 0) {
      this.cSub = this.categoryService.erase(id).subscribe(() => {
        this.deleteCategory.emit(id);
        this.setCurrentId(String(this.categories[0].id));
        this.categoryChange();
        this.setMessage('Категория удалена.', 'success');
        setTimeout(() => {
          this.message.text = '';
        }, 5000);
      });
    } else {
      this.setCurrentId(String(this.categories[0].id));
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

  private setCurrentId(id: string): void {
    this.currentCategoryId = id;
  }

  ngOnDestroy(): void {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
  }
}
