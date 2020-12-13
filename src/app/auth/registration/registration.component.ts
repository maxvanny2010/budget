import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'wfm-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(private userService: UserService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email], this.uniqEmail.bind(this)),
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
    this.userService.create(user).subscribe(() => {
      this.route.navigate(['/login'], {
        queryParams: {
          registration: true
        }
      }).then(() => {
      });
    });
  }

  uniqEmail(control: FormControl): Promise<any> {
    return new Promise<any>((resolve) => {
      this.userService.getUserByEmail(control.value)
        .subscribe((user) => {
          if (user) {
            resolve({uniqEmail: true});
          } else {
            resolve(null);
          }
        });
    });
  }
}
