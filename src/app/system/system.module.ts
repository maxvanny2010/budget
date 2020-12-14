import {NgModule} from '@angular/core';
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
    DropdownDirective
  ],
  providers: []
})
export class SystemModule {

}