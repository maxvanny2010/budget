import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SystemComponent} from './system.component';
import {BillPageComponent} from './bill-page/bill-page.component';
import {HistoryPageComponent} from './history-page/history-page.component';
import {PlanningPageComponent} from './planning-page/planning-page.component';
import {RecordPageComponent} from './record-page/record-page.component';
import {HistoryDetailComponent} from './history-page/history-detail/history-detail.component';

const routes: Routes = [
  {
    path: 'system', component: SystemComponent, children: [
      {path: 'bill', component: BillPageComponent},
      {path: 'history', component: HistoryPageComponent},
      {path: 'history/:id', component: HistoryDetailComponent},
      {path: 'planning', component: PlanningPageComponent},
      {path: 'record', component: RecordPageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {

}
