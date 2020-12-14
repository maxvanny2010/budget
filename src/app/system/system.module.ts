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
import {CurrencyComponent} from './bill-page/currency/currency.component';
import {BillService} from './shared/services/bill.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BillInterceptor} from './shared/bill.interceptor';

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
    DropdownDirective,
    BillCardComponent,
    CurrencyComponent
  ],
  providers: [BillService, INTERCEPTOR_PROVIDER]
})
export class SystemModule {

}
