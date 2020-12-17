import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthComponent} from './auth.component';
import {LoginGuard} from '../shared/services/login.guard';

const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
      {path: 'registration', component: RegistrationComponent, canActivate: [LoginGuard]}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {

}
