import { Metric } from './../../../model/metric';
import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EventGateway } from "../../../services/gateways/event.service";
import { Event } from "../../../model/event";
import { HttpErrorResponse } from "@angular/common/http";
import { AddVolunteerComponent } from "../components/add-volunteer/add-volunteer.component";
import { MatDialog } from "@angular/material/dialog";
import { ListDialogComponent } from "../components/list-dialog/list-dialog.component";
import {CreateEventComponent, EventtDialogData} from '../components/create-event/create-event.component';
import {MetricDialogComponent} from '../components/metric-dialog/metric-dialog.component';
import {MetricGateway} from '../../../services/gateways/metric.service';
import {ConfirmationDialogComponent} from '../../../components/shared/confirmation-dialog/confirmation-dialog.component';
import { MetricConfigurationsComponent } from '../components/metric-configurations/metric-configurations.component';
import { AdminLayoutComponent } from '../../../layouts/admin-layout/admin-layout.component';

@Component({
  selector: "app-event-management",
  templateUrl: "./event-management.component.html",
  styleUrls: ["./event-management.component.scss"],
})
export class EventManagementComponent implements OnInit {
  private sub: any;
  private id;
  public event: Event;
  public loader: boolean = true;
  public volunteerList = [
    { name: "Ahmad", goal: "Master chef", points: 30},
    { name: "Yazan", goal: "chef", points: 50},
  ];
  public managerList = [
    { name: "Hamdi", goal: "Health Care", points: 450},
    { name: "Fozi", goal: "Health Care", points: 580},
  ];

  images = [
    {
      imageSrc:
        "https://images.unsplash.com/photo-1460627390041-532a28402358?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      imageAlt: "nature1",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      imageAlt: "nature2",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1640844444545-66e19eb6f549?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
      imageAlt: "person1",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      imageAlt: "person2",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1526976668912-1a811878dd37?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
      imageAlt: "person3",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1617450365226-9bf28c04e130?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
      imageAlt: "person4",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1617953141905-b27fb1f17d88?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387",
      imageAlt: "person5",
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private _eventGateway: EventGateway,
    public metricDialog: MatDialog,
    public dialog: MatDialog,
    public _metricGateWay: MetricGateway) {}


  ngOnInit() {
    AdminLayoutComponent.loader$.next(true);
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params["id"];
      console.log("this is id");
      console.log(this.id);
      /* this.fetchMetrics(this.id)
      .subscribe((data) => {
        data.data.forEach(element => {
          this.metrics.push(Metric.fromDTO(element.metric))
        });
      }) */
      this.fetchEvent(this.id)
      .then((data) => {
        console.log("this is event");
        console.log(data);
        this.event = data;
        this.loader = false;
        AdminLayoutComponent.loader$.next(false);
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
    });
  }

  private async fetchEvent(id: number) {
    return this._eventGateway.getEvent(id);
  }
  /* private fetchMetrics(id: number) {
    return this._metricGateWay.getEventMetrics(id);
  } */

  convertVolunteerToManager(volunteer: any) {
    let index = this.volunteerList.indexOf(volunteer);
    this.volunteerList.splice(index,1);
    this.managerList.push(volunteer);
  }

  convertManagerToVolunteer(manager: any) {
    let index = this.managerList.indexOf(manager);
    this.managerList.splice(index,1);
    this.volunteerList.push(manager);
  }

  showVolunteerMertic() {
    const dialogRef = this.dialog.open(ListDialogComponent, {
      data: {
        roleName: "Ahmad",
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        console.log("this is result");
        console.log(result);
      }
    });
  }

  changeMetricConfiguration(metric: Metric) {
    const dialogRef = this.dialog.open(MetricConfigurationsComponent, {
      data: {
        metricType: metric.type,
        maxValue: 0,
        minValue: 0,
        valueLimit: 0,
        atEventEnd: null,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        console.log("this is result");
        console.log(result);
        this._metricGateWay
        .postMetricConfiguration({
          maxValue: result.maxValue,
          minValue: result.minValue,
          valuesLimit: result.valueLimit,
          atEndValue: result.atEventEnd,
          metricId: metric.id,
          eventId: this.id
        })
        .subscribe((result: any) => {
          if (result.status_code === 200) {
            console.log("Done");
          }
        });
      }
    })
  }

  addVolunteer(): void {
    const dialogRef = this.dialog.open(AddVolunteerComponent, {
      data: {
        manager: false,
        volunteer: true,
        title: "Add Volunteer",
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        console.log("this is result");
        console.log(result);
        if (result.volunteer) {
          this.volunteerList.push({
            name: result.name,
            goal: "None",
            points: 10
          })
        } else if (result.manager) {
          this.managerList.push({
            name: result.name,
            goal: "None",
            points: 10
          })
        }
      }
    })
  }
  public openMetricsDialog(userId, userName) {
      const dialogRef = this.metricDialog.open(MetricDialogComponent, {
        data: {
          userName: userName,
          eventId: this.event.id,
          userId: userId,
        },
      });
  }

  public removeUserFromEvent(userId, type) {
    const dialogRef = this.metricDialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to remove this user from event?',
        confirmationButtonText: 'Confirm'
      },
    });
    dialogRef.afterClosed().subscribe((eventResult: any) => {
      if (eventResult) {
        this._eventGateway.removeUserFromEvent(userId, this.event.id);
        if (type === 1) {
          this.event.supervisors = this.event.supervisors.filter(item => (item.id !== userId));
        } else if (type === 2) {
          this.event.acceptedUsers = this.event.acceptedUsers.filter(item => (item.id !== userId));
        }
      }
    });
  }

  addManager(): void {
    const dialogRef = this.dialog.open(AddVolunteerComponent, {
      data: {
        manager: true,
        volunteer: false,
        title: "Add Supervisor",
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        console.log("this is result");
        if (result.volunteer) {
          this.volunteerList.push({
            name: result.name,
            goal: "None",
            points: 10
          })
        } else if (result.manager) {
          this.managerList.push({
            name: result.name,
            goal: "None",
            points: 10
          })
        }
      }
    })
  }
  public changeUserRoleStatus(userId, type) {
    const dialogRef = this.metricDialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: 'Are you sure you want to change this volunteer role?',
        confirmationButtonText: 'Confirm'
      },
    });
    dialogRef.afterClosed().subscribe((eventResult: any) => {
      if (eventResult) {
        console.log(userId);
        this._eventGateway.changeUserRoleStatus(userId, this.event.id);
        if (type === 1) {
          // Get Removed Item.
          const user = this.event.supervisors.find(item => item.id === userId);

          // Remove item from supervisor list.
          this.event.supervisors = this.event.supervisors.filter(item => (item.id !== userId));

          // Append item to Accepted Volunteers list.
          this.event.acceptedUsers.push(user);
        } else if (type === 2) {
          const user = this.event.acceptedUsers.find(item => item.id === userId);

          // Remove item from Accepted users list.
          this.event.acceptedUsers = this.event.acceptedUsers.filter(item => (item.id !== userId));

          // Append item to Supervisors list.
          this.event.supervisors.push(user);
        }
      }
    });
  }
}
