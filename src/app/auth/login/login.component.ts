import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {Subject} from 'rxjs';
import {AuthService} from '../../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;
  public error$: Subject<string> = new Subject<string>();

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.message = new Message('', 'danger');
    this.route.queryParams.subscribe((params) => {
      if (params.registration) {
        this.showMessage({type: 'success', text: 'Введите ваши данные'});
      }
    });
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(message: Message): void {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  submit(): void {
    const form = this.form.value;
    this.userService.getUserByEmail(form.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === form.password) {
            this.authService.login();
            localStorage.setItem('user', JSON.stringify(user));
            /*this.router.navigate(['/']).then(() => {
            });*/
          } else {
            this.error$.next(this.message.text = 'Повторите пароль');
          }
        } else {
          this.showMessage({
            type: 'danger',
            text: 'Пользовататель не существует'
          });
        }
        window.setTimeout(() => {
          this.error$.next(this.message.text = '');
        }, 5000);
      });
  }
}
