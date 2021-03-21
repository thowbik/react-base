import { Injectable } from '@angular/core';
import 'rxjs/Rx';;
import { DataService } from '../../services';

@Injectable()
export class UserService {
    users: any;
    getUserRoute: string = "/api/user";
    getRoleRoute: string = "/api/roles";

    constructor(private dataService: DataService) {
    }

    getUser(id, orgId,refresh) {
        return this.dataService.getData(this.getUserRoute + "/" + id+"/"+orgId, refresh);
    }

    getRoles(orgId,refresh: Boolean)
    {
        return this.dataService.getData(this.getRoleRoute+"/"+orgId, refresh);
    }

    saveUser(user) {
        return this.dataService.post('/api/user', user).map(response => {
            this.dataService.clearRouteCache(this.getUserRoute);
            return response;
        });
    }
   
    
}
