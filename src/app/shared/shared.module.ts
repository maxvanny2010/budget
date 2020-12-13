import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [FormsModule, ReactiveFormsModule, HttpClientModule],

})
export class SharedModule {

}
