import {NgModule, Provider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';
import {SystemComponent} from './system.component';
import {BillPageComponent} from './bill-page/bill-page.component';
import {HistoryPageComponent} from './history-page/history-page.component';
import {PlanningPageComponent} from './planning-page/planning-page.component';
import {RecordPageComponent} from './record-page/record-page.component';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {DropdownDirective} from './shared/directives/dropdown.directive';
import {BillCardComponent} from './bill-page/bill-card/bill-card.component';
import {CurrencyCardComponent} from './bill-page/currency-card/currency-card.component';
import {BillService} from './shared/services/bill.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BillInterceptor} from './shared/bill.interceptor';
import {MomentPipe} from './shared/pipes/moment.pipe';
import {SymbolPipe} from './shared/pipes/symbol.pipe';
import {AddEventComponent} from './record-page/add-event/add-event.component';
import {AddCategoryComponent} from './record-page/add-category/add-category.component';
import {EditCategoryComponent} from './record-page/edit-category/edit-category.component';
import {CategoriesService} from './shared/services/categories.service';
import {PositiveDirective} from './shared/directives/positive.directive';
import {EventsService} from '../shared/services/events.service';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: BillInterceptor,
  multi: true
};

@NgModule({
  imports: [
    CommonModule, SharedModule, SystemRoutingModule],
  declarations: [
    SystemComponent,
    BillPageComponent,
    HistoryPageComponent,
    PlanningPageComponent,
    RecordPageComponent,
    SidebarComponent,
    HeaderComponent,
    BillCardComponent,
    CurrencyCardComponent,
    MomentPipe,
    SymbolPipe,
    AddEventComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    DropdownDirective,
    PositiveDirective
  ],
  providers: [BillService, CategoriesService, EventsService, INTERCEPTOR_PROVIDER]
})
export class SystemModule {

}
