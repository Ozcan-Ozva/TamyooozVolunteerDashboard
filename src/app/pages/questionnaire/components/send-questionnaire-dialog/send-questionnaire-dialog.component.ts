import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { User } from "../../../../model/user";
import { QuestionnaireGateway } from "../../../../services/gateways/questionnaire.serivce";
import { UserGateway } from "../../../../services/gateways/user.service";

@Component({
  selector: "app-send-questionnaire-dialog",
  templateUrl: "./send-questionnaire-dialog.component.html",
  styleUrls: ["./send-questionnaire-dialog.component.scss"],
})
export class SendQuestionnaireDialogComponent implements OnInit {
  whoAnswer: User[] = [];
  allUsers: User[] = [];

  constructor(
    public dialogRef: MatDialogRef<SendQuestionnaireDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _userGateway: UserGateway,
    public _questionnaireGateway: QuestionnaireGateway
  ) {
    this._questionnaireGateway.getQuestionnaireVolunteer(data.questionnaireId,0)
    .then((data) => {
      this.whoAnswer = data.users;
      this._userGateway.getUsers({
        per_page: 99999,
        page: 1,
        status: 1,
      })
      .then((datas) => {
        this.allUsers = datas.users;
        this.whoAnswer.forEach(element => {
          if (this.allUsers.find((user) => user.id == element.id)) {
            let deletedObject = this.allUsers.find((user) => user.id === element.id);
            this.allUsers.splice(this.allUsers.indexOf(deletedObject), 1);
          }
        });
      })
    })
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendQuestionnaire() {
    this._questionnaireGateway.sendQuestionnaire(this.data.questionnaireId)
    .subscribe((response) => {
      console.log("this is response");
      console.log(response);
    })
  }

}
