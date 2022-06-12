import { Component, OnInit } from '@angular/core';
import {Chart, ChartItem} from 'chart.js';
import { EventGateway } from '../../services/gateways/event.service';
import { Event } from "../../model/event";


// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public events: Event[] = [];

  constructor(private _eventGateway: EventGateway) {

  }

  ngOnInit() {

    this._eventGateway.getEvents({})
    .then((data) => {
      console.log("this is data");
      console.log(data);
      this.events = data.events;
      console.log("this is events");
      console.log(this.events);
    })

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders') as ChartItem;

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales') as ChartItem;

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			data: chartExample1.data
		});
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
