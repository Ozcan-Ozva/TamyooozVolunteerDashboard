import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Metric } from '../../../../model/metric';
import { CompareOperation, MetricOperation, Operation } from '../../../../model/metric-operation';
import { MetricGateway } from '../../../../services/gateways/metric.service';

@Component({
  selector: 'app-create-badge',
  templateUrl: './create-badge.component.html',
  styleUrls: ['./create-badge.component.scss']
})
export class CreateBadgeComponent implements OnInit {

  metrics: Metric[];
  metricsOperations: MetricOperation[] = [];
  selectedMetricType: number;
  selectedOperationId: string;
  sMetric : Metric;
  selectOperationID : string = "";
  selectedMetricsOperation: MetricOperation;
  eventValue : number = 0;
  //
  selectedMetric : Metric;
  selectedMetricOperation: MetricOperation;
  selectedMetricOperationCopmare: CompareOperation[] = [];
  selectedEventOperation: MetricOperation;
  selectedOperation: Operation;

  constructor(
    public dialogRef: MatDialogRef<CreateBadgeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PointRoleDialogData,
    public _metricGateway: MetricGateway,
  ) { }

  ngOnInit(): void {
    this.data = {
      rule_name: "",
      description: "",
      points: 0,
      metric_queries: {
        metric_id: 0,
        first_operation: "sum"
      }
    };
    this.fetchMetrics({})
      .then((data) => {
        this.metrics = data;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });

    this.fetchMetricsOperation({})
      .then((data) => {
        console.log("this is data");
        console.log(data);
        this.metricsOperations = data;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
  }

  private async fetchMetrics(filter: any) {
    return this._metricGateway.getMetrix({});
  }

  private async fetchMetricsOperation(filter: any) {
    return this._metricGateway.getMetricsOperation({});
  }

  selectMetric() {
    let metric = this.metrics.find((m) => m.id == this.selectedMetricType);
    console.log("this is metric");
    console.log(metric);
    this.selectedMetricsOperation = this.metricsOperations.find((mo) => mo.type == metric.type);
    this.data.metric_queries.metric_id = metric.id;
  }

  selectOperation() {
    console.log("this is selectOperationID");
    console.log(this.selectOperationID);
    this.data.metric_queries.first_operation = this.selectOperationID;
  }

  selectEventOpeation() {
    let metric = this.metrics.find((m) => m.id == this.selectedMetricType);
    let eventMetricType = metric.type + 1;
    this.selectedEventOperation = this.metricsOperations.find((mo) => mo.type == eventMetricType);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onChangeGetMetric() {
    this.selectedMetric = this.metrics.find((m) => m.id == this.selectedMetricType);
    this.getOperation();
  }

  getOperation() {
    this.selectedMetricOperation = this.metricsOperations.find(
      (metricOperation) => metricOperation.type == this.selectedMetric.type
    );
  }

  onChangeOperation() {
    this.selectedOperation = this.selectedMetricOperation.operations.find((o) => o.id == this.selectedOperationId);
    this.getCompareTo();
  }

  getCompareTo() {
    if (this.selectedMetric.type %2 != 0) { // is odd so is variable
      this.selectedMetricOperationCopmare = this.selectedMetricOperation.compareOperations;
    }
    else { // is even so is list
      this.selectedMetricOperationCopmare = this.metricsOperations.find(
        (metricOperation) => metricOperation.type == (+this.selectedOperation.to)
      ).compareOperations;
    }
  }

  onChangeEvent() {
    if(this.eventValue == 2) {
      this.getEventOperation()
    }
  }

  getEventOperation() {
    if (this.selectedMetric.type %2 != 0) {
      this.selectedEventOperation = this.metricsOperations.find(
        (metricOperation) => metricOperation.type == this.selectedMetric.type + 1
      );
    }
    else {
      this.selectedEventOperation = this.metricsOperations.find(
        (metricOperation) => metricOperation.type == (+this.selectedOperation.to) + 1
      )
    }
  }

}

export interface PointRoleDialogData {
  rule_name: string;
  description: string;
  points: number;
  metric_queries: {
    metric_id: number,
    first_operation: string,
  };
}