import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {LoaderComponent} from './components/loader/loader.component';

@NgModule({
  declarations: [LoaderComponent],
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, NgxChartsModule],
  exports: [FormsModule, ReactiveFormsModule, HttpClientModule, NgxChartsModule, LoaderComponent],

})
export class SharedModule {

}
