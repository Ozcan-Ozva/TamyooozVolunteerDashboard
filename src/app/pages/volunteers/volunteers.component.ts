import { User } from "./../../model/user";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UserGateway } from "../../services/gateways/user.service";
import { AdminGateway } from "../../services/gateways/admin.service";
import { Admin } from "../../model/admin";
import {
  debounceTime,
  delay,
  of,
  Subject,
  Subscription,
  switchMap,
} from "rxjs";
import {
  chartExample1,
  chartExample2,
  chartOptions,
  parseOptions,
} from "../../variables/charts";
import { Chart, ChartItem } from "chart.js";

@Component({
  selector: "app-volunteers",
  templateUrl: "./volunteers.component.html",
  styleUrls: ["./volunteers.component.scss"],
})
export class VolunteersComponent implements OnInit {
  public users: User[];
  public admins: Admin[];
  public isUserActive = true;
  public isAdminActive = true;
  public per_page: number = 10;
  valueChanged: Subject<number> = new Subject<number>();
  inputSub: Subscription;
  public current_page: number = 1;
  public links: any[] = [];
  public total: number = 0;
  public loader: boolean = true;

  constructor(
    public _userGateway: UserGateway,
    public _adminGateway: AdminGateway,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    document.getElementById("defaultOpen").click();

    parseOptions(Chart, chartOptions());

    var chartSales = document.getElementById("gender-distribuation") as ChartItem;
    var volunteersFrequency = document.getElementById("volunteers-frequency") as ChartItem;
    var ageDistribution = document.getElementById(
      "age-distribution"
    ) as ChartItem;

    const doughnutChart = new Chart(chartSales, {
      type: "doughnut",
      data: {
        labels: ["Girl", "Boy"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50],
            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
            hoverOffset: 4,
          },
        ],
      },
    });

    const stackedBar = new Chart(ageDistribution, {
      type: "bar",
      data: {
        labels: ["18-24", "25-30", "30-34", "35-39", "40-50", "50-59", "+60"],
        datasets: [
          {
            label: "Age Distribution",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const stackedLine = new Chart(volunteersFrequency, {
      type: "line",
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'Frequency',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            stacked: true,
          },
        },
      },
    });
  }

  /* public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  } */

  /* ngAfterViewInit() {
    this.inputSub = this.valueChanged
      .pipe(
        debounceTime(1000),
      )
      .subscribe(value => {
        this.per_page = value;
        console.log(value);
        if (this.per_page !== null && this.per_page !== 0) {
          this.getUsers({
            status: Number(this.isUserActive),
            per_page: this.per_page,
            page: this.current_page,
          });
        }
      });
  } */
  /* 
  ngOnDestroy() {
    this.inputSub.unsubscribe();
  } */

  /* private async fetchUsers(filter: VolunteerFilter) {
    this.loader = true;
    return this._userGateway.getUsers(filter);
  } */

  /* private async fetchAdmins(filter: any) {
    this.loader = true;
    return this._adminGateway.getAdmins(filter);
  } */

  /* private getUsers(filter: VolunteerFilter) {
    this.fetchUsers(filter)
      .then((data) => {
        this.users = data.users;
        this.current_page = data.current_page;
        this.links = data.links;
        this.links.pop();
        this.links.pop();
        this.total = data.total;
        this.loader = false;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
  } */

  /* private getAdmins(filter: VolunteerFilter) {
    this.fetchAdmins(filter)
      .then((data) => {
        this.admins = data;
        this.loader = false;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
  } */
  /* 
  checkActiveUserStatus($event) {
    console.log($event.target.checked);
    this.getUsers({
      status: Number($event.target.checked),
      per_page: this.per_page,
      page: 1,
    });
  } */

  /* checkActiveAdminStatus($event) {
    console.log($event.target.checked);
    this.getAdmins({
      status: Number($event.target.checked),
      per_page: this.per_page,
      page: 1,
    });
  } */

  /* changeTableIndex(index: number) {
    this.current_page = index;
    this.getUsers({
      status: Number(this.isUserActive),
      per_page: this.per_page,
      page: this.current_page,
    });
  } */

  changePerPage() {
    this.valueChanged.next(this.per_page);
  }

  openCity(evt, volunteerType) {
    if (volunteerType === "Admins") {
      /* this.getAdmins({
        status: Number(this.isAdminActive),
        per_page: 2,
        page: 1,
      }); */
    } else if (volunteerType === "Users") {
      /* this.getUsers({
        status: Number(this.isUserActive),
        per_page: 2,
        page: 1,
      }); */
    }
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(volunteerType).style.display = "block";
    evt.currentTarget.className += " active";
  }

  getClassName(index: number) {
    if (this.current_page == index) {
      return "page-item active";
    } else {
      return "page-item";
    }
  }
}

export interface VolunteerFilter {
  status?: number;
  per_page?: number;
  page?: number;
}
