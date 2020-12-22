import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SystemComponent} from './system.component';
import {BillPageComponent} from './bill-page/bill-page.component';
import {HistoryPageComponent} from './history-page/history-page.component';
import {PlanningPageComponent} from './planning-page/planning-page.component';
import {RecordPageComponent} from './record-page/record-page.component';
import {HistoryDetailComponent} from './history-page/history-detail/history-detail.component';
import {AuthGuard} from '../shared/services/auth.guard';

const routes: Routes = [
  {
    path: '', component: SystemComponent, children: [
      {path: 'bill', component: BillPageComponent, canActivate: [AuthGuard]},
      {path: 'history', component: HistoryPageComponent, canActivate: [AuthGuard]},
      {path: 'history/:id', component: HistoryDetailComponent, canActivate: [AuthGuard]},
      {path: 'planning', component: PlanningPageComponent, canActivate: [AuthGuard]},
      {path: 'record', component: RecordPageComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {

}
