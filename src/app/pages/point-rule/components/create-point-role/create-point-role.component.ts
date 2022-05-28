import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Metric } from '../../../../model/metric';
import { MetricOperation, Operation } from '../../../../model/metric-operation';
import { MetricGateway } from '../../../../services/gateways/metric.service';

@Component({
  selector: 'app-create-point-role',
  templateUrl: './create-point-role.component.html',
  styleUrls: ['./create-point-role.component.scss']
})
export class CreatePointRoleComponent implements OnInit {

  metrics: Metric[];
  metricsOperations: MetricOperation[] = [];
  selectedMetricType: number;
  sMetric : Metric;
  selectOperationID : string = "";
  selectedMetricsOperation: MetricOperation;

  constructor(
    public dialogRef: MatDialogRef<CreatePointRoleComponent>,
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


  onNoClick(): void {
    this.dialogRef.close();
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
