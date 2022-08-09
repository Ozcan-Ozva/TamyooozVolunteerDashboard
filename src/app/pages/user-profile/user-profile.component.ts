import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../model/user';
import { AdminGateway } from '../../services/gateways/admin.service';
import { UserGateway } from '../../services/gateways/user.service';
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
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  id: number;
  private state: any;
  public shortName: string = "";
  public admin: User = {
    id: 0,
    name: " ",
    email: "",
    roles: [],
    created_at: new Date(),
  };
  public traitsValue : TraitValue[] = [];

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private _adminGateway: AdminGateway, private _userGateway: UserGateway) { 
    
    console.log(this.router.getCurrentNavigation().extras.state);
    this.state = this.router.getCurrentNavigation().extras.state;
    this.id = this.state.id;
    if (this.state.type === 'Admin') {
      this.fetchAdmin()
      .then((data) => {
        console.log("this is data");
        console.log(data);
        this.admin = {
          id: data.id,
          name: data.name,
          email: data.email,
          roles: [],
        };
        console.log("this is admin");
        console.log(this.admin);
        this.shortName = data.name.substring(0, data.name.indexOf(' '));
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
    }
    else {
      this.fetchUser()
      .then((data) => {
        console.log("this is data");
        console.log(data);
        this.admin = data;
        console.log("this is admin");
        console.log(this.admin);
        this.shortName = data.name.substring(0, data.name.indexOf(' '));
        this.getTraitsValue();
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
    }
  } 

  ngOnInit() {

    parseOptions(Chart, chartOptions());

    var eventFrequencyChart = document.getElementById("event-frequencey") as ChartItem;
    var radarTraitsChart = document.getElementById("radar-traits") as ChartItem;
    const stackedLine = new Chart(eventFrequencyChart, {
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

    const config = new Chart(radarTraitsChart , {
      type: 'radar',
      data: {
        labels: [
          'Value',
          'Sociality',
          'Preciption',
          'Protection',
          'Respectivity',
          'Recipitivity',
          'Spaciousness'
        ],
        datasets: [{
          label: 'Average',
          data: [65, 59, 90, 81, 56, 55, 40],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: 'Volunteer',
          data: [28, 48, 40, 19, 96, 27, 100],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      },
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        }
      },
    });
  }

  private async fetchAdmin() {
    return this._adminGateway.getAdmin(this.id);
  }

  private async fetchUser() {
    return this._userGateway.getUser(this.id);
  }

  /* ngOnDestroy() {
    this.state.unsubscribe();
  } */

  getTraitsValue() {
    this.admin.personality.forEach(element => {
      element.traits.forEach(element => {
        let traitId = element.id;
        let traitValue = this.admin.traits_values.find((tv) => tv.trait_id === traitId);
        this.traitsValue.push({
          name: element.name,
          value: traitValue.value,
        })
      });
    });
  }

}

interface TraitValue {
  name: string;
  value: number;
}
