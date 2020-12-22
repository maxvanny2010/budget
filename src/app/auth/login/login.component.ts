import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../shared/models/message.model';
import {ActivatedRoute, Router} from '@angular/router';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';
import {Meta, Title} from '@angular/platform-browser';
import {User} from '../../shared/interfaces/interface';
import {AuthFbService} from '../../shared/services/authfb.service';
import {UserService} from '../../shared/services/user.service';
import {NameService} from '../../shared/services/name.service';

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(public auth: AuthFbService,
              private users: UserService,
              private storage: NameService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title,
              private meta: Meta
  ) {
    title.setTitle('Вход в систему');
    meta.addTags([
      {name: 'keywords', content: 'логин,вход,система'},
      {name: 'description', content: 'Страница входа в систему домашняя бухгалтерия'}
    ]);
  }

  message: Message;

  ngOnInit(): void {
    this.message = new Message('', 'danger');
    this.route.queryParams.subscribe((params) => {
      if (params.registration) {
        this.showMessage({type: 'success', text: 'Введите ваши данные'});
      } else if (!params.authenticated) {
        this.showMessage({type: 'info', text: 'Пройдите аутентификацию'});
      }
    });
    this.form = new FormGroup({
      email: new FormControl('a@a.aa', [Validators.required, Validators.email]),
      password: new FormControl('123456', [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(message: Message): void {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 3000);
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: false
    };
    this.auth.login(user)
      .subscribe(() => {
          this.users.getUserByEmail(user.email).subscribe((response) => {
            this.storage.setNameStorage(response.name);
            this.router.navigate(['/system', 'bill']).then(() => {
              this.submitted = false;
            });
          });
        },
        () => {
          this.submitted = false;
        }
      );
  }
}
