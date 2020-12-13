import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {Subject} from 'rxjs';

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;
  public error$: Subject<string> = new Subject<string>();

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(text: string, type: string = 'danger'): void {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  submit(): void {
    const form = this.form.value;
    this.userService.getUserByEmail(form.email).subscribe((user: User[]) => {
      if (user.length !== 0) {
        if (user[0].password === form.password) {
          console.log(user);
        } else {
          this.error$.next(this.message.text = 'Повторите пароль');
        }
      } else {
        this.showMessage('Пользовататель не существует', 'danger');
      }
      window.setTimeout(() => {
        this.error$.next(this.message.text = '');
      }, 5000);
      console.log(user);
    });
  }
}
