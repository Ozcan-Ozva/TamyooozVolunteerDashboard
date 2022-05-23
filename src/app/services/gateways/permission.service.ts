import { Injectable } from '@angular/core';
import { Permission } from '../../model/permission';
import { API } from '../api.service';

const ENDPOINTS = {
    getPermissions: 'permissions',
};

@Injectable()
export class PermissionGateway {
    constructor(private api: API) {}

    getPermissions(filter: any): Promise<Permission[]> {
        return this.api
          .get<any>(ENDPOINTS.getPermissions, {}, null, null, filter)
          .toPromise()
          .then((data) => {
            return Permission.fromDTOArray(data.data);
          });
    }
}
