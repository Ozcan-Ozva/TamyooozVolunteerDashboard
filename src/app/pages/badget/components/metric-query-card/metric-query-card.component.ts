import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MetricQuery } from '../../../../model/metric-query';

@Component({
  selector: 'app-metric-query-card',
  templateUrl: './metric-query-card.component.html',
  styleUrls: ['./metric-query-card.component.scss']
})
export class MetricQueryCardComponent implements OnInit {

  @Input() metricQueries: MetricQuery[];
  @Output() deleteMetricQuery: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log("this is metricQuery");
    console.log(this.metricQueries);
  }

  removeMetricQuery(index: number): void {
    console.log("this is index");
    this.deleteMetricQuery.emit(index);
  }

}
