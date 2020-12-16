import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, NgxChartsModule],
  exports: [FormsModule, ReactiveFormsModule, HttpClientModule, NgxChartsModule],

})
export class SharedModule {

}
