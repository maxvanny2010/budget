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
import {BillBalanceCardComponent} from './bill-page/bill-balance-card/bill-balance-card.component';
import {BillCurrencyCardComponent} from './bill-page/bill-currency-card/bill-currency-card.component';
import {BillService} from './shared/services/bill.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MomentPipe} from './shared/pipes/moment.pipe';
import {SymbolPipe} from './shared/pipes/symbol.pipe';
import {AddEventComponent} from './record-page/add-event/add-event.component';
import {AddCategoryComponent} from './record-page/add-category/add-category.component';
import {EditCategoryComponent} from './record-page/edit-category/edit-category.component';
import {CategoriesService} from './shared/services/categories.service';
import {PositiveDirective} from './shared/directives/positive.directive';
import {EventsService} from './shared/services/events.service';
import {HistoryChartComponent} from './history-page/history-chart/history-chart.component';
import {HistoryEventsComponent} from './history-page/history-events/history-events.component';
import {HistoryDetailComponent} from './history-page/history-detail/history-detail.component';
import {HistoryFilterComponent} from './history-page/history-filter/history-filter.component';
import {PieChartModule} from '@swimlane/ngx-charts';
import {FilterPipe} from './shared/pipes/filter.pipe';
import {BillFillCardComponent} from './bill-page/bill-fill-card/bill-fill-card.component';
import {AuthInterceptor} from './shared/interceptors/auth.interceptor';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};

@NgModule({
  imports: [
    CommonModule, SharedModule, SystemRoutingModule, PieChartModule],
  declarations: [
    SystemComponent,
    BillPageComponent,
    HistoryPageComponent,
    PlanningPageComponent,
    RecordPageComponent,
    SidebarComponent,
    HeaderComponent,
    BillBalanceCardComponent,
    BillCurrencyCardComponent,
    MomentPipe,
    SymbolPipe,
    FilterPipe,
    AddEventComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    DropdownDirective,
    PositiveDirective,
    HistoryChartComponent,
    HistoryEventsComponent,
    HistoryDetailComponent,
    HistoryFilterComponent,
    BillFillCardComponent,
  ],
  providers: [BillService, CategoriesService, EventsService, INTERCEPTOR_PROVIDER]
})
export class SystemModule {

}
