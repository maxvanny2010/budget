import {Component, Input} from '@angular/core';
import {single} from './data';

@Component({
  selector: 'wfm-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent {
  @Input() data;
  /*don't to used. example*/
  single: any[];

  constructor() {
    /*don't to used. example*/
    Object.assign(this, {single});
  }
}
