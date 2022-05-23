import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Metric } from '../../model/metric';
import { MetricGateway } from '../../services/gateways/metric.service';
import { CreateMetricComponent, MetricDialogData } from './components/create-metric/create-metric.component';

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.scss']
})
export class MetricComponent implements OnInit {
  public metrix: Metric[];
  public loader: boolean = true;
  public fackeList: number[] = [
    1,
    1,
    1,
    1,
    1,
    ,
    1,
    1,
    1,
    1,
    1,
    ,
    1,
    1,
    1,
    1,
    ,
    1,
    1,
    1,
    1,
  ];

  constructor(public _metricGateway: MetricGateway, public dialog: MatDialog) {}

  ngOnInit() {
    this.fetchMetrix({})
      .then((data) => {
        this.metrix = data;
        this.loader = false;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
  }

  private async fetchMetrix(filter: any) {
    return this._metricGateway.getMetrix({});
  }

  deleteMetric(metricId: number) {
    this._metricGateway.deleteMetric(metricId).subscribe((result: any) => {
      if (result.status_code === 200) {
        let metric = this.metrix.find((metric) => metric.id == metricId);
        this.metrix.splice(this.metrix.indexOf(metric), 1);
      }
    });
  }

  updateMetric(editMetric: Metric) {
    const dialogRef = this.dialog.open(CreateMetricComponent, {
      data: { 
        name: editMetric.name,
        description: editMetric.description,
        type: editMetric.type
      },
    });
    dialogRef.afterClosed().subscribe((roleResult: MetricDialogData) => {
      console.log("this is roleResult");
      console.log(roleResult);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateMetricComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((metricResult: MetricDialogData) => {
      console.log("this is metric result");
      console.log(metricResult);
      this._metricGateway
        .postMetric({
          name: metricResult.name,
          description: metricResult.description,
          type: metricResult.type
        })
        .subscribe((result: any) => {
          if (result.status_code === 200) {
            this.metrix.push(Metric.fromDTO(result.data));
          }
        });
    });
  }
}
