import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../components/shared/confirmation-dialog/confirmation-dialog.component';
import { EventGateway } from '../../../../services/gateways/event.service';

@Component({
  selector: 'app-event-state',
  templateUrl: './event-state.component.html',
  styleUrls: ['./event-state.component.scss']
})
export class EventStateComponent implements OnInit {

  @Input() eventId : number;

  constructor(public metricDialog: MatDialog, public _eventGateway: EventGateway) { }

  ngOnInit(): void {
  }

  public changeUserRoleStatus() {
    const dialogRef = this.metricDialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: 'Are you sure you want to change this volunteer role?',
        confirmationButtonText: 'Confirm'
      },
    });

    dialogRef.afterClosed().subscribe((eventResult: any) => {
      if (eventResult) {
      }
    });
  }

  public onChangeState(state: number) {
    console.log("this is work");
    this._eventGateway
        .updateEventState(this.eventId, {"status": state})
        .subscribe((result: any) => {
          if (result.status_code === 200) {
            console.log("done");
          }
        });
  }

}
