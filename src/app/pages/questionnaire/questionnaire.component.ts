import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Questionnaire } from '../../model/questionnaire';
import { QuestionnaireGateway } from '../../services/gateways/questionnaire.serivce';
import { SendQuestionnaireDialogComponent } from './components/send-questionnaire-dialog/send-questionnaire-dialog.component';
import { ShowQuestionsDialogComponent } from './components/show-questions-dialog/show-questions-dialog.component';
import { VolunteerAnwserQuestionnaierComponent } from './components/volunteer-anwser-questionnaier/volunteer-anwser-questionnaier.component';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {

  public questionnaires : Questionnaire[] = [];
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

  constructor(public _questionnaireGateway: QuestionnaireGateway, public dialog: MatDialog) {}

  ngOnInit() {
    this.fetchQuestionnaire({})
      .then((data) => {
        console.log("this is data");
        console.log(data);
        this.questionnaires = data.questionnaire;
        this.loader = false;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
  }

  private async fetchQuestionnaire(filter: any) {
    return this._questionnaireGateway.getQuestionnaire({});
  }

  /* deleteJoinRequest(joinRequestId: number) {
    this._joinRequestGateway.deleteJoinRequest(joinRequestId).subscribe((result: any) => {
      if (result.status_code === 200) {
        let deletedJoinRequest = this.joinRequests.find((joinRequest) => joinRequest.id == joinRequestId);
        this.joinRequests.splice(this.joinRequests.indexOf(deletedJoinRequest), 1);
      }
    });
  } */

  openDialog(questionnaire : Questionnaire): void {
    const dialogRef = this.dialog.open(ShowQuestionsDialogComponent, {
      data: {
        questions: questionnaire.questions,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        
      }
    });
  }

  showUsers(id: number, state: 0 | 1) {
    this._questionnaireGateway.getQuestionnaireVolunteer(id,state)
    .then((data)=> {
      console.log("this is data");
      console.log(data);
      const dialogRef = this.dialog.open(VolunteerAnwserQuestionnaierComponent, {
        data: {
          users: data.users,
        },
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result !== undefined) {
          
        }
      });
    });
  }

  sendQuestionnaire(id: number) {
    const dialogRef = this.dialog.open(SendQuestionnaireDialogComponent, {
      data: {
        questionnaireId: id,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        
      }
    });
  }
}
