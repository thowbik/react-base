import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { DataService } from '../../services';

@Injectable()
export class RoleService {
    users: any;
    getUserRoute: string = "/api/user";
    getRoleRoute: string = "/api/role";
    

    constructor(private dataService: DataService) {
    }

    

    getRole(id,refresh: Boolean)
    {
        return this.dataService.getData(this.getRoleRoute+"/"+id, refresh);
    }

    saveRole(role) {
        return this.dataService.post(this.getRoleRoute, role).map(response => {
            this.dataService.clearRouteCache(this.getUserRoute);
            return response;
        });
    }
   
}
