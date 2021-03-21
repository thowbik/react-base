import { Injectable } from '@angular/core';
import { DataService } from '../../services';

@Injectable()
export class UserroleService 
{
    users: any;
    getUserRoute: string = "/api/contactusers";
    AddUserRoute: string = "/api/invite";
    getInvitedUserRoute: string = "/api/inviteduser";
    getRoleRoute: string = "/api/roles";
    getContactRoute: string = "/api/contacts";
    deleteUserRoute: string = "/api/multiplecontactusers/delete";
    deleteRoleRoute: string = "/api/multiplerole/delete";
    
    constructor( private dataService: DataService)
    {
    }
    getUsers(orgId, userId, refresh)
    {
        return this.dataService.getData(this.getInvitedUserRoute+"/"+userId+"/"+orgId, refresh);
    }

    

    saveUser(user) {
        return this.dataService.post(this.AddUserRoute, user).map(response => {
            this.dataService.clearRouteCache(this.getUserRoute);
            return response;
        });
    }

    getRoles(orgId,search, refresh)
    {
        return this.dataService.getData(this.getRoleRoute+"/"+orgId+ "?search=" + search, refresh);
    }
    // getUsers(orgId, userId,search, refresh)
    // {
    //     return this.dataService.getData(this.getInvitedUserRoute+"/"+userId+"/"+orgId + "?search=" + search, refresh);
    // }

    deleteUsers(selectedrecords) {
        return this.dataService.post(this.deleteUserRoute, selectedrecords).map(response => {
            this.dataService.clearRouteCache(this.getUserRoute);
            return response;
        });
    }

    getContacts(userId,orgId,refresh)
    {
        return this.dataService.getData(this.getContactRoute+"/"+userId+"/"+orgId, refresh);
    }
    deleteRole(selectedrecords) {
        return this.dataService.post(this.deleteRoleRoute, selectedrecords).map(response => {
            this.dataService.clearRouteCache(this.getUserRoute);
            return response;
        });
    }
}