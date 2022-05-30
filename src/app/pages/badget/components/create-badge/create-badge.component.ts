import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Metric } from '../../../../model/metric';
import { MetricQuery } from '../../../../model/metric-query';
import { CompareOperation, MetricOperation, Operation } from '../../../../model/metric-operation';
import { MetricGateway } from '../../../../services/gateways/metric.service';

@Component({
  selector: 'app-create-badge',
  templateUrl: './create-badge.component.html',
  styleUrls: ['./create-badge.component.scss']
})
export class CreateBadgeComponent implements OnInit {

  metrics: Metric[]; // fetched Metrics.
  metricsOperations: MetricOperation[] = []; // fetched Metrics operation.
  selectedMetricType: number; // id of selected metric.
  selectedEventOperationId: string; // id of selected event operation.
  selectedOperationId: string;
  selectedCompareOfId: string;
  eventValue : number = 0;
  //
  selectedMetric : Metric;
  selectedMetricOperation: MetricOperation;
  selectedCompareTo: CompareOperation;
  selectedMetricOperationCopmare: CompareOperation[] = [];
  selectedEventOperation: MetricOperation;
  selectedOperation: Operation;
  selectedOperationOfEvent: Operation;
  compareValue: number = 0;
  metricQueries: MetricQuery[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateBadgeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BadgeDialogData,
    public _metricGateway: MetricGateway,
  ) { }

  ngOnInit(): void {
    this.data = {
      name: "",
      description: "",
      metric_queries: [],
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChangeGetMetric() {
    this.selectedMetricOperationCopmare = [];
    this.selectedOperation = undefined;
    this.selectedEventOperationId =  "";
    this.selectedOperationId  = "";
    this.selectedCompareOfId = "";
    this.selectedMetric = this.metrics.find((m) => m.id == this.selectedMetricType);
    this.getOperation();
    if (this.selectedMetric.type %2 != 0 || this.selectedOperation !== undefined) {
      this.getCompareTo();
      this.onChangeEvent();
    }
    if (this.selectedMetric.type %2 == 0) {
      this.eventValue = 0;
    }
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

  onChangeSelectEventOperation() {
    this.selectedOperationOfEvent = this.selectedEventOperation.operations.find((o) => o.id == this.selectedEventOperationId);
  }

  onChangeCompareTo() {
    this.selectedCompareTo = this.selectedMetricOperationCopmare.find(
      (compareTo) => compareTo.id == this.selectedCompareOfId
    );
  }

  disableEventButton() {
    if (this.selectedMetric == null) {
      return true;
    }
    else if (this.selectedMetric.type % 2 == 0 && this.selectedOperation == undefined) {
      return true;
    }
    else return false;
  }

  addMetricQuery() {
    let metricQuery : MetricQuery;
    if (this.selectedMetric != null) {
      if (this.selectedMetric.type %2 != 0) {
        console.log("it's odd");
        if (this.eventValue != 2 ) {
          console.log("there is no event operation");
          metricQuery = new MetricQuery({
            metric_id: this.selectedMetric.id,
            first_operation: "x",
            second_operation: "x",
            compare_operation: this.selectedCompareTo.id,
            compare_value: this.compareValue,
          });
          this.metricQueries.push(metricQuery);
          this.reAssignValue(true);
        }
        else {
          console.log("there is event operation");
          metricQuery = new MetricQuery({
            metric_id: this.selectedMetric.id,
            first_operation: this.selectedOperationOfEvent.id,
            second_operation: "x",
            compare_operation: this.selectedCompareTo.id,
            compare_value: this.compareValue,
          });
          this.metricQueries.push(metricQuery);
          this.reAssignValue(true);
        }
      }
      else {
        console.log("it's even");
        if (this.eventValue != 2 ) {
          console.log("there is no event operation");
          metricQuery = new MetricQuery({
            metric_id: this.selectedMetric.id,
            first_operation: this.selectedOperation.id,
            second_operation: "x",
            compare_operation: this.selectedCompareTo.id,
            compare_value: this.compareValue,
          });
          this.metricQueries.push(metricQuery);
          this.reAssignValue(true);
        }
        else {
          console.log("there is event operation");
          metricQuery = new MetricQuery({
            metric_id: this.selectedMetric.id,
            first_operation: this.selectedOperation.id,
            second_operation: this.selectedOperationOfEvent.id,
            compare_operation: this.selectedCompareTo.id,
            compare_value: this.compareValue,
          });
          this.metricQueries.push(metricQuery);
          this.reAssignValue(true);
        }
      }
    }
  }

  reAssignValue(reAssignMetricValue: boolean = false) {
    if (reAssignMetricValue) {
      this.selectedMetric = undefined;
      this.selectedMetricType = 0;
    }
    this.selectedMetricOperationCopmare = [];
    this.selectedOperation = undefined;
    this.selectedEventOperationId =  "";
    this.selectedOperationId  = "";
    this.selectedCompareOfId = "";
    this.compareValue = 0;
  }

  onDeleteMetricQuery($event) {
    this.metricQueries.splice($event,1);
  }

  onSave() {
    this.data.metric_queries = this.metricQueries;
  }

}

export interface BadgeDialogData {
  name: string;
  description: string;
  metric_queries: MetricQuery[];
}