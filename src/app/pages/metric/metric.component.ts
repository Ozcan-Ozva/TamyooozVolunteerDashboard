import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, Subject, Subscription } from 'rxjs';
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
  /* These attributes is sharable */
  public per_page: number = 10;
  valueChanged: Subject<number> = new Subject<number>();
  inputSub: Subscription;
  public current_page: number = 1;
  public links: any[] = [];
  public total: number = 0;
  public loader: boolean = true;
  public lastPage: number = 0;
  public from = 1;
  /* End sharable attributes */

  constructor(public _metricGateway: MetricGateway, public dialog: MatDialog) {}

  ngOnInit() {
    this.getMetrics({
      per_page: this.per_page,
      page: 1,
    });
  }

  ngAfterViewInit() {
    this.inputSub = this.valueChanged
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        this.per_page = value;
        console.log(value);
        if (this.per_page !== null && this.per_page !== 0) {
          this.getMetrics({
            per_page: this.per_page,
            page: this.current_page,
          });
        }
      });
  }

  ngOnDestroy() {
    this.inputSub.unsubscribe();
  }

  private async fetchMetrix(filter: any) {
    this.loader = true;
    return this._metricGateway.getMetrix(filter);
  }

  private getMetrics(filter : MetricFilter) {
    this.fetchMetrix(filter)
      .then((data) => {
        console.log("this is data");
        console.log(data);
        this.loader = false;
        this.metrix = data.metrics;
        this.current_page = data.current_page;
        this.links = data.links;
        this.links.pop();
        this.links.pop();
        this.total = data.total;
        this.lastPage = data.last_page;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
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
    dialogRef.afterClosed().subscribe((metricResult: MetricDialogData) => {
      console.log("this is metricResult");
      console.log(metricResult);
      this._metricGateway
        .updateMetric(editMetric.id, metricResult)
        .subscribe((result: any) => {
          if (result.status_code === 200) {
            let indexOfItem = this.metrix.indexOf(editMetric);
            this.metrix.splice(indexOfItem, 1);
            this.metrix.splice(indexOfItem, 0 ,Metric.fromDTO(result.data));
          }
        });
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
            this.total++;
          }
        });
    });
  }

  metricTypeCheck(type: number) : string {
    if(type == 1) return "Boolean";
    else if(type == 2) return "List of Boolean";
    else if(type == 3) return "String";
    else if(type == 4) return "List of String";
    else if(type == 5) return "Number";
    else if(type == 6) return "List of Number";
  }

  /* Those method is for pagination */
  changeTableIndex(index: number) {
    this.current_page = index;
    this.getMetrics({
      per_page: this.per_page,
      page: this.current_page,
    });
  }

  checkHidden(index) {
    if (index - this.current_page <= 2 && index - this.current_page >= -2) {
      return "visible";
    }
    else {
      return "hidden";
    }
  }

  checkFirstIndex() {
    if (this.current_page - 1 > 2) {
      return "visible"
    }
    else {
      return "hidden";
    }
  }

  checkLastIndex() {
    if (this.lastPage - this.current_page > 2) {
      return "visible"
    }
    else {
      return "hidden";
    }
  }

  nextPage(next: boolean) {
    if (
      (this.current_page != this.lastPage && next) ||
      (this.current_page != this.from && !next)
    ) {
      if (next) this.current_page++;
      else this.current_page--;
      this.getMetrics({
        per_page: this.per_page,
        page: this.current_page,
      });
    }
  }

  checkPreviousClass() {
    if (this.from == this.current_page)
      return "disable-pagination-button";
  }

  checkNextClass() {
    if (this.lastPage == this.current_page)
      return "disable-pagination-button";
  }

  changePerPage() {
    this.valueChanged.next(this.per_page);
  }

  getClassName(index: number) {
    if (this.current_page == index) {
      return "page-item active";
    } else {
      return "page-item";
    }
  }
  /* End Method */
}

export interface MetricFilter {
  per_page?: number;
  page?: number;
}