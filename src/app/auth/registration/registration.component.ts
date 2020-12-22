import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import {AuthFbService} from '../../shared/services/authfb.service';
import {User, Users} from '../../shared/interfaces/interface';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'wfm-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(public auth: AuthFbService,
              private users: UserService,
              private route: Router,
              private title: Title,
              private meta: Meta
  ) {
    title.setTitle('Регистрация');
    meta.addTags([
      {name: 'keywords', content: 'регистрация,вход,система'},
      {name: 'description', content: 'Страница регистрации в систему домашняя бухгалтерия'}
    ]);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      agree: new FormControl(false, [Validators.requiredTrue])
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      ...this.form.value
    };
    const users: Users = {
      ...this.form.value
    };
    this.auth.registration(user)
      .subscribe(() => {
        this.users.create(users).subscribe(() => {
        });
        this.route.navigate(['/login'], {
          queryParams: {
            registration: true
          }
        }).then(() => {
        });
      });
  }
}
