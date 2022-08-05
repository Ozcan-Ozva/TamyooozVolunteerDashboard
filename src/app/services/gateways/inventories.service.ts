import { Injectable } from "@angular/core";
import { API } from "../api.service";
import { Inventory } from "../../model/inventories";

const ENDPOINTS = {
  getInventories: "inventories",
};

@Injectable()
export class InventoriesGateway {
  constructor(private api: API) {}

  getInventories(filter: any): Promise<GetInventoriesDto> {
    return this.api
      .get<any>(ENDPOINTS.getInventories, {}, null, null, filter)
      .toPromise()
      .then((data) => {
        console.log("this I am here is data");
        console.log(data);
        console.log("this is events");
        console.log(Inventory.fromDTOArray(data.data));
        return {
          inventories: Inventory.fromDTOArray(data.data),
          current_page: data.data.current_page,
          links: data.data.links,
          total: data.data.total,
          last_page: data.data.last_page,
          from: data.data.from,
        };
      });
  }
}

export interface GetInventoriesDto {
  inventories: Inventory[];
  current_page: number;
  links: any[];
  total: number;
  last_page: number;
  from: number;
}
