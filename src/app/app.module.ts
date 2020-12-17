import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {UserService} from './shared/services/user.service';
import {AuthService} from './shared/services/auth.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthGuard} from './shared/services/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule
  ],
  providers: [UserService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
