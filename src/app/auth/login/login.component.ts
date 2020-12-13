import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  submit(): void {
    console.log(this.form);

  }
}
