import { Injectable } from "@angular/core";
import { API } from "../api.service";
import { Inventory } from "../../model/inventories";
import { Questionnaire } from "../../model/questionnaire";
import { User } from "../../model/user";

const ENDPOINTS = {
  getQuestionnaire: "questionnaire",
  getQuestionnaireVolunteer: (id: number) => `questionnaireUsers/${id}`,
  sendQuestionnaire: (id: number) => `sendQuestionnaire/${id}`,
};

@Injectable()
export class QuestionnaireGateway {
  constructor(private api: API) {}

  getQuestionnaire(filter: any): Promise<GetQuestionnaireDto> {
    return this.api
      .get<any>(ENDPOINTS.getQuestionnaire, {}, null, null, filter)
      .toPromise()
      .then((data) => {
        console.log("this is data");
        console.log(data);
        console.log(Questionnaire.fromDTOArray(data.data));
        return {
          questionnaire: Questionnaire.fromDTOArray(data.data),
          current_page: data.data.current_page,
          links: data.data.links,
          total: data.data.total,
          last_page: data.data.last_page,
          from: data.data.from,
        };
      });
  }

  getQuestionnaireVolunteer(
    id: number,
    status: 0 | 1
  ): Promise<GetQuestionnaireUserDto> {
    return this.api
      .get<any>(ENDPOINTS.getQuestionnaireVolunteer(id), {}, null, null, {status: status})
      .toPromise()
      .then((data) => {
        console.log("this is data");
        console.log(data);
        let users : any[] = [];
        data.data.forEach(element => {
            users.push(element.users);
        });
        console.log("this is users");
        console.log(users);
        return {
          users: User.fromDTOArray(users),
          current_page: data.data.current_page,
          links: data.data.links,
          total: data.data.total,
          last_page: data.data.last_page,
          from: data.data.from,
        };
      });
  }

  sendQuestionnaire(questionnaireId) {
    return this.api.post(
      ENDPOINTS.sendQuestionnaire(questionnaireId),
      {},
      {}
    );
  }
}

export interface GetQuestionnaireDto {
  questionnaire: Questionnaire[];
  current_page: number;
  links: any[];
  total: number;
  last_page: number;
  from: number;
}

export interface GetQuestionnaireUserDto {
  users: User[];
  current_page: number;
  links: any[];
  total: number;
  last_page: number;
  from: number;
}
